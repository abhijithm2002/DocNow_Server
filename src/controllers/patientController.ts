import { Request, Response, NextFunction } from 'express';
import patientService from '../services/patient/patientService';
import bcrypt from 'bcrypt';
import { IpatientController } from './interfaces/IpatientController';
import doctorService from '../services/doctor/doctorService';
import Razorpay from 'razorpay';
import crypto from 'crypto';

export default class patientController implements IpatientController {
  private _patientService: patientService;
  private _doctorService: doctorService
  private _razorpay: Razorpay;

  constructor() {
    this._patientService = new patientService();
    this._doctorService = new doctorService();
    this._razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }

  async signupPatient(req: Request, res: Response, next: NextFunction) {
    console.log('Entered signupPatient controller method');
    try {
      const { name, email, mobile, address, gender, password, photo, is_verified, role } = req.body;
      console.log("Signup payload:", req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = { name, email, address, mobile, gender, password: hashedPassword, photo, role };
      const userData = await this._patientService.signupPatient(data);
      return res.status(201).json({
        message: "User data collected, proceed with OTP verification",
        email,
        data
      });

    } catch (error) {
      console.error('Error in signupPatient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async editPatient(req: Request, res: Response, next: NextFunction) {
    console.log('coming to edit patient controller')
    try {
      const { name, email, photo, mobile, gender } = req.body;
      console.log('body data', req.body)
      const userData = { name, email, photo, mobile, gender }
      const data = await this._patientService.editPatient(userData);
      return res.status(200).json({ message: "Profile Updated", name, email, photo, mobile })
    } catch (error) {
      console.error('Error in editprofile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async fetchDoctorDetails(req: Request, res: Response, next: NextFunction) {
    console.log("entered fetchDoctorDetails controller")
    try {
      const { id } = req.query
      console.log(id)
      const data = await this._patientService.fetchDoctorDetails(id as string)
      if (data) {
        return res.status(200).json({ message: "doctor details fetched successfull", data })
      } else {
        return res.status(400).json({ message: 'fetching doctor details  Unsuccessfull' })
      }
    } catch (error) {
      console.error('Error in fetching doctor details :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async fetchSlots(req: Request, res: Response, next: NextFunction) {
    console.log('entered user fetchSlots controller')
    try {
      const { id, date } = req.query
      console.log('id', id)
      console.log('date...', date)
      const slots = await this._doctorService.fetchSlots(id as string, date as string)
      if (slots) {
        return res.status(200).json({ message: 'slot fetched successfully', slots })
      } else {
        return res.status(400).json({ message: 'slot fetched unsuccessfull' })

      }
    } catch (error) {
      throw error
    }
  }

  async createPayment(req: Request, res: Response, next: NextFunction) {
    console.log('coming to create payment');

    const { amount, currency } = req.body;
    console.log('Amount:', amount);
    console.log('Currency:', currency);

    try {
      const options = {
        amount: amount * 100,
        currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };

      const order = await this._razorpay.orders.create(options);
      console.log('Order Response:', order);

      if (!order || !order.id) {
        return res.status(500).json({ message: 'Error creating order' });
      }

      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error('Error in creating order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    console.log('coming to verifypayment');

    const { response } = req.body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

    console.log('razorpay signature', razorpay_signature)
    console.log('Received payment verification data:', req.body);
    try {
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature === razorpay_signature) {
        res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
      } else {
        res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
      }
    } catch (error) {
      console.error('Error in verifying payment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  async postBooking(req: Request, res: Response, next: NextFunction) {
    console.log('entered post booking controller');
    try {
      const { doctorId, userId, selectedShift, selectedDate, fee } = req.body
      const userData = { doctorId, patientId: userId, shift: selectedShift, date: selectedDate, fee }
      console.log('body data', req.body)
      const data = await this._patientService.postBooking(userData);
      if (data) {
        return res.status(200).json({ message: 'slot booked successfull' })
      } else {
        return res.status(400).json({ message: 'slot booking Unsuccessfull' })

      }
    } catch (error) {
      console.error('Error in booking slot:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  }

  async fetchBookings(req: Request, res: Response, next: NextFunction) {
    console.log('enterd fetchBookings controller');

    try {
      const { id, date } = req.query
      console.log('id', id)
      console.log('date...', date)
      const bookedSlots = await this._patientService.fetchBookings(id as string, date as string)
      if (bookedSlots) {
        return res.status(200).json({ message: 'slot fetched successfully', bookedSlots })
      } else {
        return res.status(400).json({ message: 'slot fetched unsuccessfull' })

      }
    } catch (error) {
      throw error
    }

  }

  async myBookings(req: Request, res: Response, next: NextFunction) {
    console.log('entered my bookings controller')
    try {
      const { patientId } = req.query;
      const data = await this._patientService.myBookings(patientId as string)
      if (data) {
        return res.status(200).json({ message: 'myBookings fetched successfully', data })
      } else {
        return res.status(400).json({ message: 'myBookings fetched unsuccessfull' })

      }
    } catch (error) {
      console.error('Error in fetch my booking :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async cancelBooking(req: Request, res: Response, next: NextFunction) {
    console.log('entered cancel booking controller');
    try {
      const bookingId = req.params.bookingId
      console.log('booking id', bookingId);
      
      const data = await this._patientService.cancelBooking(bookingId)
      if(data) {
        return res.status(200).json({ message: 'cancelled  booking successfull' })
      } else {
        return res.status(400).json({ message: 'cancel booking unsuccessfull' })
      }
    } catch (error) {
      console.error('Error in cancel booking :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    
  }

  async getWalletHistory(req: Request, res: Response, next: NextFunction) {
    console.log('entered wallet history controller');
    try {
      const patientId = req.params.patientId;
      const walletData = await this._patientService.getWalletHistory(patientId);
      if(walletData) {
        return res.status(200).json({ message: 'fetched user wallet history successfull', data: walletData })
      } else {
        return res.status(400).json({ message: 'fetching user wallet history unsuccessfull' })
      }
    } catch (error) {
      console.error('Error in fetching wallet history :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    
  }

  async getBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const bannerData = await this._patientService.getBanner();
      if(bannerData) {
        return res.status(200).json({ message: 'fetched banner successfull', data: bannerData })
      } else {
        return res.status(400).json({ message: 'fetching banner data unsuccessfull' })
      }
    } catch (error) {
      console.error('Error in fetching banner:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
    
}
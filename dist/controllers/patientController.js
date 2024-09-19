"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientService_1 = __importDefault(require("../services/patient/patientService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const doctorService_1 = __importDefault(require("../services/doctor/doctorService"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
class patientController {
    constructor() {
        this._patientService = new patientService_1.default();
        this._doctorService = new doctorService_1.default();
        this._razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    signupPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Entered signupPatient controller method');
            try {
                const { name, email, mobile, address, gender, password, photo, is_verified, role } = req.body;
                console.log("Signup payload:", req.body);
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const data = { name, email, address, mobile, gender, password: hashedPassword, photo, role };
                const userData = yield this._patientService.signupPatient(data);
                return res.status(201).json({
                    message: "User data collected, proceed with OTP verification",
                    email,
                    data
                });
            }
            catch (error) {
                console.error('Error in signupPatient:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    editPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('coming to edit patient controller');
            try {
                const { name, email, photo, mobile, gender } = req.body;
                console.log('body data', req.body);
                const userData = { name, email, photo, mobile, gender };
                const data = yield this._patientService.editPatient(userData);
                return res.status(200).json({ message: "Profile Updated", name, email, photo, mobile });
            }
            catch (error) {
                console.error('Error in editprofile:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    fetchDoctorDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entered fetchDoctorDetails controller");
            try {
                const { id } = req.query;
                console.log(id);
                const data = yield this._patientService.fetchDoctorDetails(id);
                if (data) {
                    return res.status(200).json({ message: "doctor details fetched successfull", data });
                }
                else {
                    return res.status(400).json({ message: 'fetching doctor details  Unsuccessfull' });
                }
            }
            catch (error) {
                console.error('Error in fetching doctor details :', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    fetchSlots(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered user fetchSlots controller');
            try {
                const { id, date } = req.query;
                console.log('id', id);
                console.log('date...', date);
                const slots = yield this._doctorService.fetchSlots(id, date);
                if (slots) {
                    return res.status(200).json({ message: 'slot fetched successfully', slots });
                }
                else {
                    return res.status(400).json({ message: 'slot fetched unsuccessfull' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    createPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const order = yield this._razorpay.orders.create(options);
                console.log('Order Response:', order);
                if (!order || !order.id) {
                    return res.status(500).json({ message: 'Error creating order' });
                }
                res.status(200).json({ success: true, order });
            }
            catch (error) {
                console.error('Error in creating order:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    verifyPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('coming to verifypayment');
            const { response } = req.body;
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
            console.log('razorpay signature', razorpay_signature);
            console.log('Received payment verification data:', req.body);
            try {
                const hmac = crypto_1.default.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
                hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
                const generatedSignature = hmac.digest('hex');
                if (generatedSignature === razorpay_signature) {
                    res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
                }
                else {
                    res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
                }
            }
            catch (error) {
                console.error('Error in verifying payment:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    postBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered post booking controller');
            try {
                const { doctorId, userId, selectedShift, selectedDate, fee } = req.body;
                const userData = { doctorId, patientId: userId, shift: selectedShift, date: selectedDate, fee };
                console.log('body data', req.body);
                const data = yield this._patientService.postBooking(userData);
                if (data) {
                    return res.status(200).json({ message: 'slot booked successfull' });
                }
                else {
                    return res.status(400).json({ message: 'slot booking Unsuccessfull' });
                }
            }
            catch (error) {
                console.error('Error in booking slot:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    fetchBookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('enterd fetchBookings controller');
            try {
                const { id, date } = req.query;
                console.log('id', id);
                console.log('date...', date);
                const bookedSlots = yield this._patientService.fetchBookings(id, date);
                if (bookedSlots) {
                    return res.status(200).json({ message: 'slot fetched successfully', bookedSlots });
                }
                else {
                    return res.status(400).json({ message: 'slot fetched unsuccessfull' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    myBookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered my bookings controller');
            try {
                const { patientId } = req.query;
                const data = yield this._patientService.myBookings(patientId);
                if (data) {
                    return res.status(200).json({ message: 'myBookings fetched successfully', data });
                }
                else {
                    return res.status(400).json({ message: 'myBookings fetched unsuccessfull' });
                }
            }
            catch (error) {
                console.error('Error in fetch my booking :', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    cancelBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered cancel booking controller');
            try {
                const bookingId = req.params.bookingId;
                console.log('booking id', bookingId);
                const data = yield this._patientService.cancelBooking(bookingId);
                if (data) {
                    return res.status(200).json({ message: 'cancelled  booking successfull' });
                }
                else {
                    return res.status(400).json({ message: 'cancel booking unsuccessfull' });
                }
            }
            catch (error) {
                console.error('Error in cancel booking :', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    getWalletHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered wallet history controller');
            try {
                const patientId = req.params.patientId;
                const walletData = yield this._patientService.getWalletHistory(patientId);
                if (walletData) {
                    return res.status(200).json({ message: 'fetched user wallet history successfull', data: walletData });
                }
                else {
                    return res.status(400).json({ message: 'fetching user wallet history unsuccessfull' });
                }
            }
            catch (error) {
                console.error('Error in fetching wallet history :', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    getBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannerData = yield this._patientService.getBanner();
                if (bannerData) {
                    return res.status(200).json({ message: 'fetched banner successfull', data: bannerData });
                }
                else {
                    return res.status(400).json({ message: 'fetching banner data unsuccessfull' });
                }
            }
            catch (error) {
                console.error('Error in fetching banner:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = patientController;

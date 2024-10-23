import Message, {IMessage} from "../models/messageModel";
import Conversation, {IConversation} from "../models/conversationModel";
import { ImessageRepository } from "./interfaces/ImessageRepository";
import {Types, Document} from 'mongoose'
import Patients, {  Patient } from "../models/userModel";
import Doctors,{ Doctor } from "../models/doctorModel";
import Booking from "../models/bookingModel";
import { getReceiverSocketId } from "../Socket/socket";
import {io} from '../index'

export default class MessageRepository implements ImessageRepository {
    async sendMessage(id: string, senderId: string, message: string, messageType: string): Promise<IMessage | null> {
        console.log('entered sendmessage repo');
        
        try {
            const receiverId = id;
            const newMessage = new Message({
                senderId,
                recieverId: id,
                messageType,
                message

            })

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });
            
            if(!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                })
            }

            conversation.messages.push(newMessage._id as Types.ObjectId)
            await Promise.all([conversation.save(), newMessage.save()]);
            const receiverSocketId = getReceiverSocketId(newMessage.recieverId.toString())
            io.to(receiverSocketId as string).emit("newMessage", {
              recieverId: newMessage.recieverId,
              senderId: newMessage.senderId,
              unreadCount: 0,
              message: newMessage.message,
              createdAt: newMessage.createdAt
              
            });
            return newMessage
        } catch (error) {
            throw error
        }
    }

    async conversationDoctors(id: string): Promise<Patient[] | null> {
        try {
          const bookings = await Booking.find({
            doctorId: id,
            status: { $ne: "Canceled" },
          });
          console.log('bookings', bookings)
          const patientIds = bookings.map((booking) => booking.patientId);
          console.log('/////////////////////////////////');
          
          console.log("patientIds", patientIds)
          const patients = await Patients.find({ _id: { $in: patientIds } }).sort({
            _id: -1,
          });
          return patients;
        } catch (error) {
          throw error;
        }
      }
      async conversationPatients(id: string): Promise<Doctor[] | null> {
        console.log('enterd patient conversation');
        
        try {
          const bookings = await Booking.find({
            patientId: id,
            status: { $ne: "Canceled" },
          });
          
          const doctorIds = bookings.map((booking) => booking.doctorId);
          const doctors = await Doctors.find({ _id: { $in: doctorIds } });
          console.log('doctors', doctors)
          return doctors;
        } catch (error) {
          throw error;
        }
      }

      async getMessages(id: string, senderId: string): Promise<IConversation | null> {
        try {
            const conversation = await Conversation.findOne({
              participants: { $all: [senderId, id] },
            }).populate("messages");
            console.log('////conversation//////', conversation)
            return conversation;
          } catch (error) {
            throw error;
          }
      }
}
/// ivdnn thodaganam
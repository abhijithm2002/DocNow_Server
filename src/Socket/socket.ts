// import express from "express";
// import http from "http";
// import { Server, Socket } from "socket.io";
// import dotenv from 'dotenv';

// dotenv.config();

// // Define the shape of the socket user ID map
// interface UserSocketMap {
//   [userId: string]: string; // Maps userId to socketId
// }

// // Define the shape of unread messages tracking
// interface UnreadMessages {
//   [to: string]: {
//     [from: string]: number; // Maps from userId to unread message count
//   };
// }

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:5173', 'http://localhost:3000'], 
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true,
//   },
// });


// // User socket mapping and unread messages tracking
// const userSocketMap: UserSocketMap = {};
// const unreadMessages: UnreadMessages = {};

// // Function to get the receiver's socket ID
// const getReceiverSocketId = (receiverId: string): string | undefined => {
//   return userSocketMap[receiverId];
// };

// // Socket connection handling
// io.on("connection", (socket: Socket) => {
//   const userId = socket.handshake.query.userId as string;

//   if (userId) {
//     userSocketMap[userId] = socket.id;
//   }

//   // Emit online users
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     if (userId) {
//       delete userSocketMap[userId];
//     }
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });

//   // Typing status
//   socket.on("typing", () => {
//     const receiverId = getReceiverSocketId(userId);
//     if (receiverId) {
//       io.to(receiverId).emit("typing", { userId });
//     }
//   });

//   // Stop typing status
//   socket.on("stopTyping", () => {
//     const receiverId = getReceiverSocketId(userId);
//     if (receiverId) {
//       io.to(receiverId).emit("stopTyping", { userId });
//     }
//   });

//   // Handle new message
//   socket.on("sendnewMessage", ({ to, from }: { to: string; from: string }) => {
//     if (!unreadMessages[to]) {
//       unreadMessages[to] = {};
//     }
//     if (!unreadMessages[to][from]) {
//       unreadMessages[to][from] = 0;
//     }
//     unreadMessages[to][from] += 1;

//     const receiverSocketId = getReceiverSocketId(to);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newunreadMessage", {
//         from,
//         unreadCount: unreadMessages[to][from],
//       });
//     }
//   });

//   // Mark messages as read
//   socket.on("markAsRead", ({ from, to }: { from: string; to: string }) => {
//     if (unreadMessages[to] && unreadMessages[to][from]) {
//       delete unreadMessages[to][from];
//     }
//   });

//   // Handle calling user
//   socket.on("callingUser", ({
//     Caller,
//     userId,
//     personalLink,
//   }: {
//     Caller: any;
//     userId: string;
//     personalLink: string;
//   }) => {
//     const receiverSocketId = getReceiverSocketId(userId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("incomingCall", {
//         Caller,
//         userId,
//         personalLink,
//       });
//     }
//   });

//   // Handle call rejection
//   socket.on("onRejected", ({ Caller }: { Caller: any }) => {
//     const receiverSocketId = getReceiverSocketId(Caller._id);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("callRejected");
//     }
//   });
// });

// // Export the IO instance and server
// export { io, server };

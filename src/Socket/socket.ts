import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import dotenv from 'dotenv';

dotenv.config();

interface UserSocketMap {
  [userId: string]: string;
}

interface UnreadMessages {
  [to: string]: {
    [from: string]: number;
  };
}

const userSocketMap: UserSocketMap = {};
const unreadMessages: UnreadMessages = {};

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', 
      methods: ["GET", "POST"],
      credentials: true, // Allow sending cookies
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log('socket connected');
    
    const userId = socket.handshake.query.userId as string | undefined;

    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      if (userId) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    // Typing status
    socket.on("typing", () => {
      const receiverId = getReceiverSocketId(userId!);
      if (receiverId) {
        io.to(receiverId).emit("typing", { userId });
      }
    });

    socket.on("stopTyping", () => {
      const receiverId = getReceiverSocketId(userId!);
      if (receiverId) {
        io.to(receiverId).emit("stopTyping", { userId });
      }
    });

    // Handle new message
    socket.on("sendnewMessage", ({ to, from,message }: { to: string; from: string , message: string}) => {
      console.log('message socket',message)
      console.log('to in socket', to)
      if (!unreadMessages[to]) {
        unreadMessages[to] = {};
      }
      if (!unreadMessages[to][from]) {
        unreadMessages[to][from] = 0;
      }
      unreadMessages[to][from] += 1;

      const receiverSocketId = getReceiverSocketId(to);
      // // if (receiverSocketId) {
      // //   io.to(receiverSocketId).emit("newMessage", {
      // //     recieverId: to,
      // //     senderId: from,
      // //     unreadCount: unreadMessages[to][from],
      // //     message,
          
      // //   });
      // }
    });

    // Mark messages as read
    socket.on("markAsRead", ({ from, to }: { from: string; to: string }) => {
      if (unreadMessages[to] && unreadMessages[to][from]) {
        delete unreadMessages[to][from];
      }
    });

    // socket.on(
    //   "callingUser",
    //   ({
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
    //   }
    // );

    // socket.on("onRejected", ({ Caller }: { Caller: any }) => {
    //   const receiverSocketId = getReceiverSocketId(Caller._id);
    //   if (receiverSocketId) {
    //     io.to(receiverSocketId).emit("callRejected");
    //   }
    // });
  });

  return io;
};

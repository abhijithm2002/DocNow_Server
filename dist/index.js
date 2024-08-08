"use strict";
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import env from 'dotenv';
// import bodyParser from 'body-parser';
// import { patientRoutes } from './routes/patientRoute';
// import connectDB from './utils/db';
// import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
// import { doctorRoutes } from './routes/doctorRoute';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// env.config();
// connectDB();
// const app = express();
// const corsOptions = {
//     origin: 'http://localhost:5173', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true, 
// };
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 5000;
// console.log('coming ere')
// app.use('/api/patient', patientRoutes)
// app.use('/api/doctor', doctorRoutes)
// app.use(errorHandlingMiddleware);
// app.listen(PORT, () => {
//     console.log(`Server is running on port http://localhost:${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const patientRoute_1 = require("./routes/patientRoute");
const doctorRoute_1 = require("./routes/doctorRoute");
const adminRoute_1 = require("./routes/adminRoute"); // Ensure this is imported correctly
const db_1 = __importDefault(require("./utils/db"));
const errorHandlingMiddleware_1 = __importDefault(require("./middleware/errorHandlingMiddleware"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 5000;
app.use('/api/patient', patientRoute_1.patientRoutes);
app.use('/api/doctor', doctorRoute_1.doctorRoutes);
app.use('/api/admin', adminRoute_1.adminRoutes); // Ensure this is used correctly
app.use(errorHandlingMiddleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

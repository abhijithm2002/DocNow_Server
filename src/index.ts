// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import env from 'dotenv';
// import bodyParser from 'body-parser';
// import { patientRoutes } from './routes/patientRoute';
// import connectDB from './utils/db';
// import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
// import { doctorRoutes } from './routes/doctorRoute';

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

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { patientRoutes } from './routes/patientRoute';
import { doctorRoutes } from './routes/doctorRoute';
import { adminRoutes } from './routes/adminRoute';
import connectDB from './utils/db';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

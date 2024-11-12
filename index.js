require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const StudentRoute = require('./routes/StudentRoute');
const DistrictBlockSchoolRoute = require('./routes/DistrictBlockSchoolRoute');
const UserRoute = require('./routes/UserRoute');
const cors = require('cors');
const BulkUPloadRoute = require('./routes/BulkUploadRoute');
const TwilioRoute = require ('./routes/TwilioRoute');
const DashBoardRoute = require('./routes/DashBoardRoute');


const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(express.json()); // Middleware to parse JSON requests

//connecting to db

async function connectDb() {
    try {
        await mongoose.connect("mongodb+srv://mbshbuhamshah:UReCN8RsIy3RDYJD@mvcbackend.arkoj.mongodb.net/Examination?retryWrites=true&w=majority&appName=mvcBackend");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }        
}

// Call the function to connect
connectDb();

// Use the StudentRoute
app.use('/api', StudentRoute);
app.use('/api',DistrictBlockSchoolRoute);
app.use('/api', UserRoute);
app.use('/api', BulkUPloadRoute)
app.use('/api/notifications', TwilioRoute);
app.use('/api', DashBoardRoute);

app.listen(PORT, function() {
    console.log('Server is running on port ' + PORT);
});


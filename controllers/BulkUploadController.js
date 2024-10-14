const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const Student = require('../models/StudentModel');

const upload = multer();

const BulkPost = async (req, res) => {
    try {
        const workbook = XLSX.read(req.file.buffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet); // Read data from the worksheet

        // Extract the mobile number from the request body
        const isRegisteredBy = req.body.isRegisteredBy; // Make sure this is sent from the frontend

        // Save each student to the database
        for (const student of jsonData) {
            const newStudent = new Student({
                ...student, // Spread the student data
                isRegisteredBy: isRegisteredBy // Include the mobile number
            });
            await newStudent.save();
        }
        res.status(200).json({ success: true, message: 'Students uploaded successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to upload students.' });
    }
};

module.exports = {
    BulkPost
};

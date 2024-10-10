const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    srn: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    father: { type: String, required: true },
    mother: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    aadhar: { type: String, unique: true, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    block: { type: String, required: true },
    school: { type: String, required: true },
    schoolCode: {type: String},
    grade: { type: String, required: true },
    image: { type: String }, // Assuming this is a file path or base64 string
    imageUrl: { type: String }, // URL to the image
    isRegisteredBy: { type: String }, // Could represent the user or admin who registered the student
    isVerifiedBy: { type: String }, // Could represent the user or admin who verified the student
    rollNumber: { type: String },
    examType: { type: String },
    centerAllocation1: { type: String },
    centerAllocation2: { type: String },
    centerAllocation3: { type: String },
    dateL1: { type: Date },
    dateL12: { type: Date },
    dateL3: { type: Date },
    admitCard1: { type: Boolean, default: false },
    admitCard2: { type: Boolean, default: false },
    admitCard3: { type: Boolean, default: false },
    resultStatus1: { type: Boolean, default: false },
    resultStatus2: { type: Boolean, default: false },
    resultStatus3: { type: Boolean, default: false },
    marksL1: { type: Number },
    marksL2: { type: Number },
    marksL3: { type: Number },
    isQualifiedL1: { type: Boolean, default: false },
    isQualifiedL2: { type: Boolean, default: false },
    isQualifiedL3: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create a model from the schema
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

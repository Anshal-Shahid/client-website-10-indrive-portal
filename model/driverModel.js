const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
    userId: {
        type: String,
    },
    reviewedBy: {
        type: String,
    },
    state: {
        type: String,
        enum: ['accept', 'decline', 'idle'],
        default: 'idle',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    transportId: {
        type: String,
    },
    photo_img: {  // Changed to match with controller (image)
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    recruitmentApprovalDate: {
        type: Date,  // This will store the date and time for recruitment approval
    },
    dateOfRecruitment: {
        type: Date,  // This will store the date and time of recruitment
    },
    birthDate: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other',
    },
    driverLicenseNumber: {
        type: String,
    },
    licenseFront_img: {  // Changed to match with controller (image)
        type: String,
    },
    licenseBack_img: {  // Changed to match with controller (image)
        type: String,
    },
    registrationPlate: {
        type: String,
    },
    vehiclePhoto_img: {  // Changed to match with controller (image)
        type: String,
    },
    cnic: {
        type: String,
    },
    IDConfirm_img: {  // Changed to match with controller (image)
        type: String,
    },
    cnicFront_img: {  // Changed to match with controller (image)
        type: String,
    },
    cnicBack_img: {  // Changed to match with controller (image)
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Drivers", driverSchema);

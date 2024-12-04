const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
    phone: { type: String },
    email: { type: String },
    city: { type: String },
    userId: { type: String },
    reviewedBy: { type: String },
    state: { type: String, enum: ['accept', 'decline', 'idle'], default: 'idle' },
    createdDate: { type: Date, default: Date.now },
    transportId: { type: String },
    photo_img: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    recruitmentApprovalDate: { type: Date },
    dateOfRecruitment: { type: Date }, // Keep this as Date for database functionality
    birthDate: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    driverLicenseNumber: { type: String },
    licenseFront_img: { type: String },
    licenseBack_img: { type: String }, // Added licenseBack_img field
    registrationPlate: { type: String },
    vehiclePhoto_img: { type: String },
    cnic: { type: String },
    IDConfirm_img: { type: String },
    cnicFront_img: { type: String },
    cnicBack_img: { type: String },
}, {
    timestamps: true,
});

// Pre-save hook to set dateOfRecruitment if not already provided
driverSchema.pre("save", function (next) {
    if (!this.dateOfRecruitment) {
        this.dateOfRecruitment = new Date(); // Set to current date/time
    }
    next();
});

module.exports = mongoose.model("Drivers", driverSchema);

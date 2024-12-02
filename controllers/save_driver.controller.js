const asyncHandler = require("express-async-handler");
const Driver = require("../model/driverModel.js");
const cloudinary = require("cloudinary").v2;
const moment = require("moment");

const save_driver = asyncHandler(async (req, res) => {
    // Get the driver ID from the query parameter
    const driverId = req.body.id;

    // Get other data from the request body
    const { userId, phone, email, city, reviewedBy, state, createdDate, transportId, firstName, lastName, birthDate, gender, driverLicenseNumber, expiryDate, cnic, registrationPlate, remarks, recruitmentApprovalDate, dateOfRecruitment } = req.body;
    console.log("**********");
    
    console.log(req.body);
    
    console.log("**********");

    console.log("Request query parameters:", req.query);
    

    // Format the dates
    const formattedRecruitmentApprovalDate = recruitmentApprovalDate
        ? moment(recruitmentApprovalDate).format("YYYY-MM-DD HH:mm:ss")
        : null;

    const formattedDateOfRecruitment = dateOfRecruitment
        ? moment(dateOfRecruitment).format("YYYY-MM-DD HH:mm:ss")
        : null;

    // Find the driver by MongoDB _id
    const driver = await Driver.findById(driverId);

    if (!driver) {
        return res.status(404).send("Driver not found");
    }

    // Handle file uploads and retain old images if no new file is uploaded
    const uploadedImages = {
        photo_img: driver.photo_img,
        licenseFront_img: driver.licenseFront_img,
        IDConfirm_img: driver.IDConfirm_img,
        cnicFront_img: driver.cnicFront_img,
        cnicBack_img: driver.cnicBack_img,
        vehiclePhoto_img: driver.vehiclePhoto_img,
    };

    if (req.files) {
        const fileFields = [
            { field: "photo", name: "photo_img" },
            { field: "license-front", name: "licenseFront_img" },
            { field: "ID_confirm", name: "IDConfirm_img" },
            { field: "cnic-front", name: "cnicFront_img" },
            { field: "cnic-back", name: "cnicBack_img" },
            { field: "vehicle-photo", name: "vehiclePhoto_img" }
        ];

        // For each field, upload the new file if provided and update the image URL
        for (const { field, name } of fileFields) {
            const file = req.files[field] ? req.files[field][0] : null;
            if (file) {
                try {
                    const cloudinaryResponse = await new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            { folder: "profile-images" },
                            (error, result) => {
                                if (error) {
                                    reject(new Error(`Cloudinary upload failed: ${error.message}`));
                                } else {
                                    resolve(result);
                                }
                            }
                        );
                        uploadStream.end(file.buffer);
                    });
                    uploadedImages[name] = cloudinaryResponse.secure_url;  // Update only if new file is uploaded
                } catch (error) {
                    console.error("Error during Cloudinary upload:", error.message);
                    throw new Error("File upload failed!");
                }
            }
        }
    }

    // Update the driver object with the new data, if provided
    driver.userId = userId || driver.userId;
    driver.phone = phone || driver.phone;
    driver.email = email || driver.email;
    driver.city = city || driver.city;
    driver.reviewedBy = reviewedBy || driver.reviewedBy;
    driver.state = state || driver.state;
    driver.createdDate = createdDate || driver.createdDate;
    driver.transportId = transportId || driver.transportId;
    driver.firstName = firstName || driver.firstName;
    driver.lastName = lastName || driver.lastName;
    driver.recruitmentApprovalDate = formattedRecruitmentApprovalDate || driver.recruitmentApprovalDate;
    driver.dateOfRecruitment = formattedDateOfRecruitment || driver.dateOfRecruitment;
    driver.birthDate = birthDate || driver.birthDate;
    driver.gender = gender || driver.gender;
    driver.driverLicenseNumber = driverLicenseNumber || driver.driverLicenseNumber;
    driver.expiryDate = expiryDate || driver.expiryDate;
    driver.cnic = cnic || driver.cnic;
    driver.registrationPlate = registrationPlate || driver.registrationPlate;
    driver.remarks = remarks || driver.remarks;

    // Update the image URLs only if new images are provided
    driver.photo_img = uploadedImages.photo_img;
    driver.licenseFront_img = uploadedImages.licenseFront_img;
    driver.IDConfirm_img = uploadedImages.IDConfirm_img;
    driver.cnicFront_img = uploadedImages.cnicFront_img;
    driver.cnicBack_img = uploadedImages.cnicBack_img;
    driver.vehiclePhoto_img = uploadedImages.vehiclePhoto_img;

    // Save the updated driver info to the database
    await driver.save();

    console.log("Driver updated:", driver);

    // Redirect to the portal or another page as required
    res.status(200).redirect("/portal");
});

module.exports = { save_driver };

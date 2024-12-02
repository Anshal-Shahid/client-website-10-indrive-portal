const asyncHandler = require("express-async-handler");
const Driver = require("../model/driverModel.js");
const cloudinary = require("cloudinary").v2;
const moment = require("moment"); // To handle date formatting



const add_driver = asyncHandler(async (req, res) => {
    let {
        phone,
        email,
        city,
        userId,
        reviewedBy,
        state,
        createdDate,
        transportId,
        firstName,
        lastName,
        birthDate,
        gender,
        driverLicenseNumber,
        expiryDate,
        cnic,
        registrationPlate,
        remarks,
        photo_img,
        licenseFront_img,
        IDConfirm_img,
        cnicFront_img,
        cnicBack_img,
        vehiclePhoto_img,
        recruitmentApprovalDate,
        dateOfRecruitment,
    } = req.body;


    // Format the dates
    const formattedRecruitmentApprovalDate = recruitmentApprovalDate
        ? moment(recruitmentApprovalDate).format("YYYY-MM-DD HH:mm:ss")
        : null;

    const formattedDateOfRecruitment = dateOfRecruitment
        ? moment(dateOfRecruitment).format("YYYY-MM-DD HH:mm:ss")
        : null;







    phone = phone === "" || !phone ? null : phone;
    email = email === "" || !email ? null : email;
    city = city === "" || !city ? null : city;
    userId = userId === "" || !userId ? null : userId;
    reviewedBy = reviewedBy === "" || !reviewedBy ? null : reviewedBy;
    state = state === "" || !state ? null : state;
    createdDate = createdDate === "" || !createdDate ? null : createdDate;
    transportId = transportId === "" || !transportId ? null : transportId;
    firstName = firstName === "" || !firstName ? null : firstName;
    lastName = lastName === "" || !lastName ? null : lastName;
    birthDate = birthDate === "" || !birthDate ? null : birthDate;
    gender = gender === "" || !gender ? null : gender;
    driverLicenseNumber = driverLicenseNumber === "" || !driverLicenseNumber ? null : driverLicenseNumber;
    expiryDate = expiryDate === "" || !expiryDate ? null : expiryDate;
    cnic = cnic === "" || !cnic ? null : cnic;
    registrationPlate = registrationPlate === "" || !registrationPlate ? null : registrationPlate;
    remarks = remarks === "" || !remarks ? null : remarks;

    const uploadedImages = [];
    if (req.files) {
        const fileFields = [
            { field: "photo", name: "photo_img" },
            { field: "license-front", name: "licenseFront_img" },
            { field: "ID_confirm", name: "IDConfirm_img" },
            { field: "cnic-front", name: "cnicFront_img" },
            { field: "cnic-back", name: "cnicBack_img" },
            { field: "vehicle-photo", name: "vehiclePhoto_img" }
        ];

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
                    uploadedImages.push(cloudinaryResponse.secure_url);
                } catch (error) {
                    console.error("Error during Cloudinary upload:", error.message);
                    throw new Error("File upload failed!");
                }
            } else {
                uploadedImages.push(null);
            }
        }
    } else {
        uploadedImages.push(null, null, null, null, null, null);
    }

    const driver = await Driver.create({
        phone,
        email,
        city,
        userId,
        reviewedBy,
        state,
        createdDate,
        transportId,
        firstName,
        lastName,
        recruitmentApprovalDate: formattedRecruitmentApprovalDate,
        dateOfRecruitment: formattedDateOfRecruitment,
        birthDate,
        gender,
        driverLicenseNumber,
        licenseFront_img: uploadedImages[1],
        licenseBack_img: null,  // Set to null if no back image is uploaded
        registrationPlate,
        vehiclePhoto_img: uploadedImages[5],
        cnic,
        IDConfirm_img: uploadedImages[2],
        photo_img: uploadedImages[0],
        licenseFront_img: uploadedImages[1],
        IDConfirm_img: uploadedImages[2],
        cnicFront_img: uploadedImages[3],
        cnicBack_img: uploadedImages[4],
        vehiclePhoto_img: uploadedImages[5],

    });

    console.log("Driver created:", driver);

    res.status(201).redirect("/add_driver");
});

const add_driver_page = (req, res) => {
    res.render("add_driver.ejs");
};

module.exports = { add_driver,  add_driver_page };

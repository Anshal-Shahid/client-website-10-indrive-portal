const asyncHandler = require("express-async-handler");
const Driver = require("../model/driverModel.js");

const super_portal = asyncHandler(async (req, res) => {
    const filters = {};

    // Add filters based on query parameters
    if (req.query.userId) filters.userId = req.query.userId;
    if (req.query.transportId) filters.transportId = req.query.transportId;
    if (req.query.serviceId) filters.serviceId = req.query.serviceId;
    if (req.query.phone) filters.phone = req.query.phone;
    if (req.query.firstName) filters.firstName = new RegExp(req.query.firstName, "i"); // Case-insensitive regex
    if (req.query.lastName) filters.lastName = new RegExp(req.query.lastName, "i");
    if (req.query.state) filters.state = req.query.state;
    if (req.query.activity) filters.activity = req.query.activity;
    if (req.query.city) filters.city = req.query.city;
    if (req.query.country) filters.country = req.query.country;
    if (req.query.recruited) filters.recruited = req.query.recruited;

    // Handle Recruitment Approval Date filter range
    if (req.query.recruitmentApprovalDateStart && req.query.recruitmentApprovalDateEnd) {
        const startApprovalDate = new Date(req.query.recruitmentApprovalDateStart);
        const endApprovalDate = new Date(req.query.recruitmentApprovalDateEnd);

        // Fix time to the start of the day for the start date
        startApprovalDate.setHours(0, 0, 0, 0);
        
        // Fix time to the end of the day for the end date
        endApprovalDate.setHours(23, 59, 59, 999);

        filters.recruitmentApprovalDate = {
            $gte: startApprovalDate,
            $lte: endApprovalDate,
        };
    }

    // Handle Date of Recruitment filter range
    if (req.query.dateOfRecruitmentStart && req.query.dateOfRecruitmentEnd) {
        const startRecruitmentDate = new Date(req.query.dateOfRecruitmentStart);
        const endRecruitmentDate = new Date(req.query.dateOfRecruitmentEnd);

        // Fix time to the start of the day for the start date
        startRecruitmentDate.setHours(0, 0, 0, 0);

        // Fix time to the end of the day for the end date
        endRecruitmentDate.setHours(23, 59, 59, 999);

        filters.dateOfRecruitment = {
            $gte: startRecruitmentDate,
            $lte: endRecruitmentDate,
        };
    }

    // Fetch drivers from the database
    const drivers = await Driver.find(filters);

    // Render the EJS template with the filtered drivers
    res.render("super_portal", { drivers });
});

module.exports = { super_portal };

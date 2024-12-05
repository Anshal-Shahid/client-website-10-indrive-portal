const asyncHandler = require("express-async-handler");
const Driver = require("../model/driverModel.js");

const super_portal = asyncHandler(async (req, res, next) => {
    try {
        const filters = {};
        console.log("aaiyye");
        
        // Pagination variables
        const limit = 20; // Number of drivers per page
        const page = parseInt(req.query.page) || 1; // Current page number (default to 1)
        const skip = (page - 1) * limit; // Skip records for the current page

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

            startApprovalDate.setHours(0, 0, 0, 0);
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

            startRecruitmentDate.setHours(0, 0, 0, 0);
            endRecruitmentDate.setHours(23, 59, 59, 999);

            filters.dateOfRecruitment = {
                $gte: startRecruitmentDate,
                $lte: endRecruitmentDate,
            };
        }

        const completeDriver = await Driver.countDocuments(); 

        // Fetch the total count of drivers matching the filters
        const totalDrivers = await Driver.countDocuments(filters);
        const totalPages = Math.ceil(totalDrivers / limit); // Calculate total number of pages

        // Fetch drivers with pagination and sort by creation date (newest first)
        const drivers = await Driver.find(filters)
            .sort({ createdAt: -1 }) // Sort in descending order by createdAt
            .skip(skip)
            .limit(limit);

        // Render the EJS template with the filtered drivers and pagination data
        res.render("super_portal", {
            drivers,
            currentPage: page, // The current page number
            totalPages,        // Total number of pages
            limit,
            totalDrivers,      // Total number of drivers (without filters)
            completeDriver,               // Number of drivers per page
        });
    } catch (error) {
        console.error("Error in super_portal controller:", error);

        // Handle the error gracefully
        res.status(500).render("error", {
            message: "An error occurred while processing your request.",
            error, // Optionally include error details (useful for development)
        });
    }
});

module.exports = { super_portal };

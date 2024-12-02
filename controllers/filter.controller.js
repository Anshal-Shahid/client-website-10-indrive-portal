const asyncHandler = require("express-async-handler");
const Driver = require("../model/driverModel.js");

const filterDrivers = asyncHandler(async (req, res) => {
    // Get query parameters from the URL
    const { userId, transportId, serviceId, phone, firstName, lastName, state, activity, city, country, recruitmentApproval, recruitmentDate, recruited } = req.query;

    // Set page and limit for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // Number of drivers per page
    const skip = (page - 1) * limit;

    // Create a filter object based on query parameters
    let filterCriteria = {};

    if (userId) filterCriteria.userId = new RegExp(userId, 'i');
    if (transportId) filterCriteria.transportId = new RegExp(transportId, 'i');
    if (serviceId) filterCriteria.serviceId = new RegExp(serviceId, 'i');
    if (phone) filterCriteria.phone = new RegExp(phone, 'i');
    if (firstName) filterCriteria.firstName = new RegExp(firstName, 'i');
    if (lastName) filterCriteria.lastName = new RegExp(lastName, 'i');
    if (state) filterCriteria.state = new RegExp(state, 'i');
    if (activity) filterCriteria.activity = new RegExp(activity, 'i');
    if (city) filterCriteria.city = new RegExp(city, 'i');
    if (country) filterCriteria.country = new RegExp(country, 'i');
    if (recruitmentApproval) filterCriteria.recruitmentApprovalDate = new RegExp(recruitmentApproval, 'i');
    if (recruitmentDate) filterCriteria.dateOfRecruitment = new RegExp(recruitmentDate, 'i');
    if (recruited) filterCriteria.recruited = new RegExp(recruited, 'i');

    // Fetch drivers with pagination and filtering
    const drivers = await Driver.find(filterCriteria).skip(skip).limit(limit);

    // Get total count of drivers based on the filter criteria
    const totalDrivers = await Driver.countDocuments(filterCriteria);
    const totalPages = Math.ceil(totalDrivers / limit);

    res.render("super_portal", {
        drivers,
        currentPage: page,
        totalPages: totalPages,
        filters: req.query // Pass the filter values to the frontend
    });
});

module.exports = { filterDrivers };

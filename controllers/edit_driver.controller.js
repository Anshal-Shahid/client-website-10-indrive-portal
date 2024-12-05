const Driver = require("../model/driverModel.js"); // Assuming you have a Driver model for your DB

// This function fetches the driver data based on the `id` query parameter
const edit_driver_page = async (req, res) => {
    const { id } = req.query; // Extract the driver ID from the query parameters

    try {
        // Fetch driver details from the database
        const driver = await Driver.findById(id);

        if (!driver) {
            return res.status(404).send("Driver not found");
        }

        // If phone is a single string, convert it into an array for consistency
        if (typeof driver.phone === 'string') {
            driver.phone = [driver.phone];
        }

        // Render the edit page with driver details
        res.render("edit_driver", {
            driver, // Pass the driver data to the EJS template
        });
    } catch (err) {
        console.error("Error fetching driver:", err);
        res.status(500).send("Server Error");
    }
};

module.exports = { edit_driver_page };

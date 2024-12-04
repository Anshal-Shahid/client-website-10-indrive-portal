const multer = require('multer');
const sharp = require('sharp');

// Set up multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only JPEG, PNG, and GIF files are allowed!"), false);
        }
        cb(null, true);
    },
});

module.exports = (req, res, next) => {
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "license-front", maxCount: 1 },
        { name: "license-back", maxCount: 1 },
        { name: "ID_confirm", maxCount: 1 },
        { name: "cnic-front", maxCount: 1 },
        { name: "cnic-back", maxCount: 1 },
        { name: "vehicle-photo", maxCount: 1 }
    ])(req, res, async (err) => { // Notice the async here
        if (err) {
            return next(err); // Pass any multer errors to the next handler
        }

        // Check and compress images (resize and compress to a smaller size)
        const compressImage = async (fieldName) => {
            if (req.files && req.files[fieldName]) {
                const file = req.files[fieldName][0];

                // Compress using sharp
                try {
                    const compressedBuffer = await sharp(file.buffer)
                        .resize(800) // Resize to 800px width (adjust as needed)
                        .jpeg({ quality: 70 }) // Compress and set JPEG quality
                        .toBuffer();

                    // Replace original buffer with compressed image buffer
                    file.buffer = compressedBuffer;
                } catch (err) {
                    return next(err); // Pass any sharp errors to the next handler
                }
            }
        };

        // Apply compression to each image field
        await Promise.all([
            compressImage('photo'),
            compressImage('license-front'),
            compressImage('license-back'),
            compressImage('ID_confirm'),
            compressImage('cnic-front'),
            compressImage('cnic-back'),
            compressImage('vehicle-photo')
        ]);

        // Proceed to next middleware or route handler
        next();
    });
};

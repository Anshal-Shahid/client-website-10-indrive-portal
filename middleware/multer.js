const multer = require('multer');
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

module.exports = upload;
















// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// // const cloudinaryStorage = require('multer-storage-cloudinary');



// const storage= multer.diskStorage({
//     filename:(req,file,cb)=>{
//         // cb(null,Date.now()+file.originalname),
//         cb(null,file.originalname)
//     }
// })

// const upload=multer({storage:storage})

// module.exports=upload
const express=require("express")
const router=express.Router()
const { add_driver_page,add_driver}=require("../controllers/add_driver.controller.js")
const { edit_driver_page}=require("../controllers/edit_driver.controller.js")
const {super_portal}=require("../controllers/portal.controller.js")
const{filterDrivers}=require("../controllers/filter.controller.js")
const{save_driver}=require("../controllers/save_driver.controller.js")
const upload=require("../middleware/multer.js")

router.get("/add_driver", add_driver_page)
router.get("/edit_driver", edit_driver_page)

router.post("/save_driver",upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "license-front", maxCount: 1 },
    { name: "ID_confirm", maxCount: 1 },
    { name: "cnic-front", maxCount: 1 },
    { name: "cnic-back", maxCount: 1 },
    { name: "vehicle-photo", maxCount: 1 }
]), save_driver)

router.get("/portal",super_portal)
// router.get("/filter",filter_drivers)
// router.get("/ff",filterDrivers)
router.post("/add-driver", upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "license-front", maxCount: 1 },
    { name: "ID_confirm", maxCount: 1 },
    { name: "cnic-front", maxCount: 1 },
    { name: "cnic-back", maxCount: 1 },
    { name: "vehicle-photo", maxCount: 1 }
]), add_driver);

module.exports=router
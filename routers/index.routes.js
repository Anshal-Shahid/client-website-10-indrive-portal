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

router.post("/save_driver",upload, save_driver)

router.get("/portal",super_portal)
router.get("/",super_portal)
// router.get("/filter",filter_drivers)
// router.get("/ff",filterDrivers)
router.post("/add-driver", upload, add_driver);


module.exports=router
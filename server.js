const express=require("express")
const app=express()
const dotenv=require("dotenv");
dotenv.config();
const ejs=require("ejs")
const bodyparser=require("body-parser")
const cors=require("cors")
const path=require("path")
const {connectDB}=require("./configs/connectionDB.js")

console.log("Cloudinary Config: ", process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

connectDB()
app.use(cors())

// ejs

const tempelatePath=path.join(__dirname,"./tempelates")

app.set("view engine","ejs")
app.set("views",tempelatePath)


// middleware
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true})) 
app.use(express.static(path.join(__dirname,"./public")))



// router
app.use("/",require("./routers/index.routes.js"))

// ports
const port=process.env.PORT || 3000


app.listen(port,()=>{
    console.log(`App is listening on ${port} port`);

})




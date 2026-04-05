const express =require("express")
const app=express();
const cors=require("cors")
const dotenv=require("dotenv")
const connectdb=require("./config/db")                        //acquiring the fn connectdb from config
const authroute=require("./routes/auth.routes")
const adminroute=require("./routes/admin-routes")
const resetroute=require("./routes/reset-route")
const mediaroute=require("./routes/media.routes")
const professorroute=require("./routes/Professor-routes")
const calendarroute = require("./routes/calendar.routes")

const cookieparser=require("cookie-parser");
const mailroute =require("./routes/mail.routes")

dotenv.config();

connectdb();                                                  //running the function connectdb

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/auth",authroute)
app.use("/admin",adminroute)
app.use("/email",mailroute)
app.use("/upload",mediaroute)
app.use("/uploads",express.static("uploads"))
app.use("/professor",professorroute)
app.use("/calendar",calendarroute)





app.listen(3001,()=>{
    console.log("Server is running on port 3001");
    
});



// app.use(cors({
//   origin:"http://localhost:5173",
//   methods:"POST",
//   credentials:true
// }));





// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.json({message:"got the feedback"})
  
// });

// app.get("/",(req,res)=>{
//   res.json({message:"this is home route"})
  
// })

// const port=3001;
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
    
// })
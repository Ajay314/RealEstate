const express = require('express');
const connectDB = require("./config/database");
const cors = require('cors');
const app = express();



app.use(express.json());
app.use(cors());

const router = require("./routes/signup");
const PropertyRouter = require("./routes/propertyRoutes");
const adminRouter = require("./routes/admin");
const BookingRoute = require("./routes/booking");



app.use("/", router);
app.use("/",PropertyRouter);
app.use("/",adminRouter);
app.use("/",BookingRoute);

connectDB().then(()=>{
    console.log("DataBase Connected Successfully");
    app.listen(3003,()=>{
        console.log("Server Listening on Port 3003");
    })
}).catch((err)=>{
    console.log("Error in connecting with Database");
})



const express = require('express');
const connectDB = require("./config/database");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


connectDB().then(()=>{
    console.log("DataBase Connected Successfully");
    app.listen(3001,()=>{
        console.log("Server Listening on Port 3001");
    })
}).catch((err)=>{
    console.log("Error in connecting with Database");
})



require('dotenv').config()
const authRoute=require('./Routes/Auth')
const homeRoute=require('./Routes/Home')
const connectDB=require('./config/db');
const express=require("express")
const app=express()
app.use(express.json());
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});

connectDB(); // Database connection

// authentication (login/register)
app.use("/auth",authRoute)

// Admin (or) User Home 
app.use("/home",homeRoute)


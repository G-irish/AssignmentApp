const jwt =require('jsonwebtoken');
const User = require('../models/User');

// Middleware for verifying Logged-in user
const protect =async (req,res,next)=>{
    let token;

    // Checking if Bearer token exists
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.split(" ")[1]; // Extracting the bearer token

            const decoded=jwt.verify(token,process.env.JWT_SECRET); // Extracting the user ID from the token
            
            req.user=await User.findById(decoded.id).select('-password'); // Checking if the user exists in the database , if exists make user a property of request object
            next(); // moving to next middleware
        } catch (error) {

            // Throwing Error for Unauthorized access (Invalid token)
            res.status(401);
            throw new Error('Unauthorized Access');
        }
    }
    else{
        // Throwing Error for Unauthorized access (No authorization header or Invalid token)
        res.status(401);
        throw new Error("Unauthorized Access");
    }
}

//Middleware for verifying admin
const admin=async (req,res,next)=>{
    // check if user is an admin
    if(req.user && req.user.role==="admin"){
        next();
    }
    else{
        res.status(401);
        throw new Error("Unauthorized Access");
    }
}
module.exports={protect , admin};
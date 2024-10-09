const User=require('../models/User');
const generateToken=require('../config/generateToken');

//Sign up or Register
const registerUser=async (req,res)=>{
    const {name,email,password,role}=req.body; //extracting user information from request object 
    if(!name || !email || !password || !role){
        res.status(400);
        throw new Error('please enter all feilds');
    } // Checking if all of the information is present

    const userExists=await User.findOne({email}); // Checking if the user is already registered
    if(userExists){
        res.status(400);
        throw new Error('User already Exists')
    }
    const newuser=await new User({
        name,
        email,
        password,
        role,
    }); // Creating new User object that will be stored into the database
    if(newuser){
        await newuser.save(); // storing new user into database
        res.status(201).json({
            _id:newuser._id,
            name:newuser.name,
            email:newuser.email,
            role:newuser.role,
            token:generateToken(newuser._id),
        }); // generating token for verifying if a user is logged-in (maintaining sessions)
    }
    else{
        res.status(400);
        throw new Error("Failed to create user");
    } 
}
const loginUser=async (req,res)=>{
    const {email,password}=req.body; //extracting user information required for log in
    if(!email || !password){
        res.status(400);
        throw new Error('Please Enter all Fields');
    }// Checking if all of the information is present
    const curruser=await User.findOne({email}); //Checking if User with given credentials exists
    if(curruser && (await curruser.matchPassword(password))){
        res.json({
            _id:curruser._id,
            name:curruser.name,
            email:curruser.email,
            role:curruser.role,
            token:generateToken(curruser._id),
        });
    } // Verifying given password
    else{
        res.status(401);
        throw new Error('Invalid Password or Email');
    }
}
module.exports={registerUser,loginUser};
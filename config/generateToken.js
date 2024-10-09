const jwt=require('jsonwebtoken');
const generateToken=(id)=>{
    // Generating Token for user
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}
module.exports=generateToken;
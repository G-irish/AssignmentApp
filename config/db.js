const mongoose=require('mongoose')
async function connectDB(){
    try {
        const con=await mongoose.connect(process.env.MONGOURL);
        console.log("Database connected");
    } catch (error) {
        console.log(`Connection Failed: ${error.message}`);        
    }
}
module.exports=connectDB;
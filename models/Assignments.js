const mongoose=require("mongoose")
const assginmentSchema=mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    task:{type:String,required:true},
    admin:{type:String,required:true},
    status: {
        type: String,
        required: true,
        enum: ['Submitted', 'Approved', 'Rejected'],
        default: 'Submitted'
    },
    date: {
        type: Date,
        default:()=>{
            // Get current time in UTC and adjust to IST (UTC+5:30)
            const utcDate=new Date();
            const istDate=new Date(utcDate.getTime()+(5.5*60*60*1000)); // UTC to IST
            return istDate;
        }
    }
});
module.exports=mongoose.model("Assignment",assginmentSchema);
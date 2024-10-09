const User=require('../models/User');
const Assignments=require('../models/Assignments');
const uploadAssignment=async (req,res)=>{
    const {userId,task,admin}=req.body;
    if(!userId || !task || !admin ){
        res.status(400);
        throw new Error("Please Enter all fields");
    }
    const adminUser=await User.findOne({email:admin});
    const assignmentExists=await Assignments.findOne({userId,task,admin});
    if(assignmentExists){
        res.status(400);
        throw new Error("Assignment already submitted");
    }
    if(!adminUser || adminUser.role==="user"){
        res.status(401);
        throw new Error("Admin not found");
    }
    const newassignment=new Assignments({
        userId,
        task,
        admin,
        status:"Submitted",
    });
    if(newassignment){
        await newassignment.save();
        res.json({
            _id:newassignment._id,
            userId:newassignment.userId,
            task:newassignment.task,
            admin:newassignment.admin,
            status:newassignment.status,
        });
    }
    else{
        res.status(400);
        throw new Error("Failed to submit assignment");
    }
}
const fetchAllAdmins=async (req,res)=>{
    
    // Responding according to search criteria , Otherwise returning all admins
    const keyword=req.query.search ? {
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ],
        role:"admin"
    } : {role:"admin"};
    const admin=await User.find(keyword).select('-password');
    res.send(admin);
}
const fetchAllUserAssignments=async (req,res)=>{


    // (optional) Fetching all assignments submitted by user , So that he/she is aware of rejected/approved assignments
    const {userId}=req.body;
    if(!userId){
        res.status(400);
        throw new Error("Please Enter User ID");
    }
    const assignments=await Assignments.find({userId});
    res.send(assignments);
}
module.exports={uploadAssignment,fetchAllAdmins,fetchAllUserAssignments};
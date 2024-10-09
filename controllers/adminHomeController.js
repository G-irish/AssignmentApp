const Assignments=require('../models/Assignments');

//fetching assignments tagged to admin that is currently logged-in
const fetchAllAssignments= async (req,res)=>{
    const admin=req.user.email; //extracting admin email from request object
    if(!admin){
        res.status(400);
        throw new Error("Please Enter User ID");
    }
    const assignments=await Assignments.find({admin}); // Checking if the admin exists in the database
    res.send(assignments);
}

// Reject assignments
const rejectAssignment=async (req,res)=>{
    const {id}=req.params; // extracting assignment id from request parameters
    if(!id){
        res.status(400);
        throw new Error('Enter valid assignment ID');
    }
    const assignment=await Assignments.findByIdAndUpdate(
        id,
        {status:"Rejected"},
        {new:true}
    ); // fetching the assignment from database and updating it's status to be rejected
    if(!assignment){
        res.status(404);
        throw new Error('Assignment not found');
    } // throwing error if assignment does'nt exist
    res.json({
        message:"Assignment Updated Successfully",
        assignment
    }); // responding with updated assignment and notifying update was successful
    
}

// Accepting Assignments
const acceptAssignment=async (req,res)=>{
    const {id}=req.params; // extracting assignment id from request parameters
    if(!id){
        res.status(400);
        throw new Error('Enter valid assignment ID');
    }
    const assignment=await Assignments.findByIdAndUpdate(
        id,
        {status:"Accepted"},
        {new:true}
    );// fetching the assignment from database and updating it's status to be accepted
    if(!assignment){
        res.status(404);
        throw new Error('Assignment not found');
    }// throwing error if assignment does'nt exist
    res.json({
        message:"Assignment Updated Successfully",
        assignment
    });// responding with updated assignment and notifying update was successful
}
module.exports={fetchAllAssignments,rejectAssignment,acceptAssignment};
const express=require('express');
const { uploadAssignment, fetchAllAdmins, fetchAllUserAssignments } = require('../controllers/userHomeController');
const { fetchAllAssignments, rejectAssignment, acceptAssignment } = require('../controllers/adminHomeController');
const {protect,admin} = require('../middleware/authMiddleware');
const router=express.Router();

// User routes
router.post("/user/upload",protect,uploadAssignment); //upload assignment
router.get("/user/admins",protect,fetchAllAdmins); // fetch Admins
router.get("/user",protect,fetchAllUserAssignments); //(optional) fetch logged in user's assignments

//Admin routes
router.get("/admin/assignments",protect,admin,fetchAllAssignments); // fetch assignments tagged to the currently logged in admin
router.post("/admin/assignments/:id/reject",protect,admin,rejectAssignment); // Admin operation : Reject
router.post("/admin/assignments/:id/approve",protect,admin,acceptAssignment); // Admin operation : Accept
module.exports=router;
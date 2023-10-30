const express = require("express");
const { registerUser, loginUser, logoutUser, 
       forgotPassword, resetPassword, getUserDetails, 
       updatePassword, updateProfile, getAllUser, getSingleUser, 
       updateRole, deleteUser } = require("../controllers/userController");
const router=express.Router();
const {IsAuthenticateduser,authorizeRoles}=require("../middleware/auth");
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(IsAuthenticateduser,getUserDetails);
router.route("/password/update").put(IsAuthenticateduser,updatePassword);
router.route("/me/update").put(IsAuthenticateduser,updateProfile);
router.route("/admin/users").get(IsAuthenticateduser,authorizeRoles("admin"),getAllUser);
router.route("/admin/user/:id").get(IsAuthenticateduser,authorizeRoles("admin"),getSingleUser)
                            .put(IsAuthenticateduser,authorizeRoles("admin"),updateRole)
                            .delete(IsAuthenticateduser,authorizeRoles("admin"),deleteUser);
router.route("/logout").get(logoutUser);
module.exports=router;
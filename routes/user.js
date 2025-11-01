const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveREdirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js");

router.get("/signup",(req,res)=>{
    res.render("./user/signup.ejs");
})

router.post("/signup",wrapAsync(usercontroller.signInUser));

router.route("/login")
.get((req,res)=>{
    res.render("./user/login.ejs");
})
.post(saveREdirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),usercontroller.loginuser);

router.get("/logout",usercontroller.logoutUser);

module.exports = router;

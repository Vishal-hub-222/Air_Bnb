const User = require("../models/user")
module.exports.signInUser= async(req,res,next)=>{
  try{  let{username,email,password}=req.body;
    const newuser = new User({email,username});
    const registeredUser=await User.register(newuser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err)
        {
          return  next(err);
        }
        req.flash("success","successful loged in ..")
        res.redirect("/listings");
    })}
    catch(e)
    {
     req.flash("error",e.message);
     res.redirect("/signup");
    }
};

module.exports.loginuser=async(req,res)=>{
    req.flash("success","successfull logedin");
    const redirecturl= res.locals.redirectUrl || "/listings" ;
     res.redirect(redirecturl);
};

module.exports.logoutUser =(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
        }
        req.flash("success","you are logged out ");
        res.redirect("/listings");
    })
};
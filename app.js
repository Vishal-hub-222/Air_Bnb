if(process.env.MODE_ENV !== "production")
{
    require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose =require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const listingsRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/rating.js");
const userRoute=require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

main().then(()=>{
    console.log("mongoose connected...");
})
.catch((err)=>{
    console.log(err);
})
async function main() {
   await  mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//connect cookies

app.use(session({secret :"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/",(req,res)=>{
//     console.log(req.session);
//     res.send("hi ,I am root");
// })
app.use((req,res,next)=>{
     res.locals.success=req.flash("success");
     res.locals.error=req.flash("error");
     res.locals.CurrrentUser=req.user;
     next();
})

app.use("/listings",listingsRoute);
app.use("/listings/:id",reviewRoute);
app.use("/",userRoute)

//review route


app.use((err,req,res,next)=>
{
   
   res.render("./listing/error.ejs",{err});
});

app.listen(3000,()=>
{
    console.log("you connection is connected on port 3000....");
})
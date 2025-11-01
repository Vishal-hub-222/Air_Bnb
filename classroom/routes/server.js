const express=require("express");
const app= express();
const path=require("path");
const session = require("express-session");
const flash = require("connect-flash");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(flash());
app.use(session({
    secret : "mysupersecretstring",
    resave:false,
    saveUninitialized:true
}));

app.get("/test",(req,res)=>
{
  let{name="anonumas"}=req.query;
  req.session.name=name;
  req.flash("seccess","user seccessfuly !");
  res.redirect("/hello");
   
}
);

app.get("/hello",(req,res)=>{

    res.render("r.ejs",{name:req.session.name,mass:req.flash("seccess")});

})

app.listen(3000,()=>{
    console.log("server connected on 3000 port ");
})
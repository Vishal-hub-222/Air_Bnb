const express=require("express");
const app=express();
const mongoose =require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const listings=require("./routes/listing.js");
const review=require("./routes/rating.js")
main().then(()=>{
    console.log("mongoose connected...")
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


app.use("/listings",listings);
app.use("/listings/:id",review);
//review route


app.use((err,req,res,next)=>
{
   
   res.render("./listing/error.ejs",{err});
});

app.listen(3000,()=>
{
    console.log("you connection is connected on port 3000....");
})
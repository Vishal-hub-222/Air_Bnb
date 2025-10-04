const express=require("express");
const app=express();
const Listing=require("./models/listing.js");
const mongoose =require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");

main().then(()=>{
    console.log("mongoose connected...")
})
.catch((err)=>{
    console.log(ere);
})
async function main() {
   await  mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
const methodOverride = require("method-override");
const { arrayBuffer } = require("stream/consumers");
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.get("/",(req,res)=>{
    res.redirect("/listings");
})

// app.get("/testJisting",async (req,res)=>{
//     let sampleListing = new Listing(
//     {
//         title:"My Home",
//         description:"By the beach",
//         price : 1200,
//         location:"delhi",
//         country:"india"
//     }
//     )
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful test...");
// });
app.get("/listings",async (req,res)=>{
   const allListing=await Listing.find({});
   res.render("./listing/index.ejs",{allListing});
});
app.get("/listings/new",(req,res)=>{
res.render("./listing/new.ejs");
});
app.get("/listings/:id",async(req,res)=>
{
    const {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("./listing/show.ejs",{listing});
})
app.post("/listings/new",async(req, res)=>{
   const newlisting=new Listing(req.body);
   newlisting.save();
   res.redirect("/listings");
})
app.get("/listings/:id/edit", async (req, res)=>
{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    res.render("./listing/edit.ejs",{listing});
})

app.put("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id, req.body, { new: true });
   res.redirect(`/listings/${id}`);
})
app.delete("/listings/:id/delete",async(req,res)=>
{
  let {id}=req.params;
 await Listing.findByIdAndDelete(id);
res.redirect("/listings");
})

app.listen(3000,()=>
{
    console.log("you connection is connected on port 3000....");
})
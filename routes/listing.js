const express=require("express");
const router=express.Router();
const path=require("path");
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError =require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const vailidateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
  if(error)
  {
    let ermag=error.details.map((el)=> el.message).join(",")

    throw new ExpressError(400,ermag);
  }
  else{
    next();
  }
};
// listings
router.get("/",wrapAsync(async (req,res)=>{
   const allListing=await Listing.find({});
   res.render("./listing/index.ejs",{allListing});
} ));

 //new routr

router.get("/new",(req,res)=>{
res.render("./listing/new.ejs");
});

// show route

router.get("/:id", wrapAsync(async(req,res)=>
{
    const {id}=req.params;
   const listing=await Listing.findById(id).populate("reviews");
   res.render("./listing/show.ejs",{listing});
} ))

//add route

router.post("/new",vailidateListing,wrapAsync(async(req, res,next)=>{
  
        const newlisting=new Listing(req.body.listing);

  await newlisting.save();
   res.redirect("/listings");
   
   //edit route
   
}));
router.get("/:id/edit", wrapAsync(async (req, res)=>
{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    res.render("./listing/edit.ejs",{listing});
} ))

//update raute
router.put("/:id/edit",wrapAsync(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id, req.body, { new: true });
   res.redirect(`/listings/${id}`);
}));

//delete route

router.delete("/:id/delete",wrapAsync(async(req,res)=>
{
  let {id}=req.params;
 await Listing.findByIdAndDelete(id);
res.redirect("/listings");
}));


module.exports=router;
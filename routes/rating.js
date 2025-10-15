const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError =require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require("../models/rating.js");
const Listing=require("../models/listing.js");

const vailidateRating=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
  if(error)
  {
    let ermag=error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400,ermag);
  }
  else{
    next();
  }
};

//create review 

router.post("/review",vailidateRating,wrapAsync(async(req,res)=>
{
  const listing= await Listing.findById(req.params.id)
 const review=new Review(req.body.review);
 listing.reviews.push(review);
 await review.save();
 await listing.save();
 res.redirect(`/listings/${listing.id}`)
}));

//delete review
router.delete("/delete/:reviewid",wrapAsync( async(req,res)=>
{
  let{id,reviewid}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
   await Review.findByIdAndDelete(reviewid);
 res.redirect(`/listings/${id}`);
}));

module.exports=router;
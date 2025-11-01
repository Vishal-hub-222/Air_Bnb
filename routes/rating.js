const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError =require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require("../models/rating.js");
const Listing=require("../models/listing.js");
const {islogedin, isReviwAuthor }=require("../middleware.js")

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
const createReview = require("../controllers/reviews.js");
//create review 

router.post("/review",islogedin,vailidateRating,wrapAsync(createReview.Createreview));

//delete review
router.delete("/delete/:reviewid",islogedin,isReviwAuthor,wrapAsync(createReview.deleteReview ));

module.exports=router;
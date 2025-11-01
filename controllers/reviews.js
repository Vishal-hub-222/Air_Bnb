const { model } = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/rating.js");

module.exports.Createreview = async(req,res)=>
{
  const listing= await Listing.findById(req.params.id)
 const review=new Review(req.body.review);
 review.author = req.user._id;
 listing.reviews.push(review);
 await review.save();
 await listing.save();
 req.flash("success"," add new review");
 res.redirect(`/listings/${listing.id}`)
};

module.exports.deleteReview = async(req,res)=>
{
  let{id,reviewid}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
   await Review.findByIdAndDelete(reviewid);
   req.flash("success"," deleted review");
 res.redirect(`/listings/${id}`);
};
const Listing=require("./models/listing");
const Review = require("./models/rating");
const islogedin=(req,res,next)=>
{

     if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be loged in to create listing..");
    return res.redirect("/login");
  }
  next();
}

const saveREdirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl=req.session.redirectUrl
  }
  next();
}

let isOwner =async (req,res, next)=>{
   let {id}=req.params;
    let listing = await Listing.findById(id);
   if(!listing.owner._id.equals(res.locals.CurrrentUser._id))
  {
    req.flash("error", "you don't have permission to edit");
   return  res.redirect(`/listings/${id}`);
  }
  next();
}
let isReviwAuthor=async (req,res, next)=>{
   let {id,reviewid}=req.params;
    let review = await Review.findById(reviewid);
   if(!review.author._id.equals(res.locals.CurrrentUser._id))
  {
    req.flash("error", "you don't author of this review");
   return  res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports={islogedin ,saveREdirectUrl,isOwner,isReviwAuthor};
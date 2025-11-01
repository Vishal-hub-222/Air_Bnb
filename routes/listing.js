
const express=require("express");
const router=express.Router();
const path=require("path");
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError =require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {islogedin, isOwner }=require("../middleware.js")
const multer = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

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
const listingController = require("../controllers/listings.js");

router.route("/new")
.get(islogedin, listingController.renderNewForm)
.post(islogedin,upload.single('listing[image]'),vailidateListing,
  wrapAsync(listingController.AddListing));

// listings
router.get("/",wrapAsync(listingController.index));


router.get("/:id", wrapAsync(listingController.showTheListing ));

//edit route
router.route("/:id/edit")
   .get(islogedin, wrapAsync(listingController.editlisting ))
    .put(islogedin,isOwner,wrapAsync(listingController.Updatalisting));

//delete route

router.delete("/:id/delete",islogedin,isOwner,wrapAsync(listingController.deletelisting));


module.exports=router;
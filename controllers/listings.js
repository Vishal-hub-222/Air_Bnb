const Listing = require("../models/listing");

const categories = ["Trending","Room","Iconic Cities","Mountains","Castles","Amazing Pools","Camping","Boats"];

module.exports.index = async (req, res) => {
  const { search } = req.query;
  let allListing;

  if (search === "Trending") {
    allListing = await Listing.find({})
      .sort({ createdAt: -1 })
      .limit(7);
  } 
  // If search matches a category
  else if (categories.includes(search)) {
    allListing = await Listing.find({ category: search });
  } 
  // Otherwise search by title/location
  else if (search) {
    allListing = await Listing.find({
      $or: [
        { location: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } }
      ]
    });
  } 
  else {
    allListing = await Listing.find({});
  }

  res.render("listing/index.ejs", { allListing });
};

module.exports.renderNewForm = (req,res)=>{
res.render("./listing/new.ejs");
};


//show route

module.exports.showTheListing = async(req,res)=>
{
    const {id}=req.params;
   const listing=await Listing.findById(id)
   .populate({path: "reviews",
    populate :{
      path:"author",
    },
   })
   .populate("owner");
   if(!listing)
   {
    req.flash("error","your listing does not exist sorry");
   return res.redirect("/listings");
   }
  
   res.render("./listing/show.ejs",{listing});
};

// add route

module.exports.AddListing = async(req, res,next)=>{
  console.log("vishal ji categoru",req.body);
  let url = req.file.path;
  let filename= req.file.filename;
  
   const newlisting=new Listing(req.body.listing);
   newlisting.owner = req.user._id;
   newlisting.image = {url, filename};
    await newlisting.save();
    req.flash("success"," new listing is save");
   res.redirect("/listings");
};
//edit route

module.exports.editlisting = async (req, res)=>
{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing){
      req.flash("error","listing you requsted for does not exist");
      res.redirect("/listings");
    }
   let originaImage= listing.image.url;
   originaImage.replace("/upload","/upload/h_300,w_250");
    res.render("./listing/edit.ejs",{listing,originaImage});
};
//update route
module.exports.Updatalisting= async(req,res)=>{
  let {id}=req.params;
 let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing }, { new: true });
 if( typeof req.file !== "undefined")
 {
   let url = req.file.path;
  let filename= req.file.filename;
  listing.image = {url, filename};
  await listing.save();
 }
 
  req.flash("success","listing updeted");
   res.redirect(`/listings/${id}`);
};

module.exports.deletelisting =async(req,res)=>
{
  let {id}=req.params;
 await Listing.findByIdAndDelete(id);
 req.flash("success"," listing deleted");
res.redirect("/listings");
};
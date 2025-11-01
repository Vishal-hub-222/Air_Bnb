const Listing = require("../models/listing");


module.exports.index = async (req,res) =>{
const allListing = await Listing.find({});
res.render("listing/index.ejs",{allListing});
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
    res.render("./listing/edit.ejs",{listing});
};
//update route
module.exports.Updatalisting= async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id, req.body, { new: true });
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
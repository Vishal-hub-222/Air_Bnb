const express=require("express");
const app=express();
const Listing=require("./models/listing.js");
const mongoose =require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError =require("./utils/ExpressError.js");
const Rating=require("./models/rating.js");
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
const methodOverride = require("method-override");
const { arrayBuffer } = require("stream/consumers");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/rating.js");
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


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
app.get("/listings",wrapAsync(async (req,res)=>{
   const allListing=await Listing.find({});
   res.render("./listing/index.ejs",{allListing});
} ));

app.get("/listings/new",(req,res)=>{
res.render("./listing/new.ejs");
});

// show route

app.get("/listings/:id", wrapAsync(async(req,res)=>
{
    const {id}=req.params;
   const listing=await Listing.findById(id).populate("reviews");
   res.render("./listing/show.ejs",{listing});
} ))
app.post("/listings/new",vailidateListing,wrapAsync(async(req, res,next)=>{
  
        const newlisting=new Listing(req.body.listing);

  await newlisting.save();
   res.redirect("/listings");
   
   
}));
app.get("/listings/:id/edit", wrapAsync(async (req, res)=>
{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    res.render("./listing/edit.ejs",{listing});
} ))

app.put("/listings/:id/edit",wrapAsync(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id, req.body, { new: true });
   res.redirect(`/listings/${id}`);
}));
app.delete("/listings/:id/delete",wrapAsync(async(req,res)=>
{
  let {id}=req.params;
 await Listing.findByIdAndDelete(id);
res.redirect("/listings");
}));


//review route

app.post("/listings/:id/review",vailidateRating,wrapAsync(async(req,res)=>
{
  const listing= await Listing.findById(req.params.id)
 const review=new Review(req.body.review);
 listing.reviews.push(review);
 await review.save();
 await listing.save();
 res.redirect(`/listings/${listing.id}`)
}));

//delete route
app.delete("/listings/:id/delete/:reviewid", async(req,res)=>
{
  let{id,reviewid}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
   await Review.findByIdAndDelete(reviewid);
 res.redirect(`/listings/${id}`);
})
app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found ..."));
})
 
app.use((err,req,res,next)=>
{
   
   res.render("./listing/error.ejs",{err});
});

app.listen(3000,()=>
{
    console.log("you connection is connected on port 3000....");
})
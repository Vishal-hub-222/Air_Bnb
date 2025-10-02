const mongoose=require("mongoose");
const schema=mongoose.Schema;

const ListingSchema=new schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/silhouette-of-man-on-beach-boIJluEJEPM",
        set :(v) => v==="https://unsplash.com/photos/silhouette-of-man-on-beach-boIJluEJEPM" ? "default link" : v,
    },
    price:String,
    location:String,
    country:String,
});

const Listing= mongoose.model("listing",ListingSchema);
module.exports = Listing;
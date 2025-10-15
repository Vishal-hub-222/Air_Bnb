
const mongoose=require("mongoose");
const schema=mongoose.Schema;


const ratingSchema= new schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createAt:{
        type:Date,
        default:Date.now()
    }

});

const Review= mongoose.model("Review",ratingSchema);

module.exports = Review;
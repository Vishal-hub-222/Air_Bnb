
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
    },
    author: {
        type :schema.Types.ObjectId,
        ref:"User"
    }

});

const Review= mongoose.model("Review",ratingSchema);

module.exports = Review;
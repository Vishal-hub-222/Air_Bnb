const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportlocalMngoose = require("passport-local-mongoose");
const userSchema = new schema({
    email:{
        type:String,
        required:true,
    },
});

userSchema.plugin(passportlocalMngoose);
module.exports = mongoose.model("User", userSchema);
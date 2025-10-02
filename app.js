const express=require("express");
const app=express();
const Listing=require("./models/listing.js");
const mongoose =require("mongoose");
main().then(()=>{
    console.log("mongoose connected...")
})
.catch((err)=>{
    console.log(ere);
})
async function main() {
   await  mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}


app.get("/",(req,res)=>{
    res.send(" hey buddy i am vishal....");
})

app.get("/testJisting",async (req,res)=>{
    let sampleListing = new Listing(
    {
        title:"My Home",
        description:"By the beach",
        price : 1200,
        location:"delhi",
        country:"india"
    }
    )
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful test...");
});

app.listen(3000,()=>
{
    console.log("you connection is connected on port 3000....");
})
const mongoose=require("mongoose");
let initData=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{
    console.log("connection successful...");
})
.catch((err)=>{
console.log("error",err);
})
async function main(params) {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


const initDB = async () => {
  await Listing.deleteMany({});
  initData= initData.data.map((obj)=>( {...obj,owner:'68f5dce287a43f6c6658ec3f' }));
  await Listing.insertMany(initData);
  console.log("data was initialized");
};

initDB();
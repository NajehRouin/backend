const mongoose = require("mongoose");

const URI = process.env.UrlDbConnection;
mongoose.set("strictQuery", true);

exports.connectToDatabase=async()=>{
    try {
        await mongoose.connect(URI, {
          
           
        });
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("MongoDB connection error:", error.message);
      }
}
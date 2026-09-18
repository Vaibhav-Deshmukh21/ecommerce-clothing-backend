import mongoose from "mongoose";
const connectDb=async() => {
try{
await mongoose.connect(process.env.MONGODB_URL)
console.log("Db connected");
  console.log("Db connected");
        console.log("Database:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);

}
catch (error){
console.log("Db error",error);

}
}
export default connectDb;
 import mongoose from "mongoose"

 const orderSchema=new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Make sure your User model is named "User"
    required: true,
  },
     items:{
        type:Array,
        required:true
     },
     amount:{
        type:Number,
        required:true
     },
     address:{
        type:Object,
        required:true
     },
     
     paymentMethod:{
        type:String,
        required:true
     },
     payment:{
        type:Boolean,
        required:true,
        default:false
     },
     date:{
        type:Number,
        required:true
     },
     status:{
  type:String,
  enum:[
    "Order Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ],
  default:"Order Placed"
}
 },{timestamps:true});


 const Order=mongoose.model("order",orderSchema);

 export default Order;
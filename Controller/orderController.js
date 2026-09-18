import Order from "../model/orderModel.js";
import productModel from "../model/productModel.js";
import User from "../model/usermodel.js";

export const placeOrder = async (req, res) => {

  try {

    const { items, amount, address } = req.body;
    const userId = req.userId;
    // 🔹 CHECK AND UPDATE PRODUCT STOCK
    for (let item of items) {

      const product = await productModel.findById(item._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`
        });
      }

      // reduce stock
      product.stock -= item.quantity;
console.log("Saving order for user:", userId);
      await product.save();
    }

    // 🔹 CREATE ORDER
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    console.log("ORDER DATA:", orderData);

const newOrder = new Order(orderData);

console.log("Saving order...");

await newOrder.save();

console.log("ORDER SAVED:", newOrder);
    // const newOrder = new Order(orderData);

    // await newOrder.save();

console.log("Saving order for user:", userId);

    // 🔹 CLEAR USER CART
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order place error"
    });

  }

};


export const userorder = async (req, res) => {
  try {

    const userId = req.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    console.log(orders);

    return res.status(200).json({
      success: true,
      orders: orders
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Users Order error"
    });

  }
};


export const trackOrder = async (req,res)=>{
  try{

    const {id} = req.params

    const order = await Order.findById(id)

    if(!order){
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
    }

    res.status(200).json({
      success:true,
      order
    })

  }catch(error){

    console.log(error)

    res.status(500).json({
      success:false,
      message:"Track order error"
    })

  }
}


export const updateOrderStatus = async (req,res)=>{
  try{

    const {orderId,status} = req.body

    await Order.findByIdAndUpdate(orderId,{status})

    res.json({
      success:true,
      message:"Order status updated"
    })

  }catch(error){

    console.log(error)

    res.json({
      success:false,
      message:"Update failed"
    })

  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
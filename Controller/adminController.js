// // // controllers/adminController.js
// // import User from "../model/usermodel.js";
// // import Order from "../model/orderModel.js";

// // export const getDashboardStats = async (req, res) => {
// //   try {
// //     const usersCount = await User.countDocuments();
// //     const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
// //     const ordersCount = await Order.countDocuments();
// //     const revenue = await Order.aggregate([
// //       { $group: { _id: null, total: { $sum: "$amount" } } },
// //     ]);

// //     const latestOrders = orders.map((order) => ({
// //       _id: order._id,
// //       userName: order.userId, // or populate with username
// //       amount: order.amount,
// //       status: order.status,
// //       date: order.date,
// //     }));

// //     res.json({
// //       success: true,
// //       stats: {
// //         users: usersCount,
// //         orders: ordersCount,
// //         revenue: revenue[0]?.total || 0,
// //         latestOrders,
// //       },
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };




// import User from "../model/usermodel.js";
// import Order from "../model/orderModel.js";

// export const getDashboardStats = async (req, res) => {
//   try {
//     const usersCount = await User.countDocuments();

//     // Populate userId with username here
//     const orders = await Order.find()
//       .populate("userId", "username")  // <--- populate username from user
//       .sort({ createdAt: -1 })
//       .limit(5);

//     const ordersCount = await Order.countDocuments();

//     const revenue = await Order.aggregate([
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);

//     const latestOrders = orders.map((order) => ({
//       _id: order._id,
//       userName: order.userId?.username || "Unknown",  // get username from populated userId
//       amount: order.amount,
//       status: order.status,
//       date: order.date,
//     }));

//     res.json({
//       success: true,
//       stats: {
//         users: usersCount,
//         orders: ordersCount,
//         revenue: revenue[0]?.total || 0,
//         latestOrders,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

import Order from "../model/orderModel.js";
import User from "../model/usermodel.js";
import uploadOnCloudinary from "../Config/cloudinary.js";
export const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const ordersCount = await Order.countDocuments();
    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const latestOrders = orders.map((order) => ({
      _id: order._id,
      userName: order.address
        ? `${order.address.firstName} ${order.address.lastName}`
        : "Unknown",
      amount: order.amount,
      status: order.status,
      date: order.date,
    }));

    res.json({
      success: true,
      stats: {
        users: usersCount,
        orders: ordersCount,
        revenue: revenue[0]?.total || 0,
        latestOrders,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ================= ADMIN PROFILE =================
export const getAdminProfile = async (req, res) => {
  try {

    const admin = await User.findOne({ email: req.adminEmail }).select("-password");

    if (!admin) {
      return res.status(404).json({
        success:false,
        message:"Admin not found"
      });
    }

    res.json({
      success:true,
      admin
    });

  } catch (err) {

    console.log("Profile Error:", err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};



// ================= UPDATE PROFILE =================
export const updateAdminProfile = async (req, res) => {
  try {

    const { name, email, phone } = req.body;

    const admin = await User.findOne({ email: req.adminEmail });

    if (!admin) {
      return res.status(404).json({
        success:false,
        message:"Admin not found"
      });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;

    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      admin.profilePic = imageUrl;
    }

    await admin.save();

    res.json({
      success:true,
      admin
    });

  } catch (err) {

    console.log("Update Profile Error:", err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};



// ================= CHANGE PASSWORD =================
export const changeAdminPassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    const admin = await User.findOne({ email: req.adminEmail });

    if (!admin) {
      return res.status(404).json({
        success:false,
        message:"Admin not found"
      });
    }

    const isMatch = await admin.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success:false,
        message:"Old password incorrect"
      });
    }

    admin.password = newPassword;

    await admin.save();

    res.json({
      success:true,
      message:"Password updated successfully"
    });

  } catch (err) {

    console.log("Password Error:", err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};



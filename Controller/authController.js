import User from "../model/usermodel.js";  // Import User model (MongoDB schema)
import validator from "validator";         // To validate email format
import bcrypt from "bcryptjs";             // To hash and compare passwords
import { genToken, genToken1 } from "../Config/token.js";  // Function to generate JWT token


// ================= REGISTER CONTROLLER =================
export const registeration = async (req, res) => {
    try { 
        // Get data from request body
        const { name, email, password } = req.body;

        // Check if user already exists
        const exituser = await User.findOne({ email });
        if (exituser) {
            return res.status(400).json({ massage: "User Already Exits" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ massage: "Enter Valid Email" });
        }

        // Check password length
        if (password.length < 8) {
            return res.status(400).json({ massage: "Enter a Strong PassWord" });
        }

        // Hash password before saving to database
        let hashpassword = await bcrypt.hash(password, 10);

        // Create new user in database
        const user = await User.create({ name, email, password: hashpassword });

        // Generate JWT token
        let userToken = await genToken(user._id);

        // Store token in cookie
        res.cookie("userToken", userToken, {
            httpOnly: true,   // Cannot access cookie from frontend JS
            secure: true,     // Only works on HTTPS (production)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  // Cookie valid for 7 days
        });

        // Send created user as response
        return res.status(201).json({
          message:"registeration successfully",
          user:user
        });
    }

    catch (error) {
        console.log("registeration Error");
        return res.status(500).json({ massage: `registeration Error ${error}` });
    }
};


// ================= LOGIN CONTROLLER =================
export const login = async (req, res) => {
    try {
        // Get email and password from request
        const { email, password } = req.body;

        // Find user in database
        const user = await User.findOne({ email });

        // If user not found
        if (!user) {
            return res.status(404).json({ massage: "User not Found" });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If password incorrect
        if (!isMatch) {
            return res.status(400).json({ massage: "Incorrect Password" });
        }

        // Generate JWT token
        let userToken = await genToken(user._id);

        // Store token in cookie
        res.cookie("userToken", userToken, {
            httpOnly: true,
            secure: false,   // Use false in development (localhost)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send user data as response
        return res.status(201).json(user);
    }

    catch (error) {
        console.log("Login Error", error);
        return res.status(500).json({ massage: "Login Error" });
    }
}; 

// export const logOut = async (req, res) => {
//   try {
//     /**
//      * For localhost, do NOT set the domain when clearing cookie.
//      * Setting domain=localhost prevents the cookie from being cleared in most browsers.
//      * We clear cookie for path="/" to cover both user and admin tokens
//      */

//     res.clearCookie("userToken", {
//       httpOnly: true,
//       sameSite: "lax",
//       path: "/", // covers all routes including /admin
//       // domain: "localhost" <-- REMOVE for localhost
//     });

//     return res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: `Logout error: ${error.message}` });
//   }
// };


export const userLogout = async (req, res) => {
  try {

    res.clearCookie("userToken", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const adminLogout = async (req, res) => {
  try {

    res.clearCookie("adminToken", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Admin logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GOOGLE LOGIN CONTROLLER =================

export const googleSignin=async(req,res)=>{
try{
let {name ,email}=req.body;
 // Find user in database
        let user = await User.findOne({ email });

        // If user not found
        if (!user) {
           user=await User.create({name,email})
        }

        // Generate JWT token
        let userToken = await genToken(user._id);

        // Store token in cookie
       res.cookie("userToken", userToken, {
  httpOnly: true,
  secure: false,   // localhost HTTP
  sameSite: "lax", // important
  maxAge: 24 * 60 * 60 * 1000
});
        // Send user data as response
        return res.status(200).json(user);
    
}
catch(error){
    console.log("Google Login error");
    
return res.status(500).json({massage:`Google Login  error ${error}`})
}
}


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (
      email.trim() === process.env.ADMIN_EMAIL.trim() &&
      password.trim() === process.env.ADMIN_PASSWORD.trim()
    ) {
      const adminToken = await genToken1(email);

  res.cookie("adminToken", adminToken, {
  httpOnly: true,
  secure: false,        // must be false for HTTP localhost
  sameSite: "lax",      // allows cross-site dev on localhost
  maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
});

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    console.log("Admin login error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
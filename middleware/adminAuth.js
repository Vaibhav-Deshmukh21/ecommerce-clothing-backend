import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const tokan = req.cookies.adminToken// get token from cookie
    if (!tokan) {
      return res.status(401).json({ message: "Not authorized. Login again." });
    }

    const decoded = jwt.verify(tokan, process.env.JWT_SECRET);

    // Only allow admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied. Not admin." });
    }

    req.adminEmail = decoded.email; // attach admin email to request
    next();
  } catch (error) {
    console.log("Admin Auth Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default adminAuth;





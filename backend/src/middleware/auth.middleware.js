import User from "../models/users.model.js";
import jwt from "jsonwebtoken";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies?.jwt;
    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error);
    res.status(400).json({ error, message: "Bad request" });
  }
}

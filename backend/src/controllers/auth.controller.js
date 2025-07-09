import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateJWT.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

//

//

export const signup = async (req, res) => {
  const { name, password, email } = req?.body;
  try {
    if (!name || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Passwoord must be at least 6 charaters" });
    }

    const user = await User.findOne({ email }).select("-password");
    if (user) return res.status(400).json({ message: "User already exist!!" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, password: hashPassword, email });

    if (newUser) {
      //generate JWT
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          profileImage: newUser.profileImage,
        },
        statusText: "User created successfully",
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//

//

export const login = async function (req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(500).json({ message: "All fields are required" });
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json("Invalid credentials");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json("Incorrect password");
    generateToken(user._id, res);
    res.status(200).json({ message: "login successfull" });
  } catch (error) {
    console.log(error);
    res.json({ error, message: "bad request" });
  }
};

//

//

export const logout = (req, res) => {
  // Clear the JWT cookie
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  // Optionally, you can also clear other session-related cookies if needed
  // res.clearCookie("otherCookieName");
  res.status(200).end();
  console.log("loged out successfully");
};

//

//

export const getProfile = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const tokenHolder = jwt.verify(
      token,
      process.env.SECRETE_KEY_JWT,
      function (err, decoded) {
        if (err) {
          console.log("Error at getProfile:", err);
          return res.status(401).json({ message: "Invalid token" });
        }
        return decoded?.id;
      }
    );
    const user = await User.findOne({ _id: tokenHolder }).select(
      "-password -_id"
    );
    res.status(200).json({ user });
  } catch (error) {
    // console.log(error);
    res.json({ error });
  }
};

//

//

export const updateProfile = async (req, res) => {
  try {
    const { profileImage } = req.body;
    const cloudinaryImageUrl = await cloudinary.uploader.upload(profileImage);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: cloudinaryImageUrl.secure_url },
      { new: true }
    ).select("-password -_id");
    res
      .status(200)
      .json({ updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Internal Server Error" });
  }
};

//

//

export async function checkAuth(req, res) {
  try {
    res.status(200).json({
      user: req.user,
      message: "User is authenticated",
    });
  } catch (error) {
    console.log("Error in auth check controller : " + error?.message);
    res.status(401).json({
      error: error.message,
      message: "User is not authenticated",
    });
  }
}

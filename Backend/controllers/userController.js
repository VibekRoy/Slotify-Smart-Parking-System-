import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const protectedRoute = async (req, res, next) => {
  const token = req.headers?.cookie
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith("token="));

  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized Access or Login First" });

  try {
    if (token) {
      const decoded = jwt.verify(
        token.split("=")[1],
        process.env.USER_SECRET_KEY
      );
      req.user = decoded;
      next();
    } else
      return res.status(401).json({ message: "Token expired or Login First" });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token Expired. Refresh or generate new Token" });
  }
};

export const checkExisting = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ message: "User already exists. Please log in." });
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json(`Registration Successful`);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        const token = jwt.sign(
          { email, password, userId: user._id },
          process.env.USER_SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );

        res
          .cookie("token", token,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
          })
          .status(200)
          .json({
            message: "Logged In Successfully",
            user: user.name,
            userID: user._id,
          });
      } else {
        res.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ message: "User doesn't exist. Register First" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("token", { path: "/" })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

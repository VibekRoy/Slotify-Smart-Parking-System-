import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const existingAdmin = await Admin.findOne({ username });

  if (existingAdmin) {
    const checkPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (checkPassword) {
      console.log(process.env.ADMIN_SECRET_KEY);
      
      const token = jwt.sign(
        existingAdmin.username,
        process.env.ADMIN_SECRET_KEY
      );

      res
        .cookie("AdminToken", token, {
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        .status(200)
        .json({ message: "Admin Login Successful" });
    } else {
      res
        .status(401)
        .cookie("AdminToken", "", { expires: new Date(Date.now()) })
        .json({ message: "Incorrect Admin Password" });
    }
  } else {
    res
      .status(404)
      .json({ message: "Admin not found. Contact your administrator." });
  }
};

export const verifyAdmin = async (req, res, next) => {
  const AdminToken = req.headers.cookie
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith("AdminToken="));

  if (AdminToken) {
    const compareToken = jwt.verify(
      AdminToken.split("=")[1],
      process.env.ADMIN_SECRET_KEY
    );
    if (compareToken) next();
    else
      res
        .status(401)
        .json({ message: "Unauthorized Access to Protected Route" });
  } else {
    res.status(404).json({ message: "Admin Login First." });
  }
};

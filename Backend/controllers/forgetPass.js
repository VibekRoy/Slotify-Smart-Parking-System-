import User from "../models/User";

export const forgetPassword = (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  if (user) {

  } else {
    return res.status(400).json(`User doesn't exist`);
  }
};

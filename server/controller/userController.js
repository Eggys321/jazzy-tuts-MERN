const USER = require("../model/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../helpers/sendMail");
const crypto = require('crypto');

// registration ftn

const registration = async (req, res) => {
  const { firstname, lastname, email, phonenumber, password, verifypassword } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phonenumber ||
    !password ||
    !verifypassword
  ) {
    res
      .status(400)
      .json({ success: false, message: "all fields are required to register" });
    return;
  }
  if (password !== verifypassword) {
    res
      .status(400)
      .json({
        success: false,
        message: "password and verifypassword must be same",
      });
    return;
  }
  try {
    const user = await USER.create({ ...req.body });
    res
      .status(201)
      .json({ success: true, message: "registration successfull", user });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(404)
        .json({ success: false, message: "Email address already in use" });
      return;
    }
    console.log(error.message);
    res.status(500).send(error);
  }
};

// login ftn
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "all fields are required to login" });
    return;
  }
  try {
    // finding a registered email address and validating email
    const user = await USER.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "wrong credentials" });
      return;
    }
    // comparing password and validating password
    const auth = await user.comparePassword(password);
    if (!auth) {
      res.status(404).json({ success: false, message: "wrong credentials" });
      return;
    }
    // token
    const token = await user.generateToken();
    if (token) {
      res.status(201).json({
        success: true,
        message: "logged in",
        user: {
          firstname: user.firstname,
          email: user.email,
          token,
        },
      });
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// logout ftn
const logout = async (req, res) => {
  res.status(200).json({ token: "", message: "logged out successfully" });
};

// get user's name ftn
const getUserName = async (req, res) => {
  const { userId } = req.user;
  const user = await USER.findOne({ _id: userId });
  res.status(200).json({ success: true, firstname: user.firstname });
};
// isLoggedIn ftn

const isLoggedIn = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.json(false);
    }
    jwt.verify(token, process.env.JWT_SECRETE);
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.json(false);
  }
};

// forgot password ftn
const forgotPassword = async (req, res,next) => {
  const { email } = req.body;
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "email not sent" });
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `https://jazzy-tuts-mern.vercel.app/password/${resetToken}`;
    const message = `<h1>You have requested for a password reset </h1> <p>Please go to this link to reset your password</p> <a href=${resetUrl} clicktracking = off> ${resetUrl} </a> `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Rest Request",
        text: message,
      });
      res.status(200).json({success:true,data:"Email sent"})
    } catch (error) {
      user.getResetPasswordToken = undefined;
      user.getResetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ message: "Email couldnt be sent", error });
    }
  } catch (error) {
    res.json(error.message);
  }
};

// reset password ftn
const resetPassword = async (req,res)=>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
  try {
    const user = await USER.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()}
      // resetPasswordExpire:{$gt:Date('2024-12-20')}

    })
    if(!user){
      return res.status(400).json({status:false,message:"invalid Reset Token"})
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({success:true,message:"Password Reset Successfull"})
    
  } catch (error) {
    res.status(500).json(error.message)
    
  }
}
module.exports = {
  registration,
  login,
  logout,
  getUserName,
  isLoggedIn,
  forgotPassword,
  resetPassword
};

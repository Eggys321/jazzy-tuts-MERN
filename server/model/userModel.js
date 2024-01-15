const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: [true, "Email already in use"],
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    phonenumber: {
      type: String,
      trim: true,
      required: [true, "Please enter a phone number"],
      minlength: [10, "Minimum length must be 10"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter a valid password"],
      minlength: [8, "Minimum password length must be 8 characters"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password mus'nt contain password");
        }
      },
    },

    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// password comparison
userSchema.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);
  return isCorrect;
};

// generate token
userSchema.methods.generateToken = async function (params) {
  let token = jwt.sign({ userId: this._id }, process.env.JWT_SECRETE);
  return token;
};

// generating token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const USER = mongoose.model("user", userSchema);
module.exports = USER;

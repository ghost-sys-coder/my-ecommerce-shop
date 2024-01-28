import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import {sendEmailVerification, sendResetToken} from "../middleware/sendEmailVerification.js";
import { createToken, maxAge } from "../utils/token.js";

/**
 * ! Register new User
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      verificationToken: crypto.randomBytes(20).toString("hex"),
    });

    /** send email verification */
    await sendEmailVerification(email, user.verificationToken);

    return res.status(200).json({ message: "User Registered!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ? Verify user token
 */
const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;

    /** find user with the given verification token and update the token */

    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { $set: { verified: true, verificationToken: "" } },
      { new: true, multi: true }
    );

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    return res.status(200).json({ message: "User has been verified!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * ! Login existing user
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    /** create token */
    const token = await createToken(
      user._id,
      user.email,
      user.name,
      user.Admin
    );
    res.cookie("authToken", token, {
      maxAge: maxAge * 1000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    let err = error.message;
    if (err === "Wrong password!") {
      return res.status(401).json({error: 'Provide a valid password!'})
    } else if (err === "Email is not verified! Check your mailbox for a verification link!") {
      return res.status(401).json({error: "Email is not verified! Check your mailbox for a verification link!"})
    } else if (err === "Email not registered!") {
      return res.status(401).json({error: "Email not registered!"})
    }
    return res.status(500).json({error: 'Login failed! Check your credentials!'})
  }
};

/**
 * ? Forgot password
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    /** update user document with a reset token and reset expiry timeframe */
    if (!user) return res.status(401).json({ message: 'Your email is not registered!' })
    
    user.resetCode = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
    user.resetCodeExpiration = new Date().setMinutes(new Date().getMinutes() + 60);
    

    await user.save();


    /** send reset token to this email */
    await sendResetToken(email, user.resetCode);

    res.status(200).json('Reset Token has been sent to your email!')
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: error.message})
  }
}

/**
 * ? Reset Password
 */
const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    /** Validate reset code and expiration */
    const user = await User.findOne({
      resetCode: token,
      resetCodeExpiration: {
        $gt: new Date()
      }
    });

    if (!user) return res.status(401).json({ message: 'Invalid or expired token' });

    /** Update password and reset code fields */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await User.findOneAndUpdate(
      { email: user.email },
      { $set: { resetCode: undefined, resetCodeExpiration: undefined, password: hashedPassword } },
      {new: true, multi: true}
    )

    return res.status(200).json({message: 'Password reset successful!'})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: error.message})
  }
}

/**
 * ! Get User Profile
 */
const verifyUserProfile = async (req, res) => {
  const { authToken } = req.cookies;

  if (authToken) {
    jwt.verify(authToken, process.env.AUTH_SECRET, {}, async (err, userInfo) => {
      if (err) return res.status(401).json({ error: 'Invalid Token' });

      const { _id, name, email, Admin} = await User.findById(userInfo.id);
      return res.status(200).json({_id, name, email, Admin})
    })
  } else {
    return res.status(500).json({error: 'You are not logged in'})
  }
}

/**
 * ? Logout User
 */
const logoutUser = async (req, res) => {
  res.cookie("authToken", "", {
    maxAge: 0, 
    httpOnly: true,
    sameSite: 'None',
    secure: true
  }).json({message: 'Logged out!'})
}

export { registerUser, loginUser, verifyToken, forgotPassword, verifyUserProfile, logoutUser, resetPassword };

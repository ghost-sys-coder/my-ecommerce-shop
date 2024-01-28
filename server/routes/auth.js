import { Router } from "express";
import { registerUser, loginUser, verifyToken, forgotPassword, verifyUserProfile, logoutUser, resetPassword } from "../controllers/auth.js";
import { validateUserRegistrationData, validateUserLoginData } from "../middleware/validateUserData.js";

const router = Router();

/**
 * ! Register new user
 */
router.post("/register", validateUserRegistrationData, registerUser);


/**
 * ? Verify Token
 */
router.get("/verify/:token", verifyToken);


/**
 * ! Login existing user
 */
router.post("/login", validateUserLoginData, loginUser);

/**
 * ? Forgot Password
 */
router.post("/forgot-password", forgotPassword);

/**
 * ? Reset Password
 */
router.post("/reset-password", resetPassword)


/**
 * ! Get User profile
 */
router.get("/profile", verifyUserProfile);

/**
 * ? Logout user
 */
router.post("/logout", logoutUser)

export default router;

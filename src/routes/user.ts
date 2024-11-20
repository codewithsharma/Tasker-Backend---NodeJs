import express from "express";
import {
  deleteUser,
  getAllUsers,
  getAllUsersOnly,
  getUserDetail,
  getUserDetailWithTasks,
  LoginUser,
  LogoutUser,
  registerUser,
} from "../controllers/user";

const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());

// User registration
router.post("/register", registerUser);

// Get all users
router.get("/get-all-users", getAllUsers); // Changed endpoint for clarity

router.use("/get-all-users-only", getAllUsersOnly)
// Get user details by ID
router.get("/:id", getUserDetail); // Changed endpoint for clarity


router.get("/details/:id", getUserDetailWithTasks); // Changed endpoint for clarity

// Delete user by ID
router.delete("/users/:id", deleteUser); // Changed endpoint for clarity

// User login
router.post("/login", LoginUser);


//User Logout
 router.get("/logout", LogoutUser);

export default router;
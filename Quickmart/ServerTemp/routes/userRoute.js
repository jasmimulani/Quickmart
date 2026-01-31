import express from "express";
import { isAuth, login, logout, register, getAllUsers, toggleUser } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);
userRouter.get("/users", getAllUsers);

// New endpoint for toggling user status
userRouter.post("/toggle-user", toggleUser);

export default userRouter;

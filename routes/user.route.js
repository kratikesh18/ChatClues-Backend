import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

const router = Router();

// user routers
router.route("/register").post(registerUser);
export default router;

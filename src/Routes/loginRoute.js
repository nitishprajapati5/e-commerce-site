import { Router } from "express";
import { LoginUser, refreshAccessToken } from "../Controllers/LoginController.js";

const router = Router()


router.route("/Login").post(LoginUser)

router.route("/refresh-token").post(refreshAccessToken)

export default router
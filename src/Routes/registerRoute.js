import { Router } from "express";
import { RegisterUser } from "../Controllers/RegisterController.js";

const router = Router()


router.route("/Register").post(RegisterUser)



export default router
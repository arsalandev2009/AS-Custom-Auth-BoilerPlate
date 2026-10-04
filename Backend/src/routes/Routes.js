import { Router } from "express";
import { ForgetPassword, Login, OtpMatch, Signup, UpdatePassword } from "../controller/auth.controller.js";

export const routes = Router()

routes.post('/signup',Signup)
routes.post('/login',Login)
routes.post('/forgetpassword',ForgetPassword)
routes.post('/updatepassword',UpdatePassword)
routes.post('/otp',OtpMatch)
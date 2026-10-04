import bcrypt from "bcryptjs";
import { User } from "../model/auth.model.js";
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer";

export const  Signup = async(req,res)=>{
    const {name, email,password}  = req.body;
    if(!name || !email || !password){
        res.json({message:'All fields required',status:400,success:false})
        return
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        res.json({message:'User Already Available With this email',status:400,success:false})
        return
    }
    const hashPassword = await bcrypt.hash(password,10)
    const data = await User.create({name,email,password:hashPassword})
    res.json({message:'User Created Successfully',status:201,success:true,data})
}




export const  Login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.json({message:'All fields required',status:400,success:false})
        return
    }
    const existingUser = await User.findOne({email})
    if(!existingUser){
        res.json({message:'User Not registered',status:400,success:false})
        return
    }
    const isMatch =await bcrypt.compare(password,existingUser.password)
    if(!isMatch){
        res.json({message:'Invalid Credentials', success:false,status:400})
        return
    }
    const token =await jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1hr'})
    res.json({message:'Logged in successfully',status:200,success:false,token})
}




export const ForgetPassword = async(req,res)=>{
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiryTime = Date.now() + 60 * 1000;
    const {email} = req.body;
    if(!email){
        res.json({message:'Enter Your registered Email',success:false,status:400})
        return
    }
    const existingUser = await User.findOne({email})
    if(!existingUser){
        res.json({message:'User with this email Not Available', success:false,status:400})
        return
    }
    await User.findOneAndUpdate({email:existingUser.email},{otp,otpexpirytime:expiryTime})
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FOR_OTP,  
        pass: process.env.PASSWORD_FOR_OTP,
      }
    });
    const mailOptions = {
        from: `Fixora <${process.env.EMAIL_FOR_OTP}>`,
        to: email,
        subject: 'Fixora - Password Reset OTP',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 450px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #e53e3e; margin: 0; font-size: 26px; font-weight: 700;">Fixora</h1>
                </div>

                <div style="text-align: center;">
                    <h2 style="color: #1a202c; font-size: 18px; margin-bottom: 8px;">Verify Your Email</h2>
                    <p style="color: #4a5568; font-size: 14px; margin: 0 0 20px 0;">Use the OTP code below to reset your password. It will expire in 1 minute.</p>

                    <div style="margin: 20px 0;">
                        <span style="font-size: 30px; font-weight: 700; color: #e53e3e; background-color: #fff5f5; padding: 10px 24px; border-radius: 6px; border: 1px dashed #feb2b2; letter-spacing: 5px;">
                            ${otp}
                        </span>
                    </div>

                    <p style="color: #a0aec0; font-size: 12px; margin-top: 18px;">If you didn't request this, you can safely ignore this email.</p>
                </div>

                <div style="text-align: center; border-top: 1px solid #edf2f7; padding-top: 12px; margin-top: 20px; color: #cbd5e0; font-size: 11px;">
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Fixora. All rights reserved.</p>
                </div>
            </div>
        `
    };    
    await transporter.sendMail(mailOptions)
    res.json({message:'Reset Password Otp Send to your email',success:true,status:200})

}




export const OtpMatch = async(req,res)=>{
   try {
     const {email,otp} = req.body
    if(!otp){
        res.json({message:'Plz Enter Your Otp',status:400,success:false})
        return
    }
    const existingUser = await User.findOne({email})
    if(!existingUser.otp){
        res.json({message:'Plz request again for OTP',success:false,status:400})
        return
    }
    if(Date.now() > existingUser.otpexpirytime){
        res.json({message:'OTP Expired Please generate a new otp',success:false,status:400})
        await User.findOneAndUpdate({email},{$unset:{otp:1,otpexpirytime:1}})
        return
    }
    if(otp != existingUser.otp){
        res.json({message:'Wrong OTP',status:400,success:false})
        return
    }
    await User.findOneAndUpdate({email},{$unset:{otp:1,otpexpirytime:1}})
    res.json({message:'All done plz Update Your password',status:200,success:true})
   } catch (error) {
       res.json({message:'Server Error',success:false,status:500})
    
   }

}




export const UpdatePassword = async(req,res)=>{
    const {email,password} = req.body
    if(!password || !email){
        res.json({message:'Server Error! Please Try again',status:400,success:false})
        return
    }
    const existingUser = await User.findOne({email})
    if(!existingUser){
        res.json({message:'User Not registered',status:400,success:false})
        return
    }
    const hashPassword =await bcrypt.hash(password,10)
    await User.findOneAndUpdate({email},{password:hashPassword})
    res.json({message:'Password Updated Successfully',status:200,success:true})

    // const existingUser = User.find({password})
}
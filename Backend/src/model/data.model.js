import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    ProductCateory:{
        type:String,
        required:true
    },
    ProductStock:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
export const UserData  = mongoose.model('UserData',UserDataSchema)
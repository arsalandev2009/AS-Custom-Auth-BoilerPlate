import mongoose from "mongoose";

export function ConnectDB(){

    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('MongoDB Connected')
    }).catch((error)=>{
        console.log(error)
    })
}
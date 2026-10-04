import express from "express";
import { ConnectDB } from "./src/db/ConnectDB.js";
import { routes } from "./src/routes/Routes.js";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000


ConnectDB()

app.use('/api',routes)

app.listen(PORT ,()=>{
    console.log('Server is running on port', PORT)
})
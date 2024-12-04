import express from 'express'
import mongoose from 'mongoose'
import UserRouter from './Routes/UserRoutes'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const MONGOOSE_URL : string | undefined= process.env.MONGOOSE_URL 

app.use(express.json())
app.use("/api/v1/user",UserRouter)


const main = () => {
    if(!MONGOOSE_URL) {
        console.log("Database Conection Failed")
    } else {
        mongoose.connect(MONGOOSE_URL)
        console.log("Datbase Connected Successfully")
        app.listen(3000,() => {
            console.log("App listening to port 3000")
        })
    }
}

main()

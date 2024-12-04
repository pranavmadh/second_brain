import { ContentModel, UserModel } from "../db"
import { Request,Response } from "express"
import z  from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dontenv from 'dotenv'

dontenv.config()

const JWT_PASSWORD : string | undefined = process.env.JWT_PASSWORD

//USer Signup Controller
const UserSignupSchema = z.object({
    username : z.string().min(3,"Username is required"),
    email : z.string().email("Invalid Email Address"),
    password : z.string().min(6).refine((password) => /[A-Z]/.test(password), {message : "Password Should Contian Atleast one Capital Letter"}).refine((password) => /[a-z]/.test(password), {message : "Password should contain atleast one Small Letter"}).refine((password) => /[!@#$%^&*()_=]/.test(password) , {message : "Should Contain a Special Character"})
})

export const UserSignup = async (req : Request,res : Response) => {

    const validation = UserSignupSchema.safeParse(req.body)
    
    if (!validation.success) {
        res.status(400).json({
            success: false,
            errors: validation.error.errors
        });
        return
    }
    const {username , email , password} = req.body

    const hashedPassword = await bcrypt.hash(password,5)

    try {
    await UserModel.create({
        email : email,
        username : username,
        password : hashedPassword
    })
    } catch(e) {
        res.status(411).json("User Already Exists")
    }


    res.status(200).json({
        success : true,
        message : "User Signup Successfull"
    })

}

export const UserLogin = async (req : Request, res : Response) => {
    const {username, password}: {username: string, password: string} = req.body
    console.log(username, password)

    const UserValidation = await UserModel.findOne({
        username
    })

    console.log(UserValidation)
    if(!JWT_PASSWORD) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        return;
    }

    if(UserValidation) {
        const passwordValidate = await bcrypt.compare(password, UserValidation.password as string)
        
        if(passwordValidate) {
            const token = jwt.sign({
                id: UserValidation._id
            }, JWT_PASSWORD as string)

            res.status(200).json({
                success: true,
                message: "User Login Successful",
                token 
            })
        }
    } else {
        res.status(403).json({
            success: false,
            message: "Login Credentials Wrong"
        })
    }

}

export const Content = async (req: Request, res: Response) => {
    const title  = req.body.title
    const link = req.body.link
    const tag : Array<String> = req.body.tag

    console.log(title,link,tag)
    //@ts-ignore
    console.log(req.userId)
    try {
        await ContentModel.create({
            title,
            link,
            tag : [],
            //@ts-ignore
            userId : req.userId
        })

        res.status(200).json({
            success : true,
            message : "Content Added Successfully"
        })
    } catch(e) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

export const GetContent = async (req : Request, res : Response) => {
    //@ts-ignore
    const userId = req.userId

    try {
        const content  = await ContentModel.find({
            userId : userId
        }).populate("userId","username email")

        res.status(200).json({
            success : true,
            contents : content
        })
    } catch(e) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}
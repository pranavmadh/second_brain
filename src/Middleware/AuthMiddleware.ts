import { Request,Response,NextFunction } from "express"
const JWT_PASSWORD : string  | undefined = process.env.JWT_PASSWORD
import jwt from 'jsonwebtoken'

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization

    if (!JWT_PASSWORD) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        return
    }

    const verification = jwt.verify(token as string, JWT_PASSWORD as string)
    //@ts-ignore
    if(verification) {
        //@ts-ignore
        req.userId = verification.id
        next()
    } else {
        res.status(403).json({
            success: false,
            message: "You are not logged in"
        })
    }
}
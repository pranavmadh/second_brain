import express, {Router } from 'express'
import { Content, GetContent, UserLogin, UserSignup } from '../Controllers/UserController'
import { AuthMiddleware } from '../Middleware/AuthMiddleware'

const UserRouter: Router = express.Router()

UserRouter.post('/signup', UserSignup)
UserRouter.post('/login',UserLogin)
UserRouter.post('/content',AuthMiddleware,Content)
UserRouter.get('/content',AuthMiddleware,GetContent)

export default UserRouter
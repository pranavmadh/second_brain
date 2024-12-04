import mongoose, {Model,Schema} from "mongoose";

const userSchema = new Schema({
    email : {type : String,unique : true},
    username : {type : String, unique: true},
    password : {type : String}
})

const contentSchema = new Schema({
    title : String,
    link : String,
    tag : [{type : mongoose.Types.ObjectId, ref : 'Tag'}],
    userId : {type : mongoose.Types.ObjectId, ref : 'User'}
})

export const UserModel = mongoose.model("User",userSchema)
export const ContentModel = mongoose.model("Content",contentSchema)
import mongoose from "mongoose";


const userSchama = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // profileImg:{
    //     type : String,
    //     required:true
    // },
    // profileThumbImg:{
    //     type:String,
    //     required:true
    // },
    accountCreatedDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps : true})

const Users = mongoose.model('Users',userSchama);
export default Users
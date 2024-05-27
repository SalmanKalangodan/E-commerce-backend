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
    profileImg:{
        type : String,
    },
    phone : {
        type : Number,
    },
    accountCreatedDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    cart :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'wishlist'
    }],
    Orders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Orders'
    }],
    address : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"address"
    }]
},{timestamps : true})

const Users = mongoose.model('Users',userSchama);
export default Users
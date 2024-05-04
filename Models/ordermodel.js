import mongoose from "mongoose";


const ordermodel = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require:true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'products',
        require:true
    },
    parchasedate : {
        type:Date,
        require:true,
        default:Date.now
    },
    ordertime : {
        type : String , 
        require : true ,
        default : new Date().toTimeString()
    },
    orderId : {
        type: String,
        require: true
    },
    totalprice : {
        type : String ,
        require: true
    },
    paymentId : {
        type : String,
        require : true
    }
})


const Order = mongoose.model('Orders',ordermodel)

export default Order
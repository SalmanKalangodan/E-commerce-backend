import mongoose from "mongoose";


const cartmodel = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        require:true  
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        require:true
    },
    qnt:{
        type:Number,
        default:1
    }
})

const Cart = mongoose.model("Cart",cartmodel)

export default Cart;
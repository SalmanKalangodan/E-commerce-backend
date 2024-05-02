import mongoose from "mongoose";


const wishlist = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        require:true  
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        require:true
    },
    qnt:{
        type:Number,
        default:1
    }
})


const Wishlist = mongoose.model('wishlist',wishlist)

export default Wishlist
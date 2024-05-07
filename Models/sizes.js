import mongoose from "mongoose";

const newsize = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products',
        require : true
    },
    size : {
        type : String, 
        require : true
    },
    stock : {
        type : Number,
        default : 0 ,
    }
})

const Size = mongoose.model('size' , newsize)

export default Size
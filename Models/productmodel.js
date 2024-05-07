import mongoose from "mongoose";




const productsSchema = new mongoose.Schema({
    title :{
        type : String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    price: {
        type : Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category: {
        type : String,
        required:true
    },
    isDeleted: {
        type : Boolean,
        required :false
    },
    sizes :  [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'size'
    }]
})

const Products = mongoose.model('products' , productsSchema)

export default Products;
import mongoose from "mongoose";


const newsale = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        require : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products',
       
    }, 
    name :  {
        type : String,
        require:true
    },
    image : {
        type : String,
        require :true
    },
    price : {
        type : Number,
        require : true
    },
    totalprice : {
       type : Number,
       require :true
    },
    qnt : {
        type: Number ,
        require : true
    },
    date : {
        type : Date ,
        require : true,
        default : new Date()
    }
})

const Sales = mongoose.model('sales' , newsale)
 
export default Sales
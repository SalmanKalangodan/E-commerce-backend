import mongoose from "mongoose";



const newAddress  = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require : true
    },
    street : {
        type : String, 
        require : true
    },
    city : {
        type : String ,
        require : true
    },
    state : {
        type : String ,
        require : true
    },
    pincode : {
        type : Number ,
        require : true
    },
    country : {
        type : String ,
        require : true
    },
    defaultaddress : {
        type : Boolean ,
        default : true
    }
})

const Address = mongoose.model("address",newAddress)

export default Address
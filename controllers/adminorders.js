import Order from "../Models/ordermodel.js"



export const getallorders = async (req , res ,next) =>{
    try {
        // get all orders 
        const orders = await Order.find({})
        //if not found orders 
        if(!orders){
            return res.status(404).json('order not found')
        }
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (req , res ,next) =>{
    try {
        // get order id from params 
        const id = req.params.id
       
        // get data from body
        const status = req.body.status
        
        // update order status
        
        await Order.updateOne({_id : id} , {status : status})
       
        res.json('updated')
    } catch (error) {
        next(error)
    }
}
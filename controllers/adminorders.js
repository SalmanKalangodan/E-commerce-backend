import Order from "../Models/ordermodel.js"



export const getallorders = async (req , res) =>{
    try {
        // get all orders 
        const orders = await Order.find({})
        //if not found orders 
        if(!orders){
            return res.status(404).json('order not found')
        }
        res.status(200).json(orders)
    } catch (error) {
        
    }
}
import Order from "../Models/ordermodel.js"



// get all orders 

export const getallorders = async (req , res ,next) =>{

        // get all orders 
        const orders = await Order.find({}).populate({
                path: 'userId',
                model: 'Users',
                populate: {
                    path: 'productId',
                    model: 'products'
                }
            })
        //if not found orders 
        if(!orders){
            return res.status(404).json('order not found')
        }
        res.status(200).json(orders)
}


// updating order status 

export const updateStatus = async (req , res ,next) =>{

        // get order id from params 
        const id = req.params.id
       
        // get data from body
        const status = req.body.status
        
        // update order status
        
        await Order.updateOne({_id : id} , {status : status})
       
        res.json('updated')
}
import Users from "../Models/usermodel.js"


// get orders

export const getorders = async (req , res ,next) =>{
        //get user using params
        const userid = req.id
        //find user using id
      
        const user = await Users.findById(userid).populate({
            path:'Orders',
            populate : {path : '_id'}
        })
        //if not find user
        if(!user){
            return res.status(404).json('not found user')
        }
        // check the order is empty
        if(!user.Orders || user.Orders.length ==0 ){
            return res.status(200).json("you have no orders")
        }
        // if the orders not empty
        res.status(200).json(user.Orders) 
}
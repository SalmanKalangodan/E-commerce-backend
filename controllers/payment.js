import Stripe from "stripe";
import Users from "../Models/usermodel.js";
import dotenv from 'dotenv'
import Order from "../Models/ordermodel.js";
import Cart from "../Models/cartmodel.js";



dotenv.config()

const stripeInstance = Stripe(process.env.STRIPE_API_KEY)

let datas = {}


export const payment = async (req , res) =>{
try {
    const userid = req.params.id
    const user = await Users.findById(userid).populate({
        path:'cart',
        populate:{path : 'productId'}
    });

    if(!user){
        return res.status(404).json('user not found')
    }
  const cartitem = user.cart
  
  if(cartitem.length===0){
    return res.status(400).json("the cart is empty")
  }

  let totalamount = 0
  let totalqnt = 0
const lineItems = cartitem.map((value)=>{
     totalamount += value.productId.price * value.qnt
     totalqnt += value.qnt
     return{
        price_data: {
            currency: "inr",
            product_data: {
                name: value.productId.title,
                description: value.productId.discretion
            },
            unit_amount: Math.round(value.productId.price * 100)
        },
        quantity: value.qnt
        
    }
})

const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://example.com/success", // Replace with actual success URL
    cancel_url: "https://example.com/cancel", // Replace with actual cancel URL
  });
  
  if(!session) {
   return res.status(500).json('Error occurred while creating session')
  }
  
  datas = {
    userid , 
    user ,
    session
  }

  res.status(200).json({ message: "Stripe payment session created successfully", url: session.url }) 
} catch (error) {
    
    res.status(404).json({message:"internal server error"})
}

}


export const success  = async (req , res ) => {

    try {
        const {userid , user ,session} = datas
    const cartitem = user.cart
    const prodectId = cartitem.map(value => value.productId._id)
 
    const  order = new Order({
        userid : userid,
        prodectId : prodectId,
        orderId : session.id,
        paymentId : `demo ${Date.now()}`,
        totalprice : session.amount_total
    })
      order.save()

      const orderId = order._id

   const userupdate  = await Users.findOneAndUpdate({_id : userid},{
    $push:{Orders : orderId},
    $set:{cart : []}
   },
   {new : true})
if(!userupdate){
res.status(500).json('faild update userData')
}
console.log(cartitem);
await Cart.deleteMany({_id : {$in : cartitem }})
res.status(200).json("payment successful") 

    } catch (error) {
        res.json( error)
    }
    
}
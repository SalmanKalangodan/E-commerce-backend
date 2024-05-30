import Stripe from "stripe";
import Users from "../Models/usermodel.js";
import dotenv from 'dotenv'
import Order from "../Models/ordermodel.js";
import Cart from "../Models/cartmodel.js";
import Address from "../Models/addressmodel.js";
import Sales from "../Models/salesmodel.js";
import Size from "../Models/sizes.js";



dotenv.config()

const stripeInstance = Stripe(process.env.STRIPE_API_KEY)

let datas = {}


export const payment = async (req , res ,next) =>{
    const userid = req.id
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
                success_url: "https://front-end-huou.vercel.app/payment/success", // Replace with actual success URL
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

}


export const success = async (req, res, next) => {
    try {
      const { userid, user, session } = datas;
      const cartitem = user.cart;
      const productIds = cartitem.map(value => value.productId._id);
      const sizes = cartitem.map(value => value.size);
      
      // Fetch the default address for the user
      const address = await Address.findOne({ userId: userid, defaultaddress: true });
      if (!address) {
        return res.status(404).json('Default address not found');
      }
      
      // Create a new order
      const order = new Order({
        userId: userid,
        productId: productIds,
        size: sizes,
        orderId: session.id,
        totalprice: (session.amount_total / 100).toFixed(2), // Convert from cents to dollars and format to two decimal places
        paymentId: `demo ${Date.now()}`,
        address: address.fullAddress, // Assuming address has a `fullAddress` field as a string
        status: 'placed',
        parchasedate: new Date(), // Ensure the date is correctly set
        ordertime: new Date().toTimeString().split(' ')[0] // Set the order time correctly
      });
  
      // Save the order to the database
      await order.save();
  
      // Process each cart item
      for (const item of cartitem) {
        const newsale = new Sales({
          userId: item.userId,
          productId: item.productId._id,
          name: item.productId.title,
          image: item.productId.image,
          price: item.productId.price,
          totalprice: item.productId.price * item.qnt,
          qnt: item.qnt,
          size: item.size
        });
  
        // Update the stock for the product size
        const updateStock = await Size.findById(item.size);
        if (!updateStock) {
          return res.status(404).json('Stock not found');
        }
        updateStock.stock -= item.qnt;
        if (updateStock.stock <= 0) {
          updateStock.stock = 0;
          updateStock.inStock = false;
        }
  
        // Save the updated stock and sale entry
        await updateStock.save();
        await newsale.save();
      }
  
      // Update the user's orders and clear the cart
      const userUpdate = await Users.findOneAndUpdate(
        { _id: userid },
        {
          $push: { Orders: order._id },
          $set: { cart: [] }
        },
        { new: true }
      );
  
      if (!userUpdate) {
        return res.status(500).json('Failed to update user data');
      }
  
      // Delete all cart items for the user
      await Cart.deleteMany({ _id: { $in: cartitem.map(item => item._id) } });
  
      // Respond with the order ID and amount
      res.status(200).json({ message: 'Payment successful', orderId: order._id, amount: order.totalprice });
  
    } catch (error) {
      console.error('Error processing payment success:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
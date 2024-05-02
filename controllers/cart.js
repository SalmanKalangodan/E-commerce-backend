import Cart from "../Models/cartmodel.js";
import Products from "../Models/productmodel.js";
import Users from "../Models/usermodel.js";


export const AddCart = async (req, res, next) =>{
  try{
    const userid =req.id
    const {id} = req.params
    const user = await Users.findById(userid)

    if(!user) {
      return res.status(404).json("user not found")
    }

    const products = await Products.findById(id)

    if(!products){
      return res.status(404).json("products not found")
    }
  
    const exdata  = await Cart.find({$and:[{productId:id} ,{ userId : userid}]})

    if(!exdata.length==0){
   const qnt = exdata[0].qnt
   await Cart.updateOne({productId:id,qnt:qnt},{$inc:{qnt:1}})
    return res.status(200).json("cart product increment")
    }
     const newcart = await Cart.create({
      userId : userid,
      productId: id,
      qnt:1
     })

      user.cart.push(newcart._id)
     await user.save()
     return res.status(200).json("cart add successfully")
    }catch (err){
      console.log(err);
    res.json(err+"this is err")
  }
}

export const getCart =async (req , res , next) =>{
  try{
  const id =   req.id 
  const cart = await Cart.find({userId : id})
  res.json(cart)
  }catch(err){
    res.json(err)
  }
}

export const deleteCart = async (req , res , next ) =>{
  try{
     
  }catch (err){
    res.json(err)
  }
}
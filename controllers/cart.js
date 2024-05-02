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
  const id = req.params.id
  console.log(id)
  const user = await Users.findById(id).populate(
   {
    path : 'cart',
    populate: {path: 'productId' }
   }
  )
if(!user){
  return res.status(404).json('user not found')
}

if(!user.cart || user.cart.length == 0){
  return res.status(404).json("cart is empty")
}

res.status(200).json(user.cart)
 

  }catch(err){
    res.json("this err" + err)
  }
}

export const deleteCart = async (req , res , next ) =>{
  try{
    const id  = req.params.id;
    const userid = req.id ;
    const user = await Users.findById(userid)
    const product = await Products.findById(id)
   
if(!user){
      return res.status(404).json('user not found')
    }

if(!product){
  return res.status(404).json('product not found')
}

const cartitem = await Cart.findOneAndDelete({userId : userid , productId : id})
console.log(cartitem._id);

if(!cartitem){
 return res.status(404).json('item not found')
}

const data= user.cart.findIndex((value)=> value.equals(cartitem._id))

if(data !== -1){
  user.cart.splice(data , 1)
  await user.save()
}
res.json(data)

 
  }catch (err){
    res.json(err)
  }
}
import Cart from "../Models/cartmodel.js";
import Products from "../Models/productmodel.js";
import Users from "../Models/usermodel.js";


// Add products to cart 

export const AddCart = async (req, res) =>{
  try{
// find user id in req object 
    const userid =req.id
// find product id in params 
    const {id} = req.params
// find user in by using id
    const user = await Users.findById(userid)
// if not user
    if(!user) {
      return res.status(404).json("user not found")
    }
// find product using by id
    const products = await Products.findById(id)
// if not find product
    if(!products){
      return res.status(404).json("products not found")
    }
// find alredy exixting data 
    const exdata  = await Cart.find({$and:[{productId:id} ,{ userId : userid}]})
// if the product alredy in the cart the qnt will increment
    if(!exdata.length==0){
   const qnt = exdata[0].qnt
   await Cart.updateOne({productId:id,qnt:qnt},{$inc:{qnt:1}})
    return res.status(200).json("cart product increment")
    }
// if the product not in the cart save the cart
     const newcart = await Cart.create({
      userId : userid,
      productId: id,
      qnt:1
     })
// saving the cart id in user data
      user.cart.push(newcart._id)
     await user.save()

     return res.status(200).json("item added successfully")
    }catch (err){
    res.json(err + "this is err")
  }
}




// Get cart products

export const getCart =async (req , res) =>{
  try{
// get user id in params
  const id = req.params.id
// find user in by using id and populate
  const user = await Users.findById(id).populate(
   {
    path : 'cart',
    populate: {path: 'productId' }
   }
  )
// if not find user   
if(!user){
  return res.status(404).json('user not found')
}

// if the cart is empty

if(!user.cart || user.cart.length == 0){
  return res.status(404).json("cart is empty")
}

res.status(200).json(user.cart)
 

  }catch(err){
    res.json("this err" + err)
  }
}


// delete cart items

export const deleteCart = async (req , res) =>{
  try{
// find product id from params
    const id  = req.params.id;
// find user id from req object 
    const userid = req.id ;
// find user by using id    
    const user = await Users.findById(userid)
// find product by using id
    const product = await Products.findById(id)
//if not find user
if(!user){
      return res.status(404).json('user not found')
    }
// if not find product
if(!product){
  return res.status(404).json('product not found')
}
// find product and delete the product in cart
const cartitem = await Cart.findOneAndDelete({userId : userid , productId : id})

// if not find product
if(!cartitem){
 return res.status(404).json('item not found')
}

// find index for deleting the referance in user data
const data= user.cart.findIndex((value)=> value.equals(cartitem._id))

// delete the cart id in user data using splice methode
if(data !== -1){
  user.cart.splice(data , 1)
  await user.save()
}
res.status(200).json('remove item')
  }catch (err){
    res.json(err)
  }
}
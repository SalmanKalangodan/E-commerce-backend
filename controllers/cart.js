import Cart from "../Models/cartmodel.js";
import Products from "../Models/productmodel.js";
import Size from "../Models/sizes.js";
import Users from "../Models/usermodel.js";


// Add products to cart 

export const AddCart = async (req, res, next) =>{
// find user id in req object 
    const userid =req.id
// find product id in params 
    const {id} = req.params
    const sizeid = req.body.size
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
    const size = await Size.findOne({_id : sizeid , inStock : true})

    if(!size){
      return res.status(400).json("out of stock")
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
      qnt:1,
      size:sizeid
     })
// saving the cart id in user data
      user.cart.push(newcart._id)
     await user.save()
     return res.status(200).json("item added successfully")

}




// Get cart products

export const getCart =async (req , res , next) =>{
  
// get user id in params
  const id = req.id
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
 
}


// delete cart items

export const deleteCart = async (req , res , next) =>{
  
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
} 



export const  CartIncrement = async (req, res) =>{
  // get product id using params

  const productId = req.params.id

  //get userId 
  
  const userId = req.id

  //find user 
  
  const user = await Users.findById(userId)
  // if noot found 
  if(!user){
    return res.status(404).json('user not found')
  }

  // find product using id

  const product = await Products.findById(productId)

  // if not find product 

  if(!product){
    return res.status(404).json('product not found')
  }
  
  // update cart 

  const cart = await Cart.findOneAndUpdate({userId : userId , productId : productId} , {$inc:{qnt : 1}})

  return res.json('incremented')
}


export const  Cartdecrement = async (req, res) =>{
  // get product id using params

  const productId = req.params.id

  //get userId 
  
  const userId = req.id

  //find user 
  
  const user = await Users.findById(userId)
  // if noot found 
  if(!user){
    return res.status(404).json('user not found')
  }

  // find product using id

  const product = await Products.findById(productId)

  // if not find product 

  if(!product){
    return res.status(404).json('product not found')
  }
  
  // update cart 

  const cartItem = await Cart.findOne({ userId: userId, productId: productId });
  if (!cartItem) {
    return res.status(404).json('Cart item not found');
  }

  // Check if the quantity is greater than 1 before decrementing
  if (cartItem.qnt > 1) {
    cartItem.qnt -= 1;
    await cartItem.save();
    return res.json({ message: 'Decrement successful', cartItem });
  } else {
    // If the quantity is 1, you might want to remove the item from the cart
    return res.json({ message: 'Item qnt is 1' });
  }
}


export const cartTotal = async(req , res) =>{
  // find user id
  const id = req.id
  // find user using by id 
  const user = await Users.findById(id).populate(
    {
      path : 'cart',
      populate: {path: 'productId' }
    }
  )
  let Total =  0
  // calculate all total
  user.cart.forEach((value)=>{
    Total += value.qnt*value.productId.price
  })
  res.json(Total)
}


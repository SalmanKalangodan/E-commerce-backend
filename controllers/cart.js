import Cart from "../Models/cartmodel.js";


export const AddCart = async (req, res, next) =>{
  try{
    const userid =req.id
    const {id} = req.params
    const exdata  = await Cart.find({productId:id})
    console.log(exdata);
    if(!exdata.length==0){
      const qnt = exdata[0].qnt
      console.log(qnt);
    const addqnt = await Cart.updateOne({productId:id,qnt:qnt},{$inc:{qnt:1}})
    return res.json(addqnt)
    }
     const newcart = new Cart({
      userId : userid,
      productId: id
     })
     newcart.save()
     res.json(newcart)
    }catch (err){
    res.json(err)
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
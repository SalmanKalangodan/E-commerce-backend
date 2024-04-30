import Cart from "../Models/cartmodel.js";


export const AddCart = async (req, res, next) =>{
  try{
    const userid =req.id
    const {id} = req.params
    const exdata  = await Cart.find({userId:userid})
    console.log(exdata);
    if(exdata){
    return  res.status(400).json("alredy added")
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

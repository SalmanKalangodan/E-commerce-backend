import Products from "../Models/productmodel.js";
import Users from "../Models/usermodel.js";
import Wishlist from "../Models/wishlistmodel.js";


export const addWishlist = async (req , res , next) =>{

     const userid =req.id

     const {id} = req.params

     try {

     const user = await Users.findById(userid)

     if(!user){
     return res.status(404).json("user not found")
     }        
     const prodect = await Products.findById(id)

     if(!prodect){
     return res.status(404).json('product not found')
     }

     const exdata = await Wishlist.find({userId:user._id, productId : prodect._id})

     if(!exdata.length==0){
     return res.status(400).json('alredy added')
     }

  
    const newwishlist = await Wishlist.create({
        userId : userid,
        productId:id,
    })
    user.wishlist.push(newwishlist._id)
    await user.save()
    res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const getWishlist =async (req , res ,next)=>{

        const userid = req.id
    try{
        const user = await Users.findById(userid).populate({
            path:'wishlist',
            populate:{path : 'productId'}
        })
        if(!user){
            return res.status(404).json('user not found')
          }
          
          if(!user.wishlist || user.wishlist.length == 0){
            return res.status(404).json("cart is empty")
          }
        res.status(200).json(user.wishlist)
    }catch (err){
        next(err)
    }


}

export const deleteWishlist = async (req , res ,next)=>{
        const {id} = req.params
        const userid = req.id
        try{

        const user = await Users.findById(userid)

        if(!user){
          return res.status(404).json('user not found')
        }

        const product = await Products.findById(id)

        if(!product){
            return res.status(404).json('product not found')
        }
        
        const wishlistitem = await Wishlist.findOneAndDelete(({userId : userid , productId : id}))

        if(!wishlistitem){
         return res.status(400).json("item not found")
        }
        const findindex = user.wishlist.findIndex((value) => value.equals(wishlistitem._id))

        if(findindex !== -1){

        user.wishlist.splice(findindex,1)

         await user.save()
        }
        res.status(200).json("wishlist deleted success fully")
     }catch(err){
        next(err)
    }
}
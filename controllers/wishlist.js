import Wishlist from "../Models/wishlistmodel.js";


export const addWishlist = async (req , res, next) =>{
    try {
        const userid =req.id
        const {id} = req.params
        const exdata = Wishlist.find({id: id})
        if(!exdata.length==0){
            const qnt = exdata[0].qnt
    const addqnt = await Cart.updateOne({productId:id,qnt:qnt},{$inc:{qnt:1}})
    return res.json(addqnt)
        }
    const newwishlist = new Wishlist({
        userId : userid,
        productId:id
    })
    newwishlist.save()
    res.json(newwishlist)
    } catch (error) {
        res.json(error)
    }
}

export const getWishlist =async (req , res , next)=>{
    try{
        const {id} = req.params
        const datas = await Wishlist.find({userId:id})
        res.json(datas)
    }catch (err){
        res.json(err)
    }


}

export const deleteWishlist = async (req , res , next)=>{
    try{
        const {id} = req.params
    }catch(err){
        res.json(err)
    }
}
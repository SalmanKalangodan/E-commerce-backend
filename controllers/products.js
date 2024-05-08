import Products from "../Models/productmodel.js";

// find all products 


export const getProducts = async (req, res )=>{
    try{
        // find all products 
    const data = await Products.find({isHide : false})
    if(!data){
        return res.status(404).json('products not found')
    }
    res.status(200).json(data)
    }catch(err){
       next(err)
    }
}

// get products using id

export const getProductsid = async (req ,res , next)=>{
    // get id from params
    const {id} = req.params
    // find product usnig id
    try{
    const prodect = await Products.findById(id)
    if(!prodect){
        return res.status(404).json('product not found')
    }
   res.status(200).json(prodect)
   }catch (err){
    next(err)
   }
}

// get products by category
export const getproductscategary = async (req ,res , next)=>{
        // get category from params
        const { categoryname } = req.params
        // find products by category
        try{
        const prodect = await Products.find({$or :[ {category : categoryname}]})
        if(!prodect){
            return res.status(404).json("product not found")
        }
        res.status(200).json(prodect)
    }catch (err){
        next(err)
    }
}
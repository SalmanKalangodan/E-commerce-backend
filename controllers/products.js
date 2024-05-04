import Products from "../Models/productmodel.js";

// find all products 


export const getProducts = async (req, res )=>{
    try{
// find all products 
        const data = await Products.find({})
        if(!data){
            return res.status(404).json('products not found')
        }
       return res.status(200).json(data)
    }catch(err){
        res.json(err)
    }
}

// get products using id

export const getProductsid = async (req ,res)=>{
   try{
// get id from params
    const {id} = req.params
// find product usnig id
    const prodect = await Products.findById(id)
    if(!prodect){
        return res.status(404).json('product not found')
    }

   return res.status(200).json(prodect)
   }catch (err){
    res.json(err)
   }
}

// get products by category

export const getproductscategary = async (req ,res)=>{
    try{
// get category from params
        const { categoryname } = req.params
// find products by category
        const prodect = await Products.find({$or :[ {category : categoryname}]})
        if(!prodect){
            return res.status(404).json("product not found")
        }
        res.status(200).json(prodect)
    }catch (err){
        res.json(err)
    }
    
}
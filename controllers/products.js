import Products from "../Models/productmodel.js";


export const getProducts = async (req, res )=>{
    try{
        const data = await Products.find({})
        if(!data){
            return res.status(404).json('products not found')
        }
       return res.status(200).json(data)
    }catch(err){
        res.json(err)
    }
}

export const getProductsid = async (req ,res)=>{
   try{
    const {id} = req.params
    const prodect = await Products.findById(id)
    if(!prodect){
        return res.status(404).json('product not found')
    }
   return res.status(200).json(prodect)
   }catch (err){
    res.json(err)
   }
}

export const getproductscategary = async (req ,res)=>{
    try{
        const { categoryname } = req.params
        console.log(categoryname);
        const prodect = await Products.find({$or :[ {category : categoryname}]})
        if(!prodect){
            return res.status(404).json("product not found")
        }
        res.status(200).json(prodect)
    }catch (err){
        res.json(err)
    }
    
}
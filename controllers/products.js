import Products from "../Models/productmodel.js";


export const getProducts = async (req, res , next)=>{
    try{
        const data = await Products.find({})
        res.json(data)
    }catch(err){
        res.json(err)
    }
}

export const getProductsid = async (req ,res , next)=>{
   try{
    const {id} = req.params
    const prodect = await Products.findById(id)
    res.json(prodect)
   }catch (err){
    res.json(err)
   }
}

export const getproductscategary = async (req ,res , next )=>{
    try{
        const { categoryname } = req.params
        console.log(categoryname);
        const prodect = await Products.find({$or :[ {category : categoryname}]})
        res.json(prodect)
    }catch (err){
        res.json(err)
    }
    
}
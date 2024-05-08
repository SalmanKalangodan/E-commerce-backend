import Products from "../Models/productmodel.js"
import Sales from "../Models/salesmodel.js"



export const addproducts = async (req, res, next) =>{
   
    const  {title , description , price ,image ,category} = req.body
    try {
    const exproduct = await Products.findOne({title : title , description : description , price : price , category : category})
    if(exproduct){
        return res.status(400).json("product alredy added")
    }
    const newproduct = new Products ({
        title : title,
        description : description ,
        price : price ,
        image : req.cloudnaryimge , 
        category : category
    })
     newproduct.save()
    res.status(200).json(newproduct)
   } catch (error) {
    next(error)
   }
}

// get all products in admin

export const getproducts = async (req , res , next) =>{
    try {
        // get all products
        const products  = await Products.find({})
        // if not find not products 
        if(!products) {
            return res.status(404).json('not found products in DB')
        }
        // if find products 
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const getproductid = async (req , res ,next) =>{
   
      // get product id in params
      const productid = req.params.id
      // find product using id
      try {
      const product = await Products.findById(productid)
      // if not find product
      if(!product) {
        return res.status(404).json("product not fund")
      }  
      // if find product
      res.status(200).json(product) 
    } catch (error) {
        next(error)
    }
}

export const getproductcategory = async (req, res , next) =>{
    
        // get catagory from params
        const category = req.params.category
        // find products using category
        try {
        const products = await Products.find({category})
        // if not find products 
        if(!products){
            return res.status(404).json('not found products')
        }
        // find products 
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const updateproduct = async (req , res , next) =>{
   
        // get product id using params
        const productid = req.params.id
        // find product using id
        try {
        const product = await Products.findById(productid)
        // not find product 
        if(!product) {
            return res.status(404).json('product not found')
        }
        //get data from body
        const {title , description , price , category} = req.body
        //update data
        if(title) {
            product.title = title
        }
        if(description) {
            product.description = description
        }
        if(price) {
            product.price = price
        }
        if(category) {
            product.category = category
        }
        // save the updated product
        await product.save()

        res.status(200).json("product update successfuly")
    } catch (error) {
        next(error)
    }
}


// delete product

export const deleteproduct = async (req , res , next) =>{
    
        // get product id using params 
        const productid = req.params.id
        //find products usning id delete product
        try {
        const prodect = await Products.findByIdAndDelete(productid)
        // if not found product
        if(!prodect) {
            return res.status(404).json('product not found')
        }
        res.status(200).json('product delete successfuly')
    } catch (error) {
        next(error)
    }
} 


// hide product 

export const hideproducts = async(req , res , next) =>{
    
        // get product id 
        const id = req.params.id
        //get data form body
        const data = req.body.hide
        //update product
        try {
        if(data === true){
             await Products.updateOne({id} , {isHide : data})
             return  res.status(200).json("product hided")
        }else{
            await Products.updateOne({_id : id} , {isHide : data})
            return  res.status(200).json("product hided")
        }
       
    } catch (error) {
        next(error)
    }
}
import Products from "../Models/productmodel.js"
import Sales from "../Models/salesmodel.js"

// add products 

export const addproducts = async (req, res, next) =>{
   // get product details from req body
    const  {title , description , price ,image ,category} = req.body

   //cheking alredy added product     
    const exproduct = await Products.findOne({title : title , description : description , price : price , category : category})
    if(exproduct){
        return res.status(400).json("product alredy added")
    }
    //creating new product
    const newproduct = new Products ({
        title : title,
        description : description ,
        price : price ,
        image : req.cloudnaryimge , 
        category : category
    })
    await newproduct.save()
    res.status(200).json(newproduct)
}

// get all products in admin

export const getproducts = async (req , res , next) =>{
        // get all products
        const products  = await Products.find({})
        // if not find not products 
        if(!products) {
            return res.status(404).json('not found products in DB')
        }
        // if find products 
        res.status(200).json(products)
}


// get product using id
export const getproductid = async (req , res ,next) =>{
   
      // get product id in params
      const productid = req.params.id
      // find product using id
      const product = await Products.findById(productid)
      // if not find product
      if(!product) {
        return res.status(404).json("product not fund")
      }  
      // if find product
      res.status(200).json(product) 
}

// get product by category

export const getproductcategory = async (req, res , next) =>{
    
        // get catagory from params
        const category = req.params.category
        // find products using category
       
        const products = await Products.find({category})
        // if not find products 
        if(!products){
            return res.status(404).json('not found products')
        }
        // find products 
        res.status(200).json(products)
}

// update product 
export const updateproduct = async (req , res , next) =>{
   
        // get product id using params
        const productid = req.params.id
        // find product using id
      
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
}


// delete product

export const deleteproduct = async (req , res , next) =>{
    
        // get product id using params 
        const productid = req.params.id
        //find products usning id delete product
      
        const prodect = await Products.findByIdAndDelete(productid)
        // if not found product
        if(!prodect) {
            return res.status(404).json('product not found')
        }
        res.status(200).json('product delete successfuly')
} 


// hide product 

export const hideproducts = async(req , res , next) =>{
    
        // get product id 
        const id = req.params.id
        //get data form body
       const prodect = await Products.findById(id)
       // not found product 
       if(!prodect){
         return res.status(404).json("product not found")
       }
       
        //update product
       
        if(prodect.isHide === true){
             await Products.updateOne({_id:id} , {isHide : false})
             return  res.status(200).json("product unhided")
        }else{
            await Products.updateOne({_id : id} , {isHide : true})
            return  res.status(200).json("product hided")
        }
}
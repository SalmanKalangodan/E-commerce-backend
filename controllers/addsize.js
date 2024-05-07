import Products from "../Models/productmodel.js"
import Size from "../Models/sizes.js"



export const addsize = async (req ,res) =>{
    try {
        // get id from params 
        const id = req.params.id
        // find product 
        const prodect  = await Products.findById(id)
        //if not found product 
        if(!prodect){
            return res.status(404).json("product not found")
        }
        // get data from body
        const {size , stock} = req.body
        // find size in products 
        const sizes = await Size.findOne({productId : id , size :size})
        // if already the size thire 
        if(sizes) {
            // const cstock = sizes.stock
            await Size.updateOne({productId : id , size} , {$inc : {stock :stock}})
            return res.json("stock increment")
        }
        //if not found data
        const newsize = new Size ({
            productId : id ,
            size : size,
            stock : stock
        })
        await newsize.save()
        prodect.sizes.push(newsize._id)
        await prodect.save()
      res.json(newsize)
    } catch (error) {
        res.json(error)
    }
}


export const updatestock = async (req , res) =>{
    try {
        // get product using params 
        const {id}  = req.params
        // get data from body
        const {stock} = req.body
        //find size using id
        const size = await Size.findById(id)
        //not found size 
        if(!size){
            return res.status(404).json("size not found")
        }
        //check the stock is zero
        const  zreo = size.stock + stock 
        //if the stock is zero 
        if(zreo<0){
            return res.json('decrement only' + size.stock)
        } 
        //update size
       await Size.updateOne({_id : id}, {$inc :{stock : stock}})
        res.status(200).json("stock update")
    } catch (error) {
        res.json(error)
    }
}

// delete the size 

export const deletesize = async (req , res) =>{
    
}
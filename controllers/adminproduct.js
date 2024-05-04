import Products from "../Models/productmodel.js"



export const addproducts = async (req, res) =>{
   try {
    const  {title , description , price ,image ,category} = req.body
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
    res.status(500).json(error)
   }
}
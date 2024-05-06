import Products from "../Models/productmodel.js"
import Sales from "../Models/salesmodel.js"



export const allstatus = async (req , res) =>{
    try {
       // get sales products
        const datas = await Sales.aggregate([{$group : {_id : "$productId" , product_name : {$first :"$name"} ,product_price : {$first : '$price'},product_image : {$first : '$image'} ,total_qnt : {$sum :"$qnt"} , total_price : {$sum  : '$price'}}}])

        if(!datas){
             return res.status(404).json("sales not found")
        }
       
        res.json(datas)
    } catch (error) {
        res.json('this is err' + error)
    } 
}  


export const getsales =  async (req , res) =>{
    try {
        // get all sales
        const sales = await Sales.find({})
        // if not find sales 
        if(!sales) {
            return res.status(404).json("sales report not found")
        }
        res.status(200).json(sales)
    } catch (error) {
        res.json(error)
    }
}


export const filtersales = async (req , res) =>{
    try {
    //get start Date and end Date from req.query
    const {startDate , endDate} = req.query
    console.log(startDate);
    // filter the sales use start date and end date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const sales = await Sales.find({date : {$gte : startDateObj , $lt  : endDateObj}})
    // if not found sales 
    if(sales.length == 0){
        return res.status(404).json("sales report not found")
    }
    // give response to clite
    res.status(200).json(sales)  
    } catch ({error}) {
     res.json(error)   
    }
}  
import Sales from "../Models/salesmodel.js"



export const allstatus = async (req , res) =>{
    try {
       // get sales products
        const datas = await Sales.aggregate([{$group : {_id : "$productId" , product_name : {$first :"$name"} ,product_price : {$first : '$price'},product_image : {$first : '$image'} ,total_qnt : {$sum :"$qnt"} , total_price : {$sum  : '$price'}}}])
       // if not geting datas
        if(!datas){
             return res.status(404).json("sales not found")
        }
       let total_revenue = 0
       let total_sell_qnt =0
       datas.forEach((value)=>{
        console.log(value.total_price);
        total_revenue += value.total_price
        total_sell_qnt += value.total_qnt
       })
        res.json({datas , total : {total_revenue , total_sell_qnt}})
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
        let total_revenue = 0
       let total_sell_qnt =0
       sales.forEach((value)=>{
        console.log(value);
        total_revenue += value.totalprice
        total_sell_qnt += value.qnt
       })
        res.status(200).json([...sales ,{total_revenue , total_sell_qnt}])
    } catch (error) {
        res.json(error)
    }
}


export const filtersales = async (req , res) =>{
    try {
    //get start Date and end Date from req.query
    const {startDate , endDate} = req.query
    console.log(startDate);
    // convert string to date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    // filter the sales use start date and end date
    const sales = await Sales.find({date : {$gte : startDateObj , $lt  : endDateObj}})
    // if not found sales 
    if(sales.length == 0){
        return res.status(404).json("sales report not found")
    }
    let total_revenue = 0
    let total_sell_qnt =0
    sales.forEach((value)=>{
     console.log(value);
     total_revenue += value.totalprice
     total_sell_qnt += value.qnt
    })
    // give response to clite
    res.status(200).json([...sales , {total_revenue , total_sell_qnt}])  
    } catch ({error}) {
     res.json(error)   
    }
}  
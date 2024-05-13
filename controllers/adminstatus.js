import Sales from "../Models/salesmodel.js"


// get all sales
export const allstatus = async (req , res ,next) =>{

       // get sales 
        const datas = await Sales.aggregate([{$group : {_id : "$productId" , product_name : {$first :"$name"} ,product_price : {$first : '$price'},product_image : {$first : '$image'} ,total_qnt : {$sum :"$qnt"} , total_price : {$sum  : '$price'}}}])
       // if not geting datas
        if(!datas){
             return res.status(404).json("sales not found")
        }
       let total_revenue = 0
       let total_sell_qnt =0

       datas.forEach((value)=>{
        total_revenue += value.total_price
        total_sell_qnt += value.total_qnt
       })

        res.json({datas , total : {total_revenue , total_sell_qnt}})
}  

// get products sales
export const getsales =  async (req , res ,next) =>{

        // get all sales
        const sales = await Sales.find({})
        // if not find sales 
        if(!sales) {
            return res.status(404).json("sales report not found")
        }
        let total_revenue = 0
       let total_sell_qnt =0
       sales.forEach((value)=>{
        total_revenue += value.totalprice
        total_sell_qnt += value.qnt
       })
        res.status(200).json([...sales ,{total_revenue , total_sell_qnt}])
}

// date sales
export const filtersales = async (req , res , next) =>{
    
    //get start Date and end Date from req.query
    const {startDate , endDate} = req.body
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
     total_revenue += value.totalprice
     total_sell_qnt += value.qnt
    })
    // give response to clite
    res.status(200).json([...sales , {total_revenue , total_sell_qnt}])  
}  
import Address from "../Models/addressmodel.js"
import Users from "../Models/usermodel.js"



export const userAddress = async(req , res) => {
try {
    // get user id in params
    const userid = req.params.id
    // find user in DB using by id
    const user = await Users.findById(userid)
    // if not found user
    if(!user) {
        res.status(404).json('user not found')
    }
    // get address from the req.body
    const {street , city , state , pincode , country} = req.body
     // chack alredy saved the address
     const savedaddress = await Address.findOne({userId: userid ,street,city,state,pincode, country})
     if(savedaddress){
        return res.status(400).json('alredy saved')
     }
    //chack the user defult address
    if(user.address.length!==0){
    const addressid = user.address
    await Address.updateMany({_id : {$in : addressid}} , {$set :{defaultaddress : false}})
    }
    //store the data to DB
    const newAddress = new Address({
      userId : userid,
      street : street,
      city : city,
      state : state,
      pincode: pincode ,
      country : country,
    })
    await newAddress.save()
  
    // store the addressid to user Address
    user.address.push(newAddress._id)
    await user.save()
// return the response to the clint
res.status(201).json('address saved')
} catch (error) {
    res.json(error)
}
}

export const getAddress = async (req , res) =>{
    try {
        //get user id from params
        const userid = req.params.id
        console.log(userid);
        //find user in DB using id
        const user = await Users.findById(userid).populate({
            path : 'address',
            populate : {path :'_id' }
        })
       
        // if not found user
        if(!user){
           return res.status(404).json('user not found')
        }
        // if the not found address
        if(!user.address || user.address.length == 0){
            return res.status(200).json('not saved any address')
        }
        res.status(200).json(user.address)

    } catch (error) {
        res.json("this is"+error)
    }
}
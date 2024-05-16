import Address from "../Models/addressmodel.js"
import Users from "../Models/usermodel.js"



export const userAddress = async(req , res , next) => {
    // get user id in params
    const userid = req.id
    
    // find user in DB using by id
    const user = await Users.findById(userid)
    // if not found user
    if(!user) {
        res.status(404).json('user not found')
    }
    // get address from the req.body
    const { firstname,lastname,email,street , city , state , pincode , country} = req.body
     // chack alredy saved the address
     const savedaddress = await Address.findOne({userId: userid ,firstname,lastname,email,street,city,state,pincode, country})
     //
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
      firstname,
      lastname,
      email,
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

}

export const getAddress = async (req , res , next) =>{
  
        //get user id from params
        const userid = req.params.id
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

  
}

//delete the address 

export const deleteAddress = async (req, res , next) =>{
        // get user id from  req obj
        const userid = req.id
        //get address id from params
        const id = req.params.id
        //find user using id
       
        const user = await Users.findById(userid)
        //if not fount user 
        if(!user){
            return res.status(404).json("user not found")
        }
        //find address using id 
        const address = await Address.findById(id)
        //if not found address
        if(!address){
            return res.status(404).json('address not found')
        }
        //delete data in address
        await  Address.deleteOne({_id : id})
        //find index of refference id
        const data = user.address.findIndex(value => value.equals(id))
        //delete refference in user data
        if(data !== -1){
            user.address.splice(data,1)
            await user.save()
        }
}

export const setDefaultAddress = async(req ,res) =>{
   //get user id 
   const userId = req.id
   //get address Id
   const addressId = req.params.id
   //get find user using id 
   const user = await Users.findById(userId)
   // if not found the user 
   if(!user){
    return res.status(404).json('user not found')
   }
   //get address using userid 
    await Address.updateOne({_id : addressId , userId} , {defaultaddress : true})
    await Address.updateMany({_id :{$ne:addressId}  , userId} , {defaultaddress : false})
   // if not found address 
   return res.json('updated')

}
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Users from '../Models/usermodel.js'

dotenv.config()

export const adminLogin = async (req ,res) =>{
    try {
        // get data from the body
        const {email , password } = req.body
        // check the this admin
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           token = jwt.sign({email},process.env.KEY)
           res.cookie('access_token',token,{httpOnly :true ,expires: exdate })
           return  res.json('admin login sussesfully')
        }
        // if not found
    } catch (error) {
        res.json("login faild")
    }
}


// list all users

export const listusers = async (req, res) =>{
try {
    // get all users
    const users = await Users.find({}) 
    // if not users
    if(!users){
        return res.status(404).json('not found users')
    }
    // passing the data to clint
    res.status(200).json(users)
} catch (error) {
    res.json(error)
}    
}

// find user by id 

export const getuserid = async (req , res) =>{
    try {
    // get user id from the params
    const userid = req.params.id
    // find user from the DB
    const user = await Users.findById(userid)
    //if not found the user
    if(!user){
        return res.status(404).json("user not found")
    }
    // if find user passing the data to clint
    res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
    
}

export const blockuser = async (req ,res ) =>{
    try {
        // get user id in params
        const userid  = req.params.id
        //find user with using user id
        const user = await Users.findById(userid)
        // if not found user 
        if(!user) {
            return res.status(404).json('user not found')
        }
        // block user
        if(user.isDeleted === false){
            await Users.updateOne({_id : userid} , {$set :{isDeleted : true}})
            return res.status(200).json('user blocked') 
        }
        // unblock user
        if(user.isDeleted === true){
            await Users.updateOne({_id : userid} , {$set :{isDeleted : false}})
            res.status(200).json('unblock user') 
        }
      
    } catch (error) {
        res.json(error)
    }
}


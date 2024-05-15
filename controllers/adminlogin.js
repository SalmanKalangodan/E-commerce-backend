import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Users from '../Models/usermodel.js'


dotenv.config()


// admin login
export const adminLogin = async (req ,res) =>{
        // get data from the body
        const {email , password } = req.body
        // check the this admin
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const exdate = new Date (Date.now() + 60*1000)
           const token = jwt.sign({email},process.env.Key)
           res.cookie('access_token',token,{httpOnly :true ,expires: exdate })
           return  res.json('admin login sussesfully')
        }

}


// list all users

export const listusers = async (req, res , next) =>{

    // get all users
    const users = await Users.find({}) 
    // if not users
    if(!users){
        return res.status(404).json('not found users')
    }
    // passing the data to clint
    res.status(200).json(users)
}

// find user by id 

export const getuserid = async (req , res , next) =>{
    
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
    
}

//blocking users
export const blockuser = async (req ,res ,next) =>{
    
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
}


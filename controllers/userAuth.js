import Users from "../Models/usermodel.js";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import userSchema, { userlogin } from "../validation/usersvalidation.js";
import Products from "../Models/productmodel.js";
import { usertoken } from "../Midleware/token.js";


// user registration

export const register = async (req , res , next)=>{
    
        //  joi validation
        const validata = await userSchema.validateAsync(req.body)
        const existuser = await Users.findOne({email: validata.email})

        if(existuser) {
         return res.status(400).json('user alredy exist')
        }
       // hasing password
   
        bcrypt.hash(validata.password,10,(err,hash)=>{
            if (err) throw err
            const hashpassword = hash
        // user data storing DB
        const newuser = new Users({
            username:validata.username,
            email:validata.email,
            password:hashpassword,
            profileImg:req.cloudnaryimge
        })
        newuser.save()
    
        res.status(200).json("registration complited")
        })
}

// user login

export const login = async (req , res , next)=>{
        // joi validation
        // process.env.Key = crypto.randomBytes(64).toString('hex')
        const validata = await userlogin.validateAsync(req.body)
       // find user
       
        const user = await Users.findOne({email : validata.email , isDeleted : false})

        if(!user){
          return  res.status(404).json('user not found')
        }
        //compare password
        bcrypt.compare(validata.password , user.password,(err, result)=>{
        if(err) throw err
        if(result){
         // creating token
        const token = jwt.sign({id:user._id,username:user.username } , process.env.Key , {expiresIn : '15m'})
        const refreshToken = jwt.sign({id : user._id} ,process.env.REFRESHKEY)

        res.cookie('access_token',token,{httpOnly :true })
        res.cookie('refresh_token',refreshToken,{httpOnly :true })
             return  res.json({message : 'login sussesfully' , token , refreshToken , username : user.username})
        }else{
             return res.json('invalid password')
        }
        }) 
}


export const EditProfaile = async(req , res) =>{
  //get user Id 

  const userId = req.id

  //find user Using userId
  
  const user = await Users.findById(userId)
  
  // if not find user 

  if(!user){
    return res.status(404).json("user not found")
  }

  const {username , phone } = req.body

  if(username){
   await Users.findOneAndUpdate({_id : userId} , {username})
  }
  if(phone){
    await Users.findOneAndUpdate({_id : userId} , {phone})
  }
  if(req.cloudnaryimge){
    await Users.findOneAndUpdate({_id : userId} , {profileImg : req.cloudnaryimge})
  }

  return res.status(200).json("profile edited")
}


export const GetProfile = async (req ,res) =>{
  // get user id 
  const userId = req.id

  // find user using id 

  const user = await Users.findById(userId)

  // if not find user 

  if(!user){
    return res.status(404).json('user not found')
  }

  return res.status(200).json({username : user.username , email : user.email , phone : user.phone , profileimg : user.profileImg})
}
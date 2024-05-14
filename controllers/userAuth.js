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

          res.header('authorization' , token)
          res.header('refresh_token' , refreshToken)
             return  res.json('login sussesfully')
        }else{
             return res.json('invalid password')
        }
        }) 
}
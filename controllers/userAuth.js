import Users from "../Models/usermodel.js";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import userSchema, { userlogin } from "../validation/usersvalidation.js";
import Products from "../Models/productmodel.js";
import { usertoken } from "../Midleware/token.js";



export const register = async (req , res , next)=>{
    try{
        const validata = await userSchema.validateAsync(req.body)
        const existuser = await Users.findOne({email: validata.email})
        if(existuser) {
         return res.status(400).json('user alredy exist')
        }
        bcrypt.hash(validata.password,10,(err,hash)=>{
            if (err) throw err
            const hashpassword = hash
            console.log(hashpassword);

        const newuser = new Users({
            username:validata.username,
            email:validata.email,
            password:hashpassword,
        })
        newuser.save()
        console.log(newuser)
        res.json(newuser)
        })

    }
    catch(err){
      res.status(400).json("validation faild")
    }
}

export const login = async (req , res , next)=>{
    try {
        process.env.Key = crypto.randomBytes(64).toString('hex')
        const validata = await userlogin.validateAsync(req.body)
        console.log(validata);
        const user = await Users.findOne({email : validata.email})
        console.log(user);
        if(!user){
          return  res.status(404).json('not found')
        }
        bcrypt.compare(validata.password , user.password,(err, result)=>{
            if(err) throw err

            if(result){
            const token = jwt.sign({id:user._id,username:user.username } , process.env.Key)
               const exdate = new Date (Date.now() + 60*1000)
               res.cookie('access_token',token,{httpOnly :true ,expires: exdate })
               return  res.json('login sussesfully')
            }else{
                return res.json('invalid password')
            }
        })
        
      }catch(err){
       res.json(err)
      }
}
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config()
export const usertoken = (req, res , next) =>{
    try{
        const token = req.headers["authorization"]
        if(!token){
            return res.status(400).json('please login')
        }
      
        jwt.verify(token , process.env.Key,(err, decode)=>{
            if(err) {
             return res.status(400).json("somthing want wrong try again")
            }
            req.id = decode.id
        next()
        })
    }catch (err) {
        res.json(err)
    }
}
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config()
export const usertoken = (req, res , next) =>{
        const token = req.headers["authorization"]
        if(!token){
            return res.status(400).json('please login')
        }
      
        jwt.verify(token , process.env.Key,(err, decode)=>{
            if(err) {
                if(err.message ==='jwt expired'){
                  const refreshToken = req.headers['refresh_token']
                  
                  if(!refreshToken){
                    return res.status(401).json('Refresh token is required')
                  }

                  jwt.verify(refreshToken , process.env.REFRESHKEY,(err , redecode)=>{
                    if(err){
                        return res.status(403).json('invalid refresh token')
                    }
                    
                    const token = jwt.sign({id: redecode.id} , process.env.Key ,{expiresIn : 600})
                    console.log('this is refresh', token)
                    req.id = redecode.id 
                    res.header('authorization', token)
                   return next()
                  })
                }else { 
                    return res.status(400).json('Something went wrong. Please try again')
                }
             return
            }
            req.id = decode.id
            return next()
        })
    
}
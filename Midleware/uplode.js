import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
import multer from 'multer'


dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.Cloud_name, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRECT 
})

const storage = multer.diskStorage({})


const uploading = multer({
  storage:storage,
  limits:{
    fileSize:1024*1024*1
  }
})

const imageupload = (req , res , next)=>{
  uploading.single('image')(req , res , async err => {
    try {
      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path)
        req.cloudnaryimge = result.secure_url
      }
      next()
    } catch (error) {
      res.status(400).json(error)
    }
  })

}

export default imageupload
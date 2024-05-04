import express from 'express'
import { addproducts } from '../controllers/adminproduct.js'
import upload from '../Midleware/uplode.js'


const router  =  express.Router()



router.post('/products',upload,addproducts)



export default router
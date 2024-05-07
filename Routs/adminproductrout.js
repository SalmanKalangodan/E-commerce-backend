import express from 'express'
import { addproducts, deleteproduct, getproductcategory, getproductid, getproducts, updateproduct } from '../controllers/adminproduct.js'
import upload from '../Midleware/uplode.js'
import { addsize } from '../controllers/addsize.js'


const router  =  express.Router()



router.post('/products',upload,addproducts)
router.get('/products' , getproducts)
router.get('/products/:id' , getproductid)
router.get('/products/:category' , getproductcategory)
router.put('/products/:id' , updateproduct)
router.delete('/products/:id' , deleteproduct)
router.post('/products/size/:id' ,addsize )
export default router
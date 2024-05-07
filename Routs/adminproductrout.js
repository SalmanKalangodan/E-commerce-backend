import express from 'express'
import { addproducts, deleteproduct, getproductcategory, getproductid, getproducts, updateproduct } from '../controllers/adminproduct.js'
import upload from '../Midleware/uplode.js'
import { addsize, deletesize, updatestock } from '../controllers/addsize.js'


const router  =  express.Router()



router.post('/products',upload,addproducts)
router.get('/products' , getproducts)
router.get('/products/:id' , getproductid)
router.get('/products/:category' , getproductcategory)
router.put('/products/:id' , updateproduct)
router.delete('/products/:id' , deleteproduct)
router.post('/products/size/:id' ,addsize )
router.patch('/products/stock/:id' , updatestock)
router.delete('/products/stock/:id' , deletesize)



export default router
import express from 'express'
import { addproducts, deleteproduct, getproductcategory, getproductid, getproducts, hideproducts, updateproduct } from '../controllers/adminproduct.js'
import upload from '../Midleware/uplode.js'
import { addsize, deletesize, updatestock } from '../controllers/addsize.js'
import { usertoken } from '../Midleware/token.js'

const router  =  express.Router()



router.post('/products',usertoken,upload,addproducts)
router.get('/products' ,usertoken, getproducts)
router.get('/products/:id' ,usertoken, getproductid)
router.get('/products/:category' ,usertoken, getproductcategory)
router.put('/products/:id' ,usertoken, updateproduct)
router.delete('/products/:id' ,usertoken, deleteproduct)
router.post('/products/size/:id' ,usertoken,addsize )
router.patch('/products/stock/:id' ,usertoken, updatestock)
router.delete('/products/stock/:id' ,usertoken, deletesize)
router.patch('/products/hide/:id' ,usertoken, hideproducts)


export default router
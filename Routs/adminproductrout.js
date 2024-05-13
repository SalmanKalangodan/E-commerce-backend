import express from 'express'
import { addproducts, deleteproduct, getproductcategory, getproductid, getproducts, hideproducts, updateproduct } from '../controllers/adminproduct.js'
import upload from '../Midleware/uplode.js'
import { addsize, deletesize, updatestock } from '../controllers/addsize.js'
import { usertoken } from '../Midleware/token.js'
import tryCatchMidileware from '../Midleware/trycatch.js'

const router  =  express.Router()



router.post('/products',usertoken,upload,tryCatchMidileware(addproducts))
router.get('/products' ,usertoken, tryCatchMidileware(getproducts))
router.get('/products/:id' ,usertoken, tryCatchMidileware(getproductid))
router.get('/products/:category' ,usertoken, tryCatchMidileware(getproductcategory))
router.put('/products/:id' ,usertoken, tryCatchMidileware(updateproduct))
router.delete('/products/:id' ,usertoken,tryCatchMidileware(deleteproduct))
router.post('/products/size/:id' ,usertoken,tryCatchMidileware(addsize))
router.patch('/products/stock/:id' ,usertoken, tryCatchMidileware(updatestock))
router.delete('/products/stock/:id' ,usertoken, tryCatchMidileware(deletesize))
router.patch('/products/hide/:id' ,usertoken, tryCatchMidileware(hideproducts))


export default router
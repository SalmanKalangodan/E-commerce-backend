import express from 'express'
import { getProducts, getProductsid, getproductscategary } from '../controllers/products.js'
import { usertoken } from '../Midleware/token.js'


const router = express.Router()


router.get('/products',usertoken,getProducts)
router.get('/products/:id',usertoken,getProductsid)
router.get('/products/category/:categoryname',usertoken ,getproductscategary)

export default router
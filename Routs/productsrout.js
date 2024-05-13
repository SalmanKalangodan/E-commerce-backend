import express from 'express'
import { getProducts, getProductsid, getproductscategary } from '../controllers/products.js'
import tryCatchMidileware from '../Midleware/trycatch.js'



const router = express.Router()


router.get('/products',tryCatchMidileware(getProducts))
router.get('/products/:id',tryCatchMidileware(getProductsid))
router.get('/products/category/:categoryname',tryCatchMidileware(getproductscategary))

export default router
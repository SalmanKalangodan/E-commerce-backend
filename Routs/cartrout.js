import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { AddCart, getCart } from '../controllers/cart.js'


const router = express.Router()


router.post('/:id/cart',usertoken,AddCart)
router.get('/:id/cart',usertoken,getCart)

export default router
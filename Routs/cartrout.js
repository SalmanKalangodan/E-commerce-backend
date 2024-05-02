import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { AddCart, deleteCart, getCart } from '../controllers/cart.js'


const router = express.Router()


router.post('/:id/cart',usertoken,AddCart)
router.get('/:id/cart',usertoken,getCart)
router.delete('/:id/cart',usertoken,deleteCart)

export default router
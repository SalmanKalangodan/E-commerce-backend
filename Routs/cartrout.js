import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { AddCart, CartIncrement, Cartdecrement, cartTotal, deleteCart, getCart } from '../controllers/cart.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()


router.post('/:id/cart',usertoken,tryCatchMidileware(AddCart))
router.get('/cart',usertoken,tryCatchMidileware(getCart))
router.delete('/:id/cart',usertoken,tryCatchMidileware(deleteCart))
router.put('/cart/increment/:id' ,usertoken,tryCatchMidileware(CartIncrement))
router.put('/cart/decrement/:id',usertoken,tryCatchMidileware(Cartdecrement))
router.get('/cart/total',usertoken , tryCatchMidileware(cartTotal))
export default router
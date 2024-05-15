import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { AddCart, deleteCart, getCart } from '../controllers/cart.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()


router.post('/:id/cart',usertoken,tryCatchMidileware(AddCart))
router.get('/cart',usertoken,tryCatchMidileware(getCart))
router.delete('/:id/cart',usertoken,tryCatchMidileware(deleteCart))

export default router
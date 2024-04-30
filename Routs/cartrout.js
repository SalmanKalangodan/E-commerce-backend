import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { AddCart } from '../controllers/cart.js'


const router = express.Router()


router.post('/:id/cart',usertoken,AddCart)

export default router
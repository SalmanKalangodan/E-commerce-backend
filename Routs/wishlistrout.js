import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { addWishlist, deleteWishlist, getWishlist } from '../controllers/wishlist.js'


const router = express.Router()

router.post('/:id/cart',usertoken,addWishlist)
router.get('/:id/cart',usertoken,getWishlist)
router.delete('/:id/cart',usertoken,deleteWishlist)

export default router
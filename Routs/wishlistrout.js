import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { addWishlist, deleteWishlist, getWishlist } from '../controllers/wishlist.js'


const router = express.Router()

router.post('/:id/wishlists',usertoken,addWishlist)
router.get('/:id/wishlists',usertoken,getWishlist)
router.delete('/:id/wishlists',usertoken,deleteWishlist)

export default router
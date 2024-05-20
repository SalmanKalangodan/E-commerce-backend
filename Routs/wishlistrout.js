import express from 'express'
import { usertoken } from '../Midleware/token.js'
import { addWishlist, deleteWishlist, getWishlist } from '../controllers/wishlist.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()

router.post('/:id/wishlists',usertoken,tryCatchMidileware(addWishlist))
router.get('/wishlists',usertoken,tryCatchMidileware(getWishlist))
router.delete('/:id/wishlists',usertoken,tryCatchMidileware(deleteWishlist))

export default router
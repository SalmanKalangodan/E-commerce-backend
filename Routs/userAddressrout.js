import express from 'express'
import { deleteAddress, getAddress, userAddress } from '../controllers/userAddress.js'
import { usertoken } from '../Midleware/token.js'


const router = express.Router()



router.post('/:id/address',userAddress)
router.get('/:id/address',getAddress)
router.delete('/:id/address',usertoken,deleteAddress)

export default router
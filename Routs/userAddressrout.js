import express from 'express'
import { deleteAddress, getAddress, userAddress } from '../controllers/userAddress.js'
import { usertoken } from '../Midleware/token.js'


const router = express.Router()



router.post('/:id/address',usertoken,userAddress)
router.get('/:id/address',usertoken,getAddress)
router.delete('/:id/address',usertoken,deleteAddress)

export default router
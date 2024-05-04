import express from 'express'
import { getAddress, userAddress } from '../controllers/userAddress.js'


const router = express.Router()



router.post('/:id/address',userAddress)
router.get('/:id/address',getAddress)

export default router
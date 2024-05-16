import express from 'express'
import { deleteAddress, getAddress, setDefaultAddress, userAddress } from '../controllers/userAddress.js'
import { usertoken } from '../Midleware/token.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()



router.post('/address',usertoken,tryCatchMidileware(userAddress))
router.get('/:id/address',usertoken,tryCatchMidileware(getAddress))
router.put('/:id/address',usertoken,tryCatchMidileware(setDefaultAddress))
router.delete('/:id/address',usertoken,tryCatchMidileware(deleteAddress))

export default router
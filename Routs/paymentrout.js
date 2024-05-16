import express from 'express' ; 
import { usertoken } from '../Midleware/token.js';
import { payment, success } from '../controllers/payment.js';
import tryCatchMidileware from '../Midleware/trycatch.js';


const router = express.Router()

router.post('/payment',usertoken,tryCatchMidileware(payment))
router.get('/payment/success',usertoken,tryCatchMidileware(success))

export default router



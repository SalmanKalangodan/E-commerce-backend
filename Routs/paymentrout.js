import express from 'express' ; 
import { usertoken } from '../Midleware/token.js';
import { payment, success } from '../controllers/payment.js';


const router = express.Router()

router.post('/payment/:id',usertoken,payment)
router.get('/payment/success',usertoken,success)

export default router



import express from 'express'
import { getorders } from '../controllers/order.js'


const router = express.Router()


router.get('/:id/order', getorders)



export default router
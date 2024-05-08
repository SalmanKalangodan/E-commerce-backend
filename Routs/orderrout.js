import express from 'express'
import { getorders } from '../controllers/order.js'
import { updateStatus } from '../controllers/adminorders.js'


const router = express.Router()


router.get('/:id/order', getorders)


export default router
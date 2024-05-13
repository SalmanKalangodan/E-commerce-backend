import express from 'express'
import { getorders } from '../controllers/order.js'
import { usertoken } from '../Midleware/token.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()


router.get('/:id/order', usertoken,tryCatchMidileware(getorders))


export default router
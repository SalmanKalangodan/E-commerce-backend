import express from 'express'
import { login, register } from '../controllers/userAuth.js'
import { usertoken } from '../Midleware/token.js'

const router = express.Router()


router.post('/register',register)
router.post('/login' ,login)


export default router
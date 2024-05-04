import express from 'express'
import { login, register } from '../controllers/userAuth.js'
import { usertoken } from '../Midleware/token.js'
import imageupload from '../Midleware/uplode.js'


const router = express.Router()


router.post('/register',imageupload,register)
router.post('/login' ,login)


export default router
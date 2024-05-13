import express from 'express'
import { login, register } from '../controllers/userAuth.js'
import { usertoken } from '../Midleware/token.js'
import imageupload from '../Midleware/uplode.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()


router.post('/register',imageupload,tryCatchMidileware(register))
router.post('/login' ,tryCatchMidileware(login))


export default router
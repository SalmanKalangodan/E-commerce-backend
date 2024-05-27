import express from 'express'
import { EditProfaile, GetProfile, login, register } from '../controllers/userAuth.js'
import { usertoken } from '../Midleware/token.js'
import imageupload from '../Midleware/uplode.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()


router.post('/register',imageupload,tryCatchMidileware(register))
router.post('/login' ,tryCatchMidileware(login))
router.put('/profile/edit',usertoken,imageupload,tryCatchMidileware(EditProfaile))
router.get('/profile', usertoken,tryCatchMidileware(GetProfile))


export default router
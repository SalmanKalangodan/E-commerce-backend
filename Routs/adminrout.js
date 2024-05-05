import express from 'express'
import { adminLogin, blockuser, getuserid, listusers } from '../controllers/adminlogin.js'
import { getallorders } from '../controllers/adminorders.js'
import { allstatus } from '../controllers/adminstatus.js'



const router = express.Router()

router.post('/login', adminLogin)
router.get('/users' , listusers)
router.get('/user/:id',getuserid)
router.patch('/user/:id' , blockuser)
router.get('/orders' ,getallorders )
router.get('/status' , allstatus)

export default router
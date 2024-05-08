import express from 'express'
import { adminLogin, blockuser, getuserid, listusers } from '../controllers/adminlogin.js'
import { getallorders, updateStatus } from '../controllers/adminorders.js'
import { allstatus, filtersales, getsales } from '../controllers/adminstatus.js'
import { usertoken } from '../Midleware/token.js'


const router = express.Router()

router.post('/login',adminLogin)
router.get('/users' ,usertoken, listusers)
router.get('/user/:id',usertoken,getuserid)
router.patch('/user/:id' ,usertoken, blockuser)
router.get('/orders' ,usertoken,getallorders )
router.patch('/orders/status/:id' ,usertoken, updateStatus)
router.get('/sales/report' ,usertoken, allstatus)
router.get('/sales' ,usertoken, getsales )
router.get('/sales/filter' ,usertoken, filtersales)

export default router
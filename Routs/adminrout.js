import express from 'express'
import { adminLogin, blockuser, getuserid, listusers } from '../controllers/adminlogin.js'
import { getallorders } from '../controllers/adminorders.js'
import { allstatus, filtersales, getsales } from '../controllers/adminstatus.js'



const router = express.Router()

router.post('/login', adminLogin)
router.get('/users' , listusers)
router.get('/user/:id',getuserid)
router.patch('/user/:id' , blockuser)
router.get('/orders' ,getallorders )
router.get('/sales/report' , allstatus)
router.get('/sales' , getsales )
router.get('/sales/filter' , filtersales)
export default router
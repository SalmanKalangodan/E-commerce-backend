import express from 'express'
import { adminLogin, blockuser, getuserid, listusers } from '../controllers/adminlogin.js'
import { SingleOrders, getallorders, updateStatus } from '../controllers/adminorders.js'
import { WeekSales, allstatus, filtersales, getsales } from '../controllers/adminstatus.js'
import { usertoken } from '../Midleware/token.js'
import tryCatchMidileware from '../Midleware/trycatch.js'


const router = express.Router()

router.post('/login',tryCatchMidileware(adminLogin))
router.get('/users' ,usertoken, tryCatchMidileware(listusers))
router.get('/user/:id',usertoken,tryCatchMidileware(getuserid))
router.patch('/user/:id' ,usertoken, tryCatchMidileware(blockuser))
router.get('/orders' ,usertoken,tryCatchMidileware(getallorders))
router.patch('/orders/status/:id' ,usertoken, tryCatchMidileware(updateStatus))
router.get('/orders/:id',usertoken,tryCatchMidileware(SingleOrders))
router.get('/sales/report' ,usertoken, tryCatchMidileware(allstatus))
router.get('/sales' ,usertoken, tryCatchMidileware(getsales))
router.get('/sales/filter' ,usertoken, tryCatchMidileware(filtersales))
router.get('/sales/weeklysales',WeekSales)

export default router
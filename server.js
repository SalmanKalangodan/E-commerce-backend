import express from "express" ;
import dotenv from 'dotenv'; 
import mongoose from "mongoose";
import Authrout from './Routs/Authrout.js'
import productsrout from './Routs/productsrout.js'
import cartrout from './Routs/cartrout.js'
import wishlistrout from './Routs/wishlistrout.js'
import paymentrout from './Routs/paymentrout.js'
import adminproductrout from './Routs/adminproductrout.js'
import userAddress from './Routs/userAddressrout.js'
import orderrout from './Routs/orderrout.js'
import adminrout from './Routs/adminrout.js'
import cros from 'cors'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000
const DB = process.env.DB


mongoose.connect(DB)
.then(()=>console.log('db connect'))
.catch((err)=>console.log(err))
app.use(cros({
    // origin : 'https://front-end-huou.vercel.app',
    // credentials : true
}))
app.use(express.json())
app.use('/api/user',Authrout)
app.use('/api/user',productsrout)
app.use('/api/user', cartrout)
app.use('/api/user',wishlistrout)
app.use('/api/user',paymentrout)
app.use('/api/admin',adminproductrout)
app.use('/api/user',userAddress)
app.use('/api/user' ,orderrout)
app.use('/api/admin' , adminrout)




app.listen(PORT , ()=>console.log(`server is runnig on ${PORT}`))


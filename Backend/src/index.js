import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {PORT}  from '../config/server-config.js'
import { connectDB } from '../config/db.js';
import router from '../routes/food-route.js';
import routes from '../routes/user-route.js';
import 'dotenv/config.js'
import cartroutes from '../routes/cart-route.js';
import orderRouter from '../routes/orderRoute.js';

const app=express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//DB connection
connectDB();

//api endpoints
app.use('/api/food',router);
app.use("/images",express.static('uploads'));
app.use("/api/user",routes);
app.use("/api/cart",cartroutes)
app.use("/api/order",orderRouter)

app.get('/',(req,res)=>{
    res.send("App working");
})


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})


// 
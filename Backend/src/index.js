import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {PORT}  from '../config/server-config.js'
import { connectDB } from '../config/db.js';
import router from '../routes/food-route.js';

const app=express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//DB connection
connectDB();

//api endpoints
app.use('/api/food',router);
app.use("/images",express.static('uploads'));

app.get('/',(req,res)=>{
    res.send("App working");
})


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})


// 
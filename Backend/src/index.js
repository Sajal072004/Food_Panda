import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {PORT}  from '../config/server-config.js'

const app=express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/',(req,res)=>{
    res.send("App working");
})


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})
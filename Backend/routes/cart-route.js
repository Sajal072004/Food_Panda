import express from 'express'

import { removeFromCart,addToCart,getCart } from '../controllers/cart-controller.js'
import authMiddleware from '../middleware/auth.js';

const cartroutes=express.Router();

cartroutes.post('/add',authMiddleware,addToCart);
cartroutes.post('/remove',authMiddleware,removeFromCart);
cartroutes.post('/get',authMiddleware,getCart);

export default cartroutes;
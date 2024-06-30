import express from "express";
import { addFood, listFood, removeFood } from "../controllers/food-controller.js";
import multer from 'multer'  //used for image processing

const router=express.Router();

//image
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage});

router.post('/add',upload.single("image"),addFood);
router.get('/list',listFood);
router.post('/remove',removeFood);


export default router;
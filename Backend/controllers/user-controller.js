import userModel from "../models/user-model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const loginUser=async (req,res)=>{

    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid password and credentials"
            })
        }

        const token=createToken(user._id);
        res.json({
            success:true,
            token:token,
            data:user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const registerUser=async(req,res)=>{

    const {name,email,password}=req.body;
    try {
        const exists=await userModel.findOne({email});
        if(exists){
            return res.status(200).json({
                message:"User already exists",
                data:exists,
                success:true
            })
        }
        if(!validator.isEmail(email)){
            return res.status(402).json({
                message:"Write a valid email",
                success:false
            })
        }

        //hashing
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({
            message:"Verified token",
            success:true,
            token:token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Not verified token",
            success:false
        })
    }
}

export {
    loginUser,
    registerUser
}
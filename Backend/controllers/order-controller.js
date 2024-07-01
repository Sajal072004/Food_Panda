import orderModel from "../models/orderModel.js";
import userModel from "../models/user-model.js";
import Stripe from "stripe";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend

const placeOrder=async (req,res)=>{

    const frontend_url="https://food-panda-dviw.onrender.com";
    console.log(req.body.userId);
    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=>{
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100*80
                },
                quantity:item.quantity
            };
        });

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.status(200).json({
            message:"Payment successfull",
            success:true,
            session_url:session.url
        })



    } catch (error) {
        console.log("error in payment:",error);
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
  
    try {
      if (success === "true") {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        return res.json({ success: true, message: "Paid" });
      } else {
        await orderModel.findByIdAndDelete(orderId);
        return res.json({ success: false, message: "Payment Failed" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "error" });
    }
  };

  const userOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({ userId: req.body.userId });
      return res.json({ success: true, data: orders });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "error" });
    }
  };

  const listOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({});
      return res.json({ success: true, data: orders });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "error" });
    }
  };

  const updateStatus = async (req, res) => {
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      return res.json({ success: true, message: "Status Updated" });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "error" });
    }
  };

export{
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus

}

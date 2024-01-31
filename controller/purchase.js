const Razorpay=require('razorpay');
const Order=require('../models/orders')
const User=require('../models/user')
const loginsignupController=require('./loginsignupController');




const jwt=require('jsonwebtoken')


//function genberatyes tokens when usr successfully login call by loginpost
function generateAccessToken(id,name,ispremiumuser)
{
   return jwt.sign({userId:id,name:name,ispremiumuser},'98789d8cedf2f986aht415saku8865432svdxfsbxfsde987321sdfghjmnb6gdkhsf47895dsw2fdwscwfg98f5df4sgsd4dscewf4gregfe1fr4grege62ewgf4gre6r6g454')
}


const purchasepremium= async (req,res,next)=>{

    console.log('keyid>>>>>>',process.env.RAZORPAY_KEY_ID,);
    console.log('keySecret>>>>>',process.env.RAZORPAY_KEY_SECRET);
    try {
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        });
        rzp.orders.create({amount:2500,currency:'INR'},async (err,order)=>{
        
                console.log(order);
           if(err)
           {
            console.log(err);
            throw new Error(JSON.stringify(err))
           }
        
          await Order.create({orderid:order.id,status:"pending"})
            return res.status(201).json({order,key_id:rzp.key_id})
    
        })
    } catch (error) {
        console.log(error);
        res.status(403).json({message:'something went wrong',error})
    }
}






const updateTransactionStatus=async(req,res,next)=>{
    try {

        const {payment_id,order_id}=req.body;

        const order= await Order.findOne({where:{orderid:order_id}});

        console.log(order);

        if(!order)
        {
            console.log('no odrer is available');
        }

        // await order.update({paymentid:payment_id,status:'SUCCESSFULL',userId:req.user.id});

        // await req.user.update({ispremiumuser:true});

        const promise1=order.update({paymentid:payment_id,status:'SUCCESSFULL',userId:req.user.id});

        const promise2=req.user.update({ispremiumuser:true});

        await Promise.all([promise1,promise2]);

        return res.status(202).json({success:true,message:"Transcation successfull",token:generateAccessToken(req.user.id,req.user.name,true)})
     
    } catch (error) {
        console.log(error);
        res.status(403).json({message:'something went wrong',error})
    }
}





module.exports={purchasepremium,updateTransactionStatus}


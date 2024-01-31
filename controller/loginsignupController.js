const User=require('../models/user');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');





//function genberatyes tokens when usr successfully login call by loginpost
const generateAccessToken=(id,name,ispremiumuser)=>
{
   return jwt.sign({userId:id,name:name,ispremiumuser},process.env.JSW_WEB_TOKEN_SECRETKEY)
}



///string validation use this for post get functions in controller
const isstringinvalid=(string)=>
{
   if(string== undefined ||string.length===0) 
   {
      return true;
   }
   else 
   {
      return false;
   }

}
 

//post signup
const postSignup=async (req,res,next)=>{
   try {
         console.log('reaches try block');
         const {name,email,phonenumber,password}=req.body;
   if(isstringinvalid(name)||isstringinvalid(email)||isstringinvalid(phonenumber)||isstringinvalid(password)){
         return res.status(400).json({error:'Something is missing'})
    }
         console.log(name,email,phonenumber,password);

         const saltround=10;
         bcrypt.hash(password,saltround,async (err,hash)=>{
         console.log('reach bycrypt');
         if(err) console.log(err);
         await User.create({
         name,email,phonenumber,password:hash,ispremiumuser:false
         });
         res.status(201).json({message:'successfullly created new user'});
})

   } catch (error) {

    res.status(500).json({error});
    console.log(JSON.stringify(error));
    
   }

}







//post login 
const postLogin=async(req,res,next)=>{
   try {
      const {email,password}=req.body;
      console.log(email,password);
   if(isstringinvalid(email)||isstringinvalid(password)){
         return res.status(400).json({message:"Email or Password something missing",success:false})
      }
      const loginUser=await User.findOne({where:{email:email}})
      console.log('herecomes');
      console.log(loginUser);
  // console.log(loginUser.email,loginUser.password);
    if(loginUser){
         bcrypt.compare(password,loginUser.password,async(err,result)=>{
         if(err){
            console.log(err);
            return res.status(500).json({success:false,message:"Something Went wrong"})
         }
          if(result===true){
             res.status(202).json({success:true,message:"Successfullyloginuser",token:generateAccessToken(loginUser.id,loginUser.name,loginUser.ispremiumuser)})
         }

         else{
              res.status(400).json({success:false,message:"Check password incorrect"})
         }

         });
         
             }
if(loginUser==null){
        res.status(404).json({success:false,message:"Users Not Found"})
        }
 } catch (error) {

        res.status(500).json({error,success:false})
        console.log(JSON.stringify(error));
}

}








module.exports={isstringinvalid,postSignup,postLogin,generateAccessToken}
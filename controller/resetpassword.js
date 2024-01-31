const User=require('../models/user');
const UUID=require('uuid');
const sib=require('sib-api-v3-sdk');
const bcrypt=require('bcrypt');
require('dotenv').config();


const Forgotpassword=require('../models/forgotpassword');




const forgotPassword=async(req,res,next)=>{
    try {
        const{email}=req.body;
        const user=await User.findOne({where:{email:email}});
        console.log(user);

        if(user)
        {
        console.log('>>>into if user forgot password ---apikey',process.env.SENDINBLUE_API_KEY);
            const id=UUID.v4();
           
            console.log(user.id);
            await Forgotpassword.create({ id,action:true,userId:user.id});

                 const client=sib.ApiClient.instance;
                 const apiKey=client.authentications['api-key'];
                 apiKey.apiKey=process.env.SENDINBLUE_API_KEY;
    
                 const transEmailApi=new sib.TransactionalEmailsApi();
    
                 const sender={
                    email:'dhinesh4544541@gmail.com',
                    name:'Dhinesh kumar G'
                 }
                 const receivers = [
                    {
                        email: email,
                    },
                ] 
    
                 transEmailApi.sendTransacEmail({
                    sender,
                    to:receivers,
                    subject: 'Reset Password ',
                     textContent: `Follow the link and reset the password `,
                    htmlContent: `<h1>click on the link below to reset the password</h1><br>
                        <a href="http://54.86.187.148:3000/password/resetpassword/${id}">Reset your Password</a>`,
                        params: {
                            role: 'Frontend',
                        },
                    }).then( (response) => {
                        //console.log('after transaction');
                        return res.status(202).json({sucess: true, message: "password mail sent Successful"});
                        console.log('Sent success');
                    }).catch(err => console.log(err)) 
        }
        else{
            throw new Error('User Doesnt exit')
        }
            
    } catch (error) {
        console.error(error)
        return res.json({ message: error, sucess: false });
    }
 }




 const resetpassword = async(req, res) => {
    const id =  req.params.id;
    const forgetpassword=await Forgotpassword.findOne({ where : { id }});
    console.log(forgetpassword);
        if(forgetpassword){
            await Forgotpassword.update({ active: false},{where:{id:forgetpassword.id}});
            res.status(200).send(`<html>
                                    <script>
                                        async function formsubmitted(e){
                                            e.preventDefault();
                                            const res=await axios.get('http://54.86.187.148:3000/password/updatepassword/${id}');
                                              
                                            console.log('res')
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label><br>
                                        <input name="newpassword" type="password" required></input><br>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    
}





const updatepassword = async(req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        const resetpasswordrequest=await Forgotpassword.findOne({ where : { id: resetpasswordid }})
           
        
        const user=await User.findOne({where: { id : resetpasswordrequest.userId}})
                 console.log('userDetails', user)
                if(user) {
                    //encrypt the password
                    let saltRound=10;
                  bcrypt.hash(newpassword,saltRound,async(err,hash)=>{
                    if(err){
                        console.log(err)
                        throw new Error(err)
                    }

                          await User.update({password:hash},{where:{id:user.id}})
                          console.log('password change successfully');
                          res.status(201).json({message: 'Successfuly update the new password'})
                  })
                    
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
        
        
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}

module.exports = {
    forgotPassword,
    updatepassword,
    resetpassword
}

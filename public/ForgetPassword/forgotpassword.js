async function forgetPassword(event)
{
   try {
      const messageElement = document.getElementById('message');
     event.preventDefault();
     const data={
        email:document.getElementById('mailid').value
     }
     const res=await axios.post('http://54.86.187.148:3000/password/forgotpassword',data);

     console.log(res);

     document.getElementById('mailid').value=''
     if (res.status === 202){
      messageElement.textContent='Mail Send Successfully'
     }
     else{
      alert('Emailid Wrong Check Onceagain!')
      messageElement.textContent='Mail Send Unsuccessfully '
     }
   
     

   } catch (error) {
    console.log(error);
   
    document.body.innerHTML+=`<h4>Something went wrong --${error}</h4>`
    
   }

}
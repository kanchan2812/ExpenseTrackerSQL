async function loginUser(event)
{
    try {
          event.preventDefault();

        const email=document.getElementById('emailid').value;
        const password=document.getElementById('passid').value;

        console.log(email,password);


        const loginuser={email,password}

        const res=await axios.post('http://54.86.187.148:3000/user/login',loginuser);
        
        console.log(res.data);
        console.log(res);

        ///note wat we store in data 
        //error
        document.getElementById('emailid').value='';
        document.getElementById('passid').value='';
    


         if (res.status === 202) {
            alert(res.data.message);
      
            localStorage.setItem('token',res.data.token)
            window.location.href="../Expense/expensetracker.html" /////on successfull login
            
          } 
     



          
 
        
    } catch (error) {
                 console.log(error);
         alert(error.response.data.message);
        document.body.innerHTML+= `<div style="colour:red;">${error}</div>`;
    }
}
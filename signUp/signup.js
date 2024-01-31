
console.log('js file connected');

async function signUp(event)
{
try {
    event.preventDefault();
   const name=document.getElementById('nameid').value;
    const email=document.getElementById('emailid').value;
    const phonenumber=document.getElementById('phoneid').value;
    const password=document.getElementById('passid').value;


    const signupDetails=
    {
        name:name,
        email:email,
        phonenumber:phonenumber,
        password:password
     
        ////we can use here get elementbyid.value also
    }

    console.log(signupDetails);

    document.getElementById('nameid').value='';
    document.getElementById('emailid').value='';
    document.getElementById('phoneid').value='';
    document.getElementById('passid').value='';

    const res= await axios.post('http://54.86.187.148:3000/user/signup',signupDetails);
    
    console.log(res);

    if(res.status==201)
    {
        window.location.href="../Login/login.html"  ///on successful 
    }
              
    else 
    {
        throw new Error('Failed to login')
    }

   
} catch (error) {

    document.body.innerHTML+= `<div style="colour:red;">${error}</div>`;
    
}
}
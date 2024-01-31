

console.log('expense js file connected');





async function saveExpenses(event)
{
    event.preventDefault();
    try {
        const amount=document.getElementById('amountid').value;
        const description=document.getElementById('descid').value;
        const category=document.getElementById('categoryid').value;
        const details={amount,description,category};
        const token=localStorage.getItem('token');
         
        console.log(token);

        const res=await axios.post('http://54.86.187.148:3000/expense/addexpenses',details,{headers:{"Authorisation":token}});


        console.log(res.data.newExpense);

        showOnScreen(res.data.newExpense);

        document.getElementById('amountid').value='';
        document.getElementById('descid').value='';
       document.getElementById('categoryid').value='';

    } catch (error) {
        console.log(error);
        document.body.innerHTML+=`<h4>Something went wrong --${error}</h4>`
        
    }
}







function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}







function showPremiumusermessage()
{
    const rzp=document.getElementById('rzp-button').style.display="none";
    //visibility hidden takes space display none takes no space
    document.getElementById('premium').innerHTML+="You are now a Premium User"
   
}











window.addEventListener('DOMContentLoaded',async()=>{


try {

    const token=localStorage.getItem('token')
    const pageSize=localStorage.getItem('pageSize')
    const page =1
    const res = await axios.get(`http://54.86.187.148:3000/expense/getexpenses?page=${page}&pageSize=${pageSize}`,{headers:{"Authorisation":token}});
    const decodetoken= parseJwt(token)
    console.log(decodetoken);

    if(decodetoken.ispremiumuser){
        showPremiumusermessage();
        showleaderBoard();
    }

    listExpense(res.data.allExpenses)
    showPagination(res.data)

} catch (error) {
    console.log(error);
    console.log('error in expressjs in windows.add in frontend');
    document.body.innerHTML+=`<h4>Something went wrong --${error}</h4>`
    
}
    
})







async function deleteExpense(id)
{
    try {
        const token=localStorage.getItem('token');
        const res=await axios.delete(`http://54.86.187.148:3000/expense/delete-expense/${id}`,{headers:{"Authorisation":token}});
        removeUserFromScreen(id);
        
    } catch (error) {
        console.log(error);
        document.body.innerHTML+=`<h4>Something went wrong --${error}</h4>`
    }
}





function removeUserFromScreen(id)
{
    const parentNode=document.getElementById('allExpenselist');

    const childNode=document.getElementById(id);

    parentNode.removeChild(childNode);


}







document.getElementById('rzp-button').onclick=async (e)=>{
    const token = localStorage.getItem('token');
    const res=await axios.get('http://54.86.187.148:3000/purchase/premiummembership',{headers:{"Authorisation":token}});
    console.log(res);
    console.log(res.razorpay_payment_id);
    var options={
        "key":res.data.key_id,
        "order_id":res.data.order.id,
        ///this handler will handle the success payement 
//       
// //////{razorpay_payment_id: 'pay_MAvMLK2DcEj5CO', razorpay_order_id: 'order_MAvM4IfpeJxOwC', razorpay_signature: '5bb4d69b4a4fcab1ea4e78cffd775116524a8ce7d094dda7715ab023d4e9e7b2'}
// razorpay_order_id
// : 
// "order_MAvM4IfpeJxOwC"
// razorpay_payment_id
// : 
// "pay_MAvMLK2DcEj5CO"
// razorpay_signature
// : 
// "5bb4d69b4a4fcab1ea4e78cffd775116524a8ce7d094dda7715ab023d4e9e7b2"
// [[Prototype]]
// : 
// Object
       
        "handler":async function(res)

    
        {

            console.log(res);
            const response=await axios.post('http://54.86.187.148:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:res.razorpay_payment_id},
                {headers:{"Authorisation":token}})
               
                alert('You are a Premium User Now');
               showPremiumusermessage();
                console.log(response);
                localStorage.setItem('token',response.data.token)
                showleaderBoard();


                // const rzp=document.getElementById('rzp-button');
                // const premium=document.getElementById('premium');

                // const appendChild=document.createElement('h4');
                // appendChild.textContent='You are now a Premium User';
                // premium.removeChild(rzp)
                // premium.appendChild(appendChild);
        }
    };

            const rzp1=new Razorpay(options);
            rzp1.open();
            e.preventDefault();
            rzp1.on('payment.failed',function(res){
            console.log(res);
            alert('Something Went Wrong')
    })

}





function showleaderBoard()
{
    const inputElement=document.createElement('input');
    inputElement.type='button';
    inputElement.value='Show Leaderboard';
    inputElement.style.backgroundColor='gold';
    inputElement.style.color='black';
    inputElement.style.borderRadius='15px';
    inputElement.style.padding='8px';





    inputElement.onclick=async()=>{
    const token = localStorage.getItem('token');
    const userLeaderboardArray=await axios.get('http://54.86.187.148:3000/premium/showLeaderBoard',{headers:{"Authorisation":token}});
    console.log(userLeaderboardArray);



    let leaderboardElement=document.getElementById('leaderboard');
    leaderboardElement.innerHTML='<h4>LeaderBoard</h4>';
    const data=userLeaderboardArray.data.userLeaderBoardDetails;
    data.forEach((user)=>{
    leaderboardElement.innerHTML+=`<li>Name:${user.name} TotalExpense:${user.totalExpenses}`
   })


}

document.getElementById('premium').appendChild(inputElement);

}



async function download(){
    try {
        const token = localStorage.getItem('token');
        console.log("enetr download  function in try block");

        const response = await axios.get('http://54.86.187.148:3000/user/download',{headers:{"Authorisation":token}});
        console.log(response);
        console.log(response.data.fileUrl);
        if (response.status === 200) {
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'MyExpense.csv';
            a.click();
            alert('You successfully downloaded the file');
        }
    
} catch (error) {
        console.log("error in expense.js download catch");
        console.log(error);
        
    }
}



///page
async function pageSize(val){
    try {
        const token = localStorage.getItem('token');
        localStorage.setItem('pageSize',val);
        const page=1
        const res = await axios.get(`http://54.86.187.148:3000/expense/getexpenses?page=${page}&pageSize=${val}`,{headers:{"Authorisation":token}});
      console.log('success');
        console.log(res);
        console.log(res.data.allExpenses);
        listExpense(res.data.allExpenses)
        showPagination(res.data);
    } catch (error) {
        console.log(error);
    }
}




async function showPagination({currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,lastPage}){
    try{
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = ''
        if(hasPreviousPage){
            const btn2 = document.createElement('button')
            btn2.innerHTML = previousPage
            btn2.addEventListener('click', ()=>getProducts(previousPage))
            pagination.appendChild(btn2)
        }
        const btn1 = document.createElement('button')
        btn1.innerHTML = currentPage
        btn1.addEventListener('click',()=>getProducts(currentPage))
        pagination.appendChild(btn1)

        if (hasNextPage){
            const btn3 = document.createElement('button')
            btn3.innerHTML = nextPage
            btn3.addEventListener('click',()=>getProducts(nextPage))
            pagination.appendChild(btn3)

        }
        if (currentPage!==1){
            const btn4 = document.createElement('button')
            btn4.innerHTML = 'main-page'
            btn4.addEventListener('click',()=>getProducts(1))
            pagination.appendChild(btn4)

        }

    }
    catch(err){
        console.log(err)
    }
}





async function getProducts(page){
    try {
        const token = localStorage.getItem('token');
        const pageSize = localStorage.getItem('pageSize')
    
        const res = await axios.get(`http://54.86.187.148:3000/expense/getexpenses?page=${page}&pageSize=${pageSize}`,{headers:{"Authorisation":token}});
        console.log(res);
        console.log(res.data.allExpenses);
        listExpense(res.data.allExpenses)
        showPagination(res.data);
    } catch (error) {
        console.log(error);
    }
}

 
async function listExpense(data){
    try {

        const parentNode=document.getElementById('allExpenselist');
        ///clear the existing expense 
        parentNode.innerHTML='';
        console.log(data);

        for(i in data){
            showOnScreen(data[i])
        }
        
    } catch (error) {
        console.log('error in list expense in frontend ', error);
    }
}


function showOnScreen(user)   
{
    const parentNode=document.getElementById('allExpenselist');

    const childNode= `<li id="${user.id}">${user.amount}--${user.description}--${user.category}
    <button class="btn btn-danger" onclick="deleteExpense(${user.id})">DeleteExpense</button></li>`

    parentNode.innerHTML+=childNode;
}
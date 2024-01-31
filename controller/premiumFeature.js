const User=require('../models/user');
const Expense=require('../models/expenses');
const Order=require('../models/orders');
const sequelize=require('../Utils/database');


 const getUserLeaderBoard=async (req,res,next)=>{

    try {
      ///if u choose specific pick the icolumn by attributes it will be run fastly
   //    const userLeaderBoardDetails=await User.findAll({attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
   
   //    include:[{
   //       model:Expense,
   //       attributes:[]
   //    }],
   //    group:['user.id'],
   //    Order:['total_cost','DESC']
   
   
   
   // });



   ///orelse we dont give attributes because in frontend we choose what we want
   const userLeaderBoardDetails=await User.findAll({ 
      order:[['totalExpenses', 'DESC']],
   
   });


//       const userAggregatedExpenses=await Expense.findAll({
//          attributes:['userId',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
//    group:['userID']
// });
// console.log(userAggregatedExpenses);
//       const userAggregatedExpenses={}; 

//       expenses.forEach((expense)=>{
//          if(userAggregatedExpenses[expense.userId])
//          {
//             userAggregatedExpenses[expense.userId]+=expense.amount;
   
//          }
//          else
//          {
//             userAggregatedExpenses[expense.userId]=expense.amount
//          }
//       })

    
// console.log(userAggregatedExpenses);
//       let userLeaderBoardDetails=[];
//       users.forEach((user)=>{
// userLeaderBoardDetails.push({name:user.name,total_cost:userAggregatedExpenses[user.id]||0});

//       })
//       console.log(userLeaderBoardDetails);
//       userLeaderBoardDetails.sort((a,b)=>b.total_cost-a.total_cost)
      res.status(200).json({userLeaderBoardDetails})

    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
 }


 module.exports={getUserLeaderBoard};
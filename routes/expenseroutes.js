const express=require('express')

const routes=express.Router();

const expenseController=require('../controller/expenseController');
const userAuthenticate=require('../middleware/authenticate');

routes.post('/addexpenses',userAuthenticate.authenticate,expenseController.addexpense);
routes.get('/getexpenses',userAuthenticate.authenticate,expenseController.getexpense);
routes.delete('/delete-expense/:id',userAuthenticate.authenticate,expenseController.deleteExpense);

module.exports=routes;
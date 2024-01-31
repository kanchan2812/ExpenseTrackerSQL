const express=require('express');

const routes=express.Router();

const expenseController=require('../controller/expenseController')
const loginsignupController=require('../controller/loginsignupController');
const userAuthenticate=require('../middleware/authenticate');



routes.post('/signup',loginsignupController.postSignup);

routes.post('/login',loginsignupController.postLogin);

routes.get('/download',userAuthenticate.authenticate,expenseController.downloadexpense)





module.exports=routes;
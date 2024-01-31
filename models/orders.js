const Sequelize=require('sequelize');

const sequelize=require('../Utils/database');

const Order=sequelize.define('order',{

    id:
    {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    status:Sequelize.STRING,

});

module.exports=Order;
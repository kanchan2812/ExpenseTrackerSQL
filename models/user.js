const Sequelize=require('sequelize');
const sequelize=require('../Utils/database')

const User=sequelize.define('user',{

    id:
    {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    name:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    email:
    {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,

    },
    phonenumber:
    {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:
    {
     type:Sequelize.STRING,
     allowNull:false   
    },
    ispremiumuser:
    {
        type:Sequelize.BOOLEAN,
     
    },
    totalExpenses:
    {
        type:Sequelize.INTEGER,
        defaultValue:0
    }
    

});

module.exports=User;
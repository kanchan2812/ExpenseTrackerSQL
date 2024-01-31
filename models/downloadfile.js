const Sequelize=require('sequelize');

const sequelize=require('../Utils/database');

const DownloadedFile = sequelize.define('file',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    
   url:Sequelize.STRING,
   userId:Sequelize.INTEGER

});

module.exports = DownloadedFile;
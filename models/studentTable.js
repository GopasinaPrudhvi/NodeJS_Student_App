var sequelize = require('sequelize');
var moment = require('moment-timezone');
var studentCon = require('../connections/studentCon');

var studenttable = studentCon.define('students', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    rollNo: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    mail: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    // createdAt: {
    //     type: sequelize.DATE,
      
    // },
    // updatedAt: {
    //     type: sequelize.DATE,

    // },
    // // timestamps: false,
    // // paranoid: true,
});
module.exports = studenttable;

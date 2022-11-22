var sequelize = require('sequelize');
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
    }
});
module.exports = studenttable;
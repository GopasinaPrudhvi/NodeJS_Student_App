var sequelize = require('sequelize');
var config = require("../config/dbConfig.json")

var myConnection = new sequelize(config.mysqlDB.db, config.mysqlDB.username, config.mysqlDB.password, {
    dialect: config.mysqlDB.dialect,
    host: config.mysqlDB.host
});

myConnection.authenticate()
    .then(() => {
        console.log('DB connected');
    }).catch(() => {
        console.log('DB not connected');
    })

myConnection.sync({ force: false })
    .then((result) => {
        console.log('Student table created');
    }).catch((err) => {
        console.log(err);
    });

module.exports = myConnection;
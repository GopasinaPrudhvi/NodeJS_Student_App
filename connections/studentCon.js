var sequelize = require('sequelize');
var myConnection = new sequelize('node_kt', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

myConnection.authenticate()
    .then(() => {
        console.log('DB connected');
    }).catch(() => {
        console.log('DB not connected');
    })

myConnection.sync({ force: false })
    .then((result) => {
        console.log('Student table created', result);
    }).catch((err) => {
        console.log(err);
    });

module.exports = myConnection;
let express = require('express');
let app = express();
let bodyparser = require('body-parser');
app.use(bodyparser.json());
let Sequelize = require('sequelize');

let sequelize = new Sequelize('node_kt', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});
sequelize.authenticate()
    .then(() => {
        console.log("connection has been established successfully.");
    })
    .catch(err => {
        console.log("unable to connect to the database: ", err);
    });
//creating table in mysql using sequelize
let studenttable = sequelize.define('students', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rollNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
sequelize.sync({ force: false })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
// insert data into table/database
app.post('/student', (req, res) => {
    studenttable.create({
        name: req.body.name,
        rollNo: req.body.rollNo,
        city: req.body.city
    })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})
// get data from table/database
app.get("/student", (req, res) => {
    studenttable.findAll({})
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})
// delete data from table/database
app.delete("/student", (req, res) => {
    studenttable.destroy({ where: { id: req.body.id } })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})
// update data from table/database
app.put("/student", (req, res) => {
    studenttable.update(
        { name: req.body.name ,
        rollNo: req.body.rollNo ,
         city: req.body.city ,
        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send({msg:"successfully updated "})
        })
        .catch((error) => {
            res.send(error)
        })
})
app.listen('7000', () => {
    console.log('Server Started ........');
})
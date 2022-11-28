var joi = require('joi');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var logger = require('../utills/studentLoggers');
let swaggerUI = require('swagger-ui-express');
var studentTable = require('../models/studentTable');
var moment = require('moment-timezone');

var studentReg = async (req, res) => {

    var passValue = req.body.password;
    const salt = await bcrypt.genSalt(10);
    passValue = await bcrypt.hash(passValue, salt)

    console.log('serv');
    studentTable.create({
        name: req.body.name,
        rollNo: req.body.rollNo,
        mail: req.body.mail,
        city: req.body.city,
        password: passValue,
    })
        .then(() => {
            logger.studentLogger.log('info', 'Successfully registered Student')
            res.send("Student registered Successfully");
            console.log("data")
            // next()
        })
        .catch((err) => {
            logger.studentLogger.log('error', 'error while registing Student')
            res.send({ msg: "error in registering!!!" })
            // next()
        })
}


let studentLog = async (req, res) => {

    await studentTable.findOne({ where: { mail: req.body.mail } })
        .then(async (response) => {
            let compare = await bcrypt.compare(req.body.password, response.password)
            if (response == null) {
                res.status(400).send('cannot find user')
            }
            if (req.body.mail == response.mail && compare) {
                let stdData = { mail: req.body.mail, password: req.body.password }
                let stdToken = jwt.sign(stdData, 'secretKey');
                res.status(200).send({ msg: `${response.name} Successfully logged in`, token: stdToken })
            }
            else {
                res.send({ msg: "invalid credientials" })
            }
        })
        .catch((err) => {
            res.status(401).send("Wrong credentials!", err)
        })
}
arrayData = [];
let findStudents = (req, res) => {
    studentTable.findAll()
        .then(async (data) => {
            this.arrayData = data;
            this.arrayData.map((element) => {

                var createdAt = (moment.tz(element.createdAt, "America/New_York").format('llll'));
                var updatedAt = (moment.tz(element.updatedAt, "America/New_York").format('llll'));
                // console.log('us date', updatedAt);
                // updatedUS.push(element['dataValues']['updatedUS'])
                element.dataValues.createdAt = createdAt;
                element.dataValues.updatedAt = updatedAt;
                // console.log('++++++++++++++++++++++++++++++++++++++', this.arrayData);

            })
            await res.send(this.arrayData)
            // this.arrayData.forEach(element => {
            //     var updatedAt = (moment.tz(element.updatedAt, "America/New_York").format('llll'));
            //     element['dataValues']['updatedUS'] = updatedAt;
            //     console.log("element",element);
            //     // console.log('++++++++++++++++++++++++++++++++++++++',this.arrayData);
            // });
            // console.log(this.arrayData);      
        })
        .catch((error) => {
            res.status(400).send(error)
        })

}

let removeStudent = (req, res) => {
    studentTable.destroy({ where: { id: req.body.id } })
        .then(() => {
            res.send("Successfully Remove Student")
        })
        .catch((error) => {
            res.status(501).send(error)
        })
}

let updateStudent = async (req, res) => {
    studentTable.update(
        {
            name: req.body.name,
            rollNo: req.body.rollNo,
            mail: req.body.mail,
            city: req.body.city,
            password: await bcrypt.hash(req.body.password, 10)
        },
        { where: { id: req.body.id } }
    )
        .then(() => {
            res.send("Successfully Updated Student")
        })
        .catch((error) => {
            res.status(501).send(error)
        })
}
module.exports = { studentReg: studentReg, studentLog: studentLog, findStudents: findStudents, removeStudent: removeStudent, updateStudent: updateStudent }

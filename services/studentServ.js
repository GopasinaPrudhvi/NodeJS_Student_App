var joi = require('joi');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var logger = require('../utills/studentLoggers');
let swaggerUI = require('swagger-ui-express');
var studentTable = require('../models/studentTable');
// var studentSchemaValid = require('../schemas/stdTableValid')


let studentReg = async  (req, res, next) => {
    console.log("err",req)
                var passValue = req.body.password;
                const salt = await bcrypt.genSalt(10);
                passValue = await bcrypt.hash(passValue, salt)
                console.log("hi")
                studentTable.create({
                    name: req.body.name,
                    rollNo: req.body.rollNo,
                    mail: req.body.mail,
                    city: req.body.city,
                    password: passValue,
                })
                    .then((data) => {
                        logger.studentLogger.log('info', 'Successfully registered Student')
                        res.send("Student registered Successfully");
                        console.log(data)
                        next(data)
                    })
                    .catch((err) => {
                        logger.studentLogger.log('error', 'error while registing Student')
                        res.send({ msg: "error in registering!!!" })
                       
                        next(err)
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

let removeStudent = (req, res) => {
    studentTable.destroy({ where: { id: req.body.id } })
        .then((data) => {
            res.send(data)
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
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(501).send(error)
        })
}
module.exports = {studentReg:studentReg,  studentLog:studentLog, removeStudent:removeStudent, updateStudent:updateStudent }
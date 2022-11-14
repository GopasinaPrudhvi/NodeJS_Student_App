var studentTable = require('../models/studentTable');
var joi = require('joi');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var logger = require('../services/studentLoggers');
let swaggerUI = require('swagger-ui-express');


let studentReg = async (req, res) => {
    let validStudent = joi.object({
        name: joi.string().required(),
        rollNo: joi.number().required(),
        mail: joi.string().email().required(),
        city: joi.string().required(),
        password: joi.string().min(8).required(),
    })
    let validStudentData = validStudent.validate(req.body)
    if (validStudentData.error) {
        res.sendStatus(400).send(validStudentData.error.details[0].message)
    }
    else {
        var passValue = req.body.password;
        const salt = await bcrypt.genSalt(10);
        passValue = await bcrypt.hash(passValue, salt)
        // console.log(passValue);
        studentTable.create({
            name: req.body.name,
            rollNo: req.body.rollNo,
            mail: req.body.mail,
            city: req.body.city,
            password: passValue,
        })
            .then((data) => {
                logger.studentLogger.log('info', 'Successfully registered Student')
                res.send(data);
            })
            .catch((err) => {
                logger.studentLogger.log('error', 'error while registing Student')
                res.send({ msg: "mail is already in use!!!" }, err)
            })
    }
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
            password: await bcrypt.hash(req.body.password,10)
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
module.exports = { studentReg, studentLog, removeStudent, updateStudent }
let Joi = require('joi');
var service=require('../services/studentServ')
var stdValidating = function (req, res, next) {
        var studentSchema = Joi.object({
                name: Joi.string().required(),
                rollNo: Joi.number().required(),
                mail: Joi.string().email().required(),
                city: Joi.string().required(),
                password: Joi.string().min(8).required()
        });
        var data = studentSchema.validate(req.body)
        if (data.error) {
                res.status(400).send(data.error.details[0].message)
                console.log('data as error');
        }
        else {
                service.studentReg(req, res)
                // res.send("vallidated");
                // // next()
                // console.log('valid data');
        }
}
module.exports = { stdValidating: stdValidating }
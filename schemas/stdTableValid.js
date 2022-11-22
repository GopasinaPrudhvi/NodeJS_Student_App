let Joi = require('joi');
console.log("validated")
var stdValidating = function (req, res) {
console.log("hi");
var studentSchema = Joi.object({
        name: Joi.string().required(),
        rollNo: Joi.number().required(),
        mail: Joi.string().email().required(),
        city: Joi.string().required(),
        password: Joi.string().min(8).required()

});
console.log('studentSchema',req.body);
       var data = studentSchema.validate(req.body)
       console.log('dataaaa',data.error.details[0].message);
        if (data.error) {
                console.log("valid")
               return res.status(400).send(data.error.details[0].message)
              
        }
         else{
                console.log("validated")
              
                // res.send(data)
              
        }
}
module.exports = {stdValidating:stdValidating}
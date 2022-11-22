var jwt = require('jsonwebtoken');

var stdToken = (req, res, next) => {
    try {
        var token = jwt.sign({ data: 'student' }, "STUDENT_KEY");
        res.status(200).send({
            "info": "token generated successfully",
            "token": token
        })
    }
    catch (err) { next(err) }
}
module.exports = { stdToken: stdToken }
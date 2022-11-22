var jwt = require('jsonwebtoken');

var verifyStdToken = (req, res, next) => {
    var token = req.header('stdToken');
    try {
        const verifyed = jwt.verify(token, "STUDENT_KEY") 
        if (verifyed) {
            console.log("working");
            // res.send("working");
            next();
        } else {
            res.status(401).send({
                "info": "Failed to verify token.",
            });
        }
    } catch {
        res.status(401).send({
            "info": "Failed to verify token."
        });
    }
}

module.exports = { verifyStdToken: verifyStdToken }
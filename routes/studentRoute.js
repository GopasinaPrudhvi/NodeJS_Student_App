var express = require('express');
var router = express.Router();
var studentService = require('../services/studentServ');
var registerSchema = require('../schemas/stdTableValid')
var stdToken = require('../services/stdToken')
var verifyStdToken = require('../middleware/verifyStdToken')
var expressJoi = require('express-joi-validation').createValidator({
    passError: true
});

router.get('/stdToken', stdToken.stdToken)
router.post('/studentreg', verifyStdToken.verifyStdToken, registerSchema.stdValidating, studentService.studentReg);
router.post('/studentlog', verifyStdToken.verifyStdToken, studentService.studentLog);
router.delete('/studentdel', verifyStdToken.verifyStdToken, studentService.removeStudent);
router.put('/studentup', verifyStdToken.verifyStdToken, studentService.updateStudent);

module.exports = router;
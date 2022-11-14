var express = require('express');
var router = express.Router();
var studentService = require('../services/studentServ');

router.post('/studentreg', studentService.studentReg);
router.post('/studentlog', studentService.studentLog);
router.delete('/studentdel', studentService.removeStudent);
router.put('/studentup', studentService.updateStudent);

module.exports = router;
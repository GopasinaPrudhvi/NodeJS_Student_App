const { createLogger, transports, format } = require('winston');
//logging function
const studentLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'student.log',
            level: 'info',
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename: 'student-error.log',
            level: 'error',
            format: format.combine(format.timestamp(),format.json())
        })
    ]
})

module.exports = {studentLogger}
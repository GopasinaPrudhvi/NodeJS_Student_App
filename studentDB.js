let mongoose = require('mongoose');
let express = require('express')
let app = express()
let bodyParser = require('body-parser');
app.use(bodyParser.json())

var myDBCon = mongoose.connect('mongodb://localhost:27017/myMongoDb', (err) => {
    if (err) console.log('MongoDB is not connected');
    else console.log(err, ' MongoDB is connected');
})

var studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    course: {
        type: String
    },
    city: {
        type: String
    }
});
var student = mongoose.model('student', studentSchema);

app.post('/studentdata', (req, res) => {
    let data = new student({
        name: req.body.name,
        age: req.body.age,
        course: req.body.course,
        city: req.body.city
    })
    data.save((err, data) => {
        if (err) console.log(err);
        else res.send(data)
    })
})

app.get('/studentdata', (req, res) => {
    student.find((err, data) => {
        if (err) {console.log(err); res.send(err)}
        else res.send(data)
    })
})

app.delete('/studentdata/:name', (req, res) => {
    student.findOneAndDelete({ name: req.params.name }, (err, data) => {
        if (err) console.log(err);
        else res.send(data)
    })
})

app.put('/studentdata', (req, res) => {
    student.updateMany(
        { name: req.body.name },
        { $set: { age: req.body.age, course: req.body.course, city: req.body.city } },
        (err, data) => {
            if (err) console.log(err);
            else res.send(data)
        })
})


app.listen('1010', () => {
    console.log('Server running .....');
})
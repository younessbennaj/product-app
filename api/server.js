var express = require('express');

var app = express();

//Permet de traité les requêtes passées au format JSON
app.use(express.json())

// api/phones routes
const phoneRouter = require('./routes/Phones');

app.get('/', function (req, res) {
    res.send('hello world')
})

app.use('/api/phones', phoneRouter);

app.listen(5000, 'localhost', () => {
    console.log('Server on port 5000');
});
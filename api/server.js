var express = require('express');

const MongoClient = require('mongodb').MongoClient;

var app = express();

//Url de notre Cluster sur mongodb Atlas Cloud
const uri = "mongodb+srv://dbUser:dbUserPassword@productapp.4nxit.mongodb.net/<dbname>?retryWrites=true&w=majority";

//Le nom de notre base de donnée 
const dbName = "shop";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Connection au serveur de notre base de donnée
client.connect(err => {
    if (err) console.log(err);
    else {
        console.log('connected');
        //On récupère la collection "phones" de notre base de donnée "shop"
        //const collection = client.db(shop).collection("phones");

        //On termine la connection
        client.close();
    }
});

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(5000, 'localhost', () => {
    console.log('Server on port 5000');
});
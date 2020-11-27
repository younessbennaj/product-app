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
    if (err) console.log('Failed to connect');
    else {
        //La connection au serveur est un succès
        console.log("Connected correctly to server");
        //On récupère la collection "phones" de notre base de donnée "shop"
        const collection = client.db(dbName).collection("phones");

        //On contruit notre document qui représente un téléphone en base de donnée
        //On laisse mongoDB ajouter le champ _id à chaque document
        let phone = {
            "name": "AC1 Phone1",
            "type": "phone",
            "price": 200.05,
            "rating": 3.8,
            "warranty_years": 1,
            "available": true
        }

        //On ajoute un seul document 
        collection.insertOne(phone).then((err, result) => {
            console.log('Document successfully added to the collection');

            //On termine la connection
            client.close();
        })


    }
});

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(5000, 'localhost', () => {
    console.log('Server on port 5000');
});
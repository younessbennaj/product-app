//Notre module qui contient les méthodes isolées pour travailler avec mongoDB et notre base de donnée
const MongoClient = require('mongodb').MongoClient;

//Url de notre Cluster sur mongodb Atlas Cloud
const uri = "mongodb+srv://dbUser:dbUserPassword@productapp.4nxit.mongodb.net/<dbname>?retryWrites=true&w=majority";

//Le nom de notre base de donnée 
const dbName = "shop";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

function connect(cb) {
    //Connection au serveur de notre base de donnée
    client.connect(err => {
        if (err) console.log('Failed to connect');

        else {
            //La connection au serveur est un succès
            console.log("Connected correctly to server");
            //On récupère notre base de donnée "shop"

            db = client.db(dbName);

            //Ici ajoute le code pour travailler avec la collection "phones"

            //A cause du comportement asynchrone de connect() on va travailler avec une 
            //fonction de callback qui contient le code à executer une fois notre API
            //connectée au serveur de notre base de donnée et une fois que celle ci est
            //recupérée 

            //On passe notre base de donnée à la fonction de callback
            cb(db);

        }
    });
}

module.exports = { connect };
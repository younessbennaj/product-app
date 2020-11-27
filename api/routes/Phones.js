//Module qui nous permet de gérer les routes des points finaux d'URI /api/phones
var express = require('express')
var app = express();

var router = express.Router();

//Méthode GET sur la route '/api/phones' : Permet de récupérer la collection de produits de type "phone"
app.get('/api/phones', function (req, res) {
    connect(db => {
        //On récupère notre collection "phones"
        const collection = db.collection("phones");

        //On récupère tous les documents de notre collection
        //On convertit notre collection en un tableau
        collection.find({}).toArray(function (err, docs) {
            res.send(docs);
        });
    })
})

module.exports = router;
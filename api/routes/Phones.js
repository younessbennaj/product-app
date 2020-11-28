//Module qui nous permet de gérer les routes des points finaux d'URI /api/phones
var express = require('express')
var app = express();

//Object Id utils 
const ObjectId = require('mongodb').ObjectId;

// Méthode pour se connecter à mongoDB et à la base de donnée
const { connect } = require('../db');

var router = express.Router();

//Méthode GET sur la route '/api/phones' : Permet de récupérer la collection de produits de type "phone"
router.get('/', function (req, res) {
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

//Méthode GET sur la route '/api/phones' : Permet de récupérer le produit de type "phone" avec l'id corresponsant 
router.get('/:_id', function (req, res) {
    connect(db => {
        const collection = db.collection("phones");

        //Comme on laisse mongoDB renseigner le champ _id, il ajouter un Id représenter par un objet ObjectId()
        //On doit donc utiliser le contructeur ObjectId() pour qu'il nous retourne un objet qui correspond à un Id en base de donnée
        collection.find({ _id: ObjectId(req.params._id) }).next((err, doc) => {
            res.send(doc);
        })
    })
})

router.post('/', function (req, res) {
    connect(db => {
        const collection = db.collection("phones");

        //On contruit notre document qui représente un téléphone en base de donnée
        //On laisse mongoDB ajouter le champ _id à chaque document
        let phone = {
            "name": req.body.name,
            "type": "phone",
            "price": req.body.price,
            "rating": req.body.rating,
            "warranty_years": req.body.warranty_years,
            "available": req.body.available
        }

        collection.insertOne(phone, function (error, response) {
            if (error) {
                console.log('Error occurred while inserting');
                //On retourne le document qu'on vient d'insérer dans la collection
                res.send({ message: "Error occurred while inserting" })
            } else {
                console.log('inserted record', response.ops[0]);
                res.send(response.ops[0])
            }
        });
    })
})


module.exports = router;
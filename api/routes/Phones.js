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
            res.send(JSON.stringify(docs));
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
            res.send(JSON.stringify(doc));
        })
    })
})

//Méthode POST sur la route '/api/phones' : Permet de créer un produit de type "phone" dans la base de donnée
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
                //On retourne un message d'erreur
                res.send({ message: "Error occurred while inserting" })
            } else {
                console.log('inserted document', response.ops[0]);
                //On retourne le document qu'on vient d'insérer dans la collection
                res.send(JSON.stringify(response.ops[0]))
            }
        });
    })
})

//Méthode PUT sur la route '/api/phones/:_id' : Permet de mettre à jour un produit de type "phone" dans la base de donnée
router.put('/:_id', function (req, res) {
    connect(db => {
        const collection = db.collection("phones");

        //On met à jour notre document en utilisant le filtre de query sur l'id récupéré en paramètres de la requête
        collection.updateOne({ _id: ObjectId(req.params._id) }, { $set: req.body }, function (error, response) {
            if (error) {
                console.log('Error occurred while updating');
                //On retourne un message d'erreur
                res.send({ message: "Error occurred while updating" })
            } else {
                console.log('Product updated');
                //On retourne un message de succès
                res.send(JSON.stringify({ message: 'Product updated' }));
            }
        }
        )
    })
})

//Méthode DELETE sur la route '/api/phones/:_id' : Permet de supprimer un produit de type "phone" dans la base de donnée
router.delete('/:_id', function (req, res) {
    connect(db => {
        const collection = db.collection("phones");
        // console.log(req.params._id);
        // res.send('deleted');
        //On supprime notre document en utilisant le filtre de query sur l'id récupéré en paramètres de la requête
        collection.deleteOne({ _id: ObjectId(req.params._id) }, function (error, response) {
            if (error) {
                console.log('Error occurred while updating');
                //On retourne un message d'erreur
                res.send({ message: "Error occurred while deleting" })
            } else {
                console.log('Product deleted');
                //On retourne un message de succès
                res.send(JSON.stringify({ message: 'Product deleted' }));
            }
        }
        )
    })
})


module.exports = router;
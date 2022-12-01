const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected')

    const dbName = 'myproject';
    const db = client.db(dbName);

    var name = 'user' + Math.floor(Math.random()*1000);
    var email = name + '@mit.edu';

    var collection = db.collection('customer');
    var doc = {
        "name": name, 
        "email": email
    };
    
    collection.insertOne(doc, {w:1}, function(err, result){
        console.log('Document insert');


        var customers = db
            .collection('customer')
            .find()
            .toArray(function(err, docs) {
                console.log('Collection:', docs);

                client.close();
            });

            
    });

    

});
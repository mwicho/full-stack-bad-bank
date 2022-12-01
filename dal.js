const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@myproject.7gk7w.mongodb.net/?retryWrites=true&w=majority`;
let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected successfully to db server');

    db = client.db('myproject');
});

function create(name, email, password){
    return new Promise((resolve, reject)=>{
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

// email/password combination
function login(userEmail, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');

        collection.findOne({email: userEmail}, function(err, doc) {
            if (err) reject(err);

            if (doc) {
                if (doc.password == password) {
                    resolve({token: userEmail});
                }
            }

            resolve({msg: false});
        });
    });
}

function balance(userEmail){
    return new Promise((resolve, reject) =>{
        const collection = db.collection('users');

        collection.findOne({email: userEmail}, function(err, doc) {
            if (err) reject(err);

            if (doc) {
                resolve({balance: doc.balance});
            }
        });
    });
}

function depositOrWithdraw(userEmail, newBalance) {
    return new Promise((resolve, reject) =>{
        const collection = db.collection('users');

        collection.updateOne({email: userEmail}, {$set: {"balance": newBalance}} )
        .then((obj) => {
            resolve({countModified: obj.modifiedCount});
        })
        .catch((err) => {
            resolve(err);
        });
    });
}

function all(){
    return new Promise((resolve, reject) => {
        const customers = db    
            .collection('users')
            .find({})
            .toArray(function(err, doc) {
                err ? reject(err) : resolve(doc);
        });
    })
}

module.exports = {create, all, login, balance, depositOrWithdraw};

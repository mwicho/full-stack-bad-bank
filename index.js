var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');


app.use(express.static('public'));
app.use(cors());

// const firebaseConfig = 
// {
//   apiKey: "AIzaSyB3GxJMJC1InN-SLNR6tsklpgpS2SaD8bc",
//   authDomain: "fullstackbank-581ef.firebaseapp.com",
//   projectId: "fullstackbank-581ef",
//   storageBucket: "fullstackbank-581ef.appspot.com",
//   messagingSenderId: "552845650588",
//   appId: "1:552845650588:web:5f9b05494fec22880c9b59",
//   measurementId: "G-EHH282LQJV"
// };

// const firebaseApp = initializeApp(firebaseConfig);

app.get('/account/loginWithGoogle/', function(req, res) {
    dal.googleLogin()
    .then((token) => {
        console.log(token);
        res.send(token);
    });
});

app.get('/account/balance/:email/', function (req, res) {
    dal.balance(req.params.email).
        then((msg) => {
            res.send(msg);
        });
});

app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email,req.params.password).
        then((msg) => {
            res.send(msg);
        });
});

app.get('/account/depositOrWithdraw/:email/:newBalance', function (req, res) {
    dal.depositOrWithdraw(req.params.email, req.params.newBalance).
        then((msg) => {
            res.send(msg);
        });
});

app.get('/account/all', function(req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});


var port = 3000;
app.listen(port);
console.log('Running on port:' + port);
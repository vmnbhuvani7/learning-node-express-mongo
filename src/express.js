const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080
var router = express.Router()
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
const client = new MongoClient(url);

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware
var cb0 = (req, res, next) => {
    console.log('CB0')
    next()
}

var cb1 = (req, res, next) => {
    console.log('CB1')
    next()
}

// Every api call first run 
// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
// })

// middleware + every api call first
var myLogger = function (req, res, next) {
    // console.log('LOGGED')
    next()
}

//check all api call
app.use(myLogger)

// acess public folder html file image or static thing
app.use('/static', express.static('public'))

// req method
// :id? it is not compalsary write id and only write :id means compalsary write id filed.
app.get('/profile/:id', (req, res) => {
    console.log("req.body", req.query);
    res.send('Hello from D!' + req.params.id)
})

app.get('/route', (req, res) => {
    console.log("req.route", req.route);
    // res.send('route')
    res.status(200).send('done')
})

app.get('/query', (req, res) => {
    //insert in url be like ...:8080/query?name=vmn
    console.log("req.body", req.query);
    res.send('query')
})

app.get('/cookie', (req, res) => {
    console.log("@@@@@@@");
   let data = res.cookie('session_id', 12345)
    res.send('query')
    console.log("data",data);
})

app.get('/', cb0, cb1, (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
}, (req, res) => {
    res.send('Hello from D!')
})

// myLogger check only this api call when we write inside the function call
app.get('/home', myLogger, (req, res) => {
    fs.readFile('home.txt', "utf-8", (err, data) => {
        if (err) throw err;
        res.send(data)
    });
})

app.get('/getData', (req, res) => {
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
        });
        client.close();
    });
    res.end()
})

app.post('/post', (req, res) => {
    // console.log("req.body", req.body);

    // fs.appendFile('home.txt', ' append data', (err) => {
    //     if (err) throw err
    // })
    // fs.readFile('home.txt', "utf-8", (err, data) => {
    //     if (err) throw err;
    //     res.send(data);
    // });
    // res.end()
    res.send('Got a post request')
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        collection.insertOne({ name: "vmn" }, () => {
            console.log('Insert 3 documents into the collection');
        });
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
        });
        client.close();
    });
    res.end()
})

app.put('/put', function (req, res) {
    res.send('Got a PUT request')
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('documents');

        collection.updateOne({ name: "vmn" }, { $set: { name: "vaman" } }, () => {
            console.log('Inserted 3 documents into the collection');
        });

        collection.find({}).toArray((err, docs) => {
            console.log(docs);
        });
        client.close();
    });
})

app.patch('/patch', function (req, res) {
    res.send('Got a patch request')
})

app.delete('/delete', function (req, res) {
    res.send('Got a DELETE request')
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        collection.deleteOne({ name: "vaman" }, () => {
            console.log('deleted 3 documents into the collection');
        });
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
        });
        client.close();
    });
})

// Use connect method to connect to the server
// client.connect((err) => {
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);

//     // Get the documents collection
//     const collection = db.collection('documents');

//     // collection.deleteMany({ a: 3 }, () => {
//     //     console.log('Inserted 3 documents into the collection');
//     // });

//     // Insert some documents
//     // collection.insertOne({ name: "vmn" }, () => {
//     //     console.log('Inserted 3 documents into the collection');
//     // });

//     collection.find({}).toArray(function (err, docs) {
//         console.log(docs);
//     });
//     client.close();
// });

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

// body-parser
// req.body, req.param, query , path route, cookies

//res method
// res.render

// eventEmitter.addListener
// eventEmitter.removeListener
// eventEmitter.removeAllListener
// eventEmitter.off

// promise callback
// npx express-generator

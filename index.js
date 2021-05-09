var http = require('http');
var fs = require('fs');
var os = require('os');
var path = require('path');
var chalk = require('chalk');
var add = require('./src/module');
var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
    console.log('I hear a scream!');
}

//Assign the eventhandler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write('Home Page!');
        fs.writeFile('home.txt', "this is home page file", (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        fs.appendFile('home.txt', "update", (err) => {
            if (err) throw err;
        })
        fs.readFile('home.txt', "utf-8", (err, data) => {
            if (err) throw err;
            console.log("data---", data);
        });
        // fs.rename("data.txt", "demo.txt", (err) => {
        //     if (err) throw err;
        // })
        // fs.unlinkSync('demo.txt', () => { })
        res.end()
    } else if (req.url === "/about") {
        res.write('About page!');
    }

    console.log("os", os.arch());
    console.log("freemem", os.freemem());
    console.log("totalmem", os.totalmem());
    console.log("hostname", os.hostname());
    console.log("tmpdir", os.tmpdir());
    console.log("type", os.type());

    console.log("path", path.dirname('E:/vmn/demo.js'));
    console.log("path", path.extname('E:/vmn/demo.js'));
    console.log("path", path.parse('E:/vmn/demo.js'));
    console.log("path", path.basename('E:/vmn/demo.js'));

    console.log("add", add(5, 5));
    res.end();
});
console.log("chalk", chalk.blue.underline.inverse("hello"));

server.listen(8080, () => {
    console.log("Server is listning in 8080 port ");
})

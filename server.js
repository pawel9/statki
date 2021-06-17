//zmienne, stałe

var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
var cors = require('cors');

const server = require('http').createServer(app);

var io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});;

var Datastore = require('nedb');

var db = new Datastore({
    filename: 'games.db',
    autoload: true
});
var id = 0;



//funkcje na serwerze obsługujace konkretne adresy w przeglądarce
var path = require("path");
const { log } = require("console");
const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
app.use(express.static('static'));

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/startingScreen.html"));
})

app.get("/editor", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/shipEditor.html"));
})

app.get("/game", function (req, res) {
    res.redirect("http://localhost:8080");
})

app.post("/getGames", function (req, res) {

    db.find({}, function (err, docs) {
        let games = JSON.stringify({ "waitingRoomData": docs });
        res.end(games)
    });
})

app.post("/newGame", function (req, res) {

    let game = {
        id: id,
        data: req.body
    }
    id++;

    db.insert(game, function (err, newDoc) {
        game._id = newDoc._id;
        res.end(JSON.stringify(game));
    })

})

app.post("/modifyDB", function (req, res) {

    let game = req.body;

    db.update({ _id: req.body._id }, { $set: { data: req.body.waitingRoomData } }, function (err, numReplaced) {
        res.end(JSON.stringify(game))
    });

})

app.post("/checkPlayers", function (req, res) {

    let id = req.body._id;

    db.find({ _id: id }, function (err, docs) {
        let game = JSON.stringify({ "checkPlayersData": docs });
        res.end(JSON.stringify(game))
    });

})

app.post("/checkIfPlayersAreReady", function (req, res) {

    let id = req.body._id;

    db.find({ _id: id }, function (err, docs) {
        let game = JSON.stringify({ "checkPlayersData": docs });
        res.end(JSON.stringify(game))


    });

})

app.post("/playerIsReady", function (req, res) {

    let id = req.body._id;
    let player = req.body.player;
    let shipsData = req.body.shipsData;

    db.find({ _id: id }, function (err, docs) {

        let data = docs[0].data;;

        data[player].ready = true;
        data[player].shipsData = shipsData;

        db.update({ _id: id }, { $set: { data: data } }, function (err, numReplaced) {
            res.end(JSON.stringify(data))
        });

    });

})

app.post("/getShipsData", function (req, res) {

    let id = req.body._id;

    db.find({ _id: id }, function (err, docs) {
        let game = JSON.stringify({ "getShipsData": docs });
        res.end(JSON.stringify(game))
    });

})

io.on('connection', socket => {

    socket.on("joiningRoom", id => {
        socket.join(id);
    })

    socket.on("shot", data => {
        socket.to(data.room).emit("shotServer", data.position);
    })

    socket.on("defeat", data => {

        socket.to(data.room).emit("defeatServer", data.msg);
    })

});

//nasłuch na określonym porcie

server.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})


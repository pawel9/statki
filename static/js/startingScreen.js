
class startingScreen {
  constructor(nick, data) {
    this.nick = nick;
    this.data = data;
    this.checkPlayersInterval = "";
  }


  init() {
    let dys = this;
    console.log("init");

    document.getElementById("nick").addEventListener("keypress", function (e) {
      if (e.key === "Enter")
        dys.getGames();
    })

  }

  getGames() {
    const headers = { "Content-Type": "application/json" };

    fetch("/getGames", { method: "post", headers }) // fetch
      .then((response) => response.json())
      .then((response) => {

        console.log(response.waitingRoomData);
        let ob = response.waitingRoomData;

        ob.sort(function (a, b) {
          return parseFloat(a.id) - parseFloat(b.id);
        });

        if (ob.length == 0) {
          console.log("no games");
          this.newGame();
        } else {
          ob = ob[ob.length - 1];
          console.log(ob)

          let lastGame = ob.data;

          console.log(lastGame);

          let numberOfPlayers = Object.keys(lastGame).length;

          let allPlayersReady = 0;

          this.id = ob.id;
          this._id = ob._id;

          if (numberOfPlayers == 2) {
            console.log("2 players");
            this.newGame();
          } else {

            this.nick = document.getElementById("nick").value;

            let playerName = Object.keys(lastGame)[0]
            let playerNumber = playerName.slice(6, 7)

            if (playerNumber == 1) {
              playerNumber = 2
            } else {
              playerNumber = 1
            }

            this.data[playerName] = {
              nick: lastGame[playerName].nick,
              player: playerName,
              ready: false
            }


            this.player = "player" + playerNumber;

            this.data[this.player] = {
              nick: this.nick,
              player: this.player,
              ready: false
            }

            this.modifyDatabase();
          }
        }
      });
  }

  newGame() {
    this.nick = document.getElementById("nick").value;

    let randomNumber = Math.floor((Math.random() * 2) + 1)

    this.player = "player" + randomNumber;

    this.data[this.player] = {
      nick: this.nick,
      player: this.player,
      ready: false
    }

    console.log(this.data);

    let body = JSON.stringify(this.data);
    let headers = { "Content-Type": "application/json" };
    // nagłowek czyli typ danych

    fetch("/newGame", { method: "post", body, headers }) // fetch
      .then(response => response.json())
      .then(
        data => {
          this._id = data._id;
          console.log("added new data")
          this.checkPlayersInterval = setInterval(this.checkNumberOfPlayers, 500, this._id, this);
          document.getElementById("waitingRoom").style.zIndex = 10;
        } // dane odpowiedzi z serwera
      )


  }

  modifyDatabase() {
    let dys = this
    let body = JSON.stringify({ id: this.id, waitingRoomData: this.data, _id: this._id });
    let headers = { "Content-Type": "application/json" };
    // nagłowek czyli typ danych
    console.log(this.data);
    fetch("/modifyDB", { method: "post", body, headers }) // fetch
      .then(response => response.json())
      .then(
        data => {
          console.log(dys.player);

          localStorage.setItem('id', data._id);
          localStorage.setItem('player', dys.player);

          location.replace('/editor');
        } // dane odpowiedzi z serwera
      )
  }


  checkNumberOfPlayers(_id, dys) {

    let body = JSON.stringify({ _id: _id });
    let headers = { "Content-Type": "application/json" };


    fetch("/checkPlayers", { method: "post", body, headers }) // fetch
      .then(response => response.json())
      .then(
        data => {
          data = JSON.parse(data);

          let playersNumber = Object.keys(data.checkPlayersData[0].data).length;

          if (playersNumber == 2) {

            localStorage.setItem('id', _id);
            localStorage.setItem('player', dys.player);

            location.replace('/editor');
          }
        }
      )
  }


}

let start = new startingScreen("", {});

start.init();



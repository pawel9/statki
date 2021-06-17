class shipEditor {

    constructor() {
        this.length = 4;
        this.direction = true;
    }

    createObjectArray() {
        this.allObjectsArr = [];

        for (let i = 0; i < 12; i++) {
            let objectArr = [];
            for (let j = 0; j < 12; j++) {
                let arrayItem = {
                    status: "empty",
                    color: "white",
                    x: j,
                    y: i
                }

                objectArr.push(arrayItem);
            }
            this.allObjectsArr.push(objectArr);
        }
    }

    createTable() {
        let table = '<table cellspacing="0">';
        for (let i = 0; i < 10; i++) {
            let tr = '<tr>';
            for (let j = 0; j < 10; j++) {
                let td = '<td class="td"></td>';
                tr += td;
            }
            tr += '</tr>';
            table += tr;
        }
        table += '</table>';

        document.getElementById("table").innerHTML = table;
    }

    creatingShips() {
        let dys = this;

        Array.from(document.getElementById("ships").children).forEach(ship => {
            let shipLength = ship.id.slice(4, 5)
            let table = '<table cellspacing="0">';
            let tr = '<tr id="TR' + ship.id + '">';

            table += tr;

            for (let i = 0; i < shipLength; i++) {
                let td = '<td class="ships"></td>';
                table += td;
            }

            table += "</tr></table>"
            ship.innerHTML = table;

            let currentTr = document.getElementById("TR" + ship.id);
            currentTr.style.opacity = 0.5;

            document.getElementById("TRship41").style.opacity = 1;


            this.currentShip = document.getElementById("TRship41");

            currentTr.addEventListener("mouseover", function () {
                if (currentTr.style.opacity != 1 && currentTr.style.opacity != 0.2) {
                    currentTr.style.opacity = 0.8;
                }
            });

            currentTr.addEventListener("mouseout", function () {
                if (currentTr.style.opacity != 1 && currentTr.style.opacity != 0.2) {
                    currentTr.style.opacity = 0.6;
                }

            });

            currentTr.addEventListener("click", function () { dys.selectingShip(currentTr, shipLength) });
        })

        Array.from(document.getElementById("ships").children).forEach(ship => {
            let tds = Array.from(ship.children[0].children[0].children[0].children);
            for (let i = 0; i < tds.length; i++) {
                tds[i].style.backgroundImage = "url('images/poziom" + tds.length + parseInt(i + 1) + ".png')";
                tds[i].style.backgroundSize = "52px 52px";
                tds[i].style.backgroundRepeat = "no-repeat";
            }

        })
    }

    selectingShip(tr, shipLength) {

        let ships = document.getElementById("ships").children;

        Array.from(ships).forEach(ship => {
            let tr = ship.children[0].children[0].children[0];
            if (tr.style.opacity != 0.2) {
                tr.style.opacity = 0.5;
            }
        })

        tr.style.opacity = 1;
        this.length = parseInt(shipLength);
        this.currentShip = tr;

    }

    mainBoardEventListeners() {
        let dys = this;

        Array.from(document.getElementsByClassName("td")).forEach(td => {
            td.addEventListener("mouseover", function () { dys.checkingTdPlacement(td) })
            td.addEventListener("mouseout", function () { dys.clearingTds() })
            td.addEventListener("contextmenu", function (e) {
                e.preventDefault()
                dys.direction = !dys.direction;
                dys.clearingTds();
                dys.checkingTdPlacement(td);
            })

            td.addEventListener("mouseover", function () { dys.checkingIfShipCanBePlaced(td) })
            td.addEventListener("click", function () { dys.placingShips(td) })
        })

    }

    checkingTdPlacement(td) {
        this.checkingIfShipCanBePlaced(td);

        let tr = td.parentElement;

        let x = Array.from(td.parentElement.children).indexOf(td) + 1;
        let y = Array.from(td.parentElement.parentElement.children).indexOf(tr) + 1;


        if (this.direction) {
            if (x + this.length > 11) {
                while (x + this.length > 11) {
                    x--;
                }
                for (let i = 0; i < this.length; i++) {
                    td = td.parentElement.children[x + i - 1];

                    if (td.style.opacity != 1.1) {
                        if (this.shipCanBePlaced == false) {
                            td.style.opacity = 0.6;
                        } else {
                            td.style.opacity = 1;
                        }

                        let shipLength = this.currentShip.id.slice(6, 7);
                        td.style.backgroundImage = "url('images/poziom" + shipLength + parseInt(i + 1) + ".png')";
                        td.style.backgroundSize = "52px 52px";
                        td.style.backgroundRepeat = "no-repeat";


                    }
                }
            } else {
                for (let i = 0; i < this.length; i++) {
                    if (td.style.opacity != 1.1) {
                        if (this.shipCanBePlaced == false) {
                            td.style.opacity = 0.6;
                        } else {
                            td.style.opacity = 1;
                        }

                        let shipLength = this.currentShip.id.slice(6, 7);
                        td.style.backgroundImage = "url('images/poziom" + shipLength + parseInt(i + 1) + ".png')";
                        td.style.backgroundSize = "52px 52px";
                        td.style.backgroundRepeat = "no-repeat";
                    }
                    td = td.parentElement.children[x + i];
                }
            }
        } else {
            if (y + this.length > 11) {
                while (y + this.length > 11) {
                    y--;
                }
                for (let i = 0; i < this.length; i++) {
                    td = td.parentElement.parentElement.children[y + i - 1].children[x - 1];
                    if (this.shipCanBePlaced == false) {
                        td.style.opacity = 0.6;
                    } else {
                        td.style.opacity = 1;
                    }

                    let shipLength = this.currentShip.id.slice(6, 7);
                    td.style.backgroundImage = "url('images/pion" + shipLength + parseInt(i + 1) + ".png')";
                    td.style.backgroundSize = "52px 52px";
                    td.style.backgroundRepeat = "no-repeat";

                }
            } else {
                for (let i = 0; i < this.length; i++) {
                    td = td.parentElement.parentElement.children[y + i - 1].children[x - 1];
                    if (td.style.opacity != 1.1) {
                        if (this.shipCanBePlaced == false) {
                            td.style.opacity = 0.6;
                        } else {
                            td.style.opacity = 1;
                        }

                        let shipLength = this.currentShip.id.slice(6, 7);
                        td.style.backgroundImage = "url('images/pion" + shipLength + parseInt(i + 1) + ".png')";
                        td.style.backgroundSize = "52px 52px";
                        td.style.backgroundRepeat = "no-repeat";
                    }
                }
            }
        }
    }

    checkingIfShipCanBePlaced(td) {
        let tr = td.parentElement;

        let x = Array.from(td.parentElement.children).indexOf(td);
        let y = Array.from(td.parentElement.parentElement.children).indexOf(tr);


        if (this.direction) {

            if (x + this.length > 10) {
                while (x + this.length > 10) {
                    x--;
                }
                for (let i = 0; x + i < 11; i++) {
                    if (this.allObjectsArr[y][x + i].status == "empty" && this.allObjectsArr[y + 1][x + i].status == "empty" && this.allObjectsArr[y + 2][x + i].status == "empty") {
                        this.shipCanBePlaced = true;
                    } else {
                        this.shipCanBePlaced = false;
                        break;
                    }
                }
            } else {
                for (let i = 0; i <= this.length + 1; i++) {
                    if (this.allObjectsArr[y][x + i].status == "empty" && this.allObjectsArr[y + 1][x + i].status == "empty" && this.allObjectsArr[y + 2][x + i].status == "empty") {
                        this.shipCanBePlaced = true;
                    } else {
                        this.shipCanBePlaced = false;
                        break;
                    }
                }
            }

        } else {
            if (y + this.length > 10) {
                while (y + this.length > 10) {
                    y--;
                }
                for (let i = 0; y + i < 11; i++) {
                    if (this.allObjectsArr[y + i][x].status == "empty" && this.allObjectsArr[y + i][x + 1].status == "empty" && this.allObjectsArr[y + i][x + 2].status == "empty") {
                        this.shipCanBePlaced = true;
                    } else {
                        this.shipCanBePlaced = false;
                        break;
                    }
                }
            } else {
                for (let i = 0; i <= this.length + 1; i++) {
                    if (this.allObjectsArr[y + i][x].status == "empty" && this.allObjectsArr[y + i][x + 1].status == "empty" && this.allObjectsArr[y + i][x + 2].status == "empty") {
                        this.shipCanBePlaced = true;
                    } else {
                        this.shipCanBePlaced = false;
                        break;
                    }

                }
            }

        }
    }

    placingShips(td) {
        let tr = td.parentElement;

        let x = Array.from(td.parentElement.children).indexOf(td) + 1;
        let y = Array.from(td.parentElement.parentElement.children).indexOf(tr) + 1;


        if (this.shipCanBePlaced && this.length > 0) {
            if (this.direction) {
                if (x + this.length > 11) {
                    while (x + this.length > 11) {
                        x--;
                    }
                    for (let i = 0; i < this.length; i++) {
                        td = td.parentElement.parentElement.children[y - 1].children[x + i - 1];
                        this.allObjectsArr[y][x + i].status = "ship";
                        td.style.opacity = 1.1;

                    }
                } else {
                    for (let i = 0; i < this.length; i++) {
                        td = td.parentElement.parentElement.children[y - 1].children[x + i - 1];
                        this.allObjectsArr[y][x + i].status = "ship";
                        td.style.opacity = 1.1;
                    }
                }
            } else {
                if (y + this.length > 11) {
                    while (y + this.length > 11) {
                        y--;
                    }
                    for (let i = 0; i < this.length; i++) {

                        td = td.parentElement.parentElement.children[y + i - 1].children[x - 1];
                        this.allObjectsArr[y + i][x].status = "ship";
                        td.style.opacity = 1.1;

                    }
                } else {
                    for (let i = 0; i < this.length; i++) {

                        td = td.parentElement.parentElement.children[y + i - 1].children[x - 1];
                        this.allObjectsArr[y + i][x].status = "ship";
                        td.style.opacity = 1.1;

                    }
                }
            }

            let placedShips = 0;

            Array.from(document.getElementById("ships").children).forEach(el => {
                if (el.children[0].children[0].children[0].style.opacity == 0.2) {
                    placedShips++;
                }
            })

            if (placedShips < 9) {

                var old_element = this.currentShip;
                var new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);

                new_element.style.opacity = 0.2;


                let tr = document.getElementById("ships").children[0].children[0].children[0].children[0];
                while (tr.style.opacity == 0.2) {
                    tr = tr.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0].children[0];
                }

                tr.style.opacity = 1;
                this.currentShip = tr;
                this.length = parseInt(tr.id.slice(6, 7));


                this.direction = true;
                this.shipCanBePlaced = false;
            } else {

                let readyBtn = document.createElement("button");
                readyBtn.id = "ready";
                readyBtn.innerText = "ready"

                var old_element = this.currentShip;
                var new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);

                new_element.style.opacity = 0.2;

                this.currentShip = "";
                this.length = 0;

                let dys = this;

                readyBtn.classList = "buttons";
                document.getElementById("buttons").appendChild(readyBtn);
                document.getElementById("ready").addEventListener("click", function () { dys.getData() });
            }



        }
    }

    clearingTds() {
        Array.from(document.getElementsByClassName("td")).forEach(td => {
            if (td.style.opacity != 1.1) {
                td.style.backgroundImage = "";
                td.style.opacity = 1;
            }
        })
    }

    getData() {
        let shipsData = [];
        let shipArr = this.allObjectsArr;

        for (let i = 0; i < shipArr.length; i++) {
            for (let j = 0; j < shipArr[i].length; j++) {
                if (shipArr[i][j].status != "empty") {
                    shipsData.push(shipArr[i][j])
                    console.log(shipArr[i][j]);
                }
            }
        }

        console.log(shipsData)

        document.getElementById("waitingRoom").style.zIndex = 99;

        this.playerIsReady(shipsData);

        let dys = this

        this.checkIfPlayersAreReadyInterval = setInterval(dys.checkIfPlayersAreReady, 1000, dys)

    }

    checkIfPlayersAreReady(dys) {
        let id = localStorage.getItem('id');
        let player = localStorage.getItem('player');

        let body = JSON.stringify({ _id: id });
        let headers = { "Content-Type": "application/json" };

        fetch("/checkIfPlayersAreReady", { method: "post", body, headers }) // fetch
            .then(response => response.json())
            .then(
                data => {
                    data = JSON.parse(data);

                    let playersData = data.checkPlayersData[0].data;

                    if (playersData.player1.ready && playersData.player2.ready) {

                        document.cookie = "id=" + id;
                        document.cookie = "player=" + player;

                        location.replace("/game");

                        clearInterval(dys.checkIfPlayersAreReadyInterval);
                    }
                }
            )
    }

    playerIsReady(shipsData) {
        let id = localStorage.getItem('id');
        let player = localStorage.getItem('player');

        let body = JSON.stringify({ _id: id, player: player, shipsData: shipsData });
        let headers = { "Content-Type": "application/json" };

        fetch("/playerIsReady", { method: "post", body, headers }) // fetch
            .then(response => response.json())
            .then(data => console.log(data))

    }

    resetShips() {

        document.getElementById("ships").innerHTML =
            `
        <div class="ship" id="ship41"></div>
        <div class="ship" id="ship31"></div>
        <div class="ship" id="ship32"></div>
        <div class="ship" id="ship21"></div>
        <div class="ship" id="ship22"></div>
        <div class="ship" id="ship23"></div>
        <div class="ship" id="ship11"></div>
        <div class="ship" id="ship12"></div>
        <div class="ship" id="ship13"></div>
        <div class="ship" id="ship14"></div>`

        this.length = 4;
        this.direction = true;

        let readyBtn = document.getElementById("ready");

        if (readyBtn != null) {
            readyBtn.parentElement.removeChild(readyBtn);
        }

        this.createObjectArray();
        this.createTable();
        this.creatingShips();
        this.mainBoardEventListeners();
    }

    init() {
        this.createObjectArray();
        this.createTable();
        this.creatingShips();
        this.mainBoardEventListeners();

        let dys = this;
        document.getElementById("reset").addEventListener("click", function () { dys.resetShips() });

    }

}

let editor = new shipEditor();

editor.init();
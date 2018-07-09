'use strict';

var knockOutControllers = angular.module('knockOutControllers', []);

knockOutControllers.controller('knockOutControllers', ['$scope',
    function($scope) {
        $scope.teams = getKnockOutTeams();

        var teamPool = $scope.teams;
        /*var teams = shuffleArray(teamPool);*/

        var teams  = teamPool;

        var isRunning = false;
        var numOfAllTeams = teams.length;
        var numOfCols = 2 * Math.log2(numOfAllTeams) + 1;
        let round = 1;
        let remainingTeams = teams;
        let intervalID;

        let container = document.getElementById("table");
        console.log(container);
        let winner = document.getElementById("winnerTable");
        winner.style.display = "none";
        let controlBtn = document.getElementById("controlBtn");
        let resetBtn = document.getElementById("resetBtn");

        controlBtn.onclick = pressControlBtn;
        resetBtn.onclick = reset;

        game();


        function game() {
            generateTable();
            displayRound(teams, 1);
            changeDisabledStatusOfTeamButtons(false);
        }

        function changeDisabledStatusOfTeamButtons(isDisabled) {
            let buttons = Array.from(document.getElementsByClassName("teamBtn"));
            buttons.forEach(function (btn) {
                if (isDisabled) {
                    btn.onclick = null;
                    btn.style.cursor = "default";
                } else {
                    btn.onclick = displayPlayersDiv;
                    btn.style.cursor = "pointer";
                }
            });
        }

        function pressControlBtn() {
            if (isRunning) {
                clearInterval(intervalID);
                isRunning = false;
                controlBtn.innerHTML = `<i class="fa fa-play-circle " aria-hidden="true"></i> Start`;
                changeDisabledStatusOfTeamButtons(false);
            } else {
                isRunning = true;
                controlBtn.innerHTML = `<i class="fa fa-pause-circle" aria-hidden="true"></i> Stop`;
                intervalID = setInterval(gameRound, 1000);
                changeDisabledStatusOfTeamButtons(true);
            }
        }

        function reset() {
            clearInterval(intervalID);
            round = 1;
            teams = shuffleArray(teamPool);
            remainingTeams = teams;
            isRunning = false;
            generateTable();
            displayRound(teams, 1);
            controlBtn.innerHTML = `<i class="fa fa-play-circle " aria-hidden="true"></i> Start`;
            controlBtn.disabled = false;
            changeDisabledStatusOfTeamButtons(false);
        }

        function gameRound() {
            remainingTeams = playRound(remainingTeams, round);
            if (remainingTeams.length === 1) {
                clearInterval(intervalID);
                changeDisabledStatusOfTeamButtons(false);
                //displayWinner(remainingTeams[0].name);
                controlBtn.innerHTML = `<i class="fa fa-star-o" aria-hidden="true"></i> Finished`;
                controlBtn.disabled = true;
            }
            round += 1;
        }

        function displayRound(teams, round) {
            if (teams.length === 1) {
                let node = document.getElementById("row_" + (numOfAllTeams / 2) + "_col_" + Math.ceil(numOfCols / 2));
                createTeamButton(teams[0].name, node);
                node.firstChild.style.background = "GoldenRod";
                node.firstChild.style.fontWeight = "bold";
            } else {
                let leftTeams = teams.slice(0, teams.length / 2);
                displayLeftBranch(leftTeams, round, Math.pow(2, round));
                let rightTeams = teams.slice(teams.length / 2, teams.length);
                displayRightBranch(rightTeams, round, Math.pow(2, round));
            }
        }

        function displayLeftBranch(teams, round, gap) {
            display(teams, round, gap, round);
        }

        function displayRightBranch(teams, round, gap) {
            display(teams, round, gap, numOfCols + 1 - round);
        }

        function display(teams, round, gap, col) {
            var ind = Math.pow(2, round - 1);
            teams.forEach(function (team) {
                createTeamButton(team.name, document.getElementById("row_" + ind + "_col_" + col));
                ind = gap + ind;
            });
        }

        function displayAllGoals(teams, round) {
            if (teams.length === 1) {
            } else {
                let leftTeams = teams.slice(0, teams.length / 2);
                displayGoalsLeftBranch(leftTeams, round, Math.pow(2, round));
                let rightTeams = teams.slice(teams.length / 2, teams.length);
                displayGoalsRightBranch(rightTeams, round, Math.pow(2, round));
            }
        }

        function displayGoalsLeftBranch(teams, round, gap) {
            displayGoals(teams, round, gap, round);
        }

        function displayGoalsRightBranch(teams, round, gap) {
            displayGoals(teams, round, gap, numOfCols + 1 - round);
        }

        function displayGoals(teams, round, gap, col) {
            var ind = Math.pow(2, round - 1);
            teams.forEach(function (team) {
                let node = document.getElementById("row_" + ind + "_col_" + col);
                node.firstChild.innerHTML = `<img src="img/${team.name.split(' ').join('').toLowerCase()}.png"> ${team.name}  ${ team.goal}`;

                var div = document.createElement("div");
                div.setAttribute("class", "divPlayers");
                node.firstChild.appendChild(div);
                if (team.win === true) {
                    node.firstChild.style.background = "lightgreen";
                    node.firstChild.style.fontWeight = "bold";
                }
                ind = gap + ind;
            });
        }

        function playRound(teams, round) {
            let winners = [];
            for (let i = 0; i < teams.length; i = i + 2) {
                teams[i].win = false;
                teams[i+1].win = false;
                teams[i].goal = 0;
                teams[i + 1].goal = 0;
                while (teams[i].goal === teams[i + 1].goal) {
                    teams[i].goal = getRandomInt(6);
                    teams[i + 1].goal = getRandomInt(6);
                }
                let winnerInd = teams[i].goal > teams[i + 1].goal ? i : i + 1;
                teams[winnerInd].win = true;
                winners.push(teams[winnerInd]);
            }
            displayAllGoals(teams, round, Math.pow(2, round), round);
            displayRound(winners, round + 1);
            return winners;
        }

        function createTeamButton(name, parent) {
            var teamNode = document.createElement("div");
            teamNode.setAttribute("class", "teamBtn");
            teamNode.setAttribute("data-teamname", name);
            teamNode.innerHTML = `<img src="img/${name.split(' ').join('').toLowerCase()}.png"> ${name} <i class="fa fa-futbol-o" aria-hidden="true"></i>`;
            teamNode.style.cursor = "default";
            var div = document.createElement("div");
            div.setAttribute("class", "divPlayers");
            teamNode.appendChild(div);
            parent.appendChild(teamNode);
        }

        function displayPlayersDiv(event) {
            let node = event.target;
            console.log(node);
            node.onclick = closePlayersDiv;
            let teamName = node.dataset.teamname;
            let team = teamPool.find(function (element) {
                return element.name === teamName;
            });
            let players = team.players;
            players.forEach(function (player) {
                node.querySelector('.divPlayers').innerHTML += `<p>${player}</p>`;
            })
        }

        function closePlayersDiv(event) {
            let node = event.target;
            node.onclick = displayPlayersDiv;
            node.querySelector('.divPlayers').innerHTML = ``;
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        function generateTable() {
            container.innerHTML = ``;
            for (let i = 1; i < teams.length + 1; i++) {
                container.innerHTML += `<div class="row gameRow" id="row_${i}">`;
                var row = document.getElementById("row_" + i);
                for (let j = 1; j < numOfCols + 1; j++) {
                    row.innerHTML += `<div class="col-sm-1" id="row_${i}_col_${j}"></div>`;
                }
                container.innerHTML += `</div>`
            }
            ;
        }

        function shuffleArray(array) {
            let copyOfArray = array.map(x => x);
            for (var i = copyOfArray.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = copyOfArray[i];
                copyOfArray[i] = copyOfArray[j];
                copyOfArray[j] = temp;
            }
            return copyOfArray;
        }

        /*function displayWinner(winnerName) {
            document.getElementById("winner").innerHTML = winnerName;
            container.style.display = "none";
            winner.style.display = "block";
            setTimeout(hideContainer, 2000);
        }*/

        function hideContainer() {
            container.style.display = "block";
            winner.style.display = "none";
        }

    }]);
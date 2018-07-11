'use strict';

var knockOutControllers = angular.module('knockOutControllers', []);

knockOutControllers.controller('knockOutControllers', ['$scope',
    function($scope) {
        $scope.isRunning = false;

        $scope.teams = Array.from(getKnockOutTeams(), x => x);
        let numOfAllTeams = $scope.teams.length;
        let numOfCols = 2 * Math.log2(numOfAllTeams) + 1;
        let intervalID;
        let round = 1;
        let remainingLeftBranchTeams;
        let remainingRightBranchTeams;
        /*let pairs = getPairs();
        $scope.pairsLeft = pairs[0];
        $scope.pairsRight = pairs[1];*/

        $scope.pairsLeft = [];
        $scope.pairsRight = [];
        remainingLeftBranchTeams = $scope.teams.slice(0, numOfAllTeams / 2);
        remainingRightBranchTeams = $scope.teams.slice(numOfAllTeams / 2, numOfAllTeams);
        $scope.pairsLeft.push(generatePairs(remainingLeftBranchTeams));
        $scope.pairsRight.push(generatePairs(remainingRightBranchTeams));


        $scope.start = function () {

            intervalID = setInterval(gameRound, 1000);
            $scope.isRunning = true;
        };

        $scope.stop = function () {
            clearInterval(intervalID);
            $scope.isRunning = false;
        };

        $scope.reset = function () {
            clearInterval(intervalID);
            $scope.teams = Array.from(getKnockOutTeams(), x => x);
            $scope.pairsLeft = [];
            $scope.pairsRight = [];
            remainingLeftBranchTeams = $scope.teams.slice(0, numOfAllTeams / 2);
            remainingRightBranchTeams = $scope.teams.slice(numOfAllTeams / 2, numOfAllTeams);
            $scope.pairsLeft.push(generatePairs(remainingLeftBranchTeams));
            $scope.pairsRight.push(generatePairs(remainingRightBranchTeams));
            round = 1;
        };

        function gameRound() {
            if (remainingLeftBranchTeams.length === 1) {
                $scope.pairsLeft.push(generatePairs(playRound(remainingLeftBranchTeams.concat(remainingRightBranchTeams), round)));
                clearInterval(intervalID);
            } else {
                remainingLeftBranchTeams = playRound(remainingLeftBranchTeams, round);
                remainingRightBranchTeams = playRound(remainingRightBranchTeams, round);
                if(remainingLeftBranchTeams.length !== 1 ) {
                    $scope.pairsLeft.push(generatePairs(remainingLeftBranchTeams));
                    $scope.pairsRight.push(generatePairs(remainingRightBranchTeams));
                }
            }
            round += 1;
            setPairs($scope.pairsLeft, $scope.pairsRight);
            $scope.$apply();
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

                let teamA = teams[i];
                let teamB = teams[i + 1];
                let match = { "teams" : teamA.name + " Vs " + teamB.name };
                let goalA = teamA.goal;
                let goalB = teamB.goal;
                match.result = goalA + " : " + goalB;
                teamA.matches.push(match.teams + " " + match.result);
                teamB.matches.push(match.teams + " " + match.result);
                teamA.matchedPlayed += 1;
                teamB.matchedPlayed += 1;
                teamA.goalFor += goalA;
                teamB.goalFor +=  goalB;
                teamA.goalAgainst += goalB;
                teamB.goalAgainst += goalA;
                teamA.goalDiff = teamA.goalFor - teamA.goalAgainst;
                teamB.goalDiff = teamB.goalFor - teamB.goalAgainst;
            }
            updateTeams(teams);
            return winners;
        }

        function generatePairs(array) {
            return new Array(Math.ceil(array.length/2))
                .fill(1)
                .map((x,index) => 2 * index)
                .map((x, index) => array.slice(x, x+2));
        }
    }]);

'use strict';

var knockOutControllers = angular.module('knockOutControllers', []);

knockOutControllers.controller('knockOutControllers', ['$scope',
    function($scope) {
        $scope.teams = Array.from(getKnockOutTeams(), x => x);

        $scope.numOfAllTeams = $scope.teams.length;
        $scope.numOfCols = 2 * Math.log2($scope.numOfAllTeams) + 1;
        $scope.pairsLeft = [];
        $scope.pairsRight = [];

        let remainingLeftBranchTeams = $scope.teams.slice(0, $scope.numOfAllTeams / 2);
        let remainingRightBranchTeams = $scope.teams.slice($scope.numOfAllTeams / 2, $scope.numOfAllTeams);
        console.log(remainingLeftBranchTeams);
        console.log(remainingRightBranchTeams);

        $scope.pairsLeft.push(generatePairs(remainingLeftBranchTeams));
        $scope.pairsRight.push(generatePairs(remainingRightBranchTeams));

        let intervalID = setInterval(gameRound, 1000);
        let round = 1;

        function generatePairs(array) {
            return new Array(Math.ceil(array.length/2))
                .fill(1)
                .map((x,index) => 2 * index)
                .map((x, index) => array.slice(x, x+2));
        }

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
            }
            console.log(winners);
            return winners;
        }

    }]);

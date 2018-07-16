'use strict';

var knockOutControllers = angular.module('knockOutControllers', []);

knockOutControllers.controller('knockOutControllers', ['$scope', 'gameService',
    function($scope, gameService) {
        let intervalID;
        let remainingLeftBranchTeams;
        let remainingRightBranchTeams;
        let round;
        let state = gameService.getKnockOutState();

        initFromState(state);

        if (!$scope.ended){
            $scope.pairsLeft.push(generatePairs(remainingLeftBranchTeams));
            $scope.pairsRight.push(generatePairs(remainingRightBranchTeams));

        }

        $scope.start = function () {
            intervalID = setInterval(gameRound, 1500);
            $scope.isRunning = true;
        };

        $scope.stop = function () {
            clearInterval(intervalID);
            $scope.isRunning = false;
        };

        $scope.reset = function () {
            clearInterval(intervalID);
            gameService.resetKnockOutStage();
            gameService.updateTeams(gameService.getKnockOutTeams());

            initFromState(gameService.getKnockOutState());

            $scope.pairsLeft.push(generatePairs(remainingLeftBranchTeams));
            $scope.pairsRight.push(generatePairs(remainingRightBranchTeams));
        };

        function gameRound() {
            if (remainingLeftBranchTeams.length === 1) {
                clearInterval(intervalID);
                $scope.pairsLeft.push(generatePairs(playRound(remainingLeftBranchTeams.concat(remainingRightBranchTeams), round)));
                $scope.isRunning = false;
                $scope.ended = true;
            } else {
                $scope.showGoal = true;
                remainingLeftBranchTeams = playRound(remainingLeftBranchTeams, round);
                remainingRightBranchTeams = playRound(remainingRightBranchTeams, round);
                setTimeout(function(){if(remainingLeftBranchTeams.length !== 1 ) {
                    $scope.pairsLeft.push(generatePairs(remainingLeftBranchTeams));
                    $scope.pairsRight.push(generatePairs(remainingRightBranchTeams));
                }},100);
            }
            round += 1;
            setState();
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
                let loserInd = winnerInd === i ? (i + 1) : i;

                teams[winnerInd].win = true;
                teams[winnerInd].winMatches += 1;
                teams[loserInd].lostMatches +=1;

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

                let winner = Object.assign({}, teams[winnerInd]);
                winners.push(winner);
            }
            gameService.updateTeams(teams);
            return winners;
        }

        function setState() {
            gameService.setKnockOutState({"pairsLeft" : $scope.pairsLeft,
                "pairsRight" : $scope.pairsRight,
                "remainingLeftBranchTeams" : remainingLeftBranchTeams,
                "remainingRightBranchTeams": remainingRightBranchTeams,
                "ended": $scope.ended,
                "round" : round,
                "showGoal": $scope.showGoal});
        }

        function initFromState(state) {
            remainingLeftBranchTeams = state.remainingLeftBranchTeams;
            remainingRightBranchTeams = state.remainingRightBranchTeams;
            round = state.round;
            $scope.pairsLeft = state.pairsLeft;
            $scope.pairsRight = state.pairsRight;
            $scope.showGoal = state.showGoal;
            $scope.ended = state.ended;
            $scope.isRunning = false;
        }

        function generatePairs(array) {
            return new Array(Math.ceil(array.length/2))
                .fill(1)
                .map((x,index) => 2 * index)
                .map((x, index) => array.slice(x, x+2));
        }

    }]);

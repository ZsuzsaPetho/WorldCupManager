'use strict';

var teamControllers = angular.module('teamMControllers', []);

teamControllers.controller('teamControllers', ['$scope', 'Team', 'Players', 'gameService',
    function($scope, Team, Players, gameService) {
        $scope.initTeams = function() {
            console.log("init");
            $scope.teams = Team.query();
            $scope.teams.$promise.then(function (result) {
                $scope.teams = result;
                $scope.teams = shuffleArray($scope.teams);
                gameService.setTeams($scope.teams);
                $scope.names = Players.query();
                $scope.names.$promise.then(function (result) {
                    $scope.names = result.results;
                    addPlayersToTeams($scope.teams, $scope.names);
                    gameService.setTeams($scope.teams);
                    $scope.groups = [];
                    for(let i = 0; i < $scope.teams.length; i=i+4){
                        $scope.teams[i].index = 1;
                        $scope.teams[i + 1].index = 2;
                        $scope.teams[i + 2].index = 3;
                        $scope.teams[i + 3].index = 4;
                        $scope.groups.push({"group" :[$scope.teams[i], $scope.teams[i+1], $scope.teams[i+2], $scope.teams[i+3]], "matches": []});
                    }
                    gameService.setRound(1);
                    gameService.setGroupStageTeams($scope.groups);
                });
            });
            gameService.resetKnockOutStage();
        }
        $scope.teams = gameService.getTeams();
        $scope.numbers = [[0,1,2,3], [4,5,6,7]];
        $scope.letters = [["A", "B", "C", "D"], ["E","F","G","H"]];
        $scope.groups = gameService.getGroupStageTeams();
    }]);


function addPlayersToTeams(teamPool, names) {
    var start = 0;
    var chunkSize = 11;
    var array = [];
    teamPool.forEach(function(team) {
        team.players = (names.slice(start, start + chunkSize));
        team.players = generateFullNameForPlayers(team.players);
        start += chunkSize;
    });
}

function generateFullNameForPlayers(players){
    return players.map(function(x){return x.name.first[0].toUpperCase() + ". " + x.name.last[0].toUpperCase() + x.name.last.substr(1)});
}

function shuffleArray(array) {
    var copyOfArray = array.map(function(x) {return x});
    for (var i = copyOfArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copyOfArray[i];
        copyOfArray[i] = copyOfArray[j];
        copyOfArray[j] = temp;
    }
    return copyOfArray;
}
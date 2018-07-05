'use strict';

var teamControllers = angular.module('teamMControllers', []);

teamControllers.controller('teamControllers', ['$scope', 'Team', 'Players',
    function($scope, Team, Players) {
        $scope.initTeams = function() {
            console.log("init");
            $scope.teams = Team.query();
            $scope.names = Players.query();
            $scope.names.$promise.then(function (result) {
                $scope.names = result.results;
                addPlayersToTeams($scope.teams, $scope.names);
                setTeams($scope.teams);
            });
        }
    }]);

teamControllers.controller('teamDisplayControllers', ['$scope',
    function($scope) {
        $scope.teams = getTeams();
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
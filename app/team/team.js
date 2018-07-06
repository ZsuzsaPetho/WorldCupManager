'use strict';

var teamControllers = angular.module('teamMControllers', []);

teamControllers.controller('teamControllers', ['$scope', 'Team', 'Players',
    function($scope, Team, Players) {
        $scope.initTeams = function() {
            console.log("init");
            $scope.teams = Team.query();
            $scope.teams.$promise.then(function (result) {
                $scope.teams = result;
                $scope.teams = shuffleArray($scope.teams);
                setTeams($scope.teams);
                $scope.groups = [];
                for(let i = 0; i < $scope.teams.length; i=i+4){
                    $scope.groups.push([$scope.teams[i], $scope.teams[i+1], $scope.teams[i+2], $scope.teams[i+3]]);
                }
                console.log($scope.groups);
                setGroupStageTeams($scope.groups);
            });
            $scope.names = Players.query();
            $scope.names.$promise.then(function (result) {
                $scope.names = result.results;
                addPlayersToTeams($scope.teams, $scope.names);
                setTeams($scope.teams);
            });
        }
        $scope.teams = getTeams();
        $scope.numbers = [[0,1,2,3], [4,5,6,7]];
        $scope.letters = [["A", "B", "C", "D"], ["E","F","G","H"]];
        $scope.groups = getGroupStageTeams();
        $scope.groups.forEach(function (group) {
            group.forEach(function(team) {
                team.matchedPlayed = 0;
                team.winMatches = 0;
                team.drawMatches = 0;
                team.lostMatches = 0;
                team.goalFor = 0;
                team.goalAgainst = 0;
                team.goalDiff = 0;
                team.points = 0;
            });
        });
        setGroupStageTeams($scope.groups);
    }]);

teamControllers.directive('teamTable', function() {
    return {
        controller:  ['$scope',
            function($scope) {
            $scope.numbersI = [0,1,2,3];
            }
        ],
        restrict: 'E',
        scope: {
            numbers: '=',
            letters: '=',
            groups: '='
        },
        templateUrl: '/team/components/tableTeam.html',
    }
})

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
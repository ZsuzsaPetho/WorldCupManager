'use strict';

var teamControllers = angular.module('teamControllers', []);

teamControllers.controller('teamControllers', ['$scope', 'Team', 'Players', 'storageService', 'utilsService',
    function($scope, Team, Players, storageService, utilsService) {
        $scope.initTeams = function() {
            console.log("init");
            $scope.teams = Team.query();
            $scope.teams.$promise.then(function (result) {
                $scope.teams = result;
                $scope.teams = utilsService.shuffleArray($scope.teams);
                storageService.setTeams($scope.teams);
                $scope.names = Players.query();
                $scope.names.$promise.then(function (result) {
                    $scope.names = result.results;
                    addPlayersToTeams($scope.teams, $scope.names);
                    storageService.setTeams($scope.teams);
                    $scope.groups = [];
                    for(let i = 0; i < $scope.teams.length; i=i+4){
                        $scope.teams[i].index = 1;
                        $scope.teams[i + 1].index = 2;
                        $scope.teams[i + 2].index = 3;
                        $scope.teams[i + 3].index = 4;
                        $scope.groups.push({"group" :[$scope.teams[i], $scope.teams[i+1], $scope.teams[i+2], $scope.teams[i+3]], "matches": []});
                    }
                    storageService.setRound(1);
                    storageService.setGroupStageTeams($scope.groups);
                });
            });
            storageService.resetKnockOutStage();
        }
        $scope.teams = storageService.getTeams();
        $scope.numbers = [[0,1,2,3], [4,5,6,7]];
        $scope.letters = [["A", "B", "C", "D"], ["E","F","G","H"]];
        $scope.groups = storageService.getGroupStageTeams();

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
    }]);





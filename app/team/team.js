'use strict';

var teamControllers = angular.module('teamControllers', []);

teamControllers.controller('teamControllers', ['$scope', '$rootScope', 'Team', 'Players',
    function($scope, $rootScope, Team, Players) {
        $rootScope.teams = Team.query();
        $scope.names = Players.query();
        $scope.names.$promise.then(function (result) {
            $scope.names = result.results;
            console.log($scope.names);
            addPlayersToTeams($rootScope.teams ,$scope.names);
        });

    }]);

function addPlayersToTeams(teamPool, names) {
    var start = 0;
    var chunkSize = 11;
    var array = [];
    teamPool.forEach(function(team) {
        team.players = (names.slice(start, start + chunkSize));
        start += chunkSize;
    });
}
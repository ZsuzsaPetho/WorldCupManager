'use strict';

var teamDetailControllers = angular.module('teamDetailControllers', []);


teamDetailControllers.controller('teamDetailControllers', ['$scope', '$routeParams', 'Team',
    function($scope, $routeParams, Team) {
        $scope.team = Team.get({teamId: $routeParams.teamId}, function(team) {
        });

    }]);
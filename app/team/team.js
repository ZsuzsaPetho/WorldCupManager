'use strict';

var teamControllers = angular.module('teamControllers', []);

teamControllers.controller('teamControllers', ['$scope', 'Team',
    function($scope, Team) {
        $scope.teams = Team.query();
    }]);
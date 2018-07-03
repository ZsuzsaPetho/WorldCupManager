'use strict';

var teamDetailControllers = angular.module('teamDetailControllers', []);


/*
teamDetailControllers.controller('teamDetailControllers', ['$scope', '$routeParams', 'Team',
    function($scope, $routeParams, Team) {
        $scope.team = Team.get({teamId: $routeParams.teamId}, function(team) {
        });

    }]);*/

teamDetailControllers.controller('teamDetailControllers', ['$scope','$rootScope',
    function($scope, $rootScope ) {
        $scope.team = $rootScope.teams[0];

    }]);
'use strict';

var teamControllers = angular.module('teamMControllers', []);

teamControllers.controller('teamControllers', ['$scope', 'gameService',
    function($scope, gameService) {

        $scope.initTeams = function() {
            gameService.initTeams();
            getGroupStageTeams().$promise.then(function (result) {
                $scope.groups = result.results;
                console.log($scope.groups);
            });

        }
        $scope.groups = getGroupStageTeams();
        $scope.numbers = [[0,1,2,3], [4,5,6,7]];
        $scope.letters = [["A", "B", "C", "D"], ["E","F","G","H"]];

    }]);



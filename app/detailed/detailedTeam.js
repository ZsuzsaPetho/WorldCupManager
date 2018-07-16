'use strict';

var teamDetailControllers = angular.module('teamDetailControllers', []);

teamDetailControllers.controller('teamDetailControllers', ['$scope', '$routeParams', 'gameService',
    function($scope, $routeParams, gameService) {
        $scope.team = gameService.getTeams().find(function(element) {
            return element.id === $routeParams.teamId;
        });
    }]);

teamDetailControllers.directive('historyBackward', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                $window.history.back();
            });
        }
    };
}]);

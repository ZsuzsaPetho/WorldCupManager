'use strict';

var teamDetailControllers = angular.module('teamDetailControllers', []);

teamDetailControllers.controller('teamDetailControllers', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        let teams =[];
        getGroupStageTeams().map(group => group.group)
                            .map(group => group
                            .map(team => teams.push(team)));
        $scope.team = teams.find(function(element) {
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

'use strict';

var teamDetailControllers = angular.module('teamDetailControllers', []);

teamDetailControllers.controller('teamDetailControllers', ['$scope', '$stateParams',
    function($scope, $stateParams) {
        $scope.team = getTeams().find(function(element) {
            return element.id === $stateParams.teamId;
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

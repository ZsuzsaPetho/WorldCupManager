'use strict';

knockOutControllers.directive('knockOutMatch', function() {
    return {
        controller:  ['$scope',
            function($scope) {
            }
        ],
        restrict: 'E',
        scope: {
            matchPair: '=',
            showGoal: '='
        },
        templateUrl: '/knockOutStage/components/knockOutMatch.html',
    }
});
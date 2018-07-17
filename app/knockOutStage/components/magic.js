'use strict';

knockOutControllers.directive('magic', function() {
    return {
        controller:  ['$scope',
            function($scope) {
                console.log($scope.winner);
            }
        ],
        restrict: 'E',
        scope: {
            winner: '='
        },
        templateUrl: '/knockOutStage/components/magic.html',
    }
});
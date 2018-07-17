'use strict';

knockOutControllers.directive('finalKnockOut', function() {
    return {
        controller:  ['$scope', 'utilsService',
            function($scope, utilService) {
                $scope.orderedfinalists = utilService.sortByGoal($scope.finalists);
                $scope.winner = $scope.orderedfinalists[0];
                $scope.loser = $scope.orderedfinalists[1];
            }
        ],
        restrict: 'E',
        scope: {
            finalists: '=',
            ended: '='
        },
        templateUrl: '/knockOutStage/components/finalKnockOut.html',
    }
});
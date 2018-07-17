'use strict';

knockOutControllers.directive('knockOutTeamBtn', function() {
    return {
        controller:  ['$scope',
            function($scope) {
                $scope.name = $scope.team.name;
                $scope.nameSimplified = $scope.name.split(' ').join('').toLowerCase();

            }
        ],
        restrict: 'E',
        scope: {
            team: '=',
            showGoal: '=',
            isWinner: '@'
        },
        templateUrl: '/knockOutStage/components/knockOutTeamBtn.html',
    }
});

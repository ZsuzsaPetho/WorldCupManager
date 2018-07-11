'use strict';

knockOutControllers.directive('knockOutTeamBtn', function() {
    return {
        controller:  ['$scope',
            function($scope) {
                $scope.name = $scope.team.name;
                $scope.nameSimplified = $scope.name.split(' ').join('').toLowerCase();
                $scope.showGoal = ($scope.team.goal === 0) ? false : true;
            }
        ],
        restrict: 'E',
        scope: {
            team: '='
        },
        templateUrl: '/knockOutStage/components/knockOutTeamBtn.html',
    }
});

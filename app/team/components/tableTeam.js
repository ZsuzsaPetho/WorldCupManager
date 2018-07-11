'use strict';

teamControllers.directive('teamTable', function() {
    return {
        controller:  ['$scope',
            function($scope) {
                $scope.numbersI = [0,1,2,3];
            }
        ],
        restrict: 'E',
        scope: {
            numbers: '=',
            letters: '=',
            groups: '='
        },
        templateUrl: '/team/components/tableTeam.html',
    }
})
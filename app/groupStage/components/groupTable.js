'use strict';

groupStageControllers.directive('groupTable', function() {
    return {
        controller:  ['$scope',
            function($scope) {
            }
        ],
        restrict: 'E',
        scope: {
            group: '='
        },
        templateUrl: '/groupStage/components/groupTable.html',
    }
});
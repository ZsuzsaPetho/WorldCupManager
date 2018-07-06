'use strict';

var groupStageControllers = angular.module('groupStageControllers', []);

groupStageControllers.controller('groupControllers', ['$scope',
    function($scope) {
        $scope.groups = getGroupStageTeams();





       //------------------------ WorkAround
        sortByPoints($scope.groups);
        setKnockOutTeams(getWinnersFromGroups($scope.groups));
    }]);

groupStageControllers.directive('groupTable', function() {
    return {
        controller:  ['$scope',
            function($scope) {

            }
        ],
        restrict: 'E',
        scope: {
            group: '=',
            //title: '='*/
        },
        templateUrl: '/groupStage/components/groupTable.html',
    }
})

groupStageControllers.directive('train', function() {
    /*return {
        template : "<h1>{{teams[0]}}</h1>"
    };*/

    return {
        controller:  ['$scope',
            function($scope, magic) {

            }
        ],
        restrict: 'E',
        scope: {
            list: '=',
            title: '='
        },
        templateUrl: '/groupStage/trainDiv/newDiv.html',
    }
})


function getWinnersFromGroups(groups) {
    let winners = [];
    winners.push(groups[0][0]);
    winners.push(groups[1][1]);
    winners.push(groups[2][0]);
    winners.push(groups[3][1]);
    winners.push(groups[4][0]);
    winners.push(groups[5][1]);
    winners.push(groups[6][0]);
    winners.push(groups[7][1]);
    winners.push(groups[1][0]);
    winners.push(groups[0][1]);
    winners.push(groups[3][0]);
    winners.push(groups[2][1]);
    winners.push(groups[5][0]);
    winners.push(groups[4][1]);
    winners.push(groups[7][0]);
    winners.push(groups[6][1]);
    return winners;
}

function sortByPoints(group) {
    group.sort(function(a, b) {
        return b.points - a.points;
    });
}
'use strict';

var myApp = angular.module('myApp', [
    'ngRoute',
    'teamMControllers',
    'teamDetailControllers',
    'myApp.version',
    'teamServices',
    'knockOutControllers'
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/teams', {
            templateUrl: 'team/team.html',
            controller: 'teamDisplayControllers'
        }).
        when('/teams/:teamId', {
            templateUrl: 'detailed/detailedTeam.html',
            controller: 'teamDetailControllers'
        }).
        when('/knockout', {
            templateUrl: 'knockOutStage/knockOutStage.html',
            controller: 'knockOutControllers'
        }).
        when('/group', {
            templateUrl: 'groupStage/groupStage.html',
            controller: ''
        }).
        otherwise({
            redirectTo: '/teams'
        });
    }]);

myApp.directive( 'goClick', function ( $location ) {
    return function ( scope, element, attrs ) {
        var path;

        attrs.$observe( 'goClick', function (val) {
            path = val;
        });

        element.bind( 'click', function () {
            scope.$apply( function () {
                $location.path( path );
            });
        });
    };
});

function getTeams() {
    return JSON.parse(localStorage.getItem("teams"));
}

function setTeams(teams) {
    localStorage.setItem('teams', JSON.stringify(teams));
}


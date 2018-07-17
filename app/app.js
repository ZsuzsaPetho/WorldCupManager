'use strict';

var myApp = angular.module('myApp', [
    'ngRoute',
    'teamMControllers',
    'teamDetailControllers',
    'myApp.version',
    'teamServices',
    'knockOutControllers',
    'groupStageControllers'
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/teams', {
            templateUrl: 'team/team.html',
            controller: 'teamControllers'
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
            controller: 'groupControllers'
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker/serviceWorker.js')
        .then(function(reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}




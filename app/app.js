'use strict';
/*----
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'view',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view'});
}]);

*/

var myApp = angular.module('myApp', [
    'ngRoute',
    'teamControllers',
    'teamDetailControllers',
    'myApp.version',
    'teamServices'
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/teams', {
            templateUrl: 'team/team.html',
            controller: 'teamControllers'
        }).
        when('/teams/:teamId', {
            templateUrl: 'view2/view2.html',
            controller: 'teamDetailControllers'
        }).
        otherwise({
            redirectTo: '/teams'
        });
    }]);

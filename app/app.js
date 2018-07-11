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

function getTeams() {
    return JSON.parse(localStorage.getItem("teams"));
}

function setTeams(teams) {
    localStorage.setItem('teams', JSON.stringify(teams));
}

function getGroupStageTeams() {
    return JSON.parse(localStorage.getItem("GroupStageTeams"));
}

function setGroupStageTeams(teams) {
    setTeams(teams.map(group => group.group)
                  .reduce((acc, val) => acc.concat(val), []));
    localStorage.setItem('GroupStageTeams', JSON.stringify(teams));
}

function getKnockOutTeams() {
    return JSON.parse(localStorage.getItem("knockOutTeams"));
}

function setKnockOutTeams(teams) {
    localStorage.setItem('knockOutTeams', JSON.stringify(teams));
}

function getRound() {
    return JSON.parse(localStorage.getItem("round"));
}

function setRound(round) {
    localStorage.setItem('round', JSON.stringify(round));
}

function getPairs() {
    return JSON.parse(localStorage.getItem("pairs"));
}

function setPairs(leftPairs, rightPairs) {
    localStorage.setItem('pairs', JSON.stringify([leftPairs, rightPairs]));
}

function updateTeams(teamsToUpdate) {
    let teams = getTeams();
    teamsToUpdate.forEach(function (team) {
        let index = teams.findIndex(function(element) {
            return element.id === team.id;
        });
        teams[index] = team;
    });
    setTeams(teams);
}




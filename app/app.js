'use strict';

var myApp = angular.module('myApp', [
    'ui.router',
    'teamMControllers',
    'teamDetailControllers',
    'teamServices',
    'knockOutControllers',
    'groupStageControllers'
]);

myApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('teams', {
            url: '/teams',
            templateUrl: "team/team.html",
            controller: 'teamControllers'
        })
        .state('teamDetailed', {
            url: '/teams/:teamId',
            templateUrl: "detailed/detailedTeam.html",
            controller: 'teamDetailControllers'
        })
        .state('game', {
            url: '/game',
            views: {
                '': {
                    templateUrl: 'game/game.html'
                },
                'group@game': {
                    templateUrl: 'groupStage/groupStage.html',
                    controller: 'groupControllers'
                },
                'knock@game': {
                    templateUrl: 'knockOutStage/knockOutStage.html',
                    controller: 'knockOutControllers'
                }
            }
        });
        $urlRouterProvider.otherwise('/teams');

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
    setGroupsChanged(true);
}

function getRound() {
    return JSON.parse(localStorage.getItem("round"));
}

function setRound(round) {
    localStorage.setItem('round', JSON.stringify(round));
}

function hasGroupsChanged() {
    return JSON.parse(localStorage.getItem("change"));
}

function setGroupsChanged(boolean) {
    localStorage.setItem('change', JSON.stringify(boolean));
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





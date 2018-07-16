'use strict';

/* Services */

var teamServices = angular.module('teamServices', ['ngResource']);

teamServices.factory('Team', ['$resource',
  function($resource){
    return $resource('teams/:teamId.json', {}, {
      query: {method:'GET', params:{teamId:'teams'}, isArray:true}
    });
  }]);

teamServices.factory('Players', ['$resource',
    function($resource){
        return $resource('https://randomuser.me/api/?results=352&inc=name&gender=male', {}, {
            query: {method:'GET', isArray:false}
        });
    }]);

teamServices.service('gameService', ['Team', 'Players',
    function (Team, Players) {
        this.getTeams = function () {
            return JSON.parse(localStorage.getItem("teams"));
        }

        this.setTeams = function (teams) {
            localStorage.setItem('teams', JSON.stringify(teams));
        }

        this.getGroupStageTeams = function () {
            return JSON.parse(localStorage.getItem("GroupStageTeams"));
        }

        this.setGroupStageTeams = function (teams) {
            this.setTeams(teams.map(group => group.group)
                .reduce((acc, val) => acc.concat(val), []));
            localStorage.setItem('GroupStageTeams', JSON.stringify(teams));
        }

        this.getKnockOutTeams = function () {
            return JSON.parse(localStorage.getItem("knockOutTeams"));
        }

        this.setKnockOutTeams = function (teams) {
            localStorage.setItem('knockOutTeams', JSON.stringify(teams));
        }

        this.getRound = function () {
            return JSON.parse(localStorage.getItem("round"));
        }

        this.setRound = function (round) {
            localStorage.setItem('round', JSON.stringify(round));
        }

        this.getKnockOutState = function () {
            return JSON.parse(localStorage.getItem("knockOutState"));
        }

        this.setKnockOutState = function (state) {
            localStorage.setItem('knockOutState', JSON.stringify(state));
        }

        this.resetKnockOutStage = function () {
            let teams = Array.from(this.getKnockOutTeams(), x => Object.assign({}, x));
            this.setKnockOutState({"pairsLeft" : [],
                "pairsRight" : [],
                "remainingLeftBranchTeams" : teams.slice(0, teams.length / 2),
                "remainingRightBranchTeams": teams.slice(teams.length / 2, teams.length),
                "ended": false,
                "round" : 1,
                "showGoal": false});
        }

        this.updateTeams = function (teamsToUpdate) {
            let teams = this.getTeams();
            teamsToUpdate.forEach(function (team) {
                let index = teams.findIndex(function(element) {
                    return element.id === team.id;
                });
                teams[index] = team;
            });
            this.setTeams(teams);
        }
    }]);
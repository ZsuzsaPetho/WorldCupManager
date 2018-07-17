'use strict';

var localStorageServices = angular.module('localStorageServices', []);

localStorageServices.service('storageService', [
    function () {
        this.getTeams = function () {
            return JSON.parse(localStorage.getItem("teams"));
        }

        this.setTeams = function (teams) {
            localStorage.setItem('teams', JSON.stringify(teams));
        }

        this.getGroupStageTeams = function () {
            return JSON.parse(localStorage.getItem("groupStageTeams"));
        }

        this.setGroupStageTeams = function (teams) {
            this.setTeams(teams.map(group => group.group)
                .reduce((acc, val) => acc.concat(val), []));
            localStorage.setItem('groupStageTeams', JSON.stringify(teams));
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
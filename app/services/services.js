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
        this.getWord = function () {
            return "word";
        }
        let groups;
        this.getGroups = function () {
            return groups;
        }

        this.initTeams = function () {
            console.log("pushed service");
            let teams = Team.query();
            teams.$promise.then(function (result) {
                teams = result;
                teams = shuffleArray(teams);
                setTeams(teams);
                let names = Players.query();
                names.$promise.then(function (result) {
                    names = result.results;
                    addPlayersToTeams(teams, names);
                    setTeams(teams);
                    groups = [];
                    for(let i = 0; i < teams.length; i=i+4){
                        teams[i].index = 1;
                        teams[i + 1].index = 2;
                        teams[i + 2].index = 3;
                        teams[i + 3].index = 4;
                        groups.push({"group" :[teams[i], teams[i+1], teams[i+2], teams[i+3]], "matches": []});
                    }
                    setRound(1);
                    setGroupStageTeams(groups);
                });
            });
        }


}]);

function addPlayersToTeams(teamPool, names) {
    var start = 0;
    var chunkSize = 11;
    var array = [];
    teamPool.forEach(function(team) {
        team.players = (names.slice(start, start + chunkSize));
        team.players = generateFullNameForPlayers(team.players);
        start += chunkSize;
    });
}

function generateFullNameForPlayers(players){
    return players.map(function(x){return x.name.first[0].toUpperCase() + ". " + x.name.last[0].toUpperCase() + x.name.last.substr(1)});
}

function shuffleArray(array) {
    var copyOfArray = array.map(function(x) {return x});
    for (var i = copyOfArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copyOfArray[i];
        copyOfArray[i] = copyOfArray[j];
        copyOfArray[j] = temp;
    }
    return copyOfArray;
}
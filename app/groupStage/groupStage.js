'use strict';

var groupStageControllers = angular.module('groupStageControllers', []);

groupStageControllers.controller('groupControllers', ['$scope',
    function($scope) {
        $scope.groups = getGroupStageTeams();
        $scope.round = function() {
            let round = getRound();
            console.log(round);
            if (round < 4) {
                $scope.groups.forEach(function (group) {
                    playRound(group, round);
                    sortByPoints(group);
                });
                setRound(++round);
                setGroupStageTeams($scope.groups);
            }
        };
        $scope.reset = function () {
            setRound(1);
            $scope.groups.forEach(function (group) {
                group.forEach(function(team) {
                    team.matchedPlayed = 0;
                    team.winMatches = 0;
                    team.drawMatches = 0;
                    team.lostMatches = 0;
                    team.goalFor = 0;
                    team.goalAgainst = 0;
                    team.goalDiff = 0;
                    team.points = 0;
                });
            });
            setGroupStageTeams($scope.groups);
        }



       //------------------------ WorkAround

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

function playRound(group, round ) {
    let schedule;
    switch (round) {
        case 1: schedule = [0, 2, 1, 3];
                break;
        case 2: schedule = [0, 1, 2, 3];
                break;
        case 3: schedule = [0, 3, 1, 2];
                break;
    }
    game(group[schedule[0]], group[schedule[1]]);
    game(group[schedule[2]], group[schedule[3]]);
}

function game(teamA, teamB) {
    let match = { "teams" : teamA.name + " : " + teamB.name };
    let goalA = getRandomInt(6);
    let goalB = getRandomInt(6);
    match.result = goalA + " : " + goalB;
    console.log(match.teams + " " + match.result);
    teamA.matchedPlayed += 1;
    teamB.matchedPlayed += 1;
    teamA.goalFor += goalA;
    teamB.goalFor +=  goalB;
    teamA.goalAgainst += goalB;
    teamB.goalAgainst += goalA;
    teamA.goalDiff = teamA.goalFor - teamA.goalAgainst;
    teamB.goalDiff = teamB.goalFor - teamB.goalAgainst;
    if (goalA === goalB){
        teamA.points += 1;
        teamB.points += 1;
        teamA.drawMatches +=1;
        teamB.drawMatches +=1;
    } else if (goalA > goalB) {
        teamA.points += 3;
        teamA.winMatches += 1;
        teamB.lostMatches += 1;
    } else if (goalA < goalB) {
        teamB.points += 3;
        teamB.winMatches += 1;
        teamA.lostMatches += 1;
    }
}

/*
team.matchedPlayed = 0;
team.winMatches = 0;
team.drawMatches = 0;
team.lostMatches = 0;
team.goalFor = 0;
team.goalAgainst = 0;
team.goalDiff = 0;
team.points = 0;
                */

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
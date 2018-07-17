'use strict';

var groupStageControllers = angular.module('groupStageControllers', []);

groupStageControllers.controller('groupControllers', ['$scope', 'storageService', 'utilsService',
    function($scope, storageService, utilsService) {
        $scope.groups = storageService.getGroupStageTeams();
        $scope.ctrlBtnDisabled = false;
        $scope.roundToStart = storageService.getRound();
        if($scope.roundToStart > 2) {
            $scope.ctrlBtnDisabled = true;
        }

        $scope.round = function() {
            let round = storageService.getRound();

            if (round < 4) {
                $scope.groups.forEach(function (group) {
                    playRound(group, round);
                    group.group = utilsService.sortByPoints(group.group);
                });
                if(round < 3 ){
                    storageService.setRound(++round);
                    $scope.roundToStart = round;
                } else {
                    $scope.ctrlBtnDisabled = true;
                }
                storageService.setGroupStageTeams($scope.groups);
            }
            storageService.setKnockOutTeams(getWinnersFromGroups($scope.groups));
            storageService.resetKnockOutStage();
        };

        $scope.reset = function () {
            storageService.setRound(1);
            $scope.ctrlBtnDisabled = false;
            $scope.roundToStart = 1;
            $scope.groups.forEach(function (group) {
                group.group.forEach(function(team) {
                    team.matchedPlayed = 0;
                    team.winMatches = 0;
                    team.drawMatches = 0;
                    team.lostMatches = 0;
                    team.goalFor = 0;
                    team.goalAgainst = 0;
                    team.goalDiff = 0;
                    team.points = 0;
                    team.matches = [];
                });
                group.matches = [];
            });
            storageService.setGroupStageTeams($scope.groups);
            storageService.resetKnockOutStage();
        };
        storageService.setKnockOutTeams(getWinnersFromGroups($scope.groups));

        function game(teamA, teamB, groupObj) {
            let match = { "teams" : teamA.name + " Vs " + teamB.name };
            let goalA = utilsService.getRandomInt(6);
            let goalB = utilsService.getRandomInt(6);
            match.result = goalA + " : " + goalB;
            groupObj.matches.push(match.teams + " " + match.result);
            teamA.matches.push(match.teams + " " + match.result);
            teamB.matches.push(match.teams + " " + match.result);
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

        function playRound(groupObj, round ) {
            let schedule;
            switch (round) {
                case 1: schedule = [1, 3, 2, 4];
                    break;
                case 2: schedule = [1, 2, 3, 4];
                    break;
                case 3: schedule = [1, 4, 2, 3];
                    break;
            }

            groupObj.matches = [];

            game(utilsService.getTeamByIndex(groupObj, schedule[0]), utilsService.getTeamByIndex(groupObj, schedule[1]), groupObj);
            game(utilsService.getTeamByIndex(groupObj, schedule[2]), utilsService.getTeamByIndex(groupObj, schedule[3]), groupObj);
        }

        function getWinnersFromGroups(groups) {
            let winners = [];
            winners.push(groups[0].group[0]);
            winners.push(groups[1].group[1]);
            winners.push(groups[2].group[0]);
            winners.push(groups[3].group[1]);
            winners.push(groups[4].group[0]);
            winners.push(groups[5].group[1]);
            winners.push(groups[6].group[0]);
            winners.push(groups[7].group[1]);
            winners.push(groups[1].group[0]);
            winners.push(groups[0].group[1]);
            winners.push(groups[3].group[0]);
            winners.push(groups[2].group[1]);
            winners.push(groups[5].group[0]);
            winners.push(groups[4].group[1]);
            winners.push(groups[7].group[0]);
            winners.push(groups[6].group[1]);
            return winners;
        }
    }]);










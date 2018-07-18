'use strict';

var utilsServices = angular.module('utilsServices', []);

utilsServices.service('utilsService', [
    function () {
        this.sortByGoal = function (arrayOfTeams) {
            let result = Array.from(arrayOfTeams, x => Object.assign({},x));
            result.sort(function(a, b) {
                return b.goal - a.goal;
            });
            return result;
        };

        this.sortByPoints = function (group) {
            let result = Array.from(group, x => Object.assign({}, x));
            result.sort(function(a, b) {
                let byPointsDiff = b.points - a.points;
                if (byPointsDiff === 0) {
                    let byGoalSDiff = b.goalDiff - a.goalDiff;
                    if(byGoalSDiff === 0){
                        return b.goalFor - a.goalFor;
                    }
                    return byGoalSDiff;
                }
                return byPointsDiff;
            });
            return result;
        };

        this.getTeamByIndex = function (groupObj, index) {
            return groupObj.group.find(function (team) {
                return team.index === index;
            });
        }

        this.getRandomInt = function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        this.shuffleArray = function (array) {
            var copyOfArray = array.map(function(x) {return x});
            for (var i = copyOfArray.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = copyOfArray[i];
                copyOfArray[i] = copyOfArray[j];
                copyOfArray[j] = temp;
            }
            return copyOfArray;
        }

        this.generatePairs = function (array) {
            return new Array(Math.ceil(array.length/2))
                .fill(1)
                .map((x,index) => 2 * index)
                .map((x, index) => array.slice(x, x+2));
        }
    }]);
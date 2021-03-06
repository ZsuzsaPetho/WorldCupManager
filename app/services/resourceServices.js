'use strict';

/* Services */

var resourceServices = angular.module('resourceServices', ['ngResource']);

resourceServices.factory('Team', ['$resource',
  function($resource){
    return $resource('teams/:teamId.json', {}, {
      query: {method:'GET', params:{teamId:'teams'}, isArray:true}
    });
  }]);

resourceServices.factory('Players', ['$resource',
    function($resource){
        return $resource('https://randomuser.me/api/?results=352&inc=name&gender=male', {}, {
            query: {method:'GET', isArray:false}
        });
    }]);


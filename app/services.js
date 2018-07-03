'use strict';

/* Services */

var teamServices = angular.module('teamServices', ['ngResource']);

teamServices.factory('Team', ['$resource',
  function($resource){
    return $resource('teams/:teamId.json', {}, {
      query: {method:'GET', params:{teamId:'teams'}, isArray:true}
    });
  }]);

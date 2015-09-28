'use strict';

function UsersInput() {
  return {
    restrict: 'A',
    scope: {
      sum: '=',
      users: '=',
      currency: '@'
    },
    template: require('./../tpl/directives/users_input.html'),
    link: function(scope, element, attrs) {
      scope.sum = scope.sum || 0;

      scope.getFieldName = function(name) {
        return 'for_whom_' + name.toLowerCase();
      };

      scope.$watch('users', function(users){
        scope.sum = _.reduce(users, function(sum, user) {
          return sum + (
            (_.isNumber(user.paid) && user.paid > 0) ?
              user.paid : 0
          );
        }, 0);
      }, true);
    }
  };
}

function Navigation() {
  return {
    restrict: 'A',
    scope: {
      active: '@'
    },
    template: require('./../tpl/directives/navigation.html'),
    link: function(scope, element, attrs) {
      scope.isSelected = function(key) {
        return scope.active === key;
      };
    }
  };
}

angular.module('app.directives', ['ng-currency'])
  .directive('navigation', Navigation)
  .directive('usersInput', UsersInput);

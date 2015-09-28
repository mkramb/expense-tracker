'use strict';

function ReverseFilter() {
  return function(items) {
    return items.slice().reverse();
  };
}

angular.module('app.filters', [])
  .filter('reverse', ReverseFilter);

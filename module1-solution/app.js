(function () {
'use strict';

// little statuses enumeration
var checkStatuses = {
  'default' : {
    text: 'Please enter data first',
    class: 'validation-error'
  },
  fail : {
    text: 'Too much!',
    class: 'validation-ok'
  },
  ok : {
    text: 'Enjoy!',
    class: 'validation-ok'
  }
};

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];

function LunchCheckController($scope, $filter) {
  // default model values
  $scope.lunchItems = '';
  $scope.lunchCheckStatus = checkStatuses.default;

  $scope.checkLunch = function() {
    var parsedLunchItems = parseLunchItems($scope.lunchItems);
    $scope.lunchCheckStatus = parsedLunchItems.length > 3 ? checkStatuses.fail : checkStatuses.ok;
  }
};

/**
  Returns items parsed out from input box.
  First it splits items by comma.
  Then trims every item and filters outs all empty ones.
*/
function parseLunchItems(rawText) {
  var splitItems = rawText.split(',');
  var filteredItems = splitItems
  .map(function(element){
    return element.trim();
  })
  .filter(function(element){
    return element.length > 0;
  });
  return filteredItems;
}
})();

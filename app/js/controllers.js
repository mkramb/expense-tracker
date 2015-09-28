'use strict';

function AddPaymentCtrl(scope, state, UsersSrv, AppConfig) {
  scope.users = UsersSrv.getAsList();
  scope.currency = AppConfig.Currency;

  scope.selectWhoPays = function(selectedUser) {
    scope.form.users = UsersSrv.filterAndInitialize(
      scope.users, selectedUser
    );
  };

  scope.submitForm = function(isValid) {
    if (isValid && scope.form) {
      var user = scope.form.user;
      var users = scope.form.users;

      UsersSrv.saveEntry({
        name: user.name,
        date: new Date().getTime(),
        total: user.paid,
        payments: _.filter(angular.copy(users), function(user) {
            return _.isNumber(user.paid) && user.paid > 0;
        })
      });

      state.go('list');
    }
  };
}

function ListPaymentsCtrl(scope, firebaseArray, UsersSrv, AppConfig) {
  scope.entries = firebaseArray(UsersSrv.getRef());
  scope.currency = AppConfig.Currency;
}

function NextPaymentCtrl(scope, firebaseArray, UsersSrv) {
  scope.entries = firebaseArray(UsersSrv.getRef());
  scope.entries.$loaded(function(entries) {
    scope.$watch('entries', function(entries) {
      if (entries && entries.length) {
        scope.shouldPayNext = UsersSrv.getUserWithHighestDebt(entries);
      }
    }, true);
  });
}

angular.module('app.controllers', ['ui.router'])
  .controller('AddPaymentCtrl', [
    '$scope', '$state', 'UsersSrv', 'AppConfig',
    AddPaymentCtrl
  ])
  .controller('ListPaymentsCtrl', [
    '$scope', '$firebaseArray', 'UsersSrv', 'AppConfig',
    ListPaymentsCtrl
  ])
  .controller('NextPaymentCtrl', [
    '$scope', '$firebaseArray', 'UsersSrv',
    NextPaymentCtrl
  ]);

'use strict';

require('./controllers');
require('./directives');
require('./services');
require('./filters');

var app = angular.module('app', [
  'app.controllers',
  'app.directives',
  'app.services',
  'app.filters'
]);

app.constant('AppConfig', {
  Firebase: 'https://expense-db.firebaseio.com',
  Currency: '€',
  Users: [
    'Mitja',
    'Igor',
    'Bojana',
    'Andrej',
    'Barbara'
  ]
});

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider)
  {
    $stateProvider
      .state('add', {
        url: '/add',
        controller: 'AddPaymentCtrl',
        templateProvider: function() {
          return require('./../tpl/payments/add.html');
        }
      })
      .state('list', {
        url: '/list',
        controller: 'ListPaymentsCtrl',
        templateProvider: function() {
          return require('./../tpl/payments/list.html');
        }
      })
      .state('next', {
        url: '/next',
        controller: 'NextPaymentCtrl',
        templateProvider: function() {
          return require('./../tpl/payments/next.html');
        }
      });

    $urlRouterProvider.otherwise('/add');
  }
]);

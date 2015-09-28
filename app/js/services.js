'use strict';

function UsersSrv(AppConfig) {
  var ref = new Firebase(AppConfig.Firebase).child(
    'entries'
  );

  this.getRef = function() {
    return ref;
  };

  this.saveEntry = function(data) {
    ref.push(data);
  };

  this.getAsList = function() {
    return _.sortBy(
      _.map(AppConfig.Users, function(user) {
        return {
          name: user,
          paid: 0
        };
      }), 'name'
    );
  };

  this.filterAndInitialize = function(users, selectedUser) {
    return _.filter(users, function(user) {
      return (selectedUser.name !== user.name);
    });
  };

  this.getUserWithHighestDebt = function(entries) {
    var data = [];
    var ref = {};

    if (entries && entries.length) {
      _.each(AppConfig.Users, function(name) {
        ref[name] = data.push({
          name: name,
          debt: 0
        });
      });
    }

    _.each(entries, function(item) {
      data[ref[item.name] - 1].date = item.date;
      data[ref[item.name] - 1].debt -= item.total;

      _.each(item.payments, function(user) {
        data[ref[user.name] - 1].debt += user.paid;
      });
    });

    data = _.sortBy(data, 'debt').reverse();
    data = _.filter(data, function(user) {
      return _.first(data).debt === user.debt;
    });

    if (data.length > 1) {
      data = _.sortBy(data, function(item) {
        return item.date || Number.MAX_SAFE_INTEGER;
      }).reverse();
    }

    return _.first(data);
  }
}

angular.module('app.services', ['firebase'])
  .service('UsersSrv', ['AppConfig', UsersSrv]);

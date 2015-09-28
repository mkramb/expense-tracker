describe('Services', function() {
  beforeEach(module('app'));

  describe('UsersSrv', function() {
    var UsersSrv;
    var AppConfig;

    beforeEach(inject(function(UsersSrv, AppConfig) {
      usersSrv = UsersSrv;
      appConfig = AppConfig
    }));

    describe('getAsList()', function() {
      it('should have the same length as configuration', function() {
        var usersList = usersSrv.getAsList();

        expect(usersList.length).to.equal(appConfig.Users.length);
      });

      it('should have the initial structure', function() {
        var usersList = usersSrv.getAsList();

        _.each(usersList, function(user) {
          expect(user).to.have.property('name');
          expect(user).to.have.property('paid')
          expect(user.paid).to.equal(0);
        });
      });
    });

    describe('filterAndInitialize()', function() {
      it('should remove selected user', function() {
        var usersList = usersSrv.getAsList();
        var selectedUser = _.first(usersList);

        var filteredUsers = usersSrv.filterAndInitialize(
          usersList, selectedUser
        );

        expect(_.indexOf(usersList, selectedUser) === 0).to.true;
        expect(_.indexOf(filteredUsers, selectedUser) === -1).to.true;
        expect(usersList.length).to.equal(filteredUsers.length + 1);
      });
    });

    describe('getUserWithHighestDebt()', function() {
      it('should return user with highest debt', function() {
        var mockUsersEntries = [{
          'date': 1443462102949,
          'name': 'Andrej',
          'payments': [{
              'name': 'Barbara',
              'paid': 5
          }, {
              'name': 'Bojana',
              'paid': 10
          }],
          'total': 15
        }];

        var user = usersSrv.getUserWithHighestDebt(mockUsersEntries);

        expect(user.name).to.equal('Bojana');
        expect(user.debt).to.equal(10);
      });

      it('should check which user paid any money (date)', function() {
        var mockUsersEntries = [{
          'date': 1443462102949,
          'name': 'Andrej',
          'payments': [{
              'name': 'Barbara',
              'paid': 10
          }, {
              'name': 'Bojana',
              'paid': 10
          }],
          'total': 20
        }, {
          'date': 1443462102929,
          'name': 'Bojana',
          'payments': [{
              'name': 'Barbara',
              'paid': 10
          }, {
              'name': 'Mitja',
              'paid': 10
          }],
          'total': 20
        }];

        var user = usersSrv.getUserWithHighestDebt(mockUsersEntries);

        expect(user.name).to.equal('Barbara');
        expect(user.debt).to.equal(20);
      });

    });
  });
});

describe('Directives', function() {
  var element;
  var compile;
  var scope;

  beforeEach(module('app'));

  describe('UsersInput', function() {
    var mockRatingStars = 4.56;

    beforeEach(inject(function($compile, $rootScope, AppConfig, UsersSrv) {
      compile = $compile;
      scope = $rootScope.$new();

      element = [
        '<div users-input',
          'users="form.users"',
          'currency="{{ currency }}"',
          'sum="form.user.paid">',
        '</div>'
      ].join(' ');

      scope.users = UsersSrv.getAsList();
      scope.currency = AppConfig.Currency;

      scope.form = {};
      scope.form.user = _.first(scope.users);
      scope.form.users = UsersSrv.filterAndInitialize(
        scope.users, scope.form.user
      );

      element = $compile(element)(scope);
      scope.$digest();
    }));

    it('should render input for each user', function() {
      var isolated = element.isolateScope();
      expect(element.find('input').length).to.equal(scope.form.users.length);
    });

    it('should calculate payments sum', function() {
      var isolated = element.isolateScope();

      angular.element(element.find('input:eq(0)')).val('10.10').trigger('input');
      angular.element(element.find('input:eq(1)')).val('20.20').trigger('input');

      expect(String(element.find('.sum').text()).trim()).to.equal('30.30');
    });
  });
});

(function() {

  describe('controller: AccountHistoryController', function() {

    beforeEach(module('ngResource'));
    beforeEach(module('ui.router'));
    beforeEach(module('gettext'));
    beforeEach(module('adjust.common'));
    beforeEach(module('adjust.accountSettings'));

    beforeEach(inject(function($controller, $rootScope, _Audit_, _Scroll_, $q) {

      $scope = $rootScope.$new();

      vm = $controller('AccountHistoryController', {
        $scope: $scope
      });

    }));

  });
})();
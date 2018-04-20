import ngResource from 'angular-resource';
import uirouter from 'angular-ui-router';
import gettext from 'angular-gettext';
import common from 'commonModule';
import accountSettings from 'appRootPath/account-settings/account-settings';

describe('controller: AccountHistoryController', function() {

  beforeEach(angular.mock.module(ngResource));
  beforeEach(angular.mock.module(uirouter));
  beforeEach(angular.mock.module(gettext));
  beforeEach(angular.mock.module(common));
  beforeEach(angular.mock.module(accountSettings));

  beforeEach(angular.mock.inject(function($controller, $rootScope, _Audit_, _Scroll_, $q) {

    $scope = $rootScope.$new();

    vm = $controller('AccountHistoryController', {
      $scope: $scope
    });

  }));

});
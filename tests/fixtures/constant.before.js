(function() {
  'use strict';

  angular
    .module('module')
    .constant('someConstant', [{
      title: 'fooTitle',
      store: 'fooStore'
    }, {
      title: 'barTitle',
      store: 'barStore'
    }]);

})();
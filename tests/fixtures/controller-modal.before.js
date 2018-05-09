(function() {
  'use strict';

  angular
    .module('module')
    .controller('SomeController', SomeController);

  function SomeController($scope, Service, Modal) {

    var vm = this;

    vm.foobar = foobar;

    $scope.$on('event', _handleEvent);

    function _handleEvent(e, active) {
      // do something
    }

    function foobar() {
      // bam
    }

    function confirmDeactivate() {

      Modal.init({
        scope: $scope,
        parent: '#sidebar-view',
        title: gettextCatalog.getString('Deactivate App Secret'),
        tpl: 'app/path/to/module/a/b/template.html',
        classes: ['helper-msg', 'confirm-msg', 'with-paragraphs'],
        align: 'center',
        initialModel: {
          appToken: vm.app.token
        }
      }).result.then(_deactivateSecret);

    }

  }

})();
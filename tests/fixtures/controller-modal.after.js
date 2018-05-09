function SomeController($scope, Service, Modal) {
  'ngInject';
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
      tpl: require('appRootPath/path/to/module/a/b/template.html'),
      classes: ['helper-msg', 'confirm-msg', 'with-paragraphs'],
      align: 'center',
      initialModel: {
        appToken: vm.app.token
      }
    }).result.then(_deactivateSecret);

  }
}

export { SomeController };
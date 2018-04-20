function SomeController($scope, Service) {
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
}

export { SomeController };
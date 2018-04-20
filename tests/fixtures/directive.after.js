function someDirective() {
  'ngInject';
  return {
    restrict: 'E',
    scope: {},
    template: require('appRootPath/path/to/module/a/b/template.html'),
    controllerAs: 'vm',
    controller: 'SomeDirectiveController',
    bindToController: {
      baz: '='
    }
  };
}

function SomeDirectiveController(Service) {
  'ngInject';
  var vm = this;

  vm.foobar = foobar;

  function foobar() {
    // bam
  }
}
export { SomeDirectiveController, someDirective };
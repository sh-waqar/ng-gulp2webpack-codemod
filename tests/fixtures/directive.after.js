/* @ngInject */
export default function someDirective() {
  return {
    restrict: 'E',
    scope: {},
    template: require("./template.html"),
    controllerAs: 'vm',
    controller: SomeDirectiveController,
    bindToController: {
      baz: '='
    }
  };
}

/* @ngInject */
function SomeDirectiveController(Service) {

  var vm = this;

  vm.foobar = foobar;

  function foobar() {
    // bam
  }

}
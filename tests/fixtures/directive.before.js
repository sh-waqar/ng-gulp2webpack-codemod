(function() {
  'use strict';

  angular
    .module('module')
    .directive('someDirective', someDirective)
    .controller('SomeDirectiveController', SomeDirectiveController);

  function someDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/path/to/module/a/b/template.html',
      controllerAs: 'vm',
      controller: 'SomeDirectiveController',
      bindToController: {
        baz: '='
      }
    };
  }

  function SomeDirectiveController(Service) {

    var vm = this;

    vm.foobar = foobar;

    function foobar() {
      // bam
    }

  }
})();
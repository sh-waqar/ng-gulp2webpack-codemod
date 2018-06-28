export default function config($stateProvider, $urlMatcherFactoryProvider) {
  'ngInject';
  $stateProvider
    .state('foo', {
      url: '/foo',
      onEnter: function($state) {
        $state.transition.finally(function() {
          $state.go('foobar');
        });
      }
    })
    .state('bar', {
      url: '/bar',
      template: require('./error-page.html'),
      controller: 'BarController',
      controllerAs: 'vm',
      resolve: {
        resolve: function(resolver) {
          return resolver.resolve('foobar');
        }
      }
    });
}
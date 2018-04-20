export const alias = {
  app: 'appRootPath'
};

export const modules = {
  'adjust': ['adjust', 'appModule'],
  'adjust.common': ['common', 'commonModule'],
  'adjust.error-page': ['errorPage', 'appRootPath/error-page/error-page'],
  'adjust.login': ['login', 'appRootPath/login/login'],
  'adjust.apptrace': ['apptrace', 'appRootPath/apptrace/apptrace'],
  'adjust.apps': ['apps', 'appRootPath/apps/apps'],
  'adjust.segmentation': ['segmentation', 'appRootPath/segmentation/segmentation'],
  'adjust.statistics': ['statistics', 'appRootPath/statistics/statistics'],
  'adjust.on-boarding': ['onBoarding', 'appRootPath/on-boarding/on-boarding'],
  'adjust.accountSettings': ['accountSettings', 'appRootPath/account-settings/account-settings'],
  'adjust.inactive': ['inactive', 'appRootPath/inactive/inactive'],
  'adjust.signup': ['signup', 'appRootPath/signup/signup'],
  'adjust.secretStats': ['signup', 'appRootPath/secret-stats/secret-stats'],

  'angular': ['angular', 'angular'],
  'ui.router': ['uirouter', 'angular-ui-router'],
  'ngResource': ['ngResource', 'angular-resource'],
  'ngAnimate': ['ngAnimate', 'angular-animate'],
  'ngSanitize': ['ngSanitize', 'angular-sanitize'],
  'ngFileUpload': ['ngFileUpload', 'ng-file-upload'],
  'gettext': ['gettext', 'angular-gettext'],
  'pickadate': ['pickadate', 'angular-pickadate'],
  'Raven': ['Raven', 'raven-js'],
  'ngRaven': ['ngRaven', 'raven-js/plugins/angular']
}
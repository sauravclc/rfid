/***
SkyWebApp AngularJS Entry File
***/

/* Metronic App */
var SkyWebApp = angular.module("SkyWebApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
SkyWebApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/* Setup global settings */
SkyWebApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Main Controller */
SkyWebApp.controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);


/* Setup Layout Part - Header */
SkyWebApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
SkyWebApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */


/* Setup Layout Part - Footer */
SkyWebApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Init global settings and run the app */
SkyWebApp.run(["$rootScope", "settings", "$state", "AuthService", "$location", function($rootScope, settings, $state, auth, $location) {
    $rootScope.$state = $state; // state to be accessed from view
    // check for authentication on routechange
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        // event.preventDefault();
        if(auth.isLoggedIn()) {
            
        } else {
            if (toState.name !== 'login') {
                $location.path('/login');
            }
        }
      });
      //apply http headers here
    //   var $httpProvider = $injector.get('$http'),$cookies = $injector.get('$cookies');
    //   if($cookies.get('session')){
    //     $httpProvider.defaults.headers.common['SessionKey'] = $cookies.get("session");
    //   }
}]);

SkyWebApp.constant('CONFIG', {
    GMAP_API_KEY: 'AIzaSyBhuV5nrEGyANaNF9ZDCamI6PWHhUz-YsY',
    OTHER_CONFIG: 'Some-random-string'
});
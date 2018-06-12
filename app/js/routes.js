'use strict';

SkyWebApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");  
    
    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",            
            data: {pageTitle: 'Dashboard'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'SkyWebApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                             'js/controllers/DashboardController.js'
                        ] 
                    });
                }]
            }
        })
        .state('students', {
            url: "/students",
            templateUrl: "views/students.html",            
            data: {pageTitle: 'Students'},
            controller: "StudentController as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'SkyWebApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                             'js/controllers/StudentController.js'
                        ] 
                    });
                }]
            }
        })
        // Login Page
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",            
            data: {pageTitle: 'Login'},
            controller: "LoginController as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'SkyWebApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                             'assets/admin/layout/css/login.css',
                             'js/controllers/LoginController.js'
                        ] 
                    });
                }]
            }
        })

}]);
"use strict";

SkyWebApp.controller("LoginController", function(
  $rootScope,
	$scope,
	AuthService
) {
  var vm = this; // expose $scope to viewModel
  $scope.$on("$viewContentLoaded", function() {
    Metronic.initAjax(); // initialize core components
    // Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu
  });

  // set sidebar closed and body solid layout mode
  $rootScope.settings.layout.pageBodySolid = true;
  $rootScope.settings.layout.pageSidebarClosed = true;

  vm.login = function(loginForm) {
    AuthService.login(vm.user).then(function(response) {

		}, function(error) {
			vm.isErrorLogin = true;
		})
  };
});

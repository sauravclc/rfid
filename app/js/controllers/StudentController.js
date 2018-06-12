"use strict";

SkyWebApp.controller("StudentController", function(
  $rootScope,
  $scope,
  $http,
  $timeout,
  $modal
) {
  $scope.$on("$viewContentLoaded", function() {
    Metronic.initAjax(); // initialize core components
    Layout.setSidebarMenuActiveLink("set", $("#sidebar_menu_link_users")); // set profile link active in sidebar menu
  });
  var vm = this;
  vm.users = [];

  vm.pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: vm.users.length,
    setPage: function(page) {
      vm.pagination.currentPage = page;
    },
    setItemsPerPage: function(num) {
      vm.pagination.itemsPerPage = num;
    }
  };

  vm.addUser = function(user) {
    UserService.addUser(user).then(
      function(response) {
        if (response && response.status === 200) {
          console.log("user added successfully");
        }
      },
      function(err) {
        console.error("error adding user");
      }
    );
  };

  vm.removeUser = function(user) {
    UserService.removeUser(user).then(
      function(response) {
        if (response && response.status === 200) {
          console.log("user removed successfully");
        }
      },
      function(err) {
        console.error("error removing user");
      }
    );
  };

  vm.changeUserStatus = function(user, status) {
    user.active = status;
    UserService.changeUserStatus(user).then(
      function(response) {
        if (response && response.status === 200) {
          status === "enable"
            ? console.log("User enabled")
            : console.log("user disabled");
        }
      },
      function(err) {
        console.error("error changing user status user");
      }
    );
  };
  // vm.openModal = function() {
  //   var modalInstance = $modal.open({
  //     template: '<h1>Hello</h1>',
  //     // controller: ModalInstanceCtrl,
  //     // backdrop: 'static',

  //   });
  //   console.log(modalInstance);
  // }
});

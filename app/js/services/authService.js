SkyWebApp.service("AuthService", [
  "$http",
  "$injector",
  "$location",
  function($http) {
    var auth = {};

    auth.setData = function(user) {
      try {
        localStorage.setItem("SKY_WEB_TOKEN", user.token);
        localStorage.setItem("SKY_WEB_USER", JSON.stringify(user));
        this.isLoggedIn = true;
      } catch (error) {
        throw new Error("Cannot set token on localstorage");
      }
    };

    auth.getToken = function() {
      var token;
      try {
        token = localStorage.getItem("SKY_WEB_TOKEN");
      } catch (error) {
        throw new Error("Cannot get token from localstorage");
      }
      return token;
    };

    auth.isLoggedIn = function() {
      return this.getToken();
    };

    auth.login = function(loginDetails) {
      return $http
        .post("/api/login", loginDetails)
        .then(function(response) {
          auth.setData(response.data);
        });
    };

    auth.logout = function() {
      try {
        localStorage.removeItem("SKY_WEB_TOKEN");
        localStorage.removeItem("SKY_WEB_USER");
        this.isLoggedIn = false;
      } catch (error) {
        throw new Error("Cannot remove token from localstorage");
      }
    };

    return auth;
  }
]);

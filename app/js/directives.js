/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
SkyWebApp.directive("ngSpinnerBar", [
  "$rootScope",
  function($rootScope) {
    return {
      link: function(scope, element, attrs) {
        // by defult hide the spinner bar
        element.addClass("hide"); // hide spinner bar by default

        // display the spinner bar whenever the route changes(the content part started loading)
        $rootScope.$on("$stateChangeStart", function() {
          element.removeClass("hide"); // show spinner bar
        });

        // hide the spinner bar on rounte change success(after the content loaded)
        $rootScope.$on("$stateChangeSuccess", function() {
          element.addClass("hide"); // hide spinner bar
          $("body").removeClass("page-on-load"); // remove page loading indicator
          Layout.setSidebarMenuActiveLink("match"); // activate selected link in the sidebar menu

          // auto scorll to page top
          setTimeout(function() {
            Metronic.scrollTop(); // scroll to the top on content load
          }, $rootScope.settings.layout.pageAutoScrollOnLoad);
        });

        // handle errors
        $rootScope.$on("$stateNotFound", function() {
          element.addClass("hide"); // hide spinner bar
        });

        // handle errors
        $rootScope.$on("$stateChangeError", function() {
          element.addClass("hide"); // hide spinner bar
        });
      }
    };
  }
]);

// Handle global LINK click
SkyWebApp.directive("a", function() {
  return {
    restrict: "E",
    link: function(scope, elem, attrs) {
      if (attrs.ngClick || attrs.href === "" || attrs.href === "#") {
        elem.on("click", function(e) {
          e.preventDefault(); // prevent link click for above criteria
        });
      }
    }
  };
});

// Handle Dropdown Hover Plugin Integration
SkyWebApp.directive("dropdownMenuHover", function() {
  return {
    link: function(scope, elem) {
      elem.dropdownHover();
    }
  };
});
SkyWebApp.directive("passwordField", function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      elem.on('click', function() {
        elem.removeClass('password-field');
        setTimeout(() => {
          elem.addClass('password-field');
        }, 2000);
      })
    }
  };
});

// Google Map
// <sky-gmap  api_key="googlemapapikey"/>
SkyWebApp.directive("skyGmap", function(CONFIG) {
  var map;
  function loadWellData() {
    console.log("loading map");
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 1,
      center: new google.maps.LatLng(2.8, -187.3),
      mapTypeId: "terrain"
    });
    var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');
          return {
            icon: getCircle(magnitude)
          };
        });
      }

      function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
      }

      function eqfeed_callback(results) {
        map.data.addGeoJson(results);
    // https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
  }
  window.eqfeed_callback = eqfeed_callback;
  return {
    restrict: "E",
    link: function(scope, el) {
      var key = CONFIG.GMAP_API_KEY;
      var script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        key +
        "&callback=loadWellData";
      script.defer = true;
      document.getElementsByTagName("head")[0].appendChild(script);
      window.loadWellData = loadWellData;
    }
  };
});

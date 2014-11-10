//main.js

var footwearApp = angular.module('footwearApp', []);
	footwearApp.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

footwearApp.controller('ProductsCtrl', function ($scope, $http) {
	$scope.loading = true;
	$scope.noresults = false;
	$scope.nonetwork = false;
	$scope.items = [];
	$scope.checked = [];

	$scope.gender = "";
	$scope.surface = "";
	$scope.sport = "";
	$scope.brand = "";

	//load the shoes...
	$http.get('http://footwearpcs.thecompleteexperience.ca/index.php/shoesearch').success(function(data) {
	//$http.get('http://calpcs1wb01.fglsports.com/api/search?sportCategory=32').success(function(data) {
		// $('.spinner').fadeOut( "slow" );
		// $('.shoe').fadeIn("slow");
		$scope.loading = false;
		$scope.shoes = data;

	});

	$scope.statusReport =function(){
		alert("gender: " + $scope.gender + "\nsport: " + $scope.sport + "\nsurface: " + $scope.surface + "\nbrand: " + $scope.brand);
	}

	$scope.setGender = function(g){
		$scope.gender = g;
		// $scope.statusReport();
		$scope.sendQuery($scope.gender, $scope.sport, $scope.surface, $scope.brand);
	}

	$scope.setSport = function(s){
		$scope.sport = s;
		// $scope.statusReport();
		$scope.sendQuery($scope.gender, $scope.sport, $scope.surface, $scope.brand);
	}

	$scope.setSurface = function(s){
		$scope.surface = s;
		// $scope.statusReport();
		$scope.sendQuery($scope.gender, $scope.sport, $scope.surface, $scope.brand);
	}

	$scope.setBrand = function(b){
		$scope.brand = b;
		// $scope.statusReport();
		$scope.sendQuery($scope.gender, $scope.sport, $scope.surface, $scope.brand);
	}

	$scope.sendQuery = function(gender, sport, surface, brand){
		$scope.shoes = [];
		$scope.loading = true;
		$http.get('http://footwearpcs.thecompleteexperience.ca/index.php/shoesearch', { params: { gender: gender, sport: sport, surface: surface, brand: brand } })
		  .success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
			$scope.loading = false;

			if(data.length > 0){
				$scope.noresults = false;
				$scope.nonetwork = false;
				$scope.shoes = data;
			} else {
				$scope.noresults = true;
			}

		  })
		  .error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
				$scope.nonetwork = true;
		  });
	};

	//Quick List Management
	$scope.addItem = function(itemStyle, itemName){
		$scope.items.push({
			style: itemStyle,
			name: itemName
		});
		console.log($scope.items);

	//	$scope.isAdded = true;

	};

	$scope.removeItem = function(index){
		//$scope.checked.push($scope.items[index]);
		var idx = $scope.items[index];
        $scope.items.splice(idx, 1);

		console.log($scope.items);
	};

});

footwearApp.controller('BrandListCtrl', function ($scope, $http) {
	$http.get('http://footwearpcs.thecompleteexperience.ca/index.php/brands').success(function(data) {
	//$http.get('http://calpcs1wb01.fglsports.com/api/search?sportCategory=32').success(function(data) {

		$scope.brands = data;
	});
});

footwearApp.controller('SportListCtrl', function ($scope, $http) {
	$http.get('http://footwearpcs.thecompleteexperience.ca/index.php/sports').success(function(data) {
	//$http.get('http://calpcs1wb01.fglsports.com/api/search?sportCategory=32').success(function(data) {

		$scope.sports = data;
	});
});


footwearApp.controller('SurfaceListCtrl', function ($scope, $http) {
	$http.get('http://footwearpcs.thecompleteexperience.ca/index.php/surfaces').success(function(data) {
	//$http.get('http://calpcs1wb01.fglsports.com/api/search?sportCategory=32').success(function(data) {

		$scope.surfaces = data;
	});
});

// footwearApp.directive("toggleAddShoeStatus") {
// 		$('#addShoeStatus').removeClass("fa-thumb-tack");
// 		$('#addShoeStatus').addClass("fa-thumbs-up");
// });

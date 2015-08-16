angular.module('app').controller('HomeController', function($scope, ProductResource){
	var object = ProductResource;
	$scope.isDataAccessible = object != null;
	
	if($scope.isDataAccessible){
		$scope.currencies = object.currencies;
	}else{
		$scope.message = 'Data is not accessible!';
	}

	$scope.run = function(index){
		var products = object.get();
		if(products != null && products.length > 0){
			var currency = $scope.currencies[index];
			$scope.currencyName = currency.name.toUpperCase();
			$scope.items = products;
			
			//calculate exchange rate
			for(var idx in $scope.items)
			{
				$scope.items[idx].price *= currency.rate;
			}
		}
	}
});
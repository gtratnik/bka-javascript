var ctrl, ctrlScope, injector,products;
//mockup object
function MockupObject(){

}

MockupObject.prototype.get = function(currency){
	return [{id:1,name:"Item 1",price:5,type:"type 1"},{id:2,name:"Item 2",price:15,type:"type 1"},{id:3,name:"Item 3",price:35,type:"type 2"}];
}

MockupObject.prototype.currencies = [{name:"nzd",rate:1},{name:"thb",rate:23},{name:"eur",rate:0.67}];
products = new MockupObject();

//init module
module("Angular", {
    setup: function () {
        angular.module('app');
        injector = angular.injector(['app']);
        ctrlScope = injector.get('$rootScope').$new();
        ctrl = injector.get('$controller')('HomeController', { $scope: ctrlScope, ProductResource: products });
    },
    teardown: function () {

    }
});

//tests

test("List contains 3 items", function () {
	//load items with nzd exchange rate
	ctrlScope.run(0); //'nzd'
    equal(3, ctrlScope.items.length,'OK');
});

test("Convert price from nzd to thb",function(){
	//load items with thb exchange rate
	ctrlScope.run(1); //'thb'
	equal(115, ctrlScope.items[0].price,'OK');
	equal(345, ctrlScope.items[1].price,'OK');
	equal(805, ctrlScope.items[2].price,'OK');
});

test("Convert price from nzd to eur",function(){
	//load items with thb exchange rate
	ctrlScope.run(2); //'eur'
	equal(3.35, ctrlScope.items[0].price,'OK');
	equal(10.05, ctrlScope.items[1].price,'OK');
	equal(23.450000000000003, ctrlScope.items[2].price,'OK');
});

test("Show error message if data is not accessible",function(){
	ctrl = injector.get('$controller')('HomeController', { $scope: ctrlScope, ProductResource: null });
	equal('Data is not accessible!', ctrlScope.message,'OK');
});
angular.module('app').factory('ProductResource', function() {
    return new ProductDataConsolidator();
});
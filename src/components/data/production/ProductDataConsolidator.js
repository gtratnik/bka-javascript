function ProductDataConsolidator() {
	
}

var addToList = function(repository,type){
	var products = [];
	
	for(var idx in repository){
		products.push({
			id: repository[idx].id,
			name: repository[idx].name,
			price: repository[idx].price,
			type: type
		});
	}
	
	return products;
}

ProductDataConsolidator.prototype.get = function () {
	var lawnmowerProducts = addToList(new LawnmowerRepository().getAll(),'Lawnmover');
	var phonecaseProducts = addToList(new PhoneCaseRepository().getAll(),'Phone case');
	var tshirtProducts = addToList(new TShirtRepository().getAll(),'T-Shirt');

	return lawnmowerProducts.concat(phonecaseProducts).concat(tshirtProducts);
}

ProductDataConsolidator.prototype.currencies = [{name:'nzd',rate:1},{name:'usd',rate:0.76},{name:'eur',rate:0.67}];
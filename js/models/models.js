window.Card = Backbone.Model.extend({});

window.GalleryList = Backbone.Collection.extend({
	model:Card
});

window.StoryList = Backbone.Collection.extend({
	model:Card
});

window.ApprovedCardList = Backbone.Collection.extend({
	model:Card,
	url: 'api/approved',  
    pagination : function(perPage, page) {
    	var collection = this; 
	    page = page-1;
	    collection = _(collection.rest(perPage*page));
	    collection = _(collection.first(perPage));    
    	return collection.map( function(model) { return model; } ); 
    }
});

window.AllApprovedCards = Backbone.Collection.extend({
	model:Card,
	url: 'api/onlyapproved',  
    pagination : function(perPage, page) {
    	var collection = this; 
	    page = page-1;
	    collection = _(collection.rest(perPage*page));
	    collection = _(collection.first(perPage));    
    	return collection.map( function(model) { return model; } ); 
    }
});

window.AllCards = Backbone.Collection.extend({
	model:Card,
	url: 'api/allcards',
    pagination : function(perPage, page) {
	    var collection = this; 
		page = page-1;
		collection = _(collection.rest(perPage*page));
		collection = _(collection.first(perPage));    
		return collection.map( function(model) { return model; } ); 
    }
});
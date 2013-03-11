window.Card = Backbone.Model.extend({});

window.Instagram = Backbone.Model.extend({});

window.Keyword = Backbone.Model.extend({
    defaults:{
        keyword: 'New keyword',
        visible: 1,
        count: 0
	}
});

window.KeywordList = Backbone.Collection.extend({
	model:Keyword,
	url: 'api/keywords'
});

window.InstagramList = Backbone.Collection.extend({
	model:Instagram,
	url: 'api/instagrams'
});

window.GalleryList = Backbone.Collection.extend({
	model:Card,
	url: 'api/galleries'
});

window.StoryList = Backbone.Collection.extend({
	model:Card,
	url: 'api/stories'
});

window.ApprovedCardListCollection = Backbone.Collection.extend({
	model:Card,
	initialize: function(){

		

	},
	url: 'api/approved',
	    
    pagination : function(perPage, page) {
	    
	    if(this.approval == 0){
		    var collect = this.filter(function(card) {
			    return card.get("approved") == '1';
			});
			var collection = new Backbone.Collection(collect);
	    }else{
		   var collection = this; 
	    }

		    page = page-1;

		    collection = _(collection.rest(perPage*page));
		    collection = _(collection.first(perPage));    
	    	return collection.map( function(model) { return model; } ); 

    }
    
});

window.CardListCollection = Backbone.Collection.extend({
	model:Card,
	initialize: function(){

		

	},
	url: 'api/allcards',
	    
    pagination : function(perPage, page) {
	    
	    if(this.approval == 0){
		    var collect = this.filter(function(card) {
			    return card.get("approved") == '1';
			});
			var collection = new Backbone.Collection(collect);
	    }else{
		   var collection = this; 
	    }

		    page = page-1;

		    collection = _(collection.rest(perPage*page));
		    collection = _(collection.first(perPage));    
	    	return collection.map( function(model) { return model; } ); 

    }
    
});
window.AddCardView = Backbone.View.extend({

	initialize: function(){ 
		this.model.bind("reset", this.render, this); 
	},
				
	render: function(){

	}
});
	
	
window.AddTwitterItem = Backbone.View.extend({
	id: 'approval-bar',
	template: _.template($('#approval-bar').html()),
	events: {
		'click #add' : 'add'
	},	
	add : function(){

		this.model.save({silent:true});
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
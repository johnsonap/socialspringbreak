window.KeywordListView = Backbone.View.extend({
	className: 'span5 box',
	id: 'light-list',
	template: _.template($('#tpl-keyword-list').html()),
	initialize: function(){
		this.model.bind("reset", this.render, this);
		this.model.bind("change", this.render, this);	
	},
	events : {
		'click #addNewLight': 'addNew'
	},
	addNew : function(){
		KeywordList.create(new Keyword());
	},
	render: function(){
		this.$el.html(this.template);
		_.each(this.model.models, function (keyword) {	
			$(this.el).children('ul').append(new KeywordListItemView({model:keyword}).render().el);
        }, this);
        return this;
	}
});

window.KeywordListItemView = Backbone.View.extend({
	tagName:'li',
	className:'keyword',
	template: _.template($('#keyword-list-item').html()),
	events:{
		'keypress .editing' : 'updateNameOnEnter',
		'click .destroy' : 'clear',
		'dblclick .view' : 'edit',
		'blur .editing' : 'close',
	},
	edit: function(e){
		e.preventDefault();
		this.$el.addClass('edit');
		this.$('.editing').focus();
	},
	clear: function(){
		this.model.destroy();		
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.input = this.$('.edit');
    },
	updateNameOnEnter : function(e){
		if (e.keyCode == 13) this.close();	
		
	},
	close: function(){
		var value = this.$('.editing').val();
		if(value != ''){
			this.model.save({keyword: value});
        	this.$el.removeClass("edit");
        }
        else{
	        this.$('.editing').val(this.model.get('name'));
	        this.$el.removeClass("edit");
        }
	},
    render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
    }
});
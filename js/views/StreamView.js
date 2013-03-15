

window.StreamView = Backbone.View.extend({

	tagName: 'ul',
	id: 'grid',

	initialize: function(){ 
		this.model.bind("reset", this.render, this); 
		this.page = 1;
		_.bindAll(this, 'addMore');
		$(window).scroll(this.addMore);
		$('#scroll-to-top').click(function(){
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}); 
		this.model.approval = this.options.approval;
		this.scrolled = 0;
		this.startNum = 30;
		this.addNum = 10;
	},
	
	addMore: function(){
		
		var triggerPoint = 570; // from the bottom
		
		if(this.model.pagination(this.addNum,this.page+1).length !== 0 && $(window).scrollTop() + $(window).height() + triggerPoint > $(document).height() && this.scrolled == 0){

			if(this.options.approval == 0){
				_gaq.push(['_trackEvent',
					'Stream View', // category of activity
					'Add More', // Action
				]);
			}
			
			$('#loading').fadeIn();
			
			this.page++;
			this.scrolled = 1;
			_.each(this.model.pagination(this.addNum,this.page), function(card){
			
				if(card.get('type') == 'i')  			var content = new InstagramItemView({model:card}).render().el;
				else if(card.get('type') == 't')		var content = new TwitterItemView({model:card}).render().el;
				else if(card.get('type') == 'gallery')	var content = new GalleryItemView({model:card}).render().el;
				else if(card.get('type') == 'story')	var content = new StoryItemView({model:card}).render().el;
				
				if(this.options.approval == 1)			$(content).append(new ApprovalBarView({model:card}).render().el);
				
				$(content).css({opacity: 0});
				$(this.el).append($(content));			
				
			},this);

			$('#grid').imagesLoaded(function(){
				$('#grid').masonry('reload');
				$('.grid-card').animate({opacity:1}, 1000);
				$('#loading').fadeOut();
			});
		}
		
		else	this.scrolled = 0;
	},
	
			
	render: function(){
		this.page = 1;

		_.each(this.model.models, function(card){	card.set('fromNow', moment.unix(card.get('time')).fromNow());	});
		
		if(this.model.length > 0){
		 	
			if(this.options.approval == 0){
				var count = 2;

				_.each(galleryList.models, function(gallery){
					this.model.add(gallery, {at:count});
					count += Math.floor(Math.random()*5+4);
				}, this)
				var count = 7;
				_.each(storyList.models, function(story){
					if(story.get('type') != 'gallery')	this.model.add(story, {at:count});
					count+= Math.floor(Math.random()*5+4);
				}, this);	
				//$(this.el).append($(new AdItemView().render().el).css({opacity: 0}));
			}

			
			_.each(this.model.pagination(this.startNum,this.page), function(card){
				
				if(card.get('type') == 'i')  			var content = new InstagramItemView({model:card}).render().el;
				else if(card.get('type') == 't')		var content = new TwitterItemView({model:card}).render().el;
				else if(card.get('type') == 'gallery')	{console.log('gallery');var content = new GalleryItemView({model:card}).render().el;}
				else if(card.get('type') == 'story')	var content = new StoryItemView({model:card}).render().el;
				
				//if in approval view, add approval bar
				if(this.options.approval == 1)			$(content).append(new ApprovalBarView({model:card}).render().el);
				$(content).css({opacity: 0});
				$(this.el).append($(content));
						
			},this);
			
			this.page=this.page+(this.startNum/this.addNum);
			var $container = $('#grid');
			$container.imagesLoaded(function(){
				var cW = 300;
				var gW = 19; 				
				
				$container.masonry({
					itemSelector : '.grid-card',
					gutterWidth: gW,
					cardWidth: cW,
					isAnimated: false,
					columnWidth: function( containerWidth ) {
						var boxes = (containerWidth/cW | 0);
						(containerWidth < cW) ? box_width = containerWidth : box_width = (((containerWidth - (boxes-1)*gW)/boxes) | 0);
						$('.slideshow').height(box_width/1.5);
						$('.grid-card').width(box_width);
						return box_width;
					}
				}); 
				
				$('.grid-card').animate({opacity:1}, 1000);
				$('#scroll-to-top').fadeIn();

				$('#loading').fadeOut();
			});	
		}
		return this;
		
	}
});

window.ApprovalBarView = Backbone.View.extend({
	id: 'approval-bar',
	template: _.template($('#approval-bar').html()),
	events: {
		'click .approve' : 'approve',
		'click .deny' : 'deny',
		'click .edpick' : 'edpick'
	},
	approve : function(){
		this.model.set('approved', '1');
		this.model.save({silent:true});
		this.render();
	},
	edpick : function(){
		this.model.set('approved', '2');
		this.model.save({silent:true});
		this.render();
	},
	deny : function(){
		this.model.set('approved', '-1');
		this.model.save({silent:true});
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

window.InstagramItemView = Backbone.View.extend({
	tagName:'li',
	className: 'grid-card instagram-card',
	template: _.template($('#instagram-list-item').html()),
	render: function() {
		 this.$el.html(this.template(this.model.toJSON()));
		 return this;
	}
});

window.TwitterItemView = Backbone.View.extend({
	tagName:'li',
	className: 'grid-card twitter-card',
	template: _.template($('#twitter-list-item').html()),
	render: function() {
		 this.$el.html(this.template(this.model.toJSON()));
		 return this;
	}
});

window.AdItemView = Backbone.View.extend({
	tagName:'li',
	className: 'grid-card ad-card',
	template: _.template($('#ad-list-item').html()),
	render: function() {
		 this.$el.html(this.template());
		 return this;
	}
});


window.GalleryItemView = Backbone.View.extend({
	tagName:'li',
	className: 'grid-card nh-card gallery-card',
	template: _.template($('#gallery-list-item').html()),
	render: function() {
		 this.$el.html(this.template(this.model.toJSON()));
		 return this;
	}
});

window.StoryItemView = Backbone.View.extend({
	tagName:'li',
	className: 'grid-card nh-card story-card',
	template: _.template($('#story-list-item').html()),
	render: function() {
		 this.$el.html(this.template(this.model.toJSON()));
		 return this;
	}
});

window.AdminPagination = Backbone.Paginator.requestPager.extend({

	// As usual, let's specify the model to be used
	// with this collection


	// We're going to map the parameters supported by
	// your API or backend data service back to attributes
	// that are internally used by Backbone.Paginator. 

	// e.g the NetFlix API refers to it's parameter for 
	// stating how many results to skip ahead by as $skip
	// and it's number of items to return per page as $top

	// We simply map these to the relevant Paginator equivalents

	// Note that you can define support for new custom attributes
	// adding them with any name you want

	paginator_core: {
		// the type of the request (GET by default)
		type: 'GET',
		
		// the type of reply (jsonp by default)
		dataType: 'json',
	
		// the URL (or base URL) for the service
		url: function() {return 'api/admin_list/'+ this.currentPage;}
	},
	
	paginator_ui: {
		// the lowest page index your API allows to be accessed
		firstPage: 0,
	
		// which page should the paginator start from 
		// (also, the actual page the paginator is on)
		currentPage: 0,
		perPage: 10,

		// a default number of total pages to query in case the API or 
		// service you are using does not support providing the total 
		// number of pages for us.
		// 10 as a default in case your service doesn't return the total
		totalPages: 20
	},
	
	server_api: {
		// the query field in the request
		                                   
	},

	parse: function (response) {
		
		return response;
	}

});
window.Pagination = Backbone.Paginator.requestPager.extend({

	// As usual, let's specify the model to be used
	// with this collection


	// We're going to map the parameters supported by
	// your API or backend data service back to attributes
	// that are internally used by Backbone.Paginator. 

	// e.g the NetFlix API refers to it's parameter for 
	// stating how many results to skip ahead by as $skip
	// and it's number of items to return per page as $top

	// We simply map these to the relevant Paginator equivalents

	// Note that you can define support for new custom attributes
	// adding them with any name you want
	url: 'api/allcards',
	paginator_core: {
		// the type of the request (GET by default)
		type: 'GET',
		
		// the type of reply (jsonp by default)
		dataType: 'json',
	
		// the URL (or base URL) for the service
		url: function() {return 'api/list/'+ this.currentPage;}
	},
	
	paginator_ui: {
		// the lowest page index your API allows to be accessed
		firstPage: 0,
	
		// which page should the paginator start from 
		// (also, the actual page the paginator is on)
		currentPage: 0,
		perPage: 10,
		
		// a default number of total pages to query in case the API or 
		// service you are using does not support providing the total 
		// number of pages for us.
		// 10 as a default in case your service doesn't return the total
		totalPages: 20
	},
	
	server_api: {
		// the query field in the request
		                                   
	},

	parse: function (response) {
		
		return response;
	}

});


window.StreamView = Backbone.View.extend({
	tagName: 'ul',
	id: 'grid',
	initialize: function() {
		window.id = new Array();
		this.page = 1;
		_.bindAll(this, 'addMore');
		$(window).bind('scroll',this.addMore);
		$('#scroll-to-top').click(function() {
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
		});
		this.model.approval = this.options.approval;
		this.scrolled = 0;
		this.startNum = 30;
		this.addNum = 10;
	},
	addMore: function() {
		
		var triggerPoint = 570; // from the bottom
		if ( $(window).scrollTop() + $(window).height() + triggerPoint > $(document).height() && this.scrolled == 0 ) {
			this.scrolled = 1;
			//track add more events in google analytics
			if (this.options.approval == 0) {
				_gaq.push(['_trackEvent', 'Stream View', // category of activity
				'Add More' // Action
				]);
			}
			$('#loading').fadeIn();
			this.page++;
			
			
			_.each(this.model.models, function(card) {
				
				
				card.set('fromNow', moment.unix(card.get('time')).fromNow());
				var content;
				if (card.get('type') == 'i') content = new InstagramItemView({
					model: card
				}).render().el;
				else if (card.get('type') == 't') content = new TwitterItemView({
					model: card
				}).render().el;
				
				if (this.options.approval == 1) $(content).append(new ApprovalBarView({
					model: card
				}).render().el);
				$(content).css({
					opacity: 0
				});
				if($.inArray(card.get('id'), window.id) !== -1) {

				}else{
					$('#grid').append($(content));
				}
				window.id.push(card.get('id'));
			}, this);
			var scroll = this.scrolled;
			this.model.nextPage({success: $.proxy(function(){
				this.scrolled = 0;

			},this)});
			$('#grid').imagesLoaded(function() {
				$('#grid').masonry('reload');
				$('.grid-card').animate({
					opacity: 1
				}, 1000);

				$('#loading').fadeOut();
			},this);
			
		}
	},
	render: function() {
	
		this.page = 1;
		


		if (this.options.approval === 0) {
			var count = 2;
			_.each(galleryList.models, function(gallery) {
				this.model.add(gallery, {
					at: count
				});
				count += Math.floor(Math.random() * 5 + 4);
			}, this);
			
			count = 7;
			_.each(storyList.models, function(story) {
				if (story.get('type') != 'gallery') this.model.add(story, {
					at: count
				});
				count += Math.floor(Math.random() * 5 + 4);
			}, this);


		}
		_.each(this.model.models, function(card) {

			window.id.push(card.get('id'));
			card.set('fromNow', moment.unix(card.get('time')).fromNow());
			
			var content;
			if (card.get('type') == 'i') content = new InstagramItemView({
				model: card
			}).render().el;
			else if (card.get('type') == 't') content = new TwitterItemView({
				model: card
			}).render().el;
			else if (card.get('type') == 'gallery') content = new GalleryItemView({
				model: card
			}).render().el;
			else if (card.get('type') == 'story') content = new StoryItemView({
				model: card
			}).render().el;
			//if in approval view, add approval bar
			if (this.options.approval == 1) $(content).append(new ApprovalBarView({
				model: card
			}).render().el);
			$(content).css({
				opacity: 0
			});
			$('#grid').append($(content));
		}, this);
		this.page = this.page + (this.startNum / this.addNum);
		this.model.nextPage();
		$('#grid').imagesLoaded(function() {
			var cW = 310;
			var gW = 19;
			$('#grid').masonry({
				itemSelector: '.grid-card:visible',
				gutterWidth: gW,
				cardWidth: cW,
				isAnimated: false,
				columnWidth: function(containerWidth) {
					var boxes = (containerWidth / cW | 0);
					(containerWidth < cW) ? box_width = containerWidth : box_width = (((containerWidth - (boxes - 1) * gW) / boxes) | 0);
					$('.slideshow').height(box_width / 1.5);
					$('.grid-card').width(box_width);
					return box_width;
				}
			});
			$('.grid-card').animate({
				opacity: 1
			}, 1000);
			$('#scroll-to-top').fadeIn();
			$('#loading').fadeOut();
		});
		return this;
	}
});
window.ApprovalBarView = Backbone.View.extend({
	id: 'approval-bar',
	template: _.template($('#approval-bar').html()),
	events: {
		'click .approve': 'approve',
		'click .deny': 'deny',
		'click .edpick': 'edpick'
	},
	approve: function() {
		$.get('api/update/'+ this.model.get('id'), {approved: 1}, {success: function(){}});
		this.model.set('approved', '1');
		this.render();
		
	},
	edpick: function() {
		$.get('api/update/'+ this.model.get('id'), {approved: 2}, {success: function(){}});
		this.model.set('approved', '2');
		this.render();
	},
	deny: function() {
		$.get('api/update/'+ this.model.get('id'), {approved: -1}, {success: function(){}});
		this.model.set('approved', '-1');
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
window.InstagramItemView = Backbone.View.extend({
	tagName: 'li',
	className: 'grid-card instagram-card',
	template: _.template($('#instagram-list-item').html()),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
window.TwitterItemView = Backbone.View.extend({
	tagName: 'li',
	className: 'grid-card twitter-card',
	template: _.template($('#twitter-list-item').html()),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
window.AdItemView = Backbone.View.extend({
	tagName: 'li',
	className: 'grid-card ad-card',
	template: _.template($('#ad-list-item').html()),
	render: function() {
		this.$el.html(this.template());
		return this;
	}
});
window.GalleryItemView = Backbone.View.extend({
	tagName: 'li',
	className: 'grid-card nh-card gallery-card',
	template: _.template($('#gallery-list-item').html()),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
window.StoryItemView = Backbone.View.extend({
	tagName: 'li',
	className: 'grid-card nh-card story-card',
	template: _.template($('#story-list-item').html()),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
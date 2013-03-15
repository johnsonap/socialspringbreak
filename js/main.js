window.AppRouter = Backbone.Router.extend({
    routes:{
        "" : 'stream',
        "approve" : 'approval',
        "about" : 'about',
        "onlyapproved" : 'onlyapproved'
    },
    about: function(){
    	$("html, body").animate({ scrollTop: 0 }, "slow");
	    $('#main').html($('#tpl-about').html());
	    $('#scroll-to-top').fadeOut();
    },
    stream: function(){
    	$("html, body").animate({ scrollTop: 0 }, "slow");
    	$('.nav li').removeClass('active');
    	$('.nav li:nth-child(1)').addClass('active');
    	
    	window.ApprovedCards = new ApprovedCardList();    	
    	ApprovedCards.fetch();

    	var streamView = new StreamView({model: ApprovedCards, approval: 0});
		$('#main').html(streamView.render().$el);
		$('#loading').fadeIn();
		
    },
    approval: function(){
    	$("html, body").animate({ scrollTop: 0 }, "slow");
    	allCards = new AllCards();
    	allCards.fetch();
		$('.nav li').removeClass('active');
		var approvalView = new StreamView({model: allCards, approval: 1});
		$('#main').html(approvalView.render().$el);
		$('#loading').fadeIn();

    },
    onlyapproved: function(){
    	$("html, body").animate({ scrollTop: 0 }, "slow");
    	allApprovedCards = new AllApprovedCards();
    	allApprovedCards.fetch();
		$('.nav li').removeClass('active');
		var onlyApprovedView = new StreamView({model: allApprovedCards, approval: 1});
		$('#main').html(onlyApprovedView.render().$el);
		$('#loading').fadeIn();

    }
});

var app = new AppRouter();
Backbone.history.start();
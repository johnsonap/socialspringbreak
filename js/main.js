

window.AppRouter = Backbone.Router.extend({
    routes:{
        "" : 'stream',
        "approve" : 'approval',
        "about" : 'about',
        "onlyapproved" : 'onlyapproved'
    },
    about: function(){
    	$(window).unbind();
    	if($('#grid').masonry()) $('#grid').masonry('destroy');
    	$('.grid-card').css({opacity: 0});
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('#grid').hide();
        $('#about').show();
        $('#about').html($('#tpl-about').html());
        $('#loading').hide();
        $('#scroll-to-top').fadeOut();
    },
    stream: function(){
    	$(window).unbind();
	    if($('#grid').masonry()) $('#grid').masonry('destroy');
    	$('.grid-card').css({opacity: 0});
    	$('.ad-card').show();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('.nav li').removeClass('active');
        $('.nav li:nth-child(1)').addClass('active');
        window.ApprovedCards = new ApprovedCardList();      
        ApprovedCards.fetch();
        var streamView = new StreamView({model: ApprovedCards, approval: 0});
        $('#about').hide();
        $('#grid').show();
        $('#grid li:not(.ad-card)').remove();
        streamView.render();
        $('#loading').fadeIn();
    },
    approval: function(){
    	$(window).unbind();
	    if($('#grid').masonry()) $('#grid').masonry('destroy');
	    $('.grid-card').css({opacity: 0});
        $("html, body").animate({ scrollTop: 0 }, "slow");
        allCards = new AllCards();
        allCards.fetch();
        $('.nav li').removeClass('active');
        
        var approvalView = new StreamView({model: allCards, approval: 1});
        $('#about').hide();
        $('#grid').show();
        $('#grid li:not(.ad-card)').remove();
        $('.ad-card').hide();
        approvalView.render();
        $('#loading').fadeIn();
    },
    onlyapproved: function(){

    	if($('#grid').masonry()) $('#grid').masonry('destroy');
    	$('.grid-card').css({opacity: 0});
        $("html, body").animate({ scrollTop: 0 }, "slow");
        allApprovedCards = new AllApprovedCards();
        allApprovedCards.fetch();
        $('.nav li').removeClass('active');
        $('#about').hide();
        $('#grid').show();
        $('#grid li:not(.ad-card)').remove();
        $('.ad-card').hide();
        var onlyApprovedView = new StreamView({model: allApprovedCards, approval: 1});
        onlyApprovedView.render()
        $('#loading').fadeIn();
    }
});
var app = new AppRouter();
Backbone.history.start();
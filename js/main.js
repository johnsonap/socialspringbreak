

window.AppRouter = Backbone.Router.extend({
    routes:{
        "" : 'stream',
        "approve" : 'approval',
        "about" : 'about',
        "onlyapproved" : 'onlyapproved'
    },
    about: function(){
    	$(window).unbind('scroll');
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
    	$(window).unbind('scroll');
	    if($('#grid').masonry()) $('#grid').masonry('destroy');
    	$('.grid-card').css({opacity: 0});
    	$('.ad-card').show();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('.nav li').removeClass('active');
        $('.nav li:nth-child(1)').addClass('active');

        window.paginatedItems = new Pagination();
        paginatedItems.goTo(0, {success: function(){
	        
	        var streamView = new StreamView({model: paginatedItems, approval: 0});
	        $('#about').hide();
	        $('#grid').show();
	        $('#grid li:not(.ad-card)').remove();
	        streamView.render();
	        $('#loading').fadeIn();
        }});
        
        
    },
    approval: function(){
    	$(window).unbind('scroll');
	    if($('#grid').masonry()) $('#grid').masonry('destroy');
	    $('.grid-card').css({opacity: 0});
        $("html, body").animate({ scrollTop: 0 }, "slow");

        $('.nav li').removeClass('active');
        window.adminPaginatedItems = new AdminPagination();
        adminPaginatedItems.goTo(0, {success: function(){
	        var approvalView = new StreamView({model: adminPaginatedItems, approval: 1});
	        $('#about').hide();
	        $('#grid').show();
	        $('#grid li:not(.ad-card)').remove();
	        $('.ad-card').hide();
	        approvalView.render();
	        $('#loading').fadeIn();
	    }});
	},
    onlyapproved: function(){
    	$(window).unbind('scroll');
    	if($('#grid').masonry()) $('#grid').masonry('destroy');
    	$('.grid-card').css({opacity: 0});
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('.nav li').removeClass('active');
        
        window.approvedPaginatedItems = new Pagination();
        approvedPaginatedItems.goTo(0, {success: function(){
	        
	        $('#about').hide();
        $('#grid').show();
        $('#grid li:not(.ad-card)').remove();
        $('.ad-card').hide();
        var onlyApprovedView = new StreamView({model: approvedPaginatedItems, approval: 1});
        onlyApprovedView.render()
        $('#loading').fadeIn();
        }});
        
    }
});
var app = new AppRouter();
Backbone.history.start();
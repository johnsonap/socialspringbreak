    
function toRad(coor){
	return coor * (3.141592653/180);
}
function toDeg(coor){
	return coor * (180/3.141592653);
}


function moveDirection(lat,lng, d, brng){
	var R = 6371;
	brng = toRad(brng);
	var lat1 = toRad(lat);
	var lon1 = toRad(lng);
	var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng) );
	var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
	return [toDeg(lat2), toDeg(lon2)];
}

L.colorIcon = L.Icon.extend({
	options: {
    	color: '',
    	shadowUrl: null,
	    iconSize: [12,12],
	    iconAnchor: [6, 4],
		className: 'leaflet-div-icon'
	},
	createIcon: function () {

		var div = document.createElement('div');
		var numdiv = document.createElement('div');
		numdiv.setAttribute("class", this.options['color']);
		div.appendChild(numdiv);
		this._setIconStyles(div, 'icon');
		return div;
	},
	createShadow: function () { return null; }
});
    

Backbone.View.prototype.close = function(){
	this.remove();
	this.unbind();
	console.log(this);
	if (this.onClose){
		this.onClose();
		console.log('onclose');
	}

}


// Router
window.AppRouter = Backbone.Router.extend({

	
    routes:{
        "map":"mapView",
        "" : 'stream',
        "approve" : 'approval',
        "about" : 'about'
    },

    about: function(){
	    
    },
    
    stream: function(){
    
    	$('.nav li').removeClass('active');
    	$('.nav li:nth-child(1)').addClass('active');
    	var ApprovedCards = new ApprovedCardListCollection();
	    
	    ApprovedCards.fetch();
	        	
    	var streamView = new StreamView({model: ApprovedCards, approval: 0});
    	streamView.close();
		$('#main').html(streamView.render().$el);
		$('#loading').fadeIn();
    },
    
    approval: function(){
    
    	approvedCardList = new CardListCollection();
    	approvedCardList.fetch();
		$('.nav li').removeClass('active');
		var approvalView = new StreamView({model: approvedCardList, approval: 1});

		$('#main').html(approvalView.render().$el);
		$('#loading').fadeIn();
    },

    mapView:function () {
    	
	    $(window).unbind('scroll');
    	$('.nav li').removeClass('active');
    	$('.nav li:nth-child(2)').addClass('active');
       	$('#main').html('<div class="span12 box" ><div id="map"></div></div>');
       	var ApprovedCards = new ApprovedCardListCollection();
       	ApprovedCards.fetch();
       	var mapView = new Map({model: ApprovedCards, approval: 0}); 

    }
    
});


var app = new AppRouter();
Backbone.history.start();

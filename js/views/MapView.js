//helper functions

    
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

//map view


window.Map = Backbone.View.extend({
        
	el: $('#map'),
        
    initialize: function() {
	    this.model.bind("reset", this.render, this);
	    this.center = [30.17, -85.78];
	    this.zoom = 13;
	},
	
	render: function(){

		map = L.map('map', {
	   		center: this.center,
	   		zoom: this.zoom
	   	});
   		
   		var mapHeight = 0;
   		
   		if($(window).width() < 610){
   			mapHeight = $(window).height()-50;
   		}
   		
   		
   		else{
	   		mapHeight = $(window).height()-79
   		}
   		
   		
   		
	   	$('#map').height(mapHeight);
	   	
	   	
	   	$('#map').append('<div id="legend"><span id="legend-title">Marker Colors</span><ul><li><span class="legend-block t"></span>Twitter</li><li><span class="legend-block i"></span>Instagram</li></ul></div>');
	   	

	   	var southWest = new L.LatLng(29.8928, -86.0257),
            northEast = new L.LatLng(30.6306,-85.2937),
            bounds = new L.LatLngBounds(southWest, northEast);
	   	
	    L.tileLayer('http://{s}.tiles.mapbox.com/v3/johnsonap.newmap/{z}/{x}/{y}.png', {
		   	attribution: 'Data &copy; OpenStreetMap and contributors, CC-BY-SA',
		   	maxZoom: 17
		   	,minZoom:11
		}).addTo(map);
		
		map.on('moveend', $.proxy(function() {	this.center = map.getCenter();	}, this));
        map.on('zoomend', $.proxy(function() {	this.zoom = map.getZoom();	}, this));
        var count = 0;
        
        _.each(this.model.models, function (tweet) {

	        	tweet.set('fromNow', moment.unix(tweet.get('time')).fromNow());
	        	new MarkerView({model:tweet});

	        count++;
	    }, this);
		
        return this;
    }

}); //-- End of Map view

window.MarkerView = Backbone.View.extend({
	
	className: 'tweetWrap',
	
	initialize: function(){

		

		if(this.model.get('hasCoords') == '1'){
		

			var coordsarray = this.model.get('coord').split(',');
			var type = this.model.get('type');
			this.marker = L.marker([coordsarray[1], coordsarray[0]],{closeButton: false,icon: new L.colorIcon({color: type})}).addTo(map);
			var wid = 310;
			this.marker.on('click',function(e){
				if( type == 't'){
					var classType = 'twitter';
					var content = new TwitterItemView({model:this.model}).render().el;
					wid = 350;
					
				}
				if( type == 'i'){
					var classType = 'instagram';
					var content = new InstagramItemView({model:this.model}).render().el;
				}
				
				this.popup = L.popup({maxWidth: wid, minWidth: wid, autoPanPadding: new L.Point(10,10)})
					.setLatLng([coordsarray[1], coordsarray[0]])
					.setContent('<div class="' + classType + '-card">' + $(content).html() + '</div>')
					.openOn(map);
					
			},this);
				
		}
	}
	
});
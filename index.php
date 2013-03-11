<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<title>Spring Break Map</title>
		<link rel="stylesheet" href="css/leaflet.css" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
		<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
		<!--[if lte IE 8]><link rel="stylesheet" href="css/leaflet.ie.css" /><![endif]-->	
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="css/bootstrap-responsive.css" />
		<link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/style.css" />
	</head>

	<body>
        <div class="navbar navbar-fixed-top navbar-inverse">
        	<div class="navbar-inner">
        		<div class="container-fluid">
        			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
	        			<span class="icon-bar"></span>
	        			<span class="icon-bar"></span>
	        			<span class="icon-bar"></span>
	        		</a>	


	        		<a class="brand" href="#">Spring Break</a>
	        		<div class="nav-collapse collapse">
	        			<ul class="nav">
	        				<li class="active"><a href="#">Stream</a></li>
	        				<li class="active"><a href="#map">Map</a></li>	
	        			</ul>
	        		</div>
	        		<img class="hidden-phone" src="img/newsherald-inverted.png" id="logo" />
	        		
	        	</div>
	        </div>
        </div>

		<div class="container-fluid">
			<div class="row-fluid" id="main"></div>
			<div id="loading"><img alt="Loading..." src="img/load.gif"></div>
		</div>
		
		
		<script type="text/template" id="tpl-about">
			About Schtuff
					
		</script>
		
		<!-- Templates -->		
		<script type="text/template" id="instagram-list-item">
			
			<a target="_blank" href="<%=data.link %>" target="_blank">
				<img class="main-photo" src="<%= data.images.standard_resolution.url %>"/>
			</a>

			<div class="card-content">	
				<p class="instagram-caption"><% if(data.caption !== null){ %><%= data.caption.text %><% } %></p>
		    </div>
		    
		    <span class="card-footer"><i class="logo">&nbsp;</i><p><%= fromNow %></p> <span class="username"><a href="http://instagram.com/<%= data.user.username %>" target="_blank">@<%= data.user.username %></a></span> </span>
		
		</script>
		
		<script type="text/template" id="twitter-list-item">
			
			<div class="card-content">
				<a class="account-group" href="http://twitter.com/<%= data.user.screen_name %>" target="_blank">
				<img class="avatar" src="<%= data.user.profile_image_url %>" alt="<%= data.user.screen_name %>">
				<strong class="fullname"><%= data.user.name %></strong> <span class="username">@<%= data.user.screen_name %></span>
			</a>	
				<p class="tweet-text"><%= indexedtext %></p>
			
			</div>
			<ul class="card-footer">
				<li class="logo"><i class="icon-twitter"></i></li>
				<li class="time-container"><a href="http://www.twitter.com/<%= data.user.screen_name %>/status/<%= data.id_str %>" target="_blank"> <!--Via <a href="http://twitter.com/<%= data.user.screen_name %>" target="_blank">@<%= data.user.screen_name %></a>--><%= fromNow %></a></li>
				<li class="reply-container"><a href="https://twitter.com/intent/tweet?in_reply_to=<%= data.id_str %>" target="_blank" title="Reply"><i class="icon-reply"></i> <b>Reply</b></a></li>
				<li class="retweet-container"><a href="https://twitter.com/intent/retweet?tweet_id=<%= data.id_str %>" target="_blank" title="Retweet"><i class="icon-retweets"></i> <b>Retweet</b></a></li>
				<li class="favorite-container"><a href="https://twitter.com/intent/favorite?tweet_id=<%= data.id_str %>" target="_blank"  title="favorite"><i class="icon-favorite"></i> <b>Favorite</b></a></li>
			</ul>	
			<div class="clear"></div>
		</script>
		
		<script type="text/template" id="story-list-item">


				<img class="gallery-preview" src="<%= imageUrl %>" />
				<span class="nh-info">
					<h4><a href="<%= link %>" target="_blank"><%= title %></a></h4>
					<p> <%= description %> </p>
				</span>
				

			<span class="card-footer"><img class="small-logo" src="img/newsherald-small.png"><span><%= prettyTime %> </span></span>

		</script>
		
		<script type="text/template" id="gallery-list-item">

			<a href="<%= albumlink %>"><img class="gallery-preview" src="<%= photos.photo[0].preview %>" /></a>
			<span class="nh-info">
				<h4><a href="<%= albumlink %>" target="_blank"><%= albumname %></a></h4>
				<p> <%= description %> </p>
				
			</span> 
			<span class="card-footer"><img class="small-logo" src="img/newsherald-small.png"><span><%= prettyTime %></span></span>
		</script>
		
		<script type="text/template" id="ad-list-item"> Advertisement </script>
		
		<script type="text/template" id="approval-bar">
			<span class="btn btn-mini<% if(approved == '1'){ %> btn-success <% } %> approve">Approve</span><span class="btn btn-mini<% if(approved == '-1'){ %> btn-danger <%  } %> deny">Deny</span>
			 <% if(hasCoords == '1'){ %><i class="icon-globe <% if(inPCB == '1'){ %> green <% } %>"></i> <% } %>
		</script>
			
		<!-- JavaScript -->
		
		
				
		<script src="js/jquery-1.7.1.min.js"></script>

		<script src="js/jquery.masonry.min.js"></script>
		<script src="js/jquery.isotope.js"></script>
		<script src="js/leaflet.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/underscore.js"></script>
		<script src="js/backbone.js"></script>
		<script src="js/moment.min.js"></script>
		<script src="js/models/models.js"></script>   
		<script src="js/views/MapView.js"></script>   
		<script src="js/views/StreamView.js"></script>   
		<script>
			
			window.galleryList = new GalleryList();
			
			galleryList.reset(<?php 
				$xml = simplexml_load_file("http://www.emeraldcoastphotoseast.com/datafeeds/18686.xml");

				foreach($xml as $album){
					$album->type = 'gallery';
					$album->approved = '1';
					$album->prettyTime = date('F j, Y', strtotime($album->date));
					$str .= json_encode($album) . ',';
					$n++;
				}
				
				echo '[' .substr($str, 0, strlen($str)-1) . ']'; 
			?>);
			
			window.storyList = new StoryList();
			
			storyList.reset(<?php 
				
				$xml = simplexml_load_file('http://www.newsherald.com/cmlink/1.105375','SimpleXMLElement', LIBXML_NOCDATA);		

				foreach($xml->channel->item as $album){
			
					$album->imageUrl = $album->enclosure->attributes()->url;
					$album->type = 'story';
					$album->approved = '1';
					$album->prettyTime = date('F j, Y', strtotime($album->pubDate));
					$str .= json_encode($album) . ',';
				}
				
				echo '[' . substr($str, 0, strlen($str)-1) . ']'; 
			?>);
			
		</script>
		<script src="js/main.js"></script>   
		<script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
		<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2983481-9']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
	</body>
</html>
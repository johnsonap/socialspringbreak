<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml">
	<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Social Spring Break</title>
		<meta name="description" content="Every year thousands of college kids on spring break make the drive south to Panama City Beach, Fla. With the rise of the smart phone, more and more young people are now using social media to document every moment of their lives. Here, we tell the story of spring break in Panama City Beach by using the tweets and instagrams of those on spring break.">
		<meta name="viewport" content="width=device-width">
		<meta content='Social Spring Break' name='Every year thousands of college kids on spring break make the drive south to Panama City Beach, Fla. With the rise of the smart phone, more and more young people are now using social media to document every moment of their lives. Here, we tell the story of spring break in Panama City Beach by using the tweets and instagrams of those on spring break.'/>

		<!-- meta tags for facebook -->
		<meta property="og:title" content="Social Spring Break"/>
		<meta property="og:type" content="website"/>
		<meta property="og:url" content="http://pcnhhalifax.com/springbreak/"/>
		<meta property="og:image" content="http://pcnhhalifax.com/springbreak/img/preview.jpg"/>
		<meta property="og:site_name" content="Social Spring Break from The News Herald"/>
		<meta property="og:description" content="Every year thousands of college kids on spring break make the drive south to Panama City Beach, Fla. With the rise of the smart phone, more and more young people are now using social media to document every moment of their lives. Here, we tell the story of spring break in Panama City Beach by using the tweets and instagrams of those on spring break."/>

		<!-- meta tags for twitter -->
		<meta property="twitter:card" content="summary">
		<meta property="twitter:site" content="@The_News_Herald">
		<meta property="twitter:creator" content="@PCNH_AndrewJ">
		<meta property="twitter:url" content="http://pcnhhalifax.com/springbreak/">
		<meta property="twitter:title" content="Social Spring Break from The News Herald">
		<meta property="twitter:description" content="Every year thousands of college kids on spring break make the drive south to Panama City Beach, Fla. With the rise of the smart phone, more and more young people are now using social media to document every moment of their lives. Here, we tell the story of spring break in Panama City Beach by using the tweets and instagrams of those on spring break.">
		<meta property="twitter:image" content="http://pcnhhalifax.com/springbreak/img/preview.jpg">
		
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="css/style.min.css" />
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
	        		<a class="brand" href="/">Social Spring Break</a>
	        		<div class="nav-collapse collapse">
	        			<ul class="nav">
	        				<li class="active"><a href="/">Stream</a></li>
	        				<li class="active"><a href="#about">About</a></li>
	        				
	        			</ul>
	        			<ul class="branding nav pull-right">
							<li><a href="http://bit.ly/YTBMXf" title="Share on Twitter" alt="Share on Twitter"><i class="icon-twitter"></i></a></li>
							<li id="logo"><a href="http://www.newsherald.com"><img class="hidden-phone pull-right" src="img/newsherald-inverted.png" id="logo" /></a></li>
						</ul>
	        		</div>

	        	</div>
	        </div>
        </div>

		<div class="container-fluid">
			
			<div class="row-fluid" id="main">

				<ul clas="grid" id="grid">	
					<li class="grid-card ad-card">
						<p>Advertisement</p>
						<script type="text/javascript">
						  var ord = window.ord || Math.floor(Math.random() * 1e16);
						  document.write('<script type="text/javascript" src="http://ad.doubleclick.net/N5434/adj/pc.newsherald/pcnhSpringBreak;sz=300x250;ord=' + ord + '?"><\/script>');
						</script>
					</li>
				</ul>
				<div id="about"></div>
			</div>
			<div id="loading"><img alt="Loading..." src="img/load.gif"></div>
			<div id="scroll-to-top"><i class="icon-arrow-up"></i></div>
			
		</div>
		
		<script type="text/template" id="tpl-about">
			<div class="box span8 offset2 row-fluid">
				<h1>About Social Spring Break</h1>
				<p>Every year thousands of college kids on spring break make the drive south to Panama City Beach, Fla. With the rise of the smart phone, more and more young people are now using social media to document every moment of their lives. Here, we tell the story of spring break in Panama City Beach by using the tweets and instagrams of those on spring break.</p>

<p>Here's how the site works. We search both twitter and instagram in real-time for spring break related posts. Then we curate and publish only the best and most relevant for you, our reader. This is not an up to the second real-time feed of what's happening out there, but instead a carefully selected and more thoughtful look at the experience of Panama City Beach spring break.</p>

<p>If you're interested in having your photos or tweets featured on this site, tag them with #pcb13 on twitter and instagram and we may feature them here.</p>

<p class="text-center">Questions, comments or concerns? Send an email to Andrew at <a href="mailto:ajohnson@pcnh.com">ajohnson@pcnh.com</a><br/><small>By Andrew Johnson, Chris Olwell and Joe Grimes</small></p>
			</div>
		</script>
		
		<!-- Templates -->		
		<script type="text/template" id="instagram-list-item">
			
			<a target="_blank" href="<%=data.link %>" target="_blank">
				<img class="main-photo" src="<%= data.images.standard_resolution.url %>"/>
			</a>

			<div class="card-content">	
				<p class="instagram-caption"><% if(data.caption !== null){ %><%= data.caption.text %><% } %></p>
		    </div>
		    
		    <span class="card-footer"><div class="logo"><i class="logo"></i></div><%= fromNow %> <span class="username"><a href="http://instagram.com/<%= data.user.username %>" target="_blank">@<%= data.user.username %></a></span> </span>
		
		</script>
		<script type="text/template" id="twitter-list-item">
			<div class="card-content">
				<a class="account-group" href="http://twitter.com/<%= data.user.screen_name %>" target="_blank">
				<img class="avatar" height="20" width="20" src="<%= data.user.profile_image_url %>" alt="<%= data.user.screen_name %>">
				<strong class="fullname"><%= data.user.name %></strong> <span class="username">@<%= data.user.screen_name %></span>
			</a>	
				<p class="tweet-text"><%= indexedtext %></p>
			</div>
			<ul class="card-footer">
				<li class="logo"><i class="icon-twit"></i></li>
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
		<script type="text/template" id="ad-list-item">
			<p>Advertisement</p>
		</script>
		<script type="text/template" id="approval-bar">
			<span class="btn btn-mini<% if(approved == '1'){ %> btn-success <% } %> approve">Approve</span><span class="btn btn-mini<% if(approved == '-1'){ %> btn-danger <%  } %> deny">Deny</span><span class="btn btn-mini<% if(approved == '2'){ %> btn-success <% } %> edpick">Editor's Pick</span>
		</script>
			
		<!-- JavaScript -->
		
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script src="js/jquery.masonry.min.js"></script>
		<script src="js/underscore.js"></script>
		<script src="js/backbone.js"></script>
		<script src="js/moment.min.js?v=1002"></script>
		<script src="js/models/models.js?v=1003"></script>     
		<script src="js/views/StreamView.js?v=1003"></script>   

		<script> 	
			window.galleryList = new GalleryList(<?php
				$filename = "feeds/galleryfeed.json";
				$handle = fopen($filename, "r");
				$contents = fread($handle, filesize($filename));
				echo $contents;
				fclose($handle);
			?>);
			
			window.storyList = new StoryList(<?php
				$filename = "feeds/storyfeed.json";
				$handle = fopen($filename, "r");
				$contents = fread($handle, filesize($filename));
				echo $contents;
				fclose($handle);
			?>);
		</script>
		<script src="js/main.js"></script>   
		<script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
		
		<!-- Google Analytics -->
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
		
		<!-- SiteCatalyst code version: H.25.1.
		Copyright 1996-2012 Adobe, Inc. All Rights Reserved
		More info available at http://www.omniture.com -->
		<script language="JavaScript" type="text/javascript">
			var siteId = "finewsherald";
		</script>
		<script language="JavaScript" type="text/javascript" src="http://www.newsherald.com/hmg/js/s_code.js"></script>
		<script language="JavaScript" type="text/javascript" src="http://www.newsherald.com/hmg/js/omniture.js"></script>
		<script language="JavaScript" type="text/javascript">
			initOmniture("finewsherald", "freedom.112.2o7.net", "javascript:,http://www.newsherald.com,http://newclass.emeraldcoast.com/?id=4,http://ap.emeraldcoast.com/nharchive/index.php,http://newsherald.com/obituaries/,http://local.newsherald.com/,http://newsherald.com/squall/,http://hurricane.emeraldcoast.com/?p=4,freedom.com,newsherald.mycapture.com,newsherald.com,freedomblogging.com,hosted.ap.org,customwire.ap.org,classads.emeraldcoast.com,meevee.com,oodle.com,monster.com,upickem.net,209.85.175.104,209.85.173.104,digitalmediacommunications.com,pcnhhalifax.com,http://pcnhhalifax.com,http://www.pcnhhalifax.com,www.pcnhhalifax.com");
			var serverLocation = "";
			var isInIFrame = (window.location != window.parent.location) ? true : false;    
			var currentUrl = window.location.href;
			if(isInIFrame) {
				serverLocation = "http://www." + parent.window.location.hostname;
			} else {
				serverLocation = "http://www." + window.location.hostname;
			}
			<!--
			/* You may give each page an identifying name, server, and channel on the next lines. */
			s.pageName="page | Social Spring Break";
			s.server=serverLocation;
			s.channel="Social Spring Break";
			s.pageType=""
			s.prop1="Social Spring Break";
			s.prop2="";
			s.prop3="";
			s.prop4="";
			s.prop5="";
			s.prop6="";
			s.prop7="Social Spring Break";
			s.prop12=currentUrl;
			s.prop14="";
			s.prop15="";
			
			/* Conversion Variables */
			s.campaign="";
			s.state="";
			s.zip="";
			s.events="";
			s.products="";
			s.purchaseID="";
			s.eVar1="";
			s.eVar2="";
			s.eVar3="";
			s.eVar4="";
			s.eVar5="";
			/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
			var s_code=s.t();
			
			if(s_code)document.write(s_code)
			//-->
		</script>
		<script language="JavaScript" type="text/javascript">
			<!--
				if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
			//-->
		</script>
		<noscript>
			<img src="http://freedom.112.2o7.net/b/ss/finewsherald/1/H.25.1--NS/0" height="1" width="1" border="0" alt="" />
		</noscript><!--/DO NOT REMOVE/-->
		<!-- End SiteCatalyst code version: H.25.1. -->
		
		
	</body>
</html>
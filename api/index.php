<?php


session_start(); // Add this to the top of the file
require 'Slim/Slim.php';

error_reporting(E_ALL & E_STRICT);

$app = new Slim();

$app->get('/allcards', 'all');
$app->get('/approved',  'approved');
$app->get('/onlyapproved',  'onlyapproved');
$app->put('/allcards/:id', 'saveCard');
$app->put('/approved/:id', 'saveCard');
$app->get('/stories', 'storyList');
$app->get('/galleries', 'galleryList');
$app->run();



function saveCard($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$approved = json_decode($body);
	$sql = "UPDATE cards SET approved=:approved WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("approved", $approved->approved);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($approved); 	
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}



function galleryList(){
	$xml = simplexml_load_file("http://www.emeraldcoastphotoseast.com/datafeeds/18686.xml");
	foreach($xml as $album){
		$album->type = 'gallery';
		$album->approved = '1';
		$album->prettyTime = date('F j, Y', strtotime($album->date));
		$str .= json_encode($album) . ',';
		$n++;
	}
	
	$content = '[' .substr($str, 0, strlen($str)-1) . ']';
	$filename = '../feeds/galleryfeed.json';

	
	$handle = fopen($filename, 'w');
	fwrite($handle, $content);
	
	fclose($handle);
}

function storyList(){
	$xml = simplexml_load_file('http://www.newsherald.com/cmlink/1.105375','SimpleXMLElement', LIBXML_NOCDATA);		
	foreach($xml->channel->item as $album){
		$album->imageUrl = $album->enclosure->attributes()->url;
		$album->type = 'story';
		$album->approved = '1';
		$album->prettyTime = date('F j, Y', strtotime($album->pubDate));
		$str .= json_encode($album) . ',';
	}
	
	$content = '[' . substr($str, 0, strlen($str)-1) . ']';
	$filename = '../feeds/storyfeed.json';

	
	$handle = fopen($filename, 'w');
	fwrite($handle, $content);
	
	fclose($handle);
}



function approved(){
	getCards(0);
}

function onlyapproved(){
	getCards(2);
}

function all(){
	getCards(1);
}

function getCards($approved) {



	$southWest = array(29, -87);
	$northEast = array(31, -85);
	if($approved == 1){
		$sql = "SELECT * FROM cards WHERE data<>'null' AND (approved>=1 OR approved=0) ORDER BY approved,time DESC LIMIT 520";	
	}
	if($approved == 2){
		$sql = "SELECT * FROM cards WHERE approved>=1 ORDER BY time DESC LIMIT 500";	
	}
	
	else if($approved == 0){
		$sql = "SELECT * FROM cards WHERE approved>=1 ORDER BY time DESC LIMIT 300";	
	}
	try {
		
		$db = getConnection();
		$stmt = $db->query($sql);  
		$cards = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		foreach($cards as $card){
			$card->prettyTime = date('F j, Y', $card->time);
			$card->data = json_decode($card->data);
			$card->hasCoords = 0;
			$card->inPCB = 0;
			$card->data->source = '';
			if($card->type == 'i'){

				if($card->data->location->longitude){
					$card->coord = (string)$card->data->location->longitude . ',' . (string)$card->data->location->latitude;
					if($card->data->location->longitude >= $southWest[1] && $card->data->location->longitude <= $northEast[1] && 
						$card->data->location->latitude >= $southWest[0] && $card->data->location->latitude <= $northEast[0]
					){
						$card->inPCB = 1;
					}
					$card->hasCoords = 1;
				} 
			}
			if($card->type == 't'){
			
				if($card->data->coordinates->coordinates[0]){
					$card->coord = $card->data->coordinates->coordinates[0] . ',' . $card->data->coordinates->coordinates[1];
					if($card->data->coordinates->coordinates[0] <= $northEast[1] && $card->data->coordinates->coordinates[0] >= $southWest[1] &&
						$card->data->coordinates->coordinates[1] <= $northEast[0] && $card->data->coordinates->coordinates[1] >= $southWest[0]){
						$card->inPCB = 1;
					}
					$card->hasCoords = 1;
					
				} 
				$card->indexedtext = $card->data->text;
				
				foreach($card->data->entities->hashtags as $tag){
					$hash = '#' . $tag->text;
					$replace = '<a href="http://www.twitter.com/#!/search/%23' . $tag->text . '" target="_blank" >' . $hash . '</a>';
					$card->indexedtext = str_replace($hash, $replace , $card->indexedtext );
				}
				
				foreach($card->data->entities->user_mentions as $user){
					$username = '@' . $user->screen_name;
					$replace = '<a href="http://www.twitter.com/' . $user->screen_name . '" target="_blank">' . $username . '</a>';
					$card->indexedtext = str_replace($username, $replace , $card->indexedtext );
				}
				
				foreach($card->data->entities->urls as $url){
					$replace = '<a href="' . $url->url . '" target="_blank">' . $url->display_url . '</a>';
					$card->indexedtext = str_replace($url->url, $replace , $card->indexedtext );
				}
				
				foreach($card->data->entities->media as $photo){
					if($photo->type == 'photo'){
					$replace = '<img class="twitter-media" src="' . $photo->media_url . '" width="100%" />';
					$card->indexedtext = str_replace($photo->url, $replace , $card->indexedtext );
					}else{
						$card->indexedtext = str_replace($photo->url, '' , $card->indexedtext );
					}
				}
			}
			
			
		}
		echo json_encode($cards);
	}	catch(PDOException $e) { echo '{"error":{"text":'. $e->getMessage() .'}}'; }
}


function connection(){
	$db = mysql_connect('us-cdbr-east-03.cleardb.com', 'b5851e00f0aaf0', '7150e2d4');
	mysql_select_db('heroku_dea78be05d07379');
}

function getConnection() {
	//$db = mysql_connect('us-cdbr-east-03.cleardb.com', 'b24494b101618e', 'f4086d3b');
	//mysql_select_db('heroku_f5a1439c5c23343');


	$dbhost="us-cdbr-east-03.cleardb.com";
	$dbuser="b5851e00f0aaf0";
	$dbpass="7150e2d4";
	$dbname="heroku_dea78be05d07379";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}
?>
<?php
$filename = 'galleryfeed.json';
$somecontent = "whird";

$handle = fopen($filename, 'w');
fwrite($handle, $somecontent);

fclose($handle);

?>
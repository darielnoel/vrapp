<?php


echo "Hello world";

$files = array("yui-base", "oop", "attribute-core", "event-custom-base", "event-custom-complex", "attribute-observable", "attribute-extras", "attribute-base", "base-core", "base-observable", "base-base", "pluginhost-base", "pluginhost-config", "base-pluginhost", "base-build", "features", "dom-core", "dom-base", "selector-native", "selector", "node-core", "node-base", "event-base", "event-delegate", "node-event-delegate", "node-pluginhost", "color-base", "dom-style", "dom-screen", "node-screen", "node-style", "transition", "event-touch", "event-synthetic", "event-move", "yui-throttle", "classnamemanager", "dd-ddm-base", "dd-drag", "dd-constrain");

$config = array(filter=>"min",library=>"C:\\xampp\\htdocs\\framework\\local\\yui3\\3.11.0\\build");


	$base = "C:\\xampp\\htdocs\\framework\\local\\yui3\\3.11.0\\build";
	//$base = "/home/dariel/repository/local/yui3.7.3/build";

	//creo una carpeta con el nombre ese
	mkdir($base, 0777,true);


foreach ($files as $key => $value) {
	$path = getPath($value);
	createOutput($path);
}



function getPath($fileName) {
	//veo si el fichero existe
	$library = "C:\\xampp\\htdocs\\framework\\yui3\\3.11.0\\build";

	//viendo que el fichero no tenga un lang
	$file = explode('skin-sam-',$fileName);
	if (count($file) > 1){
		$path = $library.'\\'.$file[0].'assets\\skins\\sam\\'.$file[1].'.css';
	}
	
	else {
		$fileName = $file[0];
		$file = explode('\\',$fileName);
		if( $file[0] !== 'lang'){

			$path = $library.'\\'.$fileName.'\\'.$fileName.'-min';

		/*if (file_exists($path)) {
			echo "existe";
		}*/
		} else {
			
			$file = explode('_',$file[1]);

			//tenia
			if (count($file) > 1){
				
				$fileName = $file[0];
				$path = $library.'\\'.$fileName.'\\lang\\'.$fileName.'_'.$file[1].'';
			
			} else {
				//no tenia
				$fileName = $file[0];
				$path = $library.'\\'.$fileName.'\\lang\\'.$fileName.'';
			}			
	}
	
	 }

	
	 	return $path;
}

function createOutput($path) {
	$base = "C:\\xampp\\htdocs\\framework\\local\\yui3\\3.11.0\\build";

	//echo $path;

	$output = explode('C:\\xampp\\htdocs\\framework\\yui3\\3.11.0\\build',$path);

	$output = $output[1];

	$carpeta = explode('\\',$output);
	$carpetaOutput = "";

	for ($i=0; $i < count($carpeta)-1 ; $i++) { 
		# code...
		if ($i > 0){
			$carpetaOutput = $carpetaOutput.'\\';	
		}
		
		$carpetaOutput = $carpetaOutput.$carpeta[$i];

	}

	$otrabase = $base.$carpetaOutput;
	

	$base = $base.$carpetaOutput.'\\'.$carpeta[count($carpeta)-1];
	

	echo "base-------------------------------------------------\n";
	echo $base;
	echo "-------------------------------------------------\n";

	echo "path-------------------------------------------------\n";
	echo $path;
	echo "-------------------------------------------------\n";

	copy($path,$base);

	fopen($path,"r");

	echo "\n";


} 


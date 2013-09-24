<?php

function jpeople_search($query){
	// CONFIG

	// There should be no need to change this. 

	// Where is jPeople?
	$jpeople_server_name = "jpeople.user.jacobs-university.de"; 
	$jpeople_server_path = "/ajax.php";
	$jpeople_server_image_prefix = "/utils/images/";
	$jpeople_server_image_suffix = ".jpg";



	// Map for property names
	// Anything not in here will be removed
	$jpeople_attr_map = array(
		"id" => "id",
		"eid" => "eid",
		"employeetype" => "employeetype",
		"attributes" => "attributes",
		"account" => "account",
		"attributes" => "attributes",
		"fname" => "fname",
		"lname" => "lname",
		"birthday" => "birthday",
		"country" => "country",
		"college" => "college",
		"majorlong" => "majorlong",
		"majorinfo" => "majorinfo",
		"major" => "major",
		"status" => "status",
		"year" => "year",
		"room" => "room",
		"phone" => "phone",
		"email" => "email",
		"description" => "description",
		"title" => "title",
		"office" => "office",
		"deptinfo" => "deptinfo",
		"block" => "block",
		"floor" => "floor"
	);

	// end CONFIG


	//Make the request url
	$req_url = "http://"
	. $jpeople_server_name
	. $jpeople_server_path 
	. "?action=fullAutoComplete&str="
	 . urlencode($query); 


	// Lets make a curl query
	$curl = curl_init();


	// Set some options - we are passing in a useragent too here
	curl_setopt_array($curl, array(
	    CURLOPT_RETURNTRANSFER => 1,
	    CURLOPT_URL => $req_url,
	));
	// Send the request & save response to $resp
	$resp = curl_exec($curl);
	$status = curl_getinfo($curl)['http_code']; 
	// Close request to clear up some resources
	curl_close($curl);


	if($status != 200){
		//wrong status
		return false; 
	} else {
		//parse the JSON
		$people_tree = json_decode($resp)->records; 

		//Set an empty result stack
		$people_list = array(); 

		//Iterate over all the lovely people
		foreach ($people_tree as $person) {

			$person_dict = array(); 

			foreach($person as $tag => $val){
				if(array_key_exists($tag, $jpeople_attr_map)){
					$person_dict[$jpeople_attr_map[$tag]] = $val;
				}
			}

			$person_dict["photo"] = "http://"
			 . $jpeople_server_name
			 . $jpeople_server_image_prefix
			 . $person_dict["eid"]
			 . $jpeople_server_image_suffix;

			array_push($people_list, $person_dict); 
		}

		return $people_list; 
	}
};

?>
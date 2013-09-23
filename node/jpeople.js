#!/usr/bin/env node

//
// Config
//

//There should be no need to change this. 

//Where is jPeople?
var jpeople_server_name = "jpeople.user.jacobs-university.de";
var jpeople_server_path = "/ajax.php";



//Map for property names
//Anything not in here will be removed
var jpeople_attr_map = {
	"id": "id",
	"eid": "eid",
	"employeetype": "employeetype",
	"attributes": "attributes",
	"account": "account",
	"attributes": "attributes",
	"fname": "fname",
	"lname": "lname",
	"birthday": "birthday",
	"country": "country",
	"college": "college",
	"majorlong": "majorlong",
	"majorinfo": "majorinfo",
	"major": "major",
	"status": "status",
	"year": "year",
	"room": "room",
	"phone": "phone",
	"email": "email",
	"description": "description",
	"title": "title",
	"office": "office",
	"deptinfo": "deptinfo",
	"block": "block",
	"floor": "floor"
};

//end config

var self = {}; //For module exports

//Imports
var http = require("http");


//The Search function
self.search = function(query, callback){
	//encode the query
	var query = encodeURIComponent(query);

	//me the search and get a result
	var req = http.request(
		{
			"hostname": jpeople_server_name, 
			port: 80,
			path: jpeople_server_path+"?action=fullAutoComplete&str="+query,
			method: 'GET'
		},	
		function(res){
			if(res.statusCode != 200){
				callback(false); 
			} else {
				var data = ""; 

				//receive data
				res.on("data", function(chunk){
					data += chunk; 
				}); 

				//Everything is received, parse it now
				res.on("end", function(){
					var people_tree = JSON.parse(data)["records"]; 
					var people_list = []; 

					for(var i=0;i<people_tree.length;i++){
						var person = people_tree[i]; 

						var person_dict = {}; 

						for(var tag in person){
							if(jpeople_attr_map.hasOwnProperty(tag)){
								person_dict[jpeople_attr_map[tag]] = person[tag]; 
							}
						}

						people_list.push(person_dict); 
					}

					callback(people_list); 

				})
		}

	})
	req.on('error', function(e) {
		console.log("http://"+jpeople_server_name+jpeople_server_path+"?action=fullAutoComplete&str="+query); 
	  callback(false); 
	});

	req.end(); 
};

self.main = function(args){
	var query = args.splice(1).join(" "); 
	if(query == ""){
		console.log("jPeople API Client (Node.JS)");
		console.log("(c) Tom Wiesing 2013");
		console.log("Usage: "+args[0]+" $SEARCH"); 
	} else {
		self.search(query, function(res){
			if(!res){
				console.log("Search failed! ");
				console.log("Please make sure you are in the Jacobs University Network / VPN. ");
			} else {
				var out = function (obj, item, pre, post){	
					var pre = (typeof pre == "string")?pre:""; 
					var post = (typeof post == "string")?post:""; 

					if(obj.hasOwnProperty(item)){
						var data = obj[item]; 
						if(data != ""){
							console.log(pre+data+post);
						}
					}
				};

				for(var i=0;i<res.length;i++){
					var person = res[i]; 

					out(person, 'lname', undefined, ", "+person['fname']);
					out(person, 'attributes', undefined, ", "+person['description']);
					out(person, 'college', 'College: ');
					out(person, 'office', 'Office: ');
					out(person, 'room');
					out(person, 'email');
					out(person, 'phone', "(0421) 200 ");
					out(person, 'country', "Country: ");
					out(person, 'majorinfo', "Major: ");
					console.log("--");
				}
			}
		})
	}
	
};



if (!module.parent) {
	self.main(process.argv.slice(1)); 
}

//export stuff

module.exports = self; 
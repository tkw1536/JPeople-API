# JavaScript (Client Side) jPeople API

Currently broken because of HTTP access control (CORS). If this is ignored by the client it works. 


## Dependencies

jQuery. 

## Usage

Include it as a script, then do this: 

```js

jpeople.search("Test", function(people){
	for(var i=0;i<people.length;i++){
		var person = people[i]; 
		console.log(person["lname"]+", "+person["fname"]); 
	}
});

```
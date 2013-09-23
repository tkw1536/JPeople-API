# Node.js jPeople API

## Dependencies

None!

## Usage

### Script

```
node jpeople.js Test
```

### Module

```js
var jpeople = require("./jpeople"); 

jpeople.search("Test", function(people){
	for(var i=0;i<people.length;i++){
		var person = people[i]; 
		console.log(person["lname"]+", "+person["fname"]); 
	}
});

```
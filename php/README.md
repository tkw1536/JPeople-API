# PHP jPeople API

## Dependencies

* curl

## Usage

```php

$people = jpeople_search("Test"); 

foreach($people as $person){
	echo $person["lname"] . ", " . $person["fname"]; 
}

```
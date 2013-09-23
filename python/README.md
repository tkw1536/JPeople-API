# Python jPeople API

## Dependencies
All these packages should be in the standard library and come pre-installed. 

* httplib or http.client (depends on python version)
* urllib or urllib2 (depends on python version)
* xml

## Usage

### Script

```
python2 jpeople.py Test
```

or

```
python3 jpeople.py Test
```

### Module

```py
import jpeople

people = jpeople.search("Test") # Make the search

for person in people: # The People which are found
	print person["lname"] + ", " + person["fname"]
	
```
# JPeople API

This project contains an api in various languages for Jacobs University jPeople. Note that for any of these to work you have to be in the Jacobs University network. 

All APIs use the new JSON access which is implemented on the Jacobs servers. The source code of that API is available at [https://github.com/smirea/jPeople](https://github.com/smirea/jPeople). It provides the following attributes: 
	
* "id"
* "eid"
* "employeetype"
* "attributes"
* "account"
* "attributes"
* "fname"
* "lname"
* "birthday"
* "country"
* "college"
* "majorlong"
* "majorinfo"
* "major"
* "status"
* "year"
* "room"
* "phone"
* "email"
* "description"
* "title"
* "office"
* "deptinfo"
* "block"
* "floor"

The following custom attributes are added: 

* "photo"

In all implementations the are returned in an array of JSON-style objects. If the search fails false is returned. 

## Available languages

* Python
* Node.js (Server-side JavaScript)
* PHP
* JavaScript Client-side (broken by CORS)

The following APIS are planned: 

* SML (for smlnj)


## Usage

For usage, please see the individual READMEs. 

## License

```
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2013 Tom Wiesing <tkw01536@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
  ```
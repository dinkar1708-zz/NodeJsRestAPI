

# NodeJsRestApi - developed using express frame work + mongo db



## Usage
### Run the app.js file using node app.js command.
APIs description-
All below three apis are of POST type-
a. http://localhost:3000/user/addUser
Request-
{
 "name": "Mike Gerg",
 "address": "Z/2 Keptown"

}
Response-
{
 "isSuccess": true,
 "description": "User updated successfully!"

}

b. http://localhost:3000/user/findUser
Request-
{
 "name": "Mike Gerg"
}
Response-
{
 "user": {
  "_id": "59076bed2f22880870f9c5ff",
  "name": "Mike Gerg",
  "address": "Z/2 Keptown",
  "__v": 0
 },
 "isSuccess": true,
 "description": null
}

c. http://localhost:3000/user/addTwoNumber
Request-
{
 "numberA": "20",
 "numberB": "10"

}
Response-
{
 "sum": 30,
 "isSuccess": true,
 "description": null

}




## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.

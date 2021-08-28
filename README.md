## Backend server
Backend server of [Face recognition app](https://face-recognition-webapp.netlify.app)

Currently live! Access [here](https://image-recognition-server.herokuapp.com)

Written in javaScript & node.js.
Used packages:
 - Express.js - To create a Restful api
 - mongoose - To handle CRUD operations in the mongodb
 - multer, multer-gridfs-storage, gridfs-storage - to store, delete & stream images into the mongodb database
 - argon2 - To convert passwords into hash codes & verify them
 - Clarifai - To send face data to the frontend server

Routes

/user - to handle authentication
  - [POST /create](https://image-recognition-server.herokuapp.com/user/create) - To register a new user
  - [POST /get](https://image-recognition-server.herokuapp.com/user/get) - to sign in an existing user
  - [PUT /update](https://image-recognition-server.herokuapp.com/user/update) - to update user data
  - [DELETE /delete](https://image-recognition-server.herokuapp.com/user/delete) - to delete an user

[/verify POST](https://image-recognition-server.herokuapp.com/verify/) - To verify an username or email if they already exist in the database before creating a new user and notify in real time.

[/fetchimage POST](https://image-recognition-server.herokuapp.com/fetchimage/) - To detect the face and send the data back to frontend.

[/image POST](https://image-recognition-server.herokuapp.com/image/) - To store the face image urls and increase entries count of the user.

/avatar - To handle post images to the database
  - [POST /](https://image-recognition-server.herokuapp.com/images/) - To store an image
  - [GET /](https://image-recognition-server.herokuapp.com/images/) - To stream an image to the url. [For Example](https://image-recognition-server.herokuapp.com/avatar/6054d4365446742d3c310d031629882082615.jpeg)
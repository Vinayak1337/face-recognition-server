# Backend Server for Face Recognition App

This is the backend server for the [Face Recognition App](https://face-recognition-webapp.netlify.app). It's responsible for handling authentication, image storage, face detection, and user data management.

🔗 **Server Status**: Currently offline (Free hosting period ended)

## Technologies & Packages
- **Language**: JavaScript
- **Runtime**: Node.js
- **Express.js**: Framework for creating a RESTful API.
- **Mongoose**: ORM for MongoDB, facilitating CRUD operations.
- **Multer, Multer-GridFS-Storage, GridFS-Storage**: Manage image storage, deletion, and streaming in MongoDB.
- **Argon2**: Securely hash and verify passwords.
- **Clarifai**: Interface with the face detection API and send face data to the frontend server.

## API Endpoints

### User Authentication (`/user`)
- **[POST /create](https://image-recognition-server.herokuapp.com/user/create)**: Register a new user.
- **[POST /get](https://image-recognition-server.herokuapp.com/user/get)**: Authenticate an existing user.
- **[PUT /update](https://image-recognition-server.herokuapp.com/user/update)**: Update user data.
- **[DELETE /delete](https://image-recognition-server.herokuapp.com/user/delete)**: Remove a user.

### Verification
- **[/verify POST](https://image-recognition-server.herokuapp.com/verify/)**: Check if a username or email already exists in the database before registering a new user.

### Face Detection
- **[/fetchimage POST](https://image-recognition-server.herokuapp.com/fetchimage/)**: Detect faces in an image and return the data to the frontend.

### Image Handling
- **[/image POST](https://image-recognition-server.herokuapp.com/image/)**: Store face image URLs and increment the user's entry count.

### Avatar Management (`/avatar`)
- **[POST /](https://image-recognition-server.herokuapp.com/images/)**: Upload an image.
- **[GET /](https://image-recognition-server.herokuapp.com/images/)**: Stream an image by URL. [Example Image](https://image-recognition-server.herokuapp.com/avatar/6054d4365446742d3c310d031629882082615.jpeg)

## Setup and Installation
1. Clone the repository: `git clone [repo-link]`
2. Navigate to the project directory: `cd face-recognition-server`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory with the following variables:
   - `URI`: A MongoDB URL where all the data will be stored.
   - `TOKEN`: Obtain a token from the [Clarifai website](https://clarifai.com/) by signing up and creating an app.
   - `PORT`: A port to host the server (default is 8080).
5. Start the server: `npm start`
6. In the frontend project, update the base URL to point to your server, e.g., `http://localhost:8080` or `http://localhost:[PORT]`.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/Vinayak1337/face-recognition-server/blob/master/LICENSE.md) file for details.

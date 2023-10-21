# Face Recognition App - Backend Server

This repository contains the backend server for the [Face Recognition App](https://face-recognition-ht5h.netlify.app). It manages authentication, image storage, face detection, and user data.

🔗 **Live Server**: [https://face-recognition-server-ht5h.onrender.com](https://face-recognition-server-ht5h.onrender.com)

## 🛠 Technologies & Packages

- **Language**: JavaScript
- **Runtime**: Node.js
- **Express.js**: Web application framework.
- **Mongoose**: ORM for MongoDB, streamlining CRUD operations.
- **Multer, Multer-GridFS-Storage, GridFS-Storage**: For image storage, deletion, and streaming in MongoDB.
- **Argon2**: For secure password hashing and verification.
- **Clarifai**: To interface with the face detection API and send face data to the frontend.

## 🚀 API Endpoints

### User Authentication (`/user`)

- **[POST /create](https://face-recognition-server-ht5h.onrender.com/user/create)**: Register a new user.
- **[POST /get](https://face-recognition-server-ht5h.onrender.com/user/get)**: Authenticate an existing user.
- **[PUT /update](https://face-recognition-server-ht5h.onrender.com/user/update)**: Update user data.
- **[DELETE /delete](https://face-recognition-server-ht5h.onrender.com/user/delete)**: Remove a user.

### Verification

- **[/verify POST](https://face-recognition-server-ht5h.onrender.com/verify/)**: Verify if a username or email already exists before registering.

### Face Detection

- **[/fetchimage POST](https://face-recognition-server-ht5h.onrender.com/fetchimage/)**: Detect faces in an image and return the coordinates.

### Image Handling

- **[/image POST](https://face-recognition-server-ht5h.onrender.com/image/)**: Store image URLs and increment the user's entry count.

### Avatar Management (`/avatar`)

- **[POST /](https://face-recognition-server-ht5h.onrender.com/images/)**: Upload an avatar.
- **[GET /](https://face-recognition-server-ht5h.onrender.com/images/)**: Stream an avatar by its URL.

## 📦 Setup and Installation

1. Clone the repository: 
   ```bash
   git clone https://github.com/Vinayak1337/face-recognition-server.git
   ```
2. Navigate to the project directory: 
   ```bash
   cd face-recognition-server
   ```
3. Install dependencies: 
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following values:
   ```
   MONGO_URI=YOUR_MONGODB_URI
   PORT=YOUR_PORT
   # example: http://localhost:5000 for your local startup
   BASE_URL=YOUR_BASE_URL
   CLARIFAI_TOKEN=YOUR_CLARIFAI_TOKEN
   ```
   **Important**: Replace `YOUR_MONGODB_URI`, `YOUR_PORT`, `YOUR_BASE_URL`, and `YOUR_CLARIFAI_TOKEN` with your actual credentials and settings. Never share or expose your `.env` file or its contents.

5. Start the server: 
   ```bash
   npm start
   ```
6. Update the frontend project's base URL to your server's address.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/Vinayak1337/face-recognition-server/blob/master/LICENSE.md) file for details.

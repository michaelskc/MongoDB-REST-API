# MongoDB REST API
 A concise MongoDB REST API with documentation aimed at beginners. Perfect for any personal project that utilizes MongoDB and authenticates users with JWT using modern password storing methods.
# Libraries Used
 This app was built with:
 - MongoDB 
 - ExpressJS 
   - Mongoose
 - BCrypt
 - JSONWebToken (JWT)

# Installation

To use this app, all you need to do is download it from this page. You can download it as a ZIP, or clone the repository.

A ".env" file will need to be added to the project's path that includes the following:

```
MONGODB_URI = (your database URI)
TOKEN_KEY = (a random string)
```


To start the app, you can use the start script by running "npm start" in a command line while in the app directory.
- The start script is located in "package.json" and is `nodemon index.js`.

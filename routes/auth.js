// Imports ExpressJS and ExpressJS's built-in router
const express = require('express');
const router = express.Router()
module.exports = router;

// Imports the data models from your models folder. 
// Data models specify what data a route will receive. You can set variables in the data model to be required, such as the ID..
// All data you enter must be defined by a model, but if you do not specify them as required, you can omit them from a request. 
// However, you cannot create a request with data outside of the data model.

const User = require('../models/authModel');

// Imports the libraries for BCrypt (for hashing passwords) and JWT (for creating tokens)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Imports the middleware for the authentication token.
// This middleware allows you to add the argument "auth" to a route, which will require the user to have a valid token.
// This can be called from any class and doesn't need to be modified after it is created.
const auth = require('../middleware/authtoken');

// These methods are for authentication with a JWT token.


// This registers a new user.
// This will be removed from a production environment to prevent unauthorized users from registering their own accounts.

router.post("/register", async (req, res) => {

    try {
      // Attemps to create a new "User" (authModel.js data model)

      const data = new User ({
        _id: req.body.username,
        username: req.body.username,
        rank: req.body.rank
    })


      const _id = req.body.username;
      const username = req.body.username;
      const password = req.body.password;
      console.log(username + password); 
      // Ensures that a username and password is supplied.
      if (!(username && password)) {
        res.status(400).send("Error: Please enter a username and password.");
      }
  
      // Ensures that there are no duplicate users.
      const oldUser = await User.findOne({ username });
  
      if (oldUser) {
        return res.status(409).send("Error: This username already exists.");
      }
  
      // BCrypt hashes the password.
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user in the database.
      // ID is the username for simplicity.
      const user = await User.create({
        _id: req.body.username,
        username,
        password: encryptedPassword,
      });
  
      // Creates a new token for this user.
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // Saves "user.token" as the user's token.
      // Responses can now include "token" to give the user a token.
      user.token = token;
  
      // Returns user data.
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });


    // Login method for users that already exist

router.post("/login", async (req, res) => {

    try {
      // Gets the username and password provided in the POST request.
      const { username, password } = req.body;
  
      // Ensures username and password are supplied.
      if (!(username && password)) {
        res.status(400).send("Error: Please enter a username and password.");
      }
      // Ensures that the user exists.
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Creates new token that expires in 2 hours.
        const token = jwt.sign(
          { user_id: user._id, username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // Saves user token as "token".
        // Can be used in responses.
        user.token = token;
  
        // Responds with all user information, including token.
        res.status(200).json(user);
      } else {

        // If credentials are not valid.
        res.status(400).send("Error: Invalid credentials.");

      }

      if (user && (!await bcrypt.compare(password, user.password))) {

        // If password does not match.
        res.status(400).send("Error: Invalid credentials.");

      }
          } catch (err) {
      console.log(err);
    }
  });
  

  // Simple method to verify if tokens are valid.
  router.post("/verify", auth, (req, res) => {
    res.status(200).send("Success: Authentication accepted.");
  });
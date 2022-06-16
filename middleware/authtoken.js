// This middleware is used to force users to supply a token for requests in other routes.
// All routes in profiles.js has "auth" in the route, so it will require a token.
// This is required for tokens to work.

// Imports JWT (for creating tokens) and config (for the token key).
const jwt = require("jsonwebtoken");
const config = process.env;


// Method to verify token.
// This will not need to be called from any other class.
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Error: Invalid token.");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
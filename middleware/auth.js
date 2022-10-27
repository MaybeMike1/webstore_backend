const jwt = require("jsonwebtoken");
const config = require("config");
    
module.exports = function auth(req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({ message: "Access Denied my guy" });
  }

  try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decoded;
      console.log(req.user);
      next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
}



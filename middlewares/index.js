const jwt = require("jsonwebtoken");

const generateToken = payload => {
  return jwt.sign(payload, "add a .env file to root of project with the JWT_SECRET variable", {
    expiresIn: "1d"
  });
};



module.exports = {
  generateToken,

};
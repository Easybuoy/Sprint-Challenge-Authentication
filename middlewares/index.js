const jwt = require("jsonwebtoken");

const generateToken = payload => {
  return jwt.sign(payload, "MY SECRET IS MY SECRET, IS IT YOUR SECRET?", {
    expiresIn: "1d"
  });
};



module.exports = {
  generateToken,

};
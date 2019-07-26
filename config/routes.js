const axios = require("axios");

const { authenticate } = require("../auth/authenticate");
const Users = require('../models/users')
module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const { username, password } = req.body;

  console.log(username, password);
  if (!username && !password) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "Username and Password fields are required"
      });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

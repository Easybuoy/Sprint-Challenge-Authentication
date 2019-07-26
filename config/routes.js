const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate } = require("../auth/authenticate");
const  {} =  require('../middlewares/index')
const Users = require("../models/users");
module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    let { username, password } = req.body;

    if (!username && !password) {
      return res.status(400).json({
        status: "error",
        message: "Username and Password fields are required"
      });
    }
    const existingUser = await Users.getByUsername(username);
    console.log(existingUser);
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ status: "error", message: "Username already taken" });
    }

    password = String(password);
    let hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = await Users.insert({ username, password: hashedPassword });

    if (newUser) {
      return res
        .status(201)
        .json({ status: "success", message: "User created successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Unable to create user" });
  }
}

async function login(req, res) {
  // implement user login
  try {
    const { username, password } = req.body;
    const existingUser = await Users.getByUsername(username);
    console.log(existingUser);
    if (existingUser.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const isValidPassword = bcrypt.compareSync(
      password,
      existingUser[0].password
    );
    if (isValidPassword === true) {
      const token = generateToken({ id: existingUser[0].id });
      return res.json({
        status: "success",
        message: `Welcome ${existingUser[0].username}, login successful`,
        token
      });
    }
    return res
      .status(401)
      .json({ status: "error", message: "Invalid password" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Unable to login user" });
  }
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

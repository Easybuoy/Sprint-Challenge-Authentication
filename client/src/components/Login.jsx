import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = { username: "", password: "", isLoggedIn: false };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("http://localhost:3300/api/login", userData)
      .then(res => {
        const data = res.data;
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  render() {
    if (this.state.isLoggedIn === true) {
      this.props.history.push("/");
    }

    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="Username"
            type="text"
            onChange={this.onChange}
            name="username"
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.onChange}
            required
          />
          <button>Login</button>
          <p>
            Don't have an account yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    );
  }
}

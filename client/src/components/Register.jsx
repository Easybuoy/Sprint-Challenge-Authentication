import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Register extends Component {
  state = { username: "", password: "", isRegistered: false };

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
      .post("http://localhost:3300/api/register", userData)
      .then(data => {
        if (data.status === 201) {
          alert("Registration successful");
          this.setState({ isRegistered: true });
        }
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  render() {
    if (this.state.isRegistered === true) {
      this.props.history.push("/login");
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
          <button>Register</button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

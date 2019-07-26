import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Jokes extends Component {
  state = { jokes: [] };
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      return <Redirect to="login" />;
    }

    axios
      .get("http://localhost:3300/api/jokes", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  }

  render() {
      console.log(this.state.jokes)
    this.state.jokes.map(joke => (
      <div key={joke.id}>
        <p>{joke.joke}</p>
      </div>
    ));
    return <div />;
  }
}

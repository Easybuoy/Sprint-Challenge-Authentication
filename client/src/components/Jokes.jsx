import React, { Component } from "react";
import axios from "axios";

export default class Jokes extends Component {
  state = { jokes: [] };

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      this.props.history.push("/register");
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
        alert(err.response.data.message);
      });
  }

  render() {
    return (
      <div className="jokes">
        {this.state.jokes.map(joke => (
          <div key={joke.id} className="joke">
            <h1>{joke.joke}</h1>
          </div>
        ))}
      </div>
    );
  }
}

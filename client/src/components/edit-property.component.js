import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditProperty extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      address: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/properties/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          username: res.data.username,
          address: res.data.address,
          date: new Date(res.data.date),
        });
      })
      .catch((err) => console.log("Error: " + err));

    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }

  onChangeField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const property = {
      username: this.state.username,
      address: this.state.address,
      date: this.state.date,
    };

    axios
      .post(
        "http://localhost:5000/properties/update/" + this.props.match.params.id,
        property
      )
      .then((res) => console.log(res.data));

    window.location = "/";

    console.log(property);
  }

  render() {
    return (
      <div>
        <h3>Edit Property</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref={this.inputRef}
              required
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.onChangeField}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              required
              className="form-control"
              name="address"
              value={this.state.address}
              onChange={this.onChangeField}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Property"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Property = (props) => (
  <tr>
    <td>{props.property.username}</td>
    <td>{props.property.address}</td>
    <td>{props.property.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.property._id}>
        <button type="button" className="btn btn-success" color="white">
          edit
        </button>
      </Link>
      <span> | </span>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => props.deleteProperty(props.property._id)}
      >
        delete
      </button>
    </td>
  </tr>
);

export default class PropertiesList extends Component {
  constructor(props) {
    super(props);

    this.deleteProperty = this.deleteProperty.bind(this);

    this.state = { properties: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/properties")
      .then((res) => {
        this.setState({ properties: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteProperty(id) {
    axios
      .delete("http://localhost:5000/properties/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      properties: this.state.properties.filter((pl) => pl._id !== id),
    });
  }

  propertyList() {
    return this.state.properties.map((currentprop) => {
      return (
        <Property
          property={currentprop}
          deleteProperty={this.deleteProperty}
          key={currentprop._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Property List</h3>
        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.propertyList()}</tbody>
        </table>
      </div>
    );
  }
}

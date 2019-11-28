import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayErrors: false,
      type: "name"
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      this.setState({
        displayErrors: true
      });
      alert(
        "you can only set characters on the name field and only numbers on the number field"
      );
    } else {
      let nodes = this.props.nodeList;
      let data = {
        name: form.elements.name.value,
        num: Number(form.elements.number.value)
      };
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.name === data.name) {
          alert("there is already a node with that name");
          return;
        }
        if (nodeA.num === data.num) {
          alert("there is already a node with that number");
          return;
        }
      }
      this.props.setnewNode(data, this.state.type);
    }
  };

  changeType = () => {
    let type = "";
    if (this.state.type === "name") {
      type = "number";
      this.setState({
        type: "number"
      });
    } else if (this.state.type === "number") {
      type = "name";
      this.setState({
        type: "name"
      });
    }
    this.props.orderByParameter(type);
  };

  render() {
    const { displayErrors } = this.state;
    return (
      <div className=" card shadow p-4 m-4 col-4">
        <h2>Create a node</h2>
        <form
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? "displayErrors" : ""}
        >
          <p className="mb-1">name:</p>
          <input
            name="name"
            className="col-12 mb-2"
            type="text"
            placeholder="Mateo"
            pattern="[a-zA-Z]+"
            required
          />
          <p className="mb-1">number:</p>
          <input
            name="number"
            className="col-12 mb-3"
            type="text"
            pattern="\d+"
            placeholder="123"
            required
          />
          <button className="btn btn-primary">upload node </button>
        </form>
        <p>It is ordered by {this.state.type}</p>
        <button className="btn btn-warning m-2" onClick={this.changeType}>
          order by {this.state.type === "name" ? "number" : "name"}
        </button>
      </div>
    );
  }
}

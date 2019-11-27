import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayErrors: false
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      this.setState({
        displayErrors: true
      });
    } else {
      let data = {
        name: form.elements.name.value,
        num: form.elements.number.value
      };
      this.props.setnewNode(data);
    }
  };

  render() {
    const { displayErrors } = this.state;
    return (
      <div className=" card shadow p-4 m-4 col-4">
        <h2>Llena el formulario</h2>
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
          <button className="btn btn-primary">upload graph </button>
        </form>
      </div>
    );
  }
}

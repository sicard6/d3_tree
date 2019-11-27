import React, { Component } from "react";
import Form from "./Form";
import Tree from "./Tree";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: {
        data: {},
        left: {},
        right: {}
      },
      lastNode: {}
    };
  }

  setnewNode = node => {
    var tree = this.state.tree;
    if (
      Object.keys(tree.data).length === 0 &&
      tree.data.constructor === Object
    ) {
      tree.data = node;
    } else if (node.name > tree.data.name) {
      this.goDown(node, tree.right);
    } else if (node.name < tree.data.name) {
      this.goDown(node, tree.left);
    }

    this.setState({
      tree: tree,
      lastNode: node
    });
  };

  goDown = (node, subTree) => {
    if (Object.keys(subTree).length === 0 && subTree.constructor === Object) {
      subTree.data = node;
      subTree.left = {};
      subTree.right = {};
    } else if (node.name > subTree.data.name) {
      this.goDown(node, subTree.right);
    } else if (node.name < subTree.data.name) {
      this.goDown(node, subTree.left);
    }
  };

  render() {
    return (
      <div className="row">
        <Form setnewNode={this.setnewNode} />
        <Tree tree={this.state.tree} lastNode={this.state.lastNode} />
      </div>
    );
  }
}

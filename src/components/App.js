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
      lastNode: {},
      nodeList: []
    };
  }

  orderByParameter = param => {
    if (this.state.nodeList[0] !== undefined) {
      let tree = {};
      tree.data = this.state.nodeList[0];
      tree.left = {};
      tree.right = {};

      for (let i = 1; i < this.state.nodeList.length; i++) {
        const element = this.state.nodeList[i];
        this.addNode(param, tree, element);
      }
      this.setState({
        tree: tree,
        lastNode: {}
      });
    }
  };

  addNode = (type, tree, node) => {
    if (Object.keys(tree).length === 0 && tree.constructor === Object) {
      tree.data = node;
      tree.left = {};
      tree.right = {};
    } else {
      if (type === "name") {
        if (tree.data.name > node.name) {
          this.addNode(type, tree.left, node);
        }
        if (tree.data.name < node.name) {
          this.addNode(type, tree.right, node);
        }
      } else if (type === "number") {
        if (tree.data.num > node.num) {
          this.addNode(type, tree.left, node);
        }
        if (tree.data.num < node.num) {
          this.addNode(type, tree.right, node);
        }
      }
    }
  };

  setnewNode = (node, type) => {
    let tree = this.state.tree;
    let nodeList = this.state.nodeList;
    nodeList.push(node);
    if (type === "name") {
      if (
        Object.keys(tree.data).length === 0 &&
        tree.data.constructor === Object
      ) {
        tree.data = node;
      } else if (node.name > tree.data.name) {
        this.goDown(node, tree.right, type);
      } else if (node.name < tree.data.name) {
        this.goDown(node, tree.left, type);
      }
    } else if (type === "number") {
      if (
        Object.keys(tree.data).length === 0 &&
        tree.data.constructor === Object
      ) {
        tree.data = node;
      } else if (node.num > tree.data.num) {
        this.goDown(node, tree.right, type);
      } else if (node.num < tree.data.num) {
        this.goDown(node, tree.left, type);
      }
    }

    this.setState({
      tree: tree,
      lastNode: node,
      nodeList: nodeList
    });
  };

  goDown = (node, subTree, type) => {
    if (type === "name") {
      if (Object.keys(subTree).length === 0 && subTree.constructor === Object) {
        subTree.data = node;
        subTree.left = {};
        subTree.right = {};
      } else if (node.name > subTree.data.name) {
        this.goDown(node, subTree.right, type);
      } else if (node.name < subTree.data.name) {
        this.goDown(node, subTree.left, type);
      }
    } else if (type === "number") {
      if (Object.keys(subTree).length === 0 && subTree.constructor === Object) {
        subTree.data = node;
        subTree.left = {};
        subTree.right = {};
      } else if (node.num > subTree.data.num) {
        this.goDown(node, subTree.right, type);
      } else if (node.num < subTree.data.num) {
        this.goDown(node, subTree.left, type);
      }
    }
  };

  render() {
    return (
      <div className="row">
        <Form
          setnewNode={this.setnewNode}
          orderByParameter={this.orderByParameter}
          nodeList={this.state.nodeList}
        />
        <Tree
          tree={this.state.tree}
          lastNode={this.state.lastNode}
          nodeList={this.state.nodeList}
        />
      </div>
    );
  }
}

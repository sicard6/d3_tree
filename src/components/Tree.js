import React, { Component } from "react";
import * as d3 from "d3";

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 700,
      height: 500
    };
  }
  componentDidMount() {
    this.drawTree();
  }

  componentWillReceiveProps() {
    this.updateTree();
  }

  drawTree() {
    const canvas = d3.select(this.refs.canvas);

    canvas
      .append("svg")
      .attr("width", this.state.width)
      .attr("height", this.state.height);
  }

  updateTree = () => {
    const svg = d3.select("svg");
    this.paintnode(
      svg,
      this.props.tree,
      this.props.lastNode,
      1,
      this.state.width / 2,
      null
    );
  };

  paintnode(svg, tree, lastNode, level, xPos, parent) {
    if (tree.data !== undefined) {
      let idnodes = d3.select(`#${tree.data.name}`);
      let actualNode = idnodes._groups[0][0];
      if (actualNode === null) {
        if (parent !== null) {
          let idparent = d3.select(`#${parent.name}`);
          let parentNode = idparent._groups[0][0];
          let line = svg
            .append("line")
            .attr("x1", parentNode.cx.baseVal.value)
            .attr("y1", parentNode.cy.baseVal.value)
            .attr("x2", this.state.width / 2)
            .attr("y2", 50)
            .style("stroke-width", 2)
            .style("stroke", "black");
          line
            .transition()
            .attr("x2", xPos)
            .attr("y2", 50 * level)
            .ease(d3.easeElastic)
            .duration(4000);
        }
        let circle = svg
          .append("circle")
          .style("fill", "magenta")
          .style("stroke", "black")
          .style("stroke-width", "2")
          .attr("cx", this.state.width / 2)
          .attr("cy", 50)
          .attr("id", tree.data.name)
          .attr("r", 10);

        circle
          .transition()
          .attr("cx", xPos)
          .attr("cy", 50 * level)
          .ease(d3.easeElastic)
          .duration(4000);

        let txt = svg
          .append("text")
          .attr("x", this.state.width / 2 - 10)
          .attr("y", 50 + 20)
          .text(tree.data.name);
        txt
          .transition()
          .attr("x", xPos - 10)
          .attr("y", 50 * level + 20)
          .ease(d3.easeElastic)
          .duration(4000);
      } else {
        idnodes
          .transition()
          .style("fill", "steelblue")
          .duration(1000);
        let Xoffset = 1 / 2 ** (level + 1);
        let Xposder = Xoffset * this.state.width + xPos;
        let Xposizq = xPos - Xoffset * this.state.width;

        this.paintnode(svg, tree.left, lastNode, level + 1, Xposizq, tree.data);
        this.paintnode(
          svg,
          tree.right,
          lastNode,
          level + 1,
          Xposder,
          tree.data
        );
      }
    }
  }

  render() {
    return (
      <div className="card shadow container-fluid col-6 text-center mt-4">
        <div ref="canvas"></div>
      </div>
    );
  }
}

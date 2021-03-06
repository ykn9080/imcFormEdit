import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

class SketchExample extends React.Component {
  constructor(props) {
    super(props);
    let color = "#97C2FC";
    // {
    //   r: "241",
    //   g: "112",
    //   b: "19",
    //   a: "1",
    // };

    if (props.color) color = props.color;
    if (props.value) color = props.value;

    this.state = {
      displayColorPicker: false,
      color: color,
    };
    //this.props.onChangeColor = this.props.onChangeColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.hex });
    if (this.props.onChange) this.props.onChange(color);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: this.state.color, //`rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          top: this.props.popovertop ? this.props.popovertop : 0,
          zIndex: "2000",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SketchExample;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactcss = _interopRequireDefault(require("reactcss"));

var _reactColor = require("react-color");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SketchExample extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClick", () => {
      this.setState({
        displayColorPicker: !this.state.displayColorPicker
      });
    });

    _defineProperty(this, "handleClose", () => {
      this.setState({
        displayColorPicker: false
      });
    });

    _defineProperty(this, "handleChange", color => {
      this.setState({
        color: color.hex
      });
      if (this.props.onChange) this.props.onChange(color);
    });

    let _color = "#97C2FC"; // {
    //   r: "241",
    //   g: "112",
    //   b: "19",
    //   a: "1",
    // };

    if (props.color) _color = props.color;
    if (props.value) _color = props.value;
    this.state = {
      displayColorPicker: false,
      color: _color
    }; //this.props.onChangeColor = this.props.onChangeColor.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const styles = (0, _reactcss.default)({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: this.state.color //`rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,

        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          top: this.props.popovertop ? this.props.popovertop : 0,
          zIndex: "2000"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      style: styles.swatch,
      onClick: this.handleClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styles.color
    })), this.state.displayColorPicker ? /*#__PURE__*/_react.default.createElement("div", {
      style: styles.popover
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styles.cover,
      onClick: this.handleClose
    }), /*#__PURE__*/_react.default.createElement(_reactColor.SketchPicker, {
      color: this.state.color,
      onChange: this.handleChange
    })) : null);
  }

}

var _default = SketchExample;
exports.default = _default;
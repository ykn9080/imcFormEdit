"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactGridLayout = require("react-grid-layout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);

class Body1 extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: {
        lg: props.initialLayout
      }
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  generateDOM() {
    return _lodash.default.map(this.state.layouts.lg, function (l, i) {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: i,
        className: l.static ? "static" : ""
      }, l.static ? /*#__PURE__*/_react.default.createElement("span", {
        className: "text",
        title: "This item is static and cannot be removed or resized."
      }, "Static - ", i) : /*#__PURE__*/_react.default.createElement("span", {
        className: "text"
      }, i));
    });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const {
      compactType: oldCompactType
    } = this.state;
    const compactType = oldCompactType === "horizontal" ? "vertical" : oldCompactType === "vertical" ? null : "horizontal";
    this.setState({
      compactType
    });
  }

  onLayoutChange(layout, layouts) {
    this.props.onLayoutChange(layout, layouts);
  }

  onNewLayout() {
    this.setState({
      layouts: {
        lg: generateLayout()
      }
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Current Breakpoint: ", this.state.currentBreakpoint, " (", this.props.cols[this.state.currentBreakpoint], " columns)"), /*#__PURE__*/_react.default.createElement("div", null, "Compaction type:", " ", _lodash.default.capitalize(this.state.compactType) || "No Compaction"), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.onNewLayout
    }, "Generate New Layout"), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.onCompactTypeChange
    }, "Change Compaction Type"), /*#__PURE__*/_react.default.createElement(ResponsiveReactGridLayout, _extends({}, this.props, {
      layouts: this.state.layouts,
      onBreakpointChange: this.onBreakpointChange,
      onLayoutChange: this.onLayoutChange // WidthProvider option
      ,
      measureBeforeMount: false // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
      // and set `measureBeforeMount={true}`.
      ,
      useCSSTransforms: this.state.mounted,
      compactType: this.state.compactType,
      preventCollision: !this.state.compactType
    }), this.generateDOM()));
  }

}

exports.default = Body1;
Body1.propTypes = {
  onLayoutChange: _propTypes.default.func.isRequired
};
Body1.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function onLayoutChange() {},
  cols: {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2
  },
  initialLayout: generateLayout()
};

function generateLayout() {
  return _lodash.default.map(_lodash.default.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: _lodash.default.random(0, 5) * 2 % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600]
//     }
//   },
//   checked: {}
// })(props => <Checkbox color="primary" {...props} />);
const CheckboxLabels = props => {
  const [state, setState] = _react.default.useState(false);

  const handleChange = event => {
    setState(!state);
    props.handleChange(!state);
  };

  return /*#__PURE__*/_react.default.createElement(_FormGroup.default, {
    row: true
  }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: state,
      onChange: handleChange,
      name: "checkedA"
    }),
    label: "Edit"
  }));
};

var _default = CheckboxLabels;
exports.default = _default;
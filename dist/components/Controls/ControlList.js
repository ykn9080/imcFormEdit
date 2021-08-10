"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const ControlList = () => {
//   return(
//    null
//   );
// }
const TextList = () => {
  return /*#__PURE__*/_react.default.createElement(_List.default, null, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Phone ringtone",
    secondary: "Titania"
  })), /*#__PURE__*/_react.default.createElement(_Divider.default, null), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Default notification ringtone",
    secondary: "Tethys"
  })));
};

const ControlList = () => {
  return /*#__PURE__*/_react.default.createElement(TextList, null);
};

var _default = ControlList;
exports.default = _default;
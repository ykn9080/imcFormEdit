"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EditForm = () => {
  let show = (0, _reactRedux.useSelector)(state => state.global.menuedit);
  return show ? /*#__PURE__*/_react.default.createElement("h1", null, "input form") : "";
};

exports.EditForm = EditForm;
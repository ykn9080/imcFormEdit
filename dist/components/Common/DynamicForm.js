"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DynamicForm = props => {
  return /*#__PURE__*/_react.default.createElement(_reactstrap.Form, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Row, {
    form: true
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Col, {
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "exampleEmail"
  }, "Email"), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "email",
    name: "email",
    id: "exampleEmail",
    placeholder: "with a placeholder"
  }))), /*#__PURE__*/_react.default.createElement(_reactstrap.Col, {
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "examplePassword"
  }, "Password"), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "password",
    name: "password",
    id: "examplePassword",
    placeholder: "password placeholder"
  })))), /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "exampleAddress"
  }, "Address"), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "text",
    name: "address",
    id: "exampleAddress",
    placeholder: "1234 Main St"
  })), /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "exampleAddress2"
  }, "Address 2"), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "text",
    name: "address2",
    id: "exampleAddress2",
    placeholder: "Apartment, studio, or floor"
  })), /*#__PURE__*/_react.default.createElement(_reactstrap.Row, {
    form: true
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Col, {
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "exampleCity"
  }, "City"), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "text",
    name: "city",
    id: "exampleCity"
  }))), /*#__PURE__*/_react.default.createElement(_reactstrap.Col, {
    md: 4
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "exampleState"
  }, "State"), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "text",
    name: "state",
    id: "exampleState"
  }))), /*#__PURE__*/_react.default.createElement(_reactstrap.Col, {
    md: 2
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "exampleZip"
  }, "Zip"), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "text",
    name: "zip",
    id: "exampleZip"
  })))), /*#__PURE__*/_react.default.createElement(_reactstrap.FormGroup, {
    check: true
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
    type: "checkbox",
    name: "check",
    id: "exampleCheck"
  }), /*#__PURE__*/_react.default.createElement(_reactstrap.Label, {
    for: "exampleCheck",
    check: true
  }, "Check me out")), /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
    color: "primary"
  }, "Sign in"));
};

var _default = DynamicForm;
exports.default = _default;
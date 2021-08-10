"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _antd = require("antd");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Step
} = _antd.Steps;

const StepAnt = props => {
  let stepname = "currentStep";
  if (props.stepname) stepname = props.stepname;
  const dispatch = (0, _reactRedux.useDispatch)();
  let currentStep = (0, _reactRedux.useSelector)(state => state.global[stepname]);
  const stepInfo = props.stepInfo;

  const next = () => {
    dispatch((0, _actions.globalVariable)({
      [stepname]: currentStep + 1
    }));
  };

  const prev = () => {
    dispatch((0, _actions.globalVariable)({
      [stepname]: currentStep - 1
    }));
  };

  let setting = {},
      Previous = "Previous",
      Next = "Next",
      Done = "Done",
      bsetting = {};

  if (props.iconbutton) {
    bsetting = {
      shape: "circle",
      type: "primary",
      size: "small"
    };
    Previous = "<";
    Next = ">";
    Done = "F";
  }

  if (props.size) setting = _objectSpread(_objectSpread({}, setting), {}, {
    size: props.size
  });
  if (props.style) setting = _objectSpread(_objectSpread({}, setting), {}, {
    style: props.style
  });
  if (props.initial) setting = _objectSpread(_objectSpread({}, setting), {}, {
    initial: props.initial
  });
  if (props.onChange) setting = _objectSpread(_objectSpread({}, setting), {}, {
    onChange: props.onChange
  });
  if (props.ghost) bsetting = _objectSpread(_objectSpread({}, bsetting), {}, {
    ghost: true
  });
  if (props.btntype) bsetting = _objectSpread(_objectSpread({}, bsetting), {}, {
    type: props.btntype
  });

  const steps = /*#__PURE__*/_react.default.createElement(_antd.Steps, _extends({}, setting, {
    current: currentStep
  }), stepInfo.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(Step, {
      key: k.title,
      title: k.title,
      icon: k.icon
    });
  }));

  const Btn = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, currentStep > 0 && /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({
      style: {
        margin: "0 8px"
      }
    }, bsetting, {
      onClick: prev
    }), Previous), currentStep < stepInfo.length - 1 && /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({}, bsetting, {
      onClick: next
    }), Next), currentStep === stepInfo.length - 1 && /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({}, bsetting, {
      onClick: () => _antd.message.success("Processing complete!")
    }), Done));
  };

  const iBtn = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, currentStep > 0 && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      shape: "circle",
      onClick: prev
    }, "P"), currentStep < stepInfo.length - 1 && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      shape: "circle",
      onClick: next
    }, "N"), currentStep === stepInfo.length - 1 && /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({
      type: "secondary",
      shape: "circle"
    }, bsetting, {
      onClick: () => _antd.message.success("Processing complete!")
    }), "Done"));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.inline ? /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: 16
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 18
  }, " ", steps), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 6
  }, /*#__PURE__*/_react.default.createElement(Btn, null))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, steps, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    justify: "flex-end"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 20
    }
  }, props.iconbutton ? /*#__PURE__*/_react.default.createElement("iBtn", null) : /*#__PURE__*/_react.default.createElement(Btn, null)))));
};

var _default = StepAnt;
exports.default = _default;
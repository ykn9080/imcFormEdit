"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _reactAwesomeQueryBuilder = require("react-awesome-query-builder");

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _config_simple = _interopRequireDefault(require("./config_simple"));

var _init_value = _interopRequireDefault(require("./init_value"));

var _init_logic = _interopRequireDefault(require("./init_logic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const stringify = JSON.stringify;
const {
  jsonLogicFormat,
  queryString,
  mongodbFormat,
  sqlFormat,
  getTree,
  checkTree,
  loadTree,
  uuid,
  loadFromJsonLogic
} = _reactAwesomeQueryBuilder.Utils;
const preStyle = {
  backgroundColor: "darkgrey",
  margin: "10px",
  padding: "10px"
};
const preErrorStyle = {
  backgroundColor: "lightpink",
  margin: "10px",
  padding: "10px"
};
const emptyInitValue = {
  id: uuid(),
  type: "group"
}; // get init value in JsonTree format:
// const initValue = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue : emptyInitValue;
// const initTree = checkTree(loadTree(initValue), loadedConfig);
// -OR- alternativaly get init value in JsonLogic format:

const initLogic = _init_logic.default && Object.keys(_init_logic.default).length > 0 ? _init_logic.default : undefined;
const initTree = checkTree(loadFromJsonLogic(initLogic, _config_simple.default), _config_simple.default);
console.log(initLogic, loadFromJsonLogic(initLogic, _config_simple.default));

const DemoQueryBuilder = props => {
  const [tree, setTree] = (0, _react.useState)(initTree);
  const [config, setConfig] = (0, _react.useState)(_config_simple.default);
  const [immutable, setImmutable] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    (0, _jquery.default)(".query-builder-container").css("padding", "");
    (0, _jquery.default)(".query-builder").css("margin", 0); //$(".rule").css("border", "solid 1px #d1cfcf");

    (0, _jquery.default)(".rule").css("backgroundColor", "#f9f4f4");
    (0, _jquery.default)(".group").css("backgroundColor", "white");
    (0, _jquery.default)(".ant-btn-info").addClass("ant-btn-info");
    (0, _jquery.default)(".ant-btn-danger").removeClass("ant-btn-danger");
  }, []);

  const resetValue = () => {
    setTree(initTree);
  };

  const clearValue = () => {
    setTree(loadTree(emptyInitValue));
  };

  const renderBuilder = props => /*#__PURE__*/_react.default.createElement("div", {
    className: "query-builder-container",
    style: {
      padding: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "query-builder"
  }, /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Builder, props)));

  const onChange = (immutableTree, config1) => {
    console.log(immutableTree, config1);
    setImmutable(immutableTree);
    setConfig(config); // updateResult(immutableTree);
    // `jsonTree` or `logic` can be saved to backend
    // (and then loaded with `loadTree` or `loadFromJsonLogic` as seen above)

    const jsonTree = getTree(immutableTree);
    const {
      logic,
      data,
      errors
    } = jsonLogicFormat(immutableTree, config1);
    console.log(jsonTree, logic, data, errors);
    const humanstring = queryString(immutableTree, config1);
    console.log(humanstring);
    if (props.onChange) props.onChange(logic, data, errors, humanstring);
  }; // const updateResult = throttle((immutableTree,config1) => {
  //   setTree(immutableTree);
  //   setConfig(config1);
  // }, 100);


  const renderResult = () => {
    const {
      logic,
      data,
      errors
    } = jsonLogicFormat(immutable, config);
    console.log(immutable, config, queryString(immutable, config));
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", null, "stringFormat:", /*#__PURE__*/_react.default.createElement("pre", {
      style: preStyle
    }, stringify(queryString(immutable, config), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "humanStringFormat:", /*#__PURE__*/_react.default.createElement("pre", {
      style: preStyle
    }, stringify(queryString(immutable, config, true), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "sqlFormat:", /*#__PURE__*/_react.default.createElement("pre", {
      style: preStyle
    }, stringify(sqlFormat(immutable, config), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "mongodbFormat:", /*#__PURE__*/_react.default.createElement("pre", {
      style: preStyle
    }, stringify(mongodbFormat(immutable, config), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("a", {
      href: "http://jsonlogic.com/play.html",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "jsonLogicFormat"), ":", errors.length > 0 && /*#__PURE__*/_react.default.createElement("pre", {
      style: preErrorStyle
    }, stringify(errors, undefined, 2)), !!logic && /*#__PURE__*/_react.default.createElement("pre", {
      style: preStyle
    }, "// Rule", ":", /*#__PURE__*/_react.default.createElement("br", null), stringify(logic, undefined, 2), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("hr", null), "// Data", ":", /*#__PURE__*/_react.default.createElement("br", null), stringify(data, undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "Tree:", /*#__PURE__*/_react.default.createElement("pre", {
      style: preStyle
    }, stringify(getTree(immutable), undefined, 2))));
  };

  console.log(_config_simple.default, tree);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Query, _extends({}, _config_simple.default, {
    value: tree,
    onChange: onChange,
    renderBuilder: renderBuilder
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: resetValue
  }, "reset"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: clearValue
  }, "clear"), /*#__PURE__*/_react.default.createElement("div", {
    className: "query-builder-result"
  }, renderResult()));
};

var _default = DemoQueryBuilder;
exports.default = _default;
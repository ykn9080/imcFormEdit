"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactAwesomeQueryBuilder = require("react-awesome-query-builder");

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _config_simple = _interopRequireDefault(require("./config_simple"));

var _init_value = _interopRequireDefault(require("./init_value"));

var _init_logic = _interopRequireDefault(require("./init_logic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
}; // // get init value in JsonTree format:
// const initValue = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue : emptyInitValue;
//const initTree = checkTree(loadTree(initValue), loadedConfig);
// -OR- alternativaly get init value in JsonLogic format:

const initLogic = _init_logic.default && Object.keys(_init_logic.default).length > 0 ? _init_logic.default : undefined;
const initTree = checkTree(loadFromJsonLogic(initLogic, _config_simple.default), _config_simple.default);

class DemoQueryBuilder extends _react.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      tree: initTree,
      config: _config_simple.default
    });

    _defineProperty(this, "render", () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Query, _extends({}, _config_simple.default, {
      value: this.state.tree,
      onChange: this.onChange,
      renderBuilder: this.renderBuilder
    })), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.resetValue
    }, "reset"), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.clearValue
    }, "clear"), /*#__PURE__*/_react.default.createElement("div", {
      className: "query-builder-result"
    }, this.renderResult(this.state))));

    _defineProperty(this, "resetValue", () => {
      this.setState({
        tree: initTree
      });
    });

    _defineProperty(this, "clearValue", () => {
      this.setState({
        tree: loadTree(emptyInitValue)
      });
    });

    _defineProperty(this, "renderBuilder", props => /*#__PURE__*/_react.default.createElement("div", {
      className: "query-builder-container",
      style: {
        padding: "10px"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "query-builder"
    }, /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Builder, props))));

    _defineProperty(this, "onChange", (immutableTree, config) => {
      this.immutableTree = immutableTree;
      this.config = config;
      this.updateResult();
      console.log(immutableTree); // `jsonTree` or `logic` can be saved to backend
      // (and then loaded with `loadTree` or `loadFromJsonLogic` as seen above)

      const jsonTree = getTree(immutableTree);
      const {
        logic,
        data,
        errors
      } = jsonLogicFormat(immutableTree, config);
    });

    _defineProperty(this, "updateResult", (0, _throttle.default)(() => {
      this.setState({
        tree: this.immutableTree,
        config: this.config
      });
    }, 100));

    _defineProperty(this, "renderResult", _ref => {
      let {
        tree: immutableTree,
        config
      } = _ref;
      const {
        logic,
        data,
        errors
      } = jsonLogicFormat(immutableTree, config);
      console.log(immutableTree, config, queryString(immutableTree, config));
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", null, "stringFormat:", /*#__PURE__*/_react.default.createElement("pre", {
        style: preStyle
      }, stringify(queryString(immutableTree, config), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "humanStringFormat:", /*#__PURE__*/_react.default.createElement("pre", {
        style: preStyle
      }, stringify(queryString(immutableTree, config, true), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "sqlFormat:", /*#__PURE__*/_react.default.createElement("pre", {
        style: preStyle
      }, stringify(sqlFormat(immutableTree, config), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "mongodbFormat:", /*#__PURE__*/_react.default.createElement("pre", {
        style: preStyle
      }, stringify(mongodbFormat(immutableTree, config), undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("a", {
        href: "http://jsonlogic.com/play.html",
        target: "_blank",
        rel: "noopener noreferrer"
      }, "jsonLogicFormat"), ":", errors.length > 0 && /*#__PURE__*/_react.default.createElement("pre", {
        style: preErrorStyle
      }, stringify(errors, undefined, 2)), !!logic && /*#__PURE__*/_react.default.createElement("pre", {
        style: preStyle
      }, "// Rule", ":", /*#__PURE__*/_react.default.createElement("br", null), stringify(logic, undefined, 2), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("hr", null), "// Data", ":", /*#__PURE__*/_react.default.createElement("br", null), stringify(data, undefined, 2))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, "Tree:", /*#__PURE__*/_react.default.createElement("pre", {
        style: preStyle
      }, stringify(getTree(immutableTree), undefined, 2))));
    });
  }

}

exports.default = DemoQueryBuilder;
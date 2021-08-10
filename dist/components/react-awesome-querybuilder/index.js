"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.QueryFieldMaker = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("antd/dist/antd.css");

require("react-awesome-query-builder/lib/css/styles.css");

var _jquery = _interopRequireDefault(require("jquery"));

var _reactAwesomeQueryBuilder = require("react-awesome-query-builder");

var _config_simple = _interopRequireDefault(require("./config_simple"));

var _init_logic = _interopRequireDefault(require("./init_logic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  jsonLogicFormat,
  queryString,
  checkTree,
  loadFromJsonLogic
} = _reactAwesomeQueryBuilder.Utils; // get init value in JsonTree format:
// const initValue = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue : emptyInitValue;
// const initTree = checkTree(loadTree(initValue), loadedConfig);
// -OR- alternativaly get init value in JsonLogic format:
// const initLogic =
//   loadedInitLogic && Object.keys(loadedInitLogic).length > 0
//     ? loadedInitLogic
//     : undefined;
// const initTree = checkTree(
//   loadFromJsonLogic(initLogic, loadedConfig),
//   loadedConfig
// );

const QueryFieldMaker = datas => {
  //datas:[{fieldname:}]
  let fields = {};
  datas.map((k, i) => {
    switch (k.type) {
      case "text":
        fields = _objectSpread(_objectSpread({}, fields), {}, {
          [k.fieldname]: {
            type: "text",
            excludeOperators: ["proximity"],
            // fieldSettings: {
            //   validateValue: (val, fieldSettings) => {
            //     return (val.length < 10 && (val === "" || val.match(/^[A-Za-z0-9_-]+$/) !== null));
            //   },
            // },
            mainWidgetProps: {
              valueLabel: k.fieldname,
              valuePlaceholder: "Enter ".concat(k.fieldname)
            }
          }
        });
        break;

      case "number":
        fields = _objectSpread(_objectSpread({}, fields), {}, {
          [k.fieldname]: {
            label: k.fieldname,
            type: "number",
            preferWidgets: ["number"] // fieldSettings: {
            //   min: -1,
            //   max: 5
            // },

          }
        });
        break;

      case "slider":
        let min = 0,
            max = 100;

        if (k.min) {
          min = k.min;
          max = k.max;
        }

        fields = _objectSpread(_objectSpread({}, fields), {}, {
          [k.fieldname]: {
            label: k.fieldname,
            type: "number",
            preferWidgets: ["slider", "rangeslider"],
            valueSources: ["value", "field"],
            fieldSettings: {
              min: min,
              max: max,
              step: 1,
              marks: {
                [min]: /*#__PURE__*/_react.default.createElement("strong", null, min),
                [max]: /*#__PURE__*/_react.default.createElement("strong", null, max)
              }
            },
            //overrides
            widgets: {
              slider: {
                widgetProps: {
                  valuePlaceholder: k.fieldname + "..."
                }
              }
            }
          }
        });
        break;

      case "datetime":
      case "date":
        fields = _objectSpread(_objectSpread({}, fields), {}, {
          [k.fieldname]: {
            label: k.fieldname,
            type: k.type,
            valueSources: ["value"]
          }
        });
        break;

      case "boolean":
        fields = _objectSpread(_objectSpread({}, fields), {}, {
          [k.fieldname]: {
            label: k.label,
            type: "boolean",
            defaultValue: true,
            mainWidgetProps: {
              labelYes: "true",
              labelNo: "false"
            }
          }
        });
        break;

      case "select":
      case "multiselect":
        let listVal = [];
        if (k.valArr) k.valArr.map((a, b) => {
          listVal.push({
            value: a,
            title: a
          });
          return null;
        });
        fields = _objectSpread(_objectSpread({}, fields), {}, {
          [k.fieldname]: {
            label: k.fieldname,
            type: k.type,
            valueSources: ["value"],
            fieldSettings: {
              listValues: listVal
            }
          }
        });
        break;

      default:
        return null;
    }

    return null;
  });
  return fields;
};

exports.QueryFieldMaker = QueryFieldMaker;

const domStyle = () => {
  (0, _jquery.default)(".query-builder-container").css("padding", "");
  (0, _jquery.default)(".query-builder").css("margin", 0); //$(".rule").css("border", "solid 1px #d1cfcf");

  (0, _jquery.default)(".rule").css("backgroundColor", "#f9f4f4");
  (0, _jquery.default)(".group").css("backgroundColor", "white");
  (0, _jquery.default)(".ant-btn-info").addClass("ant-btn-info");
  (0, _jquery.default)(".ant-btn-danger").removeClass("ant-btn-danger"); // JsonLogic();
};

const QueryBuilder = props => {
  const [inittree, setInittree] = (0, _react.useState)();
  const [config, setConfig] = (0, _react.useState)();
  domStyle();
  (0, _react.useEffect)(() => {
    let initLogic = undefined; // loadedInitLogic && Object.keys(loadedInitLogic).length > 0
    //   ? loadedInitLogic
    //   : undefined;

    if (props.logic) initLogic = props.logic;
    if (props.fields) _config_simple.default.fields = props.fields;
    const initTree1 = checkTree(loadFromJsonLogic(initLogic, _config_simple.default), _config_simple.default);
    setConfig(_config_simple.default);
    setInittree(initTree1); //console.log(initLogic, props.logic, initTree1, loadedConfig);
  }, [props.logic, props.fields]);

  const renderBuilder = props => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "query-builder-container",
      style: {
        padding: "10px"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "query-builder"
    }, /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Builder, props)));
  };

  const onChange = (immutableTree, config1) => {
    // setImmutable(immutableTree);
    // setConfig(config1);
    // updateResult(immutableTree);
    // `jsonTree` or `logic` can be saved to backend
    // (and then loaded with `loadTree` or `loadFromJsonLogic` as seen above)
    //const jsonTree = getTree(immutableTree);
    //console.log(immutableTree, config1);
    const {
      logic,
      data,
      errors
    } = jsonLogicFormat(immutableTree, config1); // let fixlogic = { ...logic };
    // fixlogic = fixMultiSelect(fixlogic);

    const humanstring = queryString(immutableTree, config1, true); //console.log(humanstring, logic);

    if (props.onChange) props.onChange(logic, data, errors, humanstring);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, config && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Query, _extends({}, config, {
    value: inittree,
    onChange: onChange,
    renderBuilder: renderBuilder
  }))));
};

var _default = QueryBuilder;
exports.default = _default;
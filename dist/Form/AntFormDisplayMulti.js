"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _LodashUtil = require("components/functions/LodashUtil");

var _jquery = _interopRequireDefault(require("jquery"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _AntFormDisplay = _interopRequireDefault(require("./AntFormDisplay"));

var _lodash = _interopRequireDefault(require("lodash"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Text
} = _antd.Typography;

const AntFormDisplayMulti = props => {
  const [formList, setFormList] = (0, _react.useState)();
  let [finishmulti, setFinishmulti] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    console.log(props);
    (0, _LodashUtil.localHandle)("onFinish", "remove");
    (0, _LodashUtil.localHandle)("onFinishMulti", "remove");
    updateValues(); // let valobj = {};
    // const valMulti = props.multiArr.map((k, i) => {
    //   valobj = { ...valobj, ...k.initialValues };
    //   return { formid: k.formid, val: k.initialValues };
    // });
    // setFinishmulti(valMulti);
    // localHandle("onFinishMulti", valMulti);
    // localHandle("onFinish", valobj);
  }, [props.multiArr]);

  const updateValues = (formid, val) => {
    let valobj = {};
    if (!formid) finishmulti = props.multiArr.map((k, i) => {
      valobj = _objectSpread(_objectSpread({}, valobj), k.initialValues);
      return {
        formid: k.formid,
        val: k.initialValues
      };
    });else finishmulti.map((k, i) => {
      if (k.formid === formid) {
        k.val = val;
        finishmulti.splice(i, 1, k);
      }

      valobj = _objectSpread(_objectSpread({}, valobj), k.val);
    });
    console.log(formid, val, finishmulti);
    setFinishmulti(finishmulti);
    (0, _LodashUtil.localHandle)("onFinishMulti", finishmulti);
    (0, _LodashUtil.localHandle)("onFinish", valobj);
  };

  const onValuesChange1 = (changedValues, allValues, formid) => {
    console.log(allValues, formid);

    if (props.onChange) {
      props.onChange(allValues, formid);
    }

    updateValues(formid, allValues);
  };

  return props.multiArr ? props.multiArr.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.editmode && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Text, {
      mark: true
    }, "Form", i + 1, " : ", k.formid)), /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
      formid: k.formid,
      onValuesChange: (changedValues, allValues) => onValuesChange1(changedValues, allValues, k.formid),
      initialValues: k.initialValues,
      filteredValues: filteredval => updateValues(k.formid, filteredval),
      patchlist: k.patchlist
    }));
  }) : null;
};

var _default = AntFormDisplayMulti;
exports.default = _default;
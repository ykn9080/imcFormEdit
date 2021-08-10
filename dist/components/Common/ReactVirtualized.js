"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.reverse.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactVirtualized = require("react-virtualized");

require("react-virtualized/styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// only needs to be imported once
const ReactVirtual = props => {
  let list = [["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"], ["Brian Vaughn", "Software Engineer", "San Jose", "CA", 95125, "Software Engineer"]];
  let title = ["name", "job", "address", "state", "zip", "jobagain"]; //if (props.hasOwnProperty("list")) {

  list = props.list;
  title = props.title;

  const makeColumnFromList = list => {
    let col = [];
    if (!list) return false;
    Object.keys(list[0]).reverse().map((k, i) => {
      col.push(k);
      return null;
    });
    col.map((k, i) => {
      if (k === "@LABEL") col.splice(i, 1);
      if (k === "seq") col.splice(i, 1);
      return null;
    });
    col.unshift("@LABEL");
    col.unshift("seq");
    return col;
  };

  const list1 = (0, _reactRedux.useSelector)(state => state.global.specialcase);
  const title1 = makeColumnFromList(list1);

  if (list1) {
    list = list1;
    title = title1;
  }

  const arrayToObjArr = (list, titleArr) => {
    list.map((k, i) => {
      let obj = {};
      titleArr.map((s, j) => {
        obj[s] = k[j];
        return null;
      });
      list.splice(i, 1, obj);
      return null;
    });
    return list;
  };

  list = arrayToObjArr(list, title);

  const Cap = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactVirtualized.Table, {
    width: 800,
    height: 300,
    headerHeight: 20,
    rowHeight: 30,
    rowCount: list.length,
    rowGetter: _ref => {
      let {
        index
      } = _ref;
      return list[index];
    }
  }, title.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(_reactVirtualized.Column, {
      label: Cap(k),
      key: k,
      dataKey: k,
      width: 100
    });
  })));
};

var _default = ReactVirtual;
exports.default = _default;
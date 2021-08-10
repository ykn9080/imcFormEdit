"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _jexcel = _interopRequireDefault(require("jexcel"));

require("../../../node_modules/jexcel/dist/jexcel.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import "./styles.css";
const JExcel = () => {
  const options = {
    tableOverflow: true,
    //lazyLoading: true,
    loadingSpin: true,
    freezeColumns: 2,
    search: true,
    pagination: 100,
    data: [["Jazz", "Audi", "2019-02-12", "", true, "$ 2.000,00", "#777700"], ["Civic", "Audi", "2018-07-11", "", true, "$ 4.000,01", "#007777"]],
    columns: [{
      type: "text",
      title: "Car",
      width: 90
    }, {
      type: "dropdown",
      title: "Make",
      width: 120,
      source: ["Alfa Romeo", "Audi", "Bmw", "Chevrolet", "Chrystler" // (...)
      ]
    }, {
      type: "calendar",
      title: "Available",
      width: 120
    }, {
      type: "image",
      title: "Photo",
      width: 120
    }, {
      type: "checkbox",
      title: "Stock",
      width: 80
    }, {
      type: "numeric",
      title: "Price",
      mask: "$ #.##,00",
      width: 80,
      decimal: ","
    }, {
      type: "color",
      width: 80,
      render: "square"
    }],
    minDimensions: [8, 100000]
  };
  const [el, setEl] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {
    //$(".spreadsheet").jexcel(options);
    const el1 = (0, _jexcel.default)(document.getElementById("spreadsheet"), options);
    setEl(el1);
  }, [options]);

  const addRow = () => {
    el.insertRow();
  };

  const getJson = () => {
    console.log(el.getJson());
  };

  console.log(el);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    id: "spreadsheet"
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("input", {
    type: "button",
    value: "Add new row",
    onClick: () => addRow()
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "button",
    value: "get json",
    onClick: () => getJson()
  }));
};

var _default = JExcel;
exports.default = _default;
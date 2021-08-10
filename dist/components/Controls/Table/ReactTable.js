"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rtable = Rtable;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _Table = require("components/Controls/Table");

require("./Table.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Genres = _ref => {
  let {
    values
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, values.map((genre, idx) => {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: idx,
      className: "badge"
    }, genre);
  }));
};

function Rtable() {
  const columns = (0, _react.useMemo)(() => [{
    Header: "TV Show",
    columns: [{
      Header: "Name",
      accessor: "show.name"
    }, {
      Header: "Type",
      accessor: "show.type"
    }]
  }, {
    Header: "Details",
    columns: [{
      Header: "Language",
      accessor: "show.language"
    }, {
      Header: "Genre(s)",
      accessor: "show.genres",
      Cell: _ref2 => {
        let {
          cell: {
            value
          }
        } = _ref2;
        return /*#__PURE__*/_react.default.createElement(Genres, {
          values: value
        });
      }
    }, {
      Header: "Runtime",
      accessor: "show.runtime",
      Cell: _ref3 => {
        let {
          cell: {
            value
          }
        } = _ref3;
        const hour = Math.floor(value / 60);
        const min = Math.floor(value % 60);
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, hour > 0 ? "".concat(hour, " hr").concat(hour > 1 ? "s" : "", " ") : "", min > 0 ? "".concat(min, " min").concat(min > 1 ? "s" : "") : "");
      }
    }, {
      Header: "Status",
      accessor: "show.status"
    }]
  }], []);
  const [data, setData] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    (async () => {
      const result = await (0, _axios.default)("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement(_Table.Table, {
    columns: columns,
    data: data
  }));
}
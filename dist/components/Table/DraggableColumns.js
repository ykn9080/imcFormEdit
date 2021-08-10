"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DraggableColumns = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactDragListview = _interopRequireDefault(require("react-drag-listview"));

require("antd/dist/antd.css");

var _reactResizable = require("react-resizable");

require("react-resizable/css/styles.css");

const _excluded = ["onResize", "onResizeStop", "onResizeStart", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const ResizeableTitle = props => {
  const {
    onResize,
    onResizeStop,
    onResizeStart,
    width
  } = props,
        restProps = _objectWithoutProperties(props, _excluded);

  if (!width) {
    return /*#__PURE__*/_react.default.createElement("th", restProps);
  }

  return /*#__PURE__*/_react.default.createElement(_reactResizable.Resizable, {
    width: width,
    height: 0,
    onResize: onResize,
    onResizeStart: onResizeStart,
    onResizeStop: onResizeStop
  }, /*#__PURE__*/_react.default.createElement("th", _extends({
    key: "a"
  }, restProps)));
};

const DraggableColumns = props => {
  const [isResizing, setIsResizing] = (0, _react.useState)(false);
  const [columns, setColumns] = (0, _react.useState)(props.columns);
  const [data, setData] = (0, _react.useState)(props.data);
  const [tbsetting, setTbsetting] = (0, _react.useState)(props.tbsetting);
  const components = {
    header: {
      cell: ResizeableTitle
    }
  };
  (0, _react.useEffect)(() => {
    setColumns(props.columns);
    setData(props.data);
  }, [props.columns, props.data]);
  (0, _react.useEffect)(() => {
    setTbsetting(props.tbsetting);
  }, [props.tbsetting]);
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      let cols = [...columns];
      const item = cols.splice(fromIndex, 1)[0];
      cols.splice(toIndex, 0, item);
      setColumns(cols);
      props.onDragEnd(cols);
    },

    nodeSelector: "th"
  };

  const handleResize = index => (e, _ref) => {
    let {
      size
    } = _ref;
    console.log("handle resize");
    setColumns(_ref2 => {
      let {
        columns
      } = _ref2;
      const nextColumns = [...columns];
      nextColumns[index] = _objectSpread(_objectSpread({}, nextColumns[index]), {}, {
        width: size.width
      });
      return nextColumns;
    });
  };

  const onResizeStart = (e, data) => {
    console.log("start resize");
    setIsResizing(true);
    e.preventDefault();
  };

  const onResizeStop = (e, data) => {
    console.log("end resize");
    setIsResizing(false);
  };

  const columns1 = columns.map((col, index) => _objectSpread(_objectSpread({}, col), {}, {
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
      onResizeStart: onResizeStart,
      onResizeStop: onResizeStop
    })
  }));
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactDragListview.default.DragColumn, dragProps, /*#__PURE__*/_react.default.createElement(_antd.Table, _extends({
    bordered: true,
    components: components,
    columns: columns1 // pagination={false}
    ,
    dataSource: data
  }, tbsetting))));
};

exports.DraggableColumns = DraggableColumns;

class Demo extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      isResizing: false,
      columns: this.props.columns // [
      //   {
      //     title: "Key",
      //     dataIndex: "key",
      //   },
      //   {
      //     title: "Name",
      //     dataIndex: "name",
      //     width: 200,
      //   },
      //   {
      //     title: "Gender",
      //     dataIndex: "gender",
      //     width: 100,
      //   },
      //   {
      //     title: "Age",
      //     dataIndex: "age",
      //     width: 75,
      //   },
      //   {
      //     title: "Address",
      //     dataIndex: "address",
      //     width: 100,
      //   },
      // ],

    });

    _defineProperty(this, "components", {
      header: {
        cell: ResizeableTitle
      }
    });

    _defineProperty(this, "data", this.props.data);

    _defineProperty(this, "handleResize", index => (e, _ref3) => {
      let {
        size
      } = _ref3;
      console.log("handle resize");
      this.setState(_ref4 => {
        let {
          columns
        } = _ref4;
        const nextColumns = [...columns];
        nextColumns[index] = _objectSpread(_objectSpread({}, nextColumns[index]), {}, {
          width: size.width
        });
        return {
          columns: nextColumns
        };
      });
    });

    _defineProperty(this, "onResizeStart", (e, data) => {
      console.log("start resize");
      this.setState(_ref5 => {
        let {
          isResizing
        } = _ref5;
        return {
          isResizing: true
        };
      }); //e.stopPropagation()

      e.preventDefault();
    });

    _defineProperty(this, "onResizeStop", (e, data) => {
      console.log("end resize");
      this.setState(_ref6 => {
        let {
          isResizing
        } = _ref6;
        return {
          isResizing: false
        };
      });
    });

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = that.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns
        });
        props.onDragEnd(columns);
      },

      nodeSelector: "th"
    };
  }

  render() {
    // const columns = this.state.columns.map((col, index) => ({
    //   ...col,
    //   onHeaderCell: (column) => ({
    //     width: column.width,
    //     onResize: this.handleResize(index),
    //     onResizeStart: this.onResizeStart,
    //     onResizeStop: this.onResizeStop,
    //   }),
    // }));
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactDragListview.default.DragColumn, this.dragProps, /*#__PURE__*/_react.default.createElement(_antd.Table, _extends({
      bordered: true,
      components: this.components,
      columns: this.state.columns // pagination={false}
      ,
      dataSource: this.props.data
    }, this.props.tbsetting))));
  }

}

exports.default = Demo;
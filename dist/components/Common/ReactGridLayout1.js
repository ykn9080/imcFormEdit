"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactGridLayout = require("react-grid-layout");

var _AuthorChart = _interopRequireDefault(require("Model/Authoring/AuthorChart"));

var _AuthorGraph = _interopRequireDefault(require("Model/Authoring/AuthorGraph"));

var _AuthorTable = _interopRequireDefault(require("Model/Authoring/AuthorTable"));

var _AuthorHtml = _interopRequireDefault(require("Model/Authoring/AuthorHtml"));

var _AuthorMatrix = _interopRequireDefault(require("Model/Authoring/AuthorMatrix"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

require("./react-grid-layout.css");

var _DisplayMore = _interopRequireDefault(require("components/SKD/DisplayMore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);

class ShowcaseLayout extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      compactType: "horizontal",
      mounted: false,
      layouts: {
        lg: this.props.resultsLayout
      },
      items: this.props.resultsLayout,
      remove: props.remove,
      chartdata: []
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
    this.createElement = this.createElement.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onSortAscending = this.onSortAscending.bind(this);
    this.onSortDescending = this.onSortDescending.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  generateDOM(items) {
    return _lodash.default.map(items, el => this.createElement(el));
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const {
      compactType: oldCompactType
    } = this.state;
    const compactType = oldCompactType === "horizontal" ? "vertical" : oldCompactType === "vertical" ? null : "horizontal";
    this.setState({
      compactType
    });
  }

  onLayoutChange(layout, layouts) {
    this.props.onLayoutChange(layout, layouts);
  }

  onNewLayout() {
    this.setState({
      layouts: {
        lg: this.state.item
      }
    });
  }

  createElement(el) {
    let removeStyle = {
      position: "absolute",
      right: "50px",
      top: "8px",
      cursor: "pointer"
    };

    let editStyle = _objectSpread(_objectSpread({}, removeStyle), {}, {
      right: "31px"
    });

    if (this.props.remove === false) removeStyle = _objectSpread(_objectSpread({}, removeStyle), {}, {
      display: "none"
    });
    if (this.props.edit === false) editStyle = _objectSpread(_objectSpread({}, editStyle), {}, {
      display: "none"
    });
    if (el.i === "undefined") el.i = "0";
    const i = el.i;
    let style = {
      padding: 5,
      marginRight: 5
    };
    if (["graph"].indexOf(el.type) === -1) style = _objectSpread(_objectSpread({}, style), {}, {
      overflow: "auto"
    });

    let moreStyle = _objectSpread(_objectSpread({}, removeStyle), {}, {
      right: "8px",
      top: "8px"
    });

    let testStyle = _objectSpread(_objectSpread({}, removeStyle), {}, {
      right: "68px",
      top: "8px"
    });

    let d = el.dtlist; // el.dtlist = this.state.chartdata;

    const menu = [{
      title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
        title: "ascending",
        placement: "left"
      }, /*#__PURE__*/_react.default.createElement(_icons.RiseOutlined, null)),
      onClick: () => this.onSortAscending(el)
    }, {
      title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
        title: "descending",
        placement: "left"
      }, /*#__PURE__*/_react.default.createElement(_icons.FallOutlined, null)),
      onClick: () => this.onSortDescending(el)
    }];

    const editbtn = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: "icon1",
      style: editStyle
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Edit",
      key: "editlayout"
    }, /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, {
      onClick: () => this.onEditItem(i)
    }))), /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
      placement: "top",
      title: "Delete?",
      onConfirm: () => this.onRemoveItem(i),
      okText: "Yes",
      cancelText: "No"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "icon1",
      style: removeStyle
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Remove from layout",
      key: "removelayout"
    }, /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null)))), /*#__PURE__*/_react.default.createElement("span", {
      className: "icon1",
      style: moreStyle
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "More",
      key: "morelayout"
    }, /*#__PURE__*/_react.default.createElement(_DisplayMore.default, {
      menu: menu
    }))));

    return /*#__PURE__*/_react.default.createElement("div", {
      key: i,
      "data-grid": i,
      style: style
    }, /*#__PURE__*/_react.default.createElement(CreateContent, el), this.props.show !== false && editbtn);
  }

  onSortDescending(el) {
    const data = el.dtlist;
    const value = el.setting.value[0];
    el.dtlist = _lodash.default.sortBy(data, value).reverse();
    this.setState({
      chartdata: el.dtlist
    });
  }

  onEditItem(i) {
    this.props.onEditItem(i);
  }

  onRemoveItem(i) {
    let removedItems = _lodash.default.reject(this.state.items, {
      i: i
    }); // setItems([...removedItems]);


    this.setState({
      items: removedItems
    });
    this.props.onRemoveItem(i);
  }

  onSortAscending(el) {
    const data = el.dtlist;
    const value = el.setting.value[0];
    el.dtlist = _lodash.default.sortBy(data, value);
    this.setState({
      chartdata: el.dtlist
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(ResponsiveReactGridLayout, _extends({}, this.props, {
      layouts: this.state.layouts,
      onBreakpointChange: this.onBreakpointChange,
      onLayoutChange: this.onLayoutChange // WidthProvider option
      ,
      measureBeforeMount: false // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
      // and set `measureBeforeMount={true}`.
      ,
      useCSSTransforms: this.state.mounted,
      compactType: this.state.compactType,
      preventCollision: !this.state.compactType
    }), this.generateDOM(this.props.resultsLayout)));
  }

}

exports.default = ShowcaseLayout;

const CreateContent = k => {
  return (() => {
    switch (k.type) {
      case "html":
        return /*#__PURE__*/_react.default.createElement(_AuthorHtml.default, {
          authObj: k,
          title: true
        });

      case "table":
        return /*#__PURE__*/_react.default.createElement(_AuthorTable.default, {
          authObj: k,
          title: true
        });

      case "matrix":
        return /*#__PURE__*/_react.default.createElement(_AuthorMatrix.default, {
          obj: k,
          title: true
        });

      case "chart":
        return /*#__PURE__*/_react.default.createElement(_AuthorChart.default, {
          authObj: k,
          title: true
        });

      case "graph":
        return /*#__PURE__*/_react.default.createElement(_AuthorGraph.default, {
          authObj: k,
          title: true
        });
    }
  })();
};

const extractLayout = allList => {
  let layList = [];
  if (allList) allList.map((k, i) => {
    layList.push({
      x: k.x,
      y: k.y,
      w: k.w,
      h: k.w,
      i: k.i
    });
    return null;
  });
  return layList;
};

ShowcaseLayout.propTypes = {
  onLayoutChange: _propTypes.default.func.isRequired
};
ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 20,
  onLayoutChange: function onLayoutChange() {},
  cols: {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2
  } //initialLayout: generateLayout(),
  //initialLayout: extractLayout(this.props.resultsLayout),

};

function generateLayout() {
  return _lodash.default.map(_lodash.default.range(0, 3), function (item, i) {
    var y = 16; // Math.ceil(Math.random() * 14) + 1;

    return {
      x: _lodash.default.random(0, 5) * 2 % 2,
      y: Math.floor(i / 6) * y,
      w: 6,
      h: y,
      i: i.toString()
    };
  });
}
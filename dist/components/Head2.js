"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Menu = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subfilter = menuid => {
  return submenulist.filter((item, itemIndex) => menuid === item.menuid);
};

const Topmenu = () => {
  function handleSelect(selectedKey) {
    console.log("selected123 " + selectedKey);
  }

  return /*#__PURE__*/_react.default.createElement(Nav, {
    className: "mr-auto",
    onSelect: handleSelect
  }, menulist.map((dt, i) => {
    return subfilter(dt.menuid).length === 0 ? /*#__PURE__*/_react.default.createElement(Nav.Link, {
      key: i
    }, dt.title) : /*#__PURE__*/_react.default.createElement(NavDropdown, {
      title: dt.title,
      id: dt.menuid,
      key: dt.menuid
    }, subfilter(dt.menuid).map(dtt => {
      return /*#__PURE__*/_react.default.createElement(NavDropdown.Item, {
        eventKey: dtt.subid,
        key: dtt.subid
      }, dtt.text);
    }));
  }));
};

const Menu = _ref => {
  let {
    data
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("ul", null, data.map(m => {
    return /*#__PURE__*/_react.default.createElement("li", null, m.title, m.children && /*#__PURE__*/_react.default.createElement(Menu, {
      data: m.children
    }));
  }));
};

exports.Menu = Menu;

const Recur = () => {
  return /*#__PURE__*/_react.default.createElement(Menu, {
    data: data
  });
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
let data = [{
  title: "Top level 1",
  slug: "top-level-1",
  children: [{
    title: "Sub level 1",
    slug: "sub-level-1",
    children: [{
      title: "Sub Sub Level 1",
      slug: "sub-sub-level-1",
      children: [{
        title: "Sub Sub Level 2",
        slug: "sub-sub-level-2",
        children: [{
          title: "Sub Sub Level 23",
          slug: "sub-sub-level-23"
        }]
      }]
    }]
  }, {
    title: "Sub level 2",
    slug: "sub-level-2"
  }]
}, {
  title: "Top level 2",
  slug: "top-level 2"
}];
var _default = Recur;
exports.default = _default;
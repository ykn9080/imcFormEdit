"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveLastBreadcrumb = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _Breadcrumbs = _interopRequireDefault(require("@material-ui/core/Breadcrumbs"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ActiveLastBreadcrumb = props => {
  let keyval = "BreadCrumb";
  const dispatch = (0, _reactRedux.useDispatch)();
  keyval = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  (0, _react.useEffect)(() => {
    (0, _jquery.default)(".MuiBox-root-246").css({
      padding: 0
    });
  });

  function handleClick(event) {
    event.preventDefault();
    dispatch((0, _actions.globalVariable)({
      selectedKey: event.href
    }));
  }

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Breadcrumbs.default, {
    separator: "\u203A",
    "aria-label": "breadcrumb"
  }, /*#__PURE__*/_react.default.createElement(_Link.default, {
    color: "inherit",
    href: "/"
  }, "Material-UI"), /*#__PURE__*/_react.default.createElement(_Link.default, {
    color: "inherit",
    href: "/getting-started/installation/",
    onClick: handleClick
  }, "Core"), /*#__PURE__*/_react.default.createElement(_Link.default, {
    color: "textPrimary",
    href: "/components/breadcrumbs/",
    onClick: handleClick,
    "aria-current": "page"
  }, keyval)));
};

exports.ActiveLastBreadcrumb = ActiveLastBreadcrumb;
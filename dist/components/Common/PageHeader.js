"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _antd = require("antd");

var _BreadCrumb = _interopRequireDefault(require("./BreadCrumb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PageHead = props => {
  const history = (0, _reactRouterDom.useHistory)(); // useEffect(() => {
  //   $(".ant-page-header>.ant-breadcrumb").remove();
  //   $(".ant-page-header").prepend($(".ant-breadcrumb"));
  // }, []);

  const onBack = () => {
    history.goBack();
  };

  let pageProps = {
    className: "site-page-header",
    title: props.title
  };
  if (props.onBack) pageProps = _objectSpread(_objectSpread({}, pageProps), {}, {
    onBack: onBack
  });
  if (typeof props.ghost != "undefined") pageProps = _objectSpread(_objectSpread({}, pageProps), {}, {
    ghost: props.ghost
  });
  if (props.subTitle) pageProps = _objectSpread(_objectSpread({}, pageProps), {}, {
    subTitle: props.subTitle
  });
  if (props.extra) pageProps = _objectSpread(_objectSpread({}, pageProps), {}, {
    extra: props.extra
  }); // const extraContent = (
  //   <img
  //     src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
  //     alt="content"
  //   />
  // );

  const extraContent = props.extraContent ? props.extraContent : "";
  /* #region  children component example*/

  const Description = _ref => {
    let {
      term,
      children,
      span = props.span
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: span
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "description"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "term"
    }, term), /*#__PURE__*/_react.default.createElement("div", {
      className: "detail"
    }, children)));
  };

  const content = props.content ? /*#__PURE__*/_react.default.createElement(_antd.Row, null, props.content.map((k, i) => {
    return k.span ? /*#__PURE__*/_react.default.createElement(Description, {
      term: k.term,
      span: k.span
    }, k.detail) : /*#__PURE__*/_react.default.createElement(Description, {
      term: k.term
    }, k.detail);
  })) : "";

  const child = /*#__PURE__*/_react.default.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "content padding"
  }, content), /*#__PURE__*/_react.default.createElement("div", {
    className: "extraContent"
  }, extraContent));
  /* #endregion */


  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingLeft: 25,
      paddingTop: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_BreadCrumb.default, null)), /*#__PURE__*/_react.default.createElement(_antd.PageHeader, pageProps, props.content ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, child) : props.children));
};

var _default = PageHead;
exports.default = _default;
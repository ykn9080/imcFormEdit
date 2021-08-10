"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./index.css");

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _reactRedux = require("react-redux");

var _AntFormDisplay = _interopRequireDefault(require("../Form/AntFormDisplay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import App from "./App";
//import * as serviceWorker from "./serviceWorker";
const store = (0, _redux.createStore)(_reducers.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, null)), document.getElementById("root")); //ReactDOM.render(<AntFormDisplay />, document.getElementById("root"));
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
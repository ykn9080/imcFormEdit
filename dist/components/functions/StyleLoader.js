"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.removeScript = exports.appendScript = exports.JSLoader = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//send css url thru props
//<StyleLoader path={"https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css"} />
const StyleLoader = _ref => {
  let {
    path
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("link", {
    rel: "stylesheet",
    type: "text/css",
    href: path
  });
};

const JSLoader = _ref2 => {
  let {
    path
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("script", {
    type: "text/javascript",
    src: path
  });
}; //********* */ use case append/remove Script ****************
// useEffect(() => {
//   const scriptt="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css"
//   appendScript(scriptt)
// return () => {
//   removeScript(scriptt)
//   }
// }, []);


exports.JSLoader = JSLoader;

const appendScript = scriptToAppend => {
  const script = document.createElement("script");
  script.src = scriptToAppend;
  script.async = true;
  document.body.appendChild(script);
};

exports.appendScript = appendScript;

const removeScript = scriptToremove => {
  let allsuspects = document.getElementsByTagName("script");

  for (let i = allsuspects.length; i >= 0; i--) {
    if (allsuspects[i] && allsuspects[i].getAttribute("src") !== null && allsuspects[i].getAttribute("src").indexOf("".concat(scriptToremove)) !== -1) {
      allsuspects[i].parentNode.removeChild(allsuspects[i]);
    }
  }
};

exports.removeScript = removeScript;
var _default = StyleLoader;
exports.default = _default;
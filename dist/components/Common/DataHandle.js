"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _BootFormDisplay = _interopRequireDefault(require("./BootFormDisplay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DataHandle = () => {
  const formArray1 = [{
    controlId: "url",
    labelText: "URL",
    name: "url",
    controlType: "input",
    placeholder: "url"
  }, {
    controlId: "method",
    labelText: "Method",
    name: "method",
    controlType: "select",
    optionArray: [{
      text: "Get",
      value: "get"
    }, {
      text: "Post",
      value: "post"
    }, {
      text: "Put",
      value: "put"
    }, {
      text: "Delete",
      value: "delete"
    }]
  }];
  let [formArray, setFormArray] = useState([]);
  useEffect(() => {
    axios.get("".concat(currentsetting.webserviceprefix, "bootform/id?pathname=").concat(props.pathname)).then(function (response) {
      // if (response.data.data != "undefined")
      setFormArray(JSON.parse(response.data[0].data));
    }).catch(function (error) {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(_BootFormDisplay.default, {
    formArray: formArray1
  });
};

var _default = DataHandle;
exports.default = _default;
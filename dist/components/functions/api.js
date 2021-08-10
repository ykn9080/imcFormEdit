"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remotelogin = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _config_del = require("./config_del");

var _Common_make = require("fromImc/Common_make");

var _reactPromiseTracker = require("react-promise-tracker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const remotelogin = (username, password, props) => {
  console.log(username, password);
  (0, _reactPromiseTracker.trackPromise)((0, _axios.default)({
    method: "post",
    url: _config_del.currentsetting.webserviceprefix + "login",
    data: {
      username: username,
      password: password
    }
  }).then(response => {
    //console.log(response.data.file);
    if (response.data.hasOwnProperty("token")) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("imcsetting", JSON.stringify({
        login: response.data.user
      }));
      localStorage.setItem("imcsystem", JSON.stringify(response.data.system));
      localStorage.setItem("imctable", response.data.file);
      localStorage.setItem("imclist", response.data.list);
      localStorage.setItem("imcdata", response.data.dtsrc);
      localStorage.setItem("menu", response.data.menu); // let store = createStore(
      //   glovalVariableReducer,
      //   window.STATE_FROM_SERVER
      // );
      // store.dispatch(globalVariable({ tt: "ss" }));
      //toggleLogin('cancel');
      //pageInit();

      (0, _Common_make.sweetmsgautoclose)("success", "very bood");
      props.history.push("/");
    } else {
      console.log(response.data.message);
    }
  }));
};

exports.remotelogin = remotelogin;
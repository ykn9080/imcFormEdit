"use strict";

var _Common_data = require("./Common_data.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imctableload(storename, callback, opt) {
  if (typeof storename == "undefined") storename = "imctable";
  var myinfo = mycomp + "," + login.id;
  if (mycomp == "") myinfo = ""; //  jsonReadMyAjax(storename, myinfo, "", "", "", init);

  var path = "/data/json/";
  path += storename + ".json";
  (0, _axios.default)({
    method: "post",
    url: webserviceprefix + "readDataMy",
    data: {
      path: path,
      myinfo: myinfo,
      dataname: "",
      keycode: "",
      keyvalue: ""
    }
  }).then(response => {
    (0, _Common_data.jsoncombine)(storename, myinfo, response.data, "imctableload");
    var imc = localStorage.getItem("imctable");
    process(imc);
    if (typeof callback == "function") (0, _Common_data.callbackwithdata)(callback, response.data, opt);
  }); // testapi();

  return false;
}
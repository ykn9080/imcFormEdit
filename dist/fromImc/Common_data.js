"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonDataMyAjax = jsonDataMyAjax;
exports.jsoncombine = jsoncombine;
exports.callbackwithdata = callbackwithdata;
exports.datacodereturn = datacodereturn;
exports.datalistreturn = datalistreturn;
exports.selectimc = selectimc;
exports.selectimctable = exports.jsonReadMyAjax = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../functions/config");

var _core = require("./core");

var _Common_menu = require("./Common_menu");

var _reactRedux = require("react-redux");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios.default.defaults.headers.common = {
  Authorization: "bearer " + localStorage.getItem("token")
};

const jsonReadMyAjax = (storename, myinfo, dataname, keycode, keyvalue, callback, opt) => {
  if (typeof dataname == "undefined") dataname = "";
  if (typeof keycode == "undefined") keycode = "";
  if (typeof keyvalue == "undefined") keyvalue = "";
  const path = "/data/json/" + storename + ".json";
  (0, _axios.default)({
    method: "post",
    url: _config.currentsetting.webserviceprefix + "readDataMy",
    data: {
      path: path,
      myinfo: myinfo,
      dataname: dataname,
      keycode: keycode,
      keyvalue: keyvalue
    }
  }).then(response => {
    console.log(response.data);

    switch (storename) {
      case "imctable":
        jsoncombine(storename, myinfo, response.data, "jsonreadmyajax");
        break;
    }

    if (typeof callback == "function") callbackwithdata(callback, JSON.stringify(response.data), opt);
  });
};

exports.jsonReadMyAjax = jsonReadMyAjax;
const gb = (0, _reactRedux.useSelector)(state => state.global);

function jsonDataMyAjax(datacode, callback, callbackorigin, optorigin) {
  //myinfo:comp,staff(or comp only ok)
  var path = "/data/json/imcdata.json"; //const gb = useSelector(state => state.global);

  (0, _core.funLoading)();
  (0, _axios.default)({
    method: "post",
    url: _config.currentsetting.webserviceprefix + "ReadDatasrcMy",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    data: {
      path: path,
      myinfo: gb.mycomp,
      dataname: "",
      keycode: "code",
      keyvalue: datacode
    }
  }).then(response => {
    if (response.data != "") {
      //btnclickexecute를 정상화한후 살릴것!!!!!!!!!!!!!
      // if (callback == btnclickexecute) {
      //   btnclickexecute(response.data, optorigin[0]);
      // } else {
      console.log(response.data);
      callbackwithdata(callback, JSON.stringify(response.data), optorigin); //}
    } else {
      callbackwithdata(callback, "", optorigin);
    }
  });
}

function jsoncombine(storename, myinfo, json, src) {
  console.log(storename, myinfo, json, src);
  localStorage.setItem(storename, JSON.stringify(json));
}

function callbackwithdata(callback, rtndt, opt) {
  let dt;

  if (typeof callback === "function") {
    if (typeof rtndt == "object") dt = rtndt;else if (typeof rtndt == "string") {
      if (rtndt == "") rtndt = "[]";
      dt = JSON.parse(rtndt);
    }
    if (typeof opt != "undefined" && opt != "") //not knowing dynamic add parameter!!!!
      switch (opt.length) {
        case 0:
        default:
          callback(dt);

        case 1:
          callback(dt, opt[0]);
          break;

        case 2:
          callback(dt, opt[0], opt[1]);
          break;

        case 3:
          callback(dt, opt[0], opt[1], opt[2]);
          break;

        case 4:
          callback(dt, opt[0], opt[1], opt[2], opt[3]);
          break;

        case 5:
          callback(dt, opt[0], opt[1], opt[2], opt[3], opt[4]);
          break;

        case 6:
          callback(dt, opt[0], opt[1], opt[2], opt[3], opt[4], opt[5]);
          break;

        case 7:
          callback(dt, opt[0], opt[1], opt[2], opt[3], opt[4], opt[5], opt[6]);
          break;

        case 8:
          callback(dt, opt[0], opt[1], opt[2], opt[3], opt[4], opt[5], opt[6], opt[7]);
          break;
      } else {
      callback(dt);
    }
  }

  gb.ajaxrtn = rtndt;
}

function datacodereturn(dtsrc) {
  var datacode = "";
  if (dtsrc.hasOwnProperty("datacode")) datacode = dtsrc.datacode;else if (dtsrc.hasOwnProperty("code")) datacode = dtsrc.code;
  return datacode;
}

function datalistreturn(data, datalist, opt) {
  //opt={applyfilter:false}
  //apply filter database and others differently with data as input
  //find datalist from dataset
  //if dtype==database,datalist in querylist( sqlcommand='select')
  var rtn = "",
      dtlist = "",
      dsrc = (0, _jquery.default)("#spdataajax"),
      datacode = "",
      filter,
      applyfilter = true;
  if (typeof opt != "undefined" && !opt.applyfilter) applyfilter = false; //if (dsrc.length > 0)
  //    data = JSON.parse(dsrc.text());

  if (typeof datalist != "undefined" && datalist != "") {
    dtlist = datalist;
  } else if ((0, _jquery.default)("#spdtlist").text() != "") {
    dtlist = JSON.parse((0, _jquery.default)("#spdtlist").text());
  }

  if (typeof data != "undefined" && data != "") {
    if (data.hasOwnProperty("datalist")) {
      rtn = data.datalist;
      filter = datafilterreturn(data);
    } else if (data.dtype == "database") {
      if (data.hasOwnProperty("querylist")) {
        (0, _jquery.default)(data.querylist).each(function (i, k) {
          if (k.sqlcommand == "select") {
            rtn = k.datalist;
            filter = k.filter;
          }
        });
      }
    } else {
      rtn = data.datalist;
      filter = data.filter;
    }
  } //if (dtlist != "") {
  //    rtn = dtlist;
  //    var fieldnum=$(Object.keys(rtn[0])).length;
  //    //clean up wrong data(all field blank or null)
  //    $(rtn).each(function (a, b) {
  //        var cnt=0;
  //        $(Object.keys(b)).each(function (c, d) {
  //            if (b[d] == "" | b[d] == null)
  //                cnt++;
  //        });
  //        if (cnt == fieldnum)
  //            rtn.splice(a, 1);
  //    });
  //}


  if (applyfilter && typeof filter != "undefined" && filter != "") rtn = applyFilter(rtn, filter); // //add missing field

  if (typeof data != "undefined" && data.hasOwnProperty("datascheme") && data.datascheme.length > 0) {
    (0, _jquery.default)(data.datascheme).each(function (i, k) {
      (0, _jquery.default)(rtn).each(function (a, b) {
        if (!b.hasOwnProperty(k.fieldname)) b[k.fieldname] = "";
      });
    });
  }

  return rtn;
}

function datafilterreturn(data) {
  //find filter by datatype
  var rtn = "";

  if (typeof data != "undefined") {
    if (data.dtype == "database") {
      if (data.hasOwnProperty("querylist")) {
        (0, _jquery.default)(data.querylist).each(function (i, k) {
          if (k.sqlcommand == "select") {
            rtn = k.filter;
          }
        });
      }
    } else rtn = data.filter;
  }

  return rtn;
}

function applyFilter(src, filter, option) {
  return src;
}

const selectimctable = (menuid, subid, dvid) => {
  let rtn; //if ( selectimc("imclist", "", "code", dvid) != "")
  //    rtn = selectimc("imclist", "", "code", dvid);

  if (dvid != "" && typeof dvid != "undefined") {
    let list = (0, _Common_menu.menuMy)("control"); //selectimc("imctable", menutoggle+"control")

    if (typeof list != "undefined") _jquery.default.each(list, function (i, k) {
      if (k != null && k.dvid == dvid) {
        rtn = k;
      }
    });
  } else if (subid != "" && typeof subid != "undefined") {
    let list = (0, _Common_menu.menuMy)("submenu"); //selectimc("imctable", menutoggle+"submenu")

    _jquery.default.each(list, function (i, k) {
      if (k != null && k != "" && k.subid == subid) {
        rtn = k;
      }
    });
  } else if (menuid != "" && typeof menuid != "undefined") {
    let list = (0, _Common_menu.menuMy)("menu"); //selectimc("imctable", menutoggle+"menu")

    _jquery.default.each(list, function (i, k) {
      if (k != null && k != "" && k.menuid == menuid) {
        rtn = k;
      }
    });
  }

  return rtn;
};

exports.selectimctable = selectimctable;

function selectimc(storename, dataname, keycode, keyvalue) {
  let json = "",
      json1 = "";
  let rtn = "";

  if (localStorage.getItem(storename) != null) {
    json = localStorage.getItem(storename);

    if (json != "" && json != "undefined") {
      json1 = JSON.parse(json);

      if (dataname == "" | dataname == "*") {
        let olist = Object.keys(json1);
        (0, _jquery.default)(olist).each(function (i, k) {
          let dt1 = [];
          (0, _jquery.default)(json1[k]).each(function (a, b) {
            if (b != "") dt1.push(b);
            if (typeof keycode != "undefined" && b[keycode] == keyvalue) dt1.push(b);
          }); //let dt1 = $.grep(json1[k], function (a) {
          //    return  a[keycode] == keyvalue;
          //});

          if (dt1.length > 0) rtn = dt1[0];
        });
      } else {
        if (typeof keycode != "undefined") {
          let dt1 = [];
          (0, _jquery.default)(json1[dataname]).each(function (a, b) {
            if (b != "" && b[keycode] == keyvalue) dt1.push(b);
          }); //let dt1 = $.grep(json1[dataname], function (a) {
          //    return a[keycode] == keyvalue;
          //});

          if (dt1.length > 0) rtn = dt1[0];
        } else {
          //$(json1[dataname]).each(function (i, k) {
          //    if (k == "")
          //        json1[dataname].splice(i, 1);
          //})
          rtn = json1[dataname];
        }
      }
    }
  }

  return rtn;
}
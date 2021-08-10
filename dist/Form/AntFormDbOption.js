"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Blank;
exports.optionBind = exports.makeBtnArray = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _axios = _interopRequireDefault(require("axios"));

var _index = require("../config/index.js");

var _LodashUtil = require("../components/functions/LodashUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const makeBtnArray = list => {
  //if already has btnArr, pass
  //combine all button as array
  const btn = _lodash.default.filter(list, o => {
    return o.type === "button";
  });

  if (btn.length === 0) return list;

  if (btn.length > 0 && btn[0].btnArr) {
    //this is at ElementInput.js instantView at  bottom
    //add onClick event to load and edit each button one by one
    return list;
  } else {
    const others = _lodash.default.filter(list, o => {
      return o.type !== "button";
    });

    let setting = {};

    const align = _lodash.default.filter(btn, o => {
      return o.align === "right";
    });

    const block = _lodash.default.filter(btn, o => {
      return o.block === true;
    });

    if (align.length > 0) setting = {
      align: "right"
    };
    if (block.length > 0) setting = _objectSpread(_objectSpread({}, setting), {}, {
      block: true
    });
    if (btn.length > 0) setting = _objectSpread(_objectSpread({}, setting), {}, {
      seq: btn[0].seq
    });
    others.push(_objectSpread({
      type: "button",
      btnArr: btn
    }, setting));
    return others;
  }
}; // const makeNode = async (_id, list) => {
//   let outlist;
//   const promises = list.map(async (pid) => {
//     let getdata;
//     getdata = await getfromServer(pid, "node");
//     getdata = optionBind(getdata);
//     return getdata;
//   });
//   const rtn = await Promise.all(promises);
//   return _.flatten(rtn, true);
// };
// const makeNode = async (getnode, _id) => {
//   const promises = arr.map(async (_id) => {
//     if (getnode.length === 0) getnode = await getfromServer(_id);
//     return getnode;
//   });
//   const rtn = await Promise.all(promises);
//   return _.flatten(rtn, true);
// };
// const getfromStore = (_id, type) => {
//   //type:node, link
//   //_id:layer_id or nodeset_id
//   // console.log(state.optArr);
//   // let list;
//   // return new Promise((resolve) => {
//   //   list = _.filter(state.optArr, (o) => {
//   //     return o.pid === _id;
//   //   });
//   //   resolve(list);
//   // });
// };


exports.makeBtnArray = makeBtnArray;

const getfromServer = (collection, _id, idtype, getmethod) => {
  //type:node, link
  //_id:layer_id or nodeset_id
  let param = "any";
  if (getmethod === "singlerow") param = 1; //apply limit(1) in mongodb

  return new Promise((resolve, reject) => {
    let url = "".concat(_index.currentsetting.webserviceprefix).concat(collection, "/").concat(param, "?").concat(idtype, "=").concat(_id);

    _axios.default.get(url).then(response => {
      resolve(response.data);
    });
  });
};

const optionBind = async (list, dbArray, optlist) => {
  //if option is based on database, make array by query
  const output = (data, optobj) => {
    //const rtn = await makeNode();
    let field = "nodeattribute",
        getmethod = "singlerow",
        deletefield = [],
        keyval = "key",
        outlist;
    field = optobj.field;
    getmethod = optobj.getmethod;
    keyval = optobj.keyval;
    if (optobj.deletefield !== "") deletefield = optobj.deletefield.split(",");

    switch (getmethod) {
      case "distinct":
        break;

      case "singlerow":
        outlist = data[0][field];
        break;

      default:
        break;
    }

    deletefield.map(k => {
      return delete outlist[k];
    });
    if (keyval === "key") outlist = Object.keys(outlist);else outlist = Object.values(outlist);
    return outlist;
  };

  const optionMake = arr => {
    let rtn = [];
    arr.map((k, i) => {
      rtn.push({
        text: k.charAt(0).toUpperCase() + k.slice(1),
        value: k
      });
      return null;
    });
    return rtn;
  };

  const dblist = (0, _LodashUtil.pick)(dbArray, "name");
  const idlist = (0, _LodashUtil.pick)(dbArray, "id");
  const idtypelist = (0, _LodashUtil.pick)(dbArray, "idtype");
  dblist.map(async (k, i) => {
    //optlist: redux saved outputlist, for reuse
    //if exist no need to fetch server
    let outputlist = _lodash.default.find(optlist, o => {
      return o.name === k;
    });

    if (!outputlist) {
      let optobj = _lodash.default.find(list, o => {
        return o.name === k;
      });

      if (optobj && optobj.hasOwnProperty("optionArray") && optobj.optionArray !== "") {
        optobj = JSON.parse(optobj.optionArray[0].value);
        let output1 = await getfromServer(optobj.collection, idlist[i], idtypelist[i]);
        outputlist = output(output1, optobj);
        optlist = _objectSpread(_objectSpread({}, optlist), {}, {
          [k]: outputlist
        });
      }

      list.map((a, i) => {
        if (a.name === k) a.optionArray = optionMake(outputlist);
        list.splice(k, i, 1);
        return null;
      });
    }
  });
  return {
    list: list,
    optlist: optlist
  };
};

exports.optionBind = optionBind;

function Blank() {
  return null;
}
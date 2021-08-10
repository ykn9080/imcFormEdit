"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = pick;
exports.pickuniq = pickuniq;
exports.pickMultiple = pickMultiple;
exports.default = func;
exports.localHandle = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function pickfromobject(object, key) {
  if (!key | !object) return;
  var parts = key.split(".");

  if (parts.length > 1) {
    var tempkey = parts.shift();

    if (!object[tempkey]) {
      return null;
    } else {
      if (object[tempkey].length > 0) return pickfromarray(object[tempkey], parts.join("."));else return pickfromobject(object[tempkey], parts.join("."));
    }
  } else {
    return object[parts[0]];
  }
}

function pickfromarray(array, key) {
  var parts = key.split(".");
  var rtn = [],
      tempkey = parts;

  if (parts.length > 1) {
    tempkey = parts.shift();
  }

  if (array.length === 0 | !array[0][tempkey]) {
    return null;
  } else {
    array.map((k, i) => {
      if (typeof k[tempkey] === "string") {
        rtn.push(k[tempkey]);
      }

      return null;
    });
  }

  return rtn;
} //var a = [{a: {c:{d:1,e:{f:100,g:190}}}, b:2}, {a:{c:{d:3,e:{f:101,g:191}}}, b:3}]
//console.log(pick(a, 'a.c.e.g'))=>[1,3]


function pick(arr, key) {
  var result = [];
  if (arr) for (var i = 0; i < arr.length; i++) {
    const pp = pickfromobject(arr[i], key);
    if (pp) result.push(pp);
  }
  return result;
}

function pickuniq(arr, key) {
  let arr1 = _lodash.default.uniq(pick(arr, key));

  arr1.map((k, i) => {
    if (k === "undefined") arr1 = arr1.splice(i, 1);
    return null;
  });
  if (arr1[0] === "undefined") arr1 = [];
  return arr1;
}

function pickMultiple(arr, keyarr) {
  //arr=[{a:1,b:2,c:3},{a:11,b:22,c:33}...], keyarr:["a","c"]
  //return [{a:1,c:3},{a:11,c:33}...]
  let rtnarr = [],
      obj = {};
  rtnarr = arr.map((k, i) => {
    if (typeof keyarr === "string") {
      obj = _objectSpread(_objectSpread({}, obj), {}, {
        [keyarr]: k[keyarr]
      });
    } else {
      obj = keyarr.map((s, j) => {
        return _objectSpread(_objectSpread({}, obj), {}, {
          [s]: k[s]
        });
      });
    }

    return obj;
  });
  return rtnarr;
}

function func() {
  return null;
} //handle localStorage set,get,remove
// if data==="remove" removeItem
//update: localHandle("title",{data})


const localHandle = (title, data) => {
  //if no data get
  if (data) {
    if (data === "remove") localStorage.removeItem(title);else localStorage.setItem(title, JSON.stringify(data));
  } //else set data
  else {
    let getitem = localStorage.getItem(title);
    if (getitem) return JSON.parse(getitem);
  }
};

exports.localHandle = localHandle;
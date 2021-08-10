"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.awaitAll = awaitAll;
exports.renameObjToArray = renameObjToArray;
exports.rename = rename;
exports.renameArray = renameArray;
exports.pickElements = pickElements;
exports.pickArray = pickArray;
exports.pickAndRename = pickAndRename;
exports.pickAndRename1 = pickAndRename1;
exports.pickAndRename2 = pickAndRename2;
exports.clearEmpties = clearEmpties;
exports.replaceComma = replaceComma;
exports.replaceUnderbar = replaceUnderbar;
exports.objectToComma = objectToComma;
exports.loopCommaToObject = loopCommaToObject;
exports.commaToObject = commaToObject;
exports.idMake = idMake;
exports.getDescendantCount = getDescendantCount;
exports.getVisibleNodeCount = getVisibleNodeCount;
exports.getVisibleNodeInfoAtIndex = getVisibleNodeInfoAtIndex;
exports.walk = walk;
exports.map = map;
exports.toggleExpandedForAll = toggleExpandedForAll;
exports.changeNodeAtPath = changeNodeAtPath;
exports.removeNodeAtPath = removeNodeAtPath;
exports.removeNode = removeNode;
exports.getNodeAtPath = getNodeAtPath;
exports.addNodeUnderParent = addNodeUnderParent;
exports.insertNode = insertNode;
exports.getFlatDataFromTree = getFlatDataFromTree;
exports.getTreeFromFlatData = getTreeFromFlatData;
exports.isDescendant = isDescendant;
exports.getDepth = getDepth;
exports.find = find;
exports.countPageSize = exports.getNodeData = exports.addRootPid = exports.addPath1 = exports.getNodefromkeyvalue = exports.emptyAddedmenu = exports.addedmenu = exports.convertCommatoUnderbar = exports.highlightString = exports.getLocalStorage = exports.joinTable = exports.outerTable = exports.join = void 0;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.ends-with.js");

var _findChildrens = require("components/functions/findChildrens");

var _lodash = _interopRequireDefault(require("lodash"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// var a = [
//   {id: 4, name: 'Greg',position: '7'},
//   {id: 1, name: 'David'},
//   {id: 2, name: 'John'},
//   {id: 3, name: 'Matt'},
// ]
// var b = [
//   {id: 5, name: 'Mathew', position: '1'},
//   {id: 6, name: 'Gracia', position: '2'},
//   {id: 2, name: 'John', position: '2'},
//   {id: 3, name: 'Matt', position: '2'},
// ]
//join( [ 'id', 'name' ], a, b )
const join = function join(keys) {
  for (var _len = arguments.length, lists = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    lists[_key - 1] = arguments[_key];
  }

  return lists.reduce((res, list) => {
    list.forEach(record => {
      let hasNode = keys.reduce((idx, key) => idx && idx[record[key]], res[0].tree);

      if (hasNode) {
        const i = hasNode.i;
        Object.assign(res[i].value, record);
        res[i].found++;
      } else {
        let node = keys.reduce((idx, key) => {
          if (idx[record[key]]) return idx[record[key]];else idx[record[key]] = {};
          return idx[record[key]];
        }, res[0].tree);
        node.i = res[0].i++;
        res[node.i] = {
          found: 1,
          value: record
        };
      }
    });
    return res;
  }, [{
    i: 1,
    tree: {}
  }]).slice(1).filter(node => node.found === lists.length).map(n => n.value);
};

exports.join = join;

function awaitAll(list, asyncFn) {
  //****** */ Multiple promises in loop example below ******//
  // const books = [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }];
  // function doSomeAsyncStuffWith(book) {
  //   return Promise.resolve(book.name);
  // }
  // awaitAll(books, doSomeAsyncStuffWith)
  //   .then(results => console.log('doSomeStuffOnlyWhenTheAsyncStuffIsFinished', results))
  //   .catch(e => console.error(e));
  const promises = [];
  list.forEach(x => {
    promises.push(asyncFn(x));
  });
  return Promise.all(promises);
}

const outerTable = (arr1, arr2, key, nullobj) => {
  //nullobj: if join result is null apply ex:{color:"rgba(200,200,200,0.5)"}
  const result = arr1.map(item => {
    let obj = _lodash.default.find(arr2, o => {
      if (key.length === 1) {
        return o[key[0]] === item[key[0]];
      } else return o[key[0]] === item[key[0]] && o[key[1]] === item[key[1]];
    });

    if (!obj) obj = nullobj;
    return _objectSpread(_objectSpread({}, item), obj);
  });
  return result;
};

exports.outerTable = outerTable;

const joinTable = (arr1, arr2, key) => {
  // key:["id"] or ["from","to"]
  let result = arr1.map(item => {
    const obj = _lodash.default.find(arr2, o => {
      if (key.length === 1) {
        return o[key[0]] === item[key[0]];
      } else return o[key[0]] === item[key[0]] && o[key[1]] === item[key[1]];
    });

    if (obj) return _objectSpread(_objectSpread({}, item), obj);
    return null;
  });
  result = _lodash.default.without(result, undefined, null, "");
  return result;
};

exports.joinTable = joinTable;

const getLocalStorage = itemname => {
  let graphData = localStorage.getItem(itemname);
  if (graphData && graphData !== "unefined") graphData = JSON.parse(graphData);
  return graphData;
};

exports.getLocalStorage = getLocalStorage;

const highlightString = (name, replaceStr) => {
  //!!!!! insert: <p dangerouslySetInnerHTML={{ __html: name }} />
  if (!replaceStr | replaceStr === "") return name;
  const normReq = replaceStr.toLowerCase().replace(/\s+/g, " ").trim().split(" ").sort((a, b) => b.length - a.length);
  name = name.replace(new RegExp("(".concat(normReq.join("|"), ")"), "gi"), match => "<mark>" + match + "</mark>");
  return name;
};

exports.highlightString = highlightString;

function reorder(dtArr, sortArr) {
  //dtArr=[{"a":1,"b":2}], sortArr=["b","a"]
  //return [{"b":2,"a":1}]
  dtArr.map((k, i) => {
    let kk = {};
    sortArr.map((a, b) => {
      kk = _objectSpread(_objectSpread({}, kk), {}, {
        [a]: k[a]
      });
      return null;
    });
    dtArr.splice(i, 1, kk);
    return null;
  });
  return dtArr;
}

function renameObjToArray(obj, key, newKey) {
  if (_lodash.default.includes(_lodash.default.keys(obj), key) && key !== newKey) {
    if (obj[key].constructor === Object) {
      let objkey = [];
      objkey.push(_lodash.default.clone(obj[key], true));
      obj[newKey] = objkey;
    } else {
      obj[newKey] = _lodash.default.clone(obj[key], true);
    }

    delete obj[key];
  }

  return obj;
}

function rename(obj, key, newKey) {
  if (_lodash.default.includes(_lodash.default.keys(obj), key) && key !== newKey) {
    obj[newKey] = _lodash.default.clone(obj[key], true);
    delete obj[key];
  }

  return obj;
}

function renameArray(array, keyArr, newKeyArr) {
  //ex: renameArray(array, ["src","tgt","wgt"],["from","to","value"])
  array.map((k, i) => {
    keyArr.map((s, j) => {
      return k = rename(k, s, newKeyArr[j]);
    });
    array.splice(i, 1, k);
    return null;
  });
  return array;
}

function pickElements(obj, keyarr) {
  return _lodash.default.pick(obj, keyarr);
}

function pickArray(array, keyarr) {
  //select only keyarr elements
  //ex: pickArray(array, ["src","tgt","wgt"])
  if (!array) return;
  array.map((k, i) => {
    k = _lodash.default.pick(k, keyarr);
    array.splice(i, 1, k);
    return null;
  });
  return array;
}

function pickAndRename(array, keyArr, newKeyArr) {
  //ex:array=[{a:1,b:2,c:3},{a:11,b:21,c:31}]
  //pickAndRename(array, ["a","b"],["aa","bb"])
  //result: [{aa: 1, bb: 2},{aa: 11, bb: 21}]
  if (array) {
    array.map((k, i) => {
      k = _lodash.default.pick(k, keyArr);
      keyArr.map((s, j) => {
        k = rename(k, s, newKeyArr[j]);
        return null;
      });
      array.splice(i, 1, k);
      return null;
    });
    array = reorder(array, newKeyArr);
  }

  return array;
}

function pickAndRename1(array, keyObj) {
  //ex:array=[{a:1,b:2,c:3},{a:11,b:21,c:31}]
  //pickAndRename(array, {"a":"aa","b":"bb"})
  //result: [{aa: 1, bb: 2},{aa: 11, bb: 21}]
  if (!array | !keyObj) return;
  const keyArr = Object.keys(keyObj);
  const keyVal = Object.values(keyObj);
  return pickAndRename(array, keyArr, keyVal);
}

function pickAndRename2(array, keyObj) {
  //ex:array=[{aa:1,bb:2,cc:3},{aa:11,bb:21,cc:31}]
  //pickAndRename(array, {"a":"aa","b":"bb"})
  //result: [{a: 1, b: 2},{a: 11, b: 21}]
  const keyArr = Object.values(keyObj);
  const keyVal = Object.keys(keyObj);
  return pickAndRename(array, keyArr, keyVal);
}

function clearEmpties(o) {
  //clean up empty object from object
  //   var object = {
  //     a: {
  //       b: 1,
  //       c: {
  //         a: 1,
  //         d: {},
  //         e: { // will need to be removed after f has been removed
  //            f: {}
  //         }
  //       }
  //     },
  //     b: {}
  //   };
  //   clearEmpties(object);
  //   console.log(object);
  for (var k in o) {
    if (!o[k] || typeof o[k] !== "object") {
      continue;
    }

    clearEmpties(o[k]);

    if (Object.keys(o[k]).length === 0 | !o[k]) {
      delete o[k];
    }
  }
}

var allobj = {};

function clearAllobj() {
  //allobj global, needs empty for repeating function
  allobj = {};
}
/**
 * Change comma to underbar json key name
 * {a.b:3}=>{a_b:3}
 * @param {Object} array
 * @param {String} delimiter
 * @returns {Object} return changed array
 */


function replaceComma(array, delimiter) {
  if (!delimiter) delimiter = "_";
  array.map((k, i) => {
    const keyarr = Object.keys(k);
    keyarr.map((a, b) => {
      if (a.indexOf(".") > -1) {
        const chga = a.replace(/[.]/g, delimiter);
        k[chga] = k[a];
        delete k[a];
      }

      return null;
    });
    array.splice(i, 1, k);
    return null;
  });
  return array;
}

function replaceUnderbar(array, delimiter) {
  if (!delimiter) delimiter = ".";
  array.map((k, i) => {
    const keyarr = Object.keys(k);
    keyarr.map((a, b) => {
      if (a.indexOf("_") > -1) {
        const chga = a.replace(/[_]/g, delimiter);
        k[chga] = k[a];
        delete k[a];
      }

      return null;
    });
    array.splice(i, 1, k);
    return null;
  });
  return array;
}
/**
 * prevent mongodb inject error, change comma to underbar in json key
 * @param {Object} array
 *  @param {String} reverse reverse==="reverse" UnderbartoComma
 * @returns
 */


const convertCommatoUnderbar = (array, reverse) => {
  array.map((k, i) => {
    if (k.value && Object.keys(k.value).length > 0) {
      k.value = replaceComma([k.value])[0];
      if (reverse === "reverse") k.value = replaceUnderbar([k.value])[0];
      array.splice(i, 1, k);
    }

    return null;
  });
  return array;
};

exports.convertCommatoUnderbar = convertCommatoUnderbar;

function objectToComma(curobj1, pkey) {
  //allobj={a:{b:{c:1},d:2},e:9}=>{a.b.c:1,a.d:2,e:9}
  if (!pkey) clearAllobj();

  let curobj = _objectSpread({}, curobj1);

  if (_lodash.default.isEmpty(allobj)) allobj = _objectSpread({}, curobj1);
  if (!allobj.keyarr) allobj.keyarr = [];

  const keyFind = pkey => {
    let rtn;
    allobj.keyarr.map(k => {
      if (_lodash.default.endsWith(k, pkey)) {
        rtn = k;
        return false;
      }

      return null;
    });
    return rtn;
  };

  const objMerge = (pkey, key, value) => {
    let rtn;
    if (pkey) rtn = _lodash.default.merge({}, allobj.findobj | {}, {
      [pkey + "." + key]: value
    });else rtn = _lodash.default.merge({}, allobj.findobj | {}, {
      [key]: value
    });
    return rtn;
  };

  const keyInsert = (key, pkey) => {
    let combinedkey = key;
    if (pkey) combinedkey = pkey + "." + key;
    if (allobj.keyarr.indexOf(combinedkey) === -1) allobj.keyarr.push(combinedkey);
  };

  Object.keys(curobj).map((k, i) => {
    if (_lodash.default.isObject(curobj[k])) {
      //insert k to keyarr(confirm exist pkey.k in keyarr if not, insert)
      let dsv = keyFind(pkey);
      keyInsert(k, dsv);
      return objectToComma(curobj[k], k);
    } else if (curobj[k] !== "undefined") {
      //if curobj[k]==="string"
      //find keyarr ends with pkey -> attach k -> dsv:curobj[k] to finobj -> delete curobj from allobj
      const ppart = keyFind(pkey);
      let dsvpart = k;
      if (ppart) dsvpart = ppart + "." + k;
      const rtn = objMerge(ppart, k, curobj[k]);
      allobj = _objectSpread(_objectSpread({}, allobj), {}, {
        findobj: _objectSpread(_objectSpread({}, allobj.findobj), rtn)
      });

      try {
        eval("delete allobj.".concat(dsvpart));
      } catch (e) {}
    }

    return null;
  });
  clearEmpties(allobj);

  let obj = _objectSpread({}, allobj);

  const findobj = allobj.findobj;
  delete obj.keyarr;
  delete obj.findobj; //console.log(_.isEmpty(obj), obj, allobj, findobj);

  if (_lodash.default.isEmpty(obj)) return findobj;
}

function loopCommaToObject(newobj, curobj, delimiter) {
  if (!curobj) curobj = {};
  if (newobj) Object.keys(newobj).map((k, i) => {
    if (newobj[k] !== "undefined") curobj = commaToObject(curobj, k, newobj[k], delimiter);
    return null;
  });
  return curobj;
}

function commaToObject(obj, commaval, val, delimiter) {
  // var obj={a:1,b:{c:2, d:3}}
  // commavalue=b.c=4;
  // var obj1={...obj, b:{...obj.b, c:4}}
  // console.log(obj1)={a:1,b:{c:4, d:3}}
  //commaToObject({f:3,k:4,a:{b:{z:99}}}, "a.b.c", 4)
  //{autoResize: true, width: "100%", height: "100%"} "edges.arrows" "from"
  if (!delimiter) delimiter = ".";
  let vr = commaval.split(delimiter);
  if (vr.length) vr.map((k, i) => {
    let obj1 = {};
    if (vr.length - 1 === i) obj1 = val;

    switch (i) {
      default:
        return null;

      case 0:
        if (obj[k]) obj1 = obj[k];
        return obj = _objectSpread(_objectSpread({}, obj), {}, {
          [k]: obj1
        });

      case 1:
        if (obj[vr[0]][k]) obj1 = obj[vr[0]][k];
        return obj = _objectSpread(_objectSpread({}, obj), {}, {
          [vr[0]]: _objectSpread(_objectSpread({}, obj[vr[0]]), {}, {
            [k]: obj1
          })
        });

      case 2:
        if (obj[vr[0]][vr[1]][k]) obj1 = obj[vr[0]][vr[1]][k];
        return obj = _objectSpread(_objectSpread({}, obj), {}, {
          [vr[0]]: _objectSpread(_objectSpread({}, obj[vr[0]]), {}, {
            [vr[1]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]]), {}, {
              [k]: obj1
            })
          })
        });

      case 3:
        if (obj[vr[0]][vr[1]][vr[2]][k]) obj1 = obj[vr[0]][vr[1]][vr[2]][k];
        return obj = _objectSpread(_objectSpread({}, obj), {}, {
          [vr[0]]: _objectSpread(_objectSpread({}, obj[vr[0]]), {}, {
            [vr[1]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]]), {}, {
              [vr[2]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]][vr[2]]), {}, {
                [k]: obj1
              })
            })
          })
        });

      case 4:
        if (obj[vr[0]][vr[1]][vr[2]][vr[3]][k]) obj1 = obj[vr[0]][vr[1]][vr[2]][vr[3]][k];
        return obj = _objectSpread(_objectSpread({}, obj), {}, {
          [vr[0]]: _objectSpread(_objectSpread({}, obj[vr[0]]), {}, {
            [vr[1]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]]), {}, {
              [vr[2]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]][vr[2]]), {}, {
                [vr[3]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]][vr[2]][vr[3]]), {}, {
                  [k]: obj1
                })
              })
            })
          })
        });

      case 5:
        if (obj[vr[0]][vr[1]][vr[2]][vr[3]][vr[4]][k]) obj1 = obj[vr[0]][vr[1]][vr[2]][vr[3]][vr[4]][k];
        return obj = _objectSpread(_objectSpread({}, obj), {}, {
          [vr[0]]: _objectSpread(_objectSpread({}, obj[vr[0]]), {}, {
            [vr[1]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]]), {}, {
              [vr[2]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]][vr[2]]), {}, {
                [vr[3]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]][vr[2]][vr[3]]), {}, {
                  [vr[4]]: _objectSpread(_objectSpread({}, obj[vr[0]][vr[1]][vr[2]][vr[3]][vr[4]]), {}, {
                    [k]: obj1
                  })
                })
              })
            })
          })
        });
    }
  });
  return obj;
}

function idMake(option) {
  var d = new Date();
  var yr = d.getFullYear().toString().substr(2, 2);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hr = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var msec = d.getMilliseconds();
  var id = yr + (("" + month).length < 2 ? "0" : "") + month + (("" + day).length < 2 ? "0" : "") + day + hr + min + sec;

  if (typeof option != "undefined") {
    //leaver the num from right side
    id += msec;
    var num = id.length - parseInt(option);
    id = id.substring(num);
  }

  return id;
}

let addedmenu = [];
exports.addedmenu = addedmenu;

const emptyAddedmenu = () => {
  exports.addedmenu = addedmenu = [];
};

exports.emptyAddedmenu = emptyAddedmenu;

const getNodefromkeyvalue = (treeDt, keyArray) => {
  let rtnArr = [];
  const subList = (0, _findChildrens.getChildrenPid)(treeDt, ""); //leaf level nodes

  rtnArr = rtnArr.concat(_lodash.default.filter(subList, o => {
    return keyArray.indexOf(o.key) >= 0;
  })); //all nodes has children

  const hasChildNode = _lodash.default.filter(treeDt, o => {
    return keyArray.indexOf(o.key) >= 0;
  });

  hasChildNode.map(k => {
    rtnArr = rtnArr.concat((0, _findChildrens.getChildren)(treeDt, k._id));
    return null;
  });
  return _lodash.default.uniqWith(rtnArr, _lodash.default.isEqual);
};

exports.getNodefromkeyvalue = getNodefromkeyvalue;

const addPath1 = (menu, pid, pathname) => {
  _lodash.default.filter(menu, function (o) {
    return o.pid === pid;
  }).map((k, i) => {
    k.path = pathname + "/" + k.title;
    addedmenu.push(k);
    return addPath1(menu, k._id, k.path);
  });
};

exports.addPath1 = addPath1;

const addRootPid = data => {
  _lodash.default.forEach(data, function (value, key) {
    if (typeof value.pid === "undefined") value.pid = "";
  });

  return data;
}; // convert flatdata to tree(with children) -> recreate flatdata &  select a node
//-> convert again to tree -> add 0-0-0 like key for antTree


exports.addRootPid = addRootPid;

const getNodeData = (allData, topNode, key, parentkey, rootkey, title) => {
  // 1. convert flatarray to children style
  let treeDt = getTreeFromFlatData({
    flatData: allData.map(node => _objectSpread(_objectSpread({}, node), {}, {
      title: node[title]
    })),
    getKey: node => node[key],
    // resolve a node's key
    getParentKey: node => node[parentkey],
    // resolve a node's parent's key
    rootKey: rootkey // The value of the parent key when there is no parent (i.e., at root level)

  }); //2. select part of treeDt auto converted to flat style again

  if (topNode !== "") {
    //when select some node below topNode
    const subList = (0, _findChildrens.getChildren)(treeDt, topNode); //3. revconvert subList to children style

    treeDt = getTreeFromFlatData({
      flatData: subList.map(node => _objectSpread(_objectSpread({}, node), {}, {
        title: node[title]
      })),
      getKey: node => node[key],
      getParentKey: node => node[parentkey],
      rootKey: topNode
    });
  } //append  0-0-0 type key


  const addKey = (_tns, _preKey) => {
    const preKey = _preKey || "0";
    const tns = _tns || treeDt;
    tns.map((v, i) => {
      const key = "".concat(preKey, "-").concat(i);
      v.key = key;

      if (v.hasOwnProperty("children")) {
        return addKey(v.children, key);
      }

      return null;
    });
  };

  addKey();
  return treeDt;
};
/**
 * Performs a depth-first traversal over all of the node descendants,
 * incrementing currentIndex by 1 for each
 */


exports.getNodeData = getNodeData;

function getNodeDataAtTreeIndexOrNextIndex(_ref) {
  let {
    targetIndex,
    node,
    currentIndex,
    getNodeKey,
    path = [],
    lowerSiblingCounts = [],
    ignoreCollapsed = true,
    isPseudoRoot = false
  } = _ref;
  // The pseudo-root is not considered in the path
  const selfPath = !isPseudoRoot ? [...path, getNodeKey({
    node,
    treeIndex: currentIndex
  })] : []; // Return target node when found

  if (currentIndex === targetIndex) {
    return {
      node,
      lowerSiblingCounts,
      path: selfPath
    };
  } // Add one and continue for nodes with no children or hidden children


  if (!node.children || ignoreCollapsed && node.expanded !== true) {
    return {
      nextIndex: currentIndex + 1
    };
  } // Iterate over each child and their descendants and return the
  // target node if childIndex reaches the targetIndex


  let childIndex = currentIndex + 1;
  const childCount = node.children.length;

  for (let i = 0; i < childCount; i += 1) {
    const result = getNodeDataAtTreeIndexOrNextIndex({
      ignoreCollapsed,
      getNodeKey,
      targetIndex,
      node: node.children[i],
      currentIndex: childIndex,
      lowerSiblingCounts: [...lowerSiblingCounts, childCount - i - 1],
      path: selfPath
    });

    if (result.node) {
      return result;
    }

    childIndex = result.nextIndex;
  } // If the target node is not found, return the farthest traversed index


  return {
    nextIndex: childIndex
  };
}

function getDescendantCount(_ref2) {
  let {
    node,
    ignoreCollapsed = true
  } = _ref2;
  return getNodeDataAtTreeIndexOrNextIndex({
    getNodeKey: () => {},
    ignoreCollapsed,
    node,
    currentIndex: 0,
    targetIndex: -1
  }).nextIndex - 1;
}
/**
 * Walk all descendants of the given node, depth-first
 *
 * @param {Object} args - Function parameters
 * @param {function} args.callback - Function to call on each node
 * @param {function} args.getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean} args.ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} args.isPseudoRoot - If true, this node has no real data, and only serves
 *                                        as the parent of all the nodes in the tree
 * @param {Object} args.node - A tree node
 * @param {Object=} args.parentNode - The parent node of `node`
 * @param {number} args.currentIndex - The treeIndex of `node`
 * @param {number[]|string[]} args.path - Array of keys leading up to node to be changed
 * @param {number[]} args.lowerSiblingCounts - An array containing the count of siblings beneath the
 *                                             previous nodes in this path
 *
 * @return {number|false} nextIndex - Index of the next sibling of `node`,
 *                                    or false if the walk should be terminated
 */


function walkDescendants(_ref3) {
  let {
    callback,
    getNodeKey,
    ignoreCollapsed,
    isPseudoRoot = false,
    node,
    parentNode = null,
    currentIndex,
    path = [],
    lowerSiblingCounts = []
  } = _ref3;
  // The pseudo-root is not considered in the path
  const selfPath = isPseudoRoot ? [] : [...path, getNodeKey({
    node,
    treeIndex: currentIndex
  })];
  const selfInfo = isPseudoRoot ? null : {
    node,
    parentNode,
    path: selfPath,
    lowerSiblingCounts,
    treeIndex: currentIndex
  };

  if (!isPseudoRoot) {
    const callbackResult = callback(selfInfo); // Cut walk short if the callback returned false

    if (callbackResult === false) {
      return false;
    }
  } // Return self on nodes with no children or hidden children


  if (!node.children || node.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
    return currentIndex;
  } // Get all descendants


  let childIndex = currentIndex;
  const childCount = node.children.length;

  if (typeof node.children !== "function") {
    for (let i = 0; i < childCount; i += 1) {
      childIndex = walkDescendants({
        callback,
        getNodeKey,
        ignoreCollapsed,
        node: node.children[i],
        parentNode: isPseudoRoot ? null : node,
        currentIndex: childIndex + 1,
        lowerSiblingCounts: [...lowerSiblingCounts, childCount - i - 1],
        path: selfPath
      }); // Cut walk short if the callback returned false

      if (childIndex === false) {
        return false;
      }
    }
  }

  return childIndex;
}
/**
 * Perform a change on the given node and all its descendants, traversing the tree depth-first
 *
 * @param {Object} args - Function parameters
 * @param {function} args.callback - Function to call on each node
 * @param {function} args.getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean} args.ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} args.isPseudoRoot - If true, this node has no real data, and only serves
 *                                        as the parent of all the nodes in the tree
 * @param {Object} args.node - A tree node
 * @param {Object=} args.parentNode - The parent node of `node`
 * @param {number} args.currentIndex - The treeIndex of `node`
 * @param {number[]|string[]} args.path - Array of keys leading up to node to be changed
 * @param {number[]} args.lowerSiblingCounts - An array containing the count of siblings beneath the
 *                                             previous nodes in this path
 *
 * @return {number|false} nextIndex - Index of the next sibling of `node`,
 *                                    or false if the walk should be terminated
 */


function mapDescendants(_ref4) {
  let {
    callback,
    getNodeKey,
    ignoreCollapsed,
    isPseudoRoot = false,
    node,
    parentNode = null,
    currentIndex,
    path = [],
    lowerSiblingCounts = []
  } = _ref4;

  const nextNode = _objectSpread({}, node); // The pseudo-root is not considered in the path


  const selfPath = isPseudoRoot ? [] : [...path, getNodeKey({
    node: nextNode,
    treeIndex: currentIndex
  })];
  const selfInfo = {
    node: nextNode,
    parentNode,
    path: selfPath,
    lowerSiblingCounts,
    treeIndex: currentIndex
  }; // Return self on nodes with no children or hidden children

  if (!nextNode.children || nextNode.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
    return {
      treeIndex: currentIndex,
      node: callback(selfInfo)
    };
  } // Get all descendants


  let childIndex = currentIndex;
  const childCount = nextNode.children.length;

  if (typeof nextNode.children !== "function") {
    nextNode.children = nextNode.children.map((child, i) => {
      const mapResult = mapDescendants({
        callback,
        getNodeKey,
        ignoreCollapsed,
        node: child,
        parentNode: isPseudoRoot ? null : nextNode,
        currentIndex: childIndex + 1,
        lowerSiblingCounts: [...lowerSiblingCounts, childCount - i - 1],
        path: selfPath
      });
      childIndex = mapResult.treeIndex;
      return mapResult.node;
    });
  }

  return {
    node: callback(selfInfo),
    treeIndex: childIndex
  };
}
/**
 * Count all the visible (expanded) descendants in the tree data.
 *
 * @param {!Object[]} treeData - Tree data
 *
 * @return {number} count
 */


function getVisibleNodeCount(_ref5) {
  let {
    treeData
  } = _ref5;

  const traverse = node => {
    if (!node.children || node.expanded !== true || typeof node.children === "function") {
      return 1;
    }

    return 1 + node.children.reduce((total, currentNode) => total + traverse(currentNode), 0);
  };

  return treeData.reduce((total, currentNode) => total + traverse(currentNode), 0);
}
/**
 * Get the <targetIndex>th visible node in the tree data.
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!number} targetIndex - The index of the node to search for
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 *
 * @return {{
 *      node: Object,
 *      path: []string|[]number,
 *      lowerSiblingCounts: []number
 *  }|null} node - The node at targetIndex, or null if not found
 */


function getVisibleNodeInfoAtIndex(_ref6) {
  let {
    treeData,
    index: targetIndex,
    getNodeKey
  } = _ref6;

  if (!treeData || treeData.length < 1) {
    return null;
  } // Call the tree traversal with a pseudo-root node


  const result = getNodeDataAtTreeIndexOrNextIndex({
    targetIndex,
    getNodeKey,
    node: {
      children: treeData,
      expanded: true
    },
    currentIndex: -1,
    path: [],
    lowerSiblingCounts: [],
    isPseudoRoot: true
  });

  if (result.node) {
    return result;
  }

  return null;
}
/**
 * Walk descendants depth-first and call a callback on each
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {function} callback - Function to call on each node
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return void
 */


function walk(_ref7) {
  let {
    treeData,
    getNodeKey,
    callback,
    ignoreCollapsed = true
  } = _ref7;

  if (!treeData || treeData.length < 1) {
    return;
  }

  walkDescendants({
    callback,
    getNodeKey,
    ignoreCollapsed,
    isPseudoRoot: true,
    node: {
      children: treeData
    },
    currentIndex: -1,
    path: [],
    lowerSiblingCounts: []
  });
}
/**
 * Perform a depth-first transversal of the descendants and
 *  make a change to every node in the tree
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {function} callback - Function to call on each node
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object[]} changedTreeData - The changed tree data
 */


function map(_ref8) {
  let {
    treeData,
    getNodeKey,
    callback,
    ignoreCollapsed = true
  } = _ref8;

  if (!treeData || treeData.length < 1) {
    return [];
  }

  return mapDescendants({
    callback,
    getNodeKey,
    ignoreCollapsed,
    isPseudoRoot: true,
    node: {
      children: treeData
    },
    currentIndex: -1,
    path: [],
    lowerSiblingCounts: []
  }).node.children;
}
/**
 * Expand or close every node in the tree
 *
 * @param {!Object[]} treeData - Tree data
 * @param {?boolean} expanded - Whether the node is expanded or not
 *
 * @return {Object[]} changedTreeData - The changed tree data
 */


function toggleExpandedForAll(_ref9) {
  let {
    treeData,
    expanded = true
  } = _ref9;
  return map({
    treeData,
    callback: _ref10 => {
      let {
        node
      } = _ref10;
      return _objectSpread(_objectSpread({}, node), {}, {
        expanded
      });
    },
    getNodeKey: _ref11 => {
      let {
        treeIndex
      } = _ref11;
      return treeIndex;
    },
    ignoreCollapsed: false
  });
}
/**
 * Replaces node at path with object, or callback-defined object
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be changed
 * @param {function|any} newNode - Node to replace the node at the path with, or a function producing the new node
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object[]} changedTreeData - The changed tree data
 */


function changeNodeAtPath(_ref12) {
  let {
    treeData,
    path,
    newNode,
    getNodeKey,
    ignoreCollapsed = true
  } = _ref12;
  const RESULT_MISS = "RESULT_MISS";

  const traverse = _ref13 => {
    let {
      isPseudoRoot = false,
      node,
      currentTreeIndex,
      pathIndex
    } = _ref13;

    if (!isPseudoRoot && getNodeKey({
      node,
      treeIndex: currentTreeIndex
    }) !== path[pathIndex]) {
      return RESULT_MISS;
    }

    if (pathIndex >= path.length - 1) {
      // If this is the final location in the path, return its changed form
      return typeof newNode === "function" ? newNode({
        node,
        treeIndex: currentTreeIndex
      }) : newNode;
    }

    if (!node.children) {
      // If this node is part of the path, but has no children, return the unchanged node
      throw new Error("Path referenced children of node with no children.");
    }

    let nextTreeIndex = currentTreeIndex + 1;

    for (let i = 0; i < node.children.length; i += 1) {
      const result = traverse({
        node: node.children[i],
        currentTreeIndex: nextTreeIndex,
        pathIndex: pathIndex + 1
      }); // If the result went down the correct path

      if (result !== RESULT_MISS) {
        if (result) {
          // If the result was truthy (in this case, an object),
          //  pass it to the next level of recursion up
          return _objectSpread(_objectSpread({}, node), {}, {
            children: [...node.children.slice(0, i), result, ...node.children.slice(i + 1)]
          });
        } // If the result was falsy (returned from the newNode function), then
        //  delete the node from the array.


        return _objectSpread(_objectSpread({}, node), {}, {
          children: [...node.children.slice(0, i), ...node.children.slice(i + 1)]
        });
      }

      nextTreeIndex += 1 + getDescendantCount({
        node: node.children[i],
        ignoreCollapsed
      });
    }

    return RESULT_MISS;
  }; // Use a pseudo-root node in the beginning traversal


  const result = traverse({
    node: {
      children: treeData
    },
    currentTreeIndex: -1,
    pathIndex: -1,
    isPseudoRoot: true
  });

  if (result === RESULT_MISS) {
    throw new Error("No node found at the given path.");
  }

  return result.children;
}
/**
 * Removes the node at the specified path and returns the resulting treeData.
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object[]} changedTreeData - The tree data with the node removed
 */


function removeNodeAtPath(_ref14) {
  let {
    treeData,
    path,
    getNodeKey,
    ignoreCollapsed = true
  } = _ref14;
  return changeNodeAtPath({
    treeData,
    path,
    getNodeKey,
    ignoreCollapsed,
    newNode: null // Delete the node

  });
}
/**
 * Removes the node at the specified path and returns the resulting treeData.
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object} result
 * @return {Object[]} result.treeData - The tree data with the node removed
 * @return {Object} result.node - The node that was removed
 * @return {number} result.treeIndex - The previous treeIndex of the removed node
 */


function removeNode(_ref15) {
  let {
    treeData,
    path,
    getNodeKey,
    ignoreCollapsed = true
  } = _ref15;
  let removedNode = null;
  let removedTreeIndex = null;
  const nextTreeData = changeNodeAtPath({
    treeData,
    path,
    getNodeKey,
    ignoreCollapsed,
    newNode: _ref16 => {
      let {
        node,
        treeIndex
      } = _ref16;
      // Store the target node and delete it from the tree
      removedNode = node;
      removedTreeIndex = treeIndex;
      return null;
    }
  });
  return {
    treeData: nextTreeData,
    node: removedNode,
    treeIndex: removedTreeIndex
  };
}
/**
 * Gets the node at the specified path
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object|null} nodeInfo - The node info at the given path, or null if not found
 */


function getNodeAtPath(_ref17) {
  let {
    treeData,
    path,
    getNodeKey,
    ignoreCollapsed = true
  } = _ref17;
  let foundNodeInfo = null;

  try {
    changeNodeAtPath({
      treeData,
      path,
      getNodeKey,
      ignoreCollapsed,
      newNode: _ref18 => {
        let {
          node,
          treeIndex
        } = _ref18;
        foundNodeInfo = {
          node,
          treeIndex
        };
        return node;
      }
    });
  } catch (err) {// Ignore the error -- the null return will be explanation enough
  }

  return foundNodeInfo;
}
/**
 * Adds the node to the specified parent and returns the resulting treeData.
 *
 * @param {!Object[]} treeData
 * @param {!Object} newNode - The node to insert
 * @param {number|string} parentKey - The key of the to-be parentNode of the node
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} expandParent - If true, expands the parentNode specified by parentPath
 * @param {boolean=} addAsFirstChild - If true, adds new node as first child of tree
 *
 * @return {Object} result
 * @return {Object[]} result.treeData - The updated tree data
 * @return {number} result.treeIndex - The tree index at which the node was inserted
 */


function addNodeUnderParent(_ref19) {
  let {
    treeData,
    newNode,
    parentKey = null,
    getNodeKey,
    ignoreCollapsed = true,
    expandParent = false,
    addAsFirstChild = false
  } = _ref19;

  if (parentKey === null) {
    return addAsFirstChild ? {
      treeData: [newNode, ...(treeData || [])],
      treeIndex: 0
    } : {
      treeData: [...(treeData || []), newNode],
      treeIndex: (treeData || []).length
    };
  }

  let insertedTreeIndex = null;
  let hasBeenAdded = false;
  const changedTreeData = map({
    treeData,
    getNodeKey,
    ignoreCollapsed,
    callback: _ref20 => {
      let {
        node,
        treeIndex,
        path
      } = _ref20;
      const key = path ? path[path.length - 1] : null; // Return nodes that are not the parent as-is

      if (hasBeenAdded || key !== parentKey) {
        return node;
      }

      hasBeenAdded = true;

      const parentNode = _objectSpread({}, node);

      if (expandParent) {
        parentNode.expanded = true;
      } // If no children exist yet, just add the single newNode


      if (!parentNode.children) {
        insertedTreeIndex = treeIndex + 1;
        return _objectSpread(_objectSpread({}, parentNode), {}, {
          children: [newNode]
        });
      }

      if (typeof parentNode.children === "function") {
        throw new Error("Cannot add to children defined by a function");
      }

      let nextTreeIndex = treeIndex + 1;

      for (let i = 0; i < parentNode.children.length; i += 1) {
        nextTreeIndex += 1 + getDescendantCount({
          node: parentNode.children[i],
          ignoreCollapsed
        });
      }

      insertedTreeIndex = nextTreeIndex;
      const children = addAsFirstChild ? [newNode, ...parentNode.children] : [...parentNode.children, newNode];
      return _objectSpread(_objectSpread({}, parentNode), {}, {
        children
      });
    }
  });

  if (!hasBeenAdded) {
    throw new Error("No node found with the given key.");
  }

  return {
    treeData: changedTreeData,
    treeIndex: insertedTreeIndex
  };
}

function addNodeAtDepthAndIndex(_ref21) {
  let {
    targetDepth,
    minimumTreeIndex,
    newNode,
    ignoreCollapsed,
    expandParent,
    isPseudoRoot = false,
    isLastChild,
    node,
    currentIndex,
    currentDepth,
    getNodeKey,
    path = []
  } = _ref21;

  const selfPath = n => isPseudoRoot ? [] : [...path, getNodeKey({
    node: n,
    treeIndex: currentIndex
  })]; // If the current position is the only possible place to add, add it


  if (currentIndex >= minimumTreeIndex - 1 || isLastChild && !(node.children && node.children.length)) {
    if (typeof node.children === "function") {
      throw new Error("Cannot add to children defined by a function");
    } else {
      const extraNodeProps = expandParent ? {
        expanded: true
      } : {};

      const nextNode = _objectSpread(_objectSpread(_objectSpread({}, node), extraNodeProps), {}, {
        children: node.children ? [newNode, ...node.children] : [newNode]
      });

      return {
        node: nextNode,
        nextIndex: currentIndex + 2,
        insertedTreeIndex: currentIndex + 1,
        parentPath: selfPath(nextNode),
        parentNode: isPseudoRoot ? null : nextNode
      };
    }
  } // If this is the target depth for the insertion,
  // i.e., where the newNode can be added to the current node's children


  if (currentDepth >= targetDepth - 1) {
    // Skip over nodes with no children or hidden children
    if (!node.children || typeof node.children === "function" || node.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
      return {
        node,
        nextIndex: currentIndex + 1
      };
    } // Scan over the children to see if there's a place among them that fulfills
    // the minimumTreeIndex requirement


    let childIndex = currentIndex + 1;
    let insertedTreeIndex = null;
    let insertIndex = null;

    for (let i = 0; i < node.children.length; i += 1) {
      // If a valid location is found, mark it as the insertion location and
      // break out of the loop
      if (childIndex >= minimumTreeIndex) {
        insertedTreeIndex = childIndex;
        insertIndex = i;
        break;
      } // Increment the index by the child itself plus the number of descendants it has


      childIndex += 1 + getDescendantCount({
        node: node.children[i],
        ignoreCollapsed
      });
    } // If no valid indices to add the node were found


    if (insertIndex === null) {
      // If the last position in this node's children is less than the minimum index
      // and there are more children on the level of this node, return without insertion
      if (childIndex < minimumTreeIndex && !isLastChild) {
        return {
          node,
          nextIndex: childIndex
        };
      } // Use the last position in the children array to insert the newNode


      insertedTreeIndex = childIndex;
      insertIndex = node.children.length;
    } // Insert the newNode at the insertIndex


    const nextNode = _objectSpread(_objectSpread({}, node), {}, {
      children: [...node.children.slice(0, insertIndex), newNode, ...node.children.slice(insertIndex)]
    }); // Return node with successful insert result


    return {
      node: nextNode,
      nextIndex: childIndex,
      insertedTreeIndex,
      parentPath: selfPath(nextNode),
      parentNode: isPseudoRoot ? null : nextNode
    };
  } // Skip over nodes with no children or hidden children


  if (!node.children || typeof node.children === "function" || node.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
    return {
      node,
      nextIndex: currentIndex + 1
    };
  } // Get all descendants


  let insertedTreeIndex = null;
  let pathFragment = null;
  let parentNode = null;
  let childIndex = currentIndex + 1;
  let newChildren = node.children;

  if (typeof newChildren !== "function") {
    newChildren = newChildren.map((child, i) => {
      if (insertedTreeIndex !== null) {
        return child;
      }

      const mapResult = addNodeAtDepthAndIndex({
        targetDepth,
        minimumTreeIndex,
        newNode,
        ignoreCollapsed,
        expandParent,
        isLastChild: isLastChild && i === newChildren.length - 1,
        node: child,
        currentIndex: childIndex,
        currentDepth: currentDepth + 1,
        getNodeKey,
        path: [] // Cannot determine the parent path until the children have been processed

      });

      if ("insertedTreeIndex" in mapResult) {
        ({
          insertedTreeIndex,
          parentNode,
          parentPath: pathFragment
        } = mapResult);
      }

      childIndex = mapResult.nextIndex;
      return mapResult.node;
    });
  }

  const nextNode = _objectSpread(_objectSpread({}, node), {}, {
    children: newChildren
  });

  const result = {
    node: nextNode,
    nextIndex: childIndex
  };

  if (insertedTreeIndex !== null) {
    result.insertedTreeIndex = insertedTreeIndex;
    result.parentPath = [...selfPath(nextNode), ...pathFragment];
    result.parentNode = parentNode;
  }

  return result;
}
/**
 * Insert a node into the tree at the given depth, after the minimum index
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!number} depth - The depth to insert the node at (the first level of the array being depth 0)
 * @param {!number} minimumTreeIndex - The lowest possible treeIndex to insert the node at
 * @param {!Object} newNode - The node to insert into the tree
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} expandParent - If true, expands the parent of the inserted node
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 *
 * @return {Object} result
 * @return {Object[]} result.treeData - The tree data with the node added
 * @return {number} result.treeIndex - The tree index at which the node was inserted
 * @return {number[]|string[]} result.path - Array of keys leading to the node location after insertion
 * @return {Object} result.parentNode - The parent node of the inserted node
 */


function insertNode(_ref22) {
  let {
    treeData,
    depth: targetDepth,
    minimumTreeIndex,
    newNode,
    getNodeKey = () => {},
    ignoreCollapsed = true,
    expandParent = false
  } = _ref22;

  if (!treeData && targetDepth === 0) {
    return {
      treeData: [newNode],
      treeIndex: 0,
      path: [getNodeKey({
        node: newNode,
        treeIndex: 0
      })],
      parentNode: null
    };
  }

  const insertResult = addNodeAtDepthAndIndex({
    targetDepth,
    minimumTreeIndex,
    newNode,
    ignoreCollapsed,
    expandParent,
    getNodeKey,
    isPseudoRoot: true,
    isLastChild: true,
    node: {
      children: treeData
    },
    currentIndex: -1,
    currentDepth: -1
  });

  if (!("insertedTreeIndex" in insertResult)) {
    throw new Error("No suitable position found to insert.");
  }

  const treeIndex = insertResult.insertedTreeIndex;
  return {
    treeData: insertResult.node.children,
    treeIndex,
    path: [...insertResult.parentPath, getNodeKey({
      node: newNode,
      treeIndex
    })],
    parentNode: insertResult.parentNode
  };
}
/**
 * Get tree data flattened.
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {{
 *      node: Object,
 *      path: []string|[]number,
 *      lowerSiblingCounts: []number
 *  }}[] nodes - The node array
 * 
 * const flatData = getFlatDataFromTree({
    treeData: rtn,
    getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
    ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones
  });
   const rtn1 = _.map(flatData, "node"); //select node from each object
  rtn1.map(v => delete v.children); delete children from each object
  console.log(rtn1);
 * 
 */


function getFlatDataFromTree(_ref23) {
  let {
    treeData,
    getNodeKey,
    ignoreCollapsed = true
  } = _ref23;

  if (!treeData || treeData.length < 1) {
    return [];
  }

  const flattened = [];
  walk({
    treeData,
    getNodeKey,
    ignoreCollapsed,
    callback: nodeInfo => {
      flattened.push(nodeInfo);
    }
  });
  return flattened;
}
/**
 * Generate a tree structure from flat data.
 *
 * @param {!Object[]} flatData
 * @param {!function=} getKey - Function to get the key from the nodeData
 * @param {!function=} getParentKey - Function to get the parent key from the nodeData
 * @param {string|number=} rootKey - The value returned by `getParentKey` that corresponds to the root node.
 *                                  For example, if your nodes have id 1-99, you might use rootKey = 0
 *
 * @return {Object[]} treeData - The flat data represented as a tree
 * 
 *   const initialData = [
    { id: "1", name: "N1", parent: null },
    { id: "2", name: "N2", parent: null },
    { id: "3", name: "N3", parent: 2 },
    { id: "4", name: "N4", parent: 3 }
  ];
  const rtn1 = getTreeFromFlatData({
    flatData: initialData.map(node => ({ ...node, title: node.name })),
    getKey: node => node.id, // resolve a node's key
    getParentKey: node => node.parent, // resolve a node's parent's key
    rootKey: null // The value of the parent key when there is no parent (i.e., at root level)
  });
  console.log(rtn1);
 */


function getTreeFromFlatData(_ref24) {
  let {
    flatData,
    getKey = node => node.id,
    getParentKey = node => node.parentId,
    rootKey = "0"
  } = _ref24;

  if (!flatData) {
    return [];
  }

  const childrenToParents = {};
  flatData.forEach(child => {
    const parentKey = getParentKey(child);

    if (parentKey in childrenToParents) {
      childrenToParents[parentKey].push(child);
    } else {
      childrenToParents[parentKey] = [child];
    }
  });

  if (!(rootKey in childrenToParents)) {
    return [];
  }

  const trav = parent => {
    const parentKey = getKey(parent);

    if (parentKey in childrenToParents) {
      return _objectSpread(_objectSpread({}, parent), {}, {
        children: childrenToParents[parentKey].map(child => trav(child))
      });
    }

    return _objectSpread({}, parent);
  };

  return childrenToParents[rootKey].map(child => trav(child));
}
/**
 * Check if a node is a descendant of another node.
 *
 * @param {!Object} older - Potential ancestor of younger node
 * @param {!Object} younger - Potential descendant of older node
 *
 * @return {boolean}
 */


function isDescendant(older, younger) {
  return !!older.children && typeof older.children !== "function" && older.children.some(child => child === younger || isDescendant(child, younger));
}
/**
 * Get the maximum depth of the children (the depth of the root node is 0).
 *
 * @param {!Object} node - Node in the tree
 * @param {?number} depth - The current depth
 *
 * @return {number} maxDepth - The deepest depth in the tree
 */


function getDepth(node) {
  let depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!node.children) {
    return depth;
  }

  if (typeof node.children === "function") {
    return depth + 1;
  }

  return node.children.reduce((deepest, child) => Math.max(deepest, getDepth(child, depth + 1)), depth);
}
/**
 * Find nodes matching a search query in the tree,
 *
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {!Object[]} treeData - Tree data
 * @param {?string|number} searchQuery - Function returning a boolean to indicate whether the node is a match or not
 * @param {!function} searchMethod - Function returning a boolean to indicate whether the node is a match or not
 * @param {?number} searchFocusOffset - The offset of the match to focus on
 *                                      (e.g., 0 focuses on the first match, 1 on the second)
 * @param {boolean=} expandAllMatchPaths - If true, expands the paths to any matched node
 * @param {boolean=} expandFocusMatchPaths - If true, expands the path to the focused node
 *
 * @return {Object[]} matches - An array of objects containing the matching `node`s, their `path`s and `treeIndex`s
 * @return {Object[]} treeData - The original tree data with all relevant nodes expanded.
 *                               If expandAllMatchPaths and expandFocusMatchPaths are both false,
 *                               it will be the same as the original tree data.
 */


function find(_ref25) {
  let {
    getNodeKey,
    treeData,
    searchQuery,
    searchMethod,
    searchFocusOffset,
    expandAllMatchPaths = false,
    expandFocusMatchPaths = true
  } = _ref25;
  let matchCount = 0;

  const trav = _ref26 => {
    let {
      isPseudoRoot = false,
      node,
      currentIndex,
      path = []
    } = _ref26;
    let matches = [];
    let isSelfMatch = false;
    let hasFocusMatch = false; // The pseudo-root is not considered in the path

    const selfPath = isPseudoRoot ? [] : [...path, getNodeKey({
      node,
      treeIndex: currentIndex
    })];
    const extraInfo = isPseudoRoot ? null : {
      path: selfPath,
      treeIndex: currentIndex
    }; // Nodes with with children that aren't lazy

    const hasChildren = node.children && typeof node.children !== "function" && node.children.length > 0; // Examine the current node to see if it is a match

    if (!isPseudoRoot && searchMethod(_objectSpread(_objectSpread({}, extraInfo), {}, {
      node,
      searchQuery
    }))) {
      if (matchCount === searchFocusOffset) {
        hasFocusMatch = true;
      } // Keep track of the number of matching nodes, so we know when the searchFocusOffset
      //  is reached


      matchCount += 1; // We cannot add this node to the matches right away, as it may be changed
      //  during the search of the descendants. The entire node is used in
      //  comparisons between nodes inside the `matches` and `treeData` results
      //  of this method (`find`)

      isSelfMatch = true;
    }

    let childIndex = currentIndex;

    const newNode = _objectSpread({}, node);

    if (hasChildren) {
      // Get all descendants
      newNode.children = newNode.children.map(child => {
        const mapResult = trav({
          node: child,
          currentIndex: childIndex + 1,
          path: selfPath
        }); // Ignore hidden nodes by only advancing the index counter to the returned treeIndex
        // if the child is expanded.
        //
        // The child could have been expanded from the start,
        // or expanded due to a matching node being found in its descendants

        if (mapResult.node.expanded) {
          childIndex = mapResult.treeIndex;
        } else {
          childIndex += 1;
        }

        if (mapResult.matches.length > 0 || mapResult.hasFocusMatch) {
          matches = [...matches, ...mapResult.matches];

          if (mapResult.hasFocusMatch) {
            hasFocusMatch = true;
          } // Expand the current node if it has descendants matching the search
          // and the settings are set to do so.


          if (expandAllMatchPaths && mapResult.matches.length > 0 || (expandAllMatchPaths || expandFocusMatchPaths) && mapResult.hasFocusMatch) {
            newNode.expanded = true;
          }
        }

        return mapResult.node;
      });
    } // Cannot assign a treeIndex to hidden nodes


    if (!isPseudoRoot && !newNode.expanded) {
      matches = matches.map(match => _objectSpread(_objectSpread({}, match), {}, {
        treeIndex: null
      }));
    } // Add this node to the matches if it fits the search criteria.
    // This is performed at the last minute so newNode can be sent in its final form.


    if (isSelfMatch) {
      matches = [_objectSpread(_objectSpread({}, extraInfo), {}, {
        node: newNode
      }), ...matches];
    }

    return {
      node: matches.length > 0 ? newNode : node,
      matches,
      hasFocusMatch,
      treeIndex: childIndex
    };
  };

  const result = trav({
    node: {
      children: treeData
    },
    isPseudoRoot: true,
    currentIndex: -1
  });
  return {
    matches: result.matches,
    treeData: result.node.children
  };
}

const countPageSize = function countPageSize(objw, objh) {
  let offw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let offh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  //use when count how may object in current window
  //objw, objh: card, icon etc width, height
  //offw,offh: offset in window starting point(left,top)
  const h = (0, _jquery.default)(window).height();
  const w = (0, _jquery.default)(window).width();
  const ht = parseInt((h - offh) / objh);
  const wth = parseInt((w - offw) / objw);
  return wth * ht;
};

exports.countPageSize = countPageSize;
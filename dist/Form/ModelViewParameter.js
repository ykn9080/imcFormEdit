"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.makeParam = exports.mergeObject = exports.stringParser = exports.vectorCreate = exports.createPatchList = exports.ruleset = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _actions = require("actions");

var _antd = require("antd");

var _axios = _interopRequireDefault(require("axios"));

var _AntFormDisplay = _interopRequireDefault(require("Form/AntFormDisplay"));

var _AntFormDisplayMulti = _interopRequireDefault(require("Form/AntFormDisplayMulti"));

var _index = require("config/index.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  TabPane
} = _antd.Tabs;
const ruleset = [{
  type: "number-number",
  model: ["Regression Vector"],
  vector1: "dependentVector",
  vector2: "independentVectors"
}, {
  type: "number-text",
  model: ["Anova Vector"],
  vector1: "dependentVector",
  vector2: "independentVector"
}, {
  type: "number-text",
  model: ["k-means", "gmm", "pam"],
  vector1: "vectors",
  vector2: "partitionVector"
}, {
  type: "text-number",
  model: ["logistic regression"],
  vector1: "dependentVector",
  vector2: "independentVectors"
}, {
  type: "text-number",
  model: ["naive bayes", "discriminant analysis", "svms", "cart", "multilayer perceptron"],
  vector1: "vector",
  vector2: "featureVectors"
}, {
  type: "all-all",
  model: ["Crosstabs Vector"],
  vector1: "rowVector",
  vecotr2: "columnVector"
}, {
  type: "multi-number",
  model: ["Correlation Vector", "hierarchical vector"],
  vector1: "vectors",
  vector2: "none"
}, {
  type: "all-all",
  model: ["MLP"],
  vector1: "independence",
  vector2: "dependence"
}, {
  type: "all-number",
  model: ["Linear Regression"],
  vector1: "independence",
  vector2: "dependence"
}, {
  type: "all-text",
  model: ["KNN", "Naive Bayes", "SVM", "CART", "Logistic Regression", "GCN"],
  vector1: "independence",
  vector2: "dependence"
}];
exports.ruleset = ruleset;

const createPatchList = (objkeys, name) => {
  let plist = [],
      arr1 = [];
  if (!name) name = "replaceall";
  objkeys.map((k, i) => {
    if (name === "selectForm") arr1.push({
      text: k.name,
      value: k._id
    });else arr1.push({
      text: k,
      value: k
    });
    return null;
  });
  plist.push({
    name,
    optionArray: arr1
  });
  return plist;
};

exports.createPatchList = createPatchList;

const vectorCreate = (vname, modelname) => {
  let ruletype;
  let plist;
  let vector;
  let vector1;
  let vector2;
  let vnameChk;
  let vnameChk1;
  let vnameChk2;
  ruleset.map(r => {
    r.model.map(m => {
      if (modelname === m) {
        ruletype = r.type;
        vector1 = r.vector1;
        vector2 = r.vector2;
      }
    });
  });

  switch (ruletype) {
    case "number-number":
      vnameChk1 = vname.vnameNumber;
      vnameChk2 = vname.vnameNumber;
      break;

    case "number-text":
      vnameChk1 = vname.vnameNumber;
      vnameChk2 = vname.vnameText;
      break;

    case "text-number":
      vnameChk1 = vname.vnameText;
      vnameChk2 = vname.vanmeNumber;
      break;

    case "all-all":
      vnameChk1 = vname.vnameAll;
      vnameChk2 = vname.vnameAll;
      break;

    case "multi-number":
      vnameChk = vname.vnameNumber;
      vector = "vectors";
      break;

    case "all-text":
      vnameChk1 = vname.vnameAll;
      vnameChk2 = vname.vnameText;
      break;

    case "all-number":
      vnameChk1 = vname.vnameAll;
      vnameChk2 = vname.vnameNumber;
      break;

    default:
      vnameChk = vname.vnameAll;
      vector = "vector";
      break;
  }

  if (vnameChk) {
    plist = createPatchList(vnameChk, vector);
  } else if (vnameChk1 && vnameChk2) {
    plist = createPatchList(vnameChk1, vector1);
    plist = plist.concat(createPatchList(vnameChk2, vector2));
  }

  return plist; // setSelectedItems(plist);
  // if (tempModel.properties.multiArr) {
  //   let changeMultiArr = tempModel.properties.multiArr.map((m, i) => {
  //     return {
  //       formid: m.formid,
  //       patchlist: plist,
  //       key: i,
  //     };
  //   });
  // tempModel.properties.multiArr = changeMultiArr;
  // let pro = { ...tempModel.properties, multiArr: changeMultiArr };
  // let newtempModel = { ...tempModel, properties: pro };
  // dispatch(globalVariable({ tempModel: newtempModel }));
};

exports.vectorCreate = vectorCreate;

const stringParser = (str, obj) => {
  //convert a.b.c => {a:{b:"c"}}
  if (str === "") {
    return obj;
  }

  let st = str.split(".");
  if (st.length === 1 && !obj) return str;
  const key = st.pop();

  if (!obj) {
    const key1 = st.pop();
    obj = {
      [key1]: key
    };
  } else {
    obj = {
      [key]: obj
    };
  }

  return stringParser(st.join("."), obj);
};

exports.stringParser = stringParser;

const mergeObject = (allValues, objarr) => {
  let j = objarr.length,
      newmerged,
      used = [];

  while (j > 0) {
    used.map(k => {
      objarr.splice(k, 1);
      return null;
    });
    objarr.map((k, i) => {
      if (newmerged) {
        newmerged = _lodash.default.merge(newmerged, k);
        used.push(i);
      } else {
        newmerged = _objectSpread({}, k);
        used.push(i);
      }

      return null;
    });
    j--;
    allValues = _lodash.default.assign(allValues, newmerged);
  }

  return allValues;
};

exports.mergeObject = mergeObject;

const makeParam = allValues => {
  if (!allValues) return false;
  let arr = [];
  let keyarr = Object.keys(allValues);
  let valarr = Object.values(allValues);

  let obj = _objectSpread({}, allValues);

  keyarr.map((key, i) => {
    //if key="a.b.c" convert to {a:{b:"c"}}
    if (key.split(".").length > 1) {
      const keyval = stringParser(key + "." + valarr[i]);
      arr.push(keyval);
      delete obj[key];
    } else if (key.split("_").length > 1) {
      const keyval = stringParser(key + "_" + valarr[i]);
      arr.push(keyval);
      delete obj[key];
    }

    return null;
  });
  console.log(_lodash.default.cloneDeep(obj));
  obj = mergeObject(obj, arr);
  console.log(obj, arr);
  localStorage.removeItem("persist:root");
  localStorage.setItem("parameter", JSON.stringify(obj));
  return obj;
};

exports.makeParam = makeParam;

const ModelParameter = props => {
  var _tempModel$properties4, _tempModel$properties5;

  //model setup summary
  const dispatch = (0, _reactRedux.useDispatch)();
  let tempModel = (0, _reactRedux.useSelector)(state => state.global.tempModel);
  let paramvalue = (0, _reactRedux.useSelector)(state => state.global.paramvalue);
  const [initParameter, setInitParameter] = (0, _react.useState)();
  const [tabkey, setTabkey] = (0, _react.useState)();
  const [selectedItems, setSelectedItems] = (0, _react.useState)(null);
  const [listItems, setListItems] = (0, _react.useState)(null);
  const [multiArr, setMultiArr] = (0, _react.useState)();
  const [paramtype, setParamtype] = (0, _react.useState)(true);
  const [allForm, setAllForm] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(false);

  const onValuesChangeParam = (changedValues, allValues) => {
    if (props.onValuesChange) props.onValuesChange(allValues);
    makeParam(allValues);
    setInitParameter({
      script: JSON.stringify(allValues, null, 4)
    });
  };

  (0, _react.useEffect)(() => {
    getFormList(paramtype);
    vectorUpdate();
  }, [paramtype, paramvalue]);

  const getFormList = async type => {
    const filterForm = fdata => {
      let imsiData1 = [];
      fdata.map((k, i) => {
        return imsiData1.push({
          _id: k._id,
          name: k.name
        });
      });
      const rtn = createPatchList(imsiData1, "selectForm");
      setListItems(rtn);
      setLoading(false);
    };

    if (!allForm) {
      setLoading(true);
      const formlist = await _axios.default.get("".concat(_index.currentsetting.webserviceprefix, "bootform/"));
      setAllForm(formlist.data);
      filterForm(formlist.data);
    } else {
      if (type === true) filterForm(allForm);else {
        const fdata = _lodash.default.filter(allForm, o => {
          var _o$data, _o$data$setting;

          return (o === null || o === void 0 ? void 0 : (_o$data = o.data) === null || _o$data === void 0 ? void 0 : (_o$data$setting = _o$data.setting) === null || _o$data$setting === void 0 ? void 0 : _o$data$setting.type) && o.data.setting.type === "parameter";
        });

        filterForm(fdata);
      }
    }
  };

  const vectorUpdate = () => {
    var _tempModel$properties, _tempModel$properties2, _tempModel$properties3;

    const vname = tempModel === null || tempModel === void 0 ? void 0 : (_tempModel$properties = tempModel.properties) === null || _tempModel$properties === void 0 ? void 0 : (_tempModel$properties2 = _tempModel$properties.linknode) === null || _tempModel$properties2 === void 0 ? void 0 : _tempModel$properties2.vname;
    if (!vname) return;
    const plist = vectorCreate(vname, tempModel.title);
    if (!plist) return;
    setSelectedItems(plist);

    if ((_tempModel$properties3 = tempModel.properties) !== null && _tempModel$properties3 !== void 0 && _tempModel$properties3.multiArr) {
      let changeMultiArr = tempModel.properties.multiArr.map((m, i) => {
        return {
          formid: m.formid,
          patchlist: plist,
          key: i
        };
      });
      tempModel.properties.multiArr = changeMultiArr;
      dispatch((0, _actions.globalVariable)({
        tempModel
      })); // let pro = { ...tempModel.properties, multiArr: changeMultiArr };
      // let newtempModel = { ...tempModel, properties: pro };
      //dispatch(globalVariable({ tempModel: newtempModel }));
    }
  };

  const onParamTypeChange = val => {
    setParamtype(val);
  };

  const operations = !(tempModel !== null && tempModel !== void 0 && (_tempModel$properties4 = tempModel.properties) !== null && _tempModel$properties4 !== void 0 && _tempModel$properties4.multiArr) && /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    checkedChildren: "All",
    unCheckedChildren: "Parameter",
    defaultChecked: true,
    onChange: onParamTypeChange
  });

  const onValuesChangeParamter = (changedValues, allValues) => {
    // const stxt = allValues.script;
    // const sobj = JSON.parse(allValues.script);
    makeParam(JSON.parse(allValues.script));
  };

  const onFormgetFinish = val => {
    let multiData = [];
    val.selectForm.map((v, i) => {
      return multiData.push({
        formid: v,
        patchlist: selectedItems,
        key: i
      });
    });
    setMultiArr(multiData);

    let pro = _objectSpread(_objectSpread({}, tempModel.properties), {}, {
      multiArr: multiData
    });

    let newtempModel = _objectSpread(_objectSpread({}, tempModel), {}, {
      properties: pro
    });

    dispatch((0, _actions.globalVariable)({
      tempModel: newtempModel
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    defaultActiveKey: "1",
    onChange: key => {
      setTabkey(key);
    },
    style: {
      minHeight: 500
    },
    tabBarExtraContent: operations
  }, /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "Form",
    key: "1"
  }, tempModel !== null && tempModel !== void 0 && (_tempModel$properties5 = tempModel.properties) !== null && _tempModel$properties5 !== void 0 && _tempModel$properties5.multiArr ? /*#__PURE__*/_react.default.createElement(_AntFormDisplayMulti.default, {
    multiArr: tempModel.properties.multiArr,
    editmode: props.editmode
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, listItems && /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formid: tempModel.param,
    patchlist: listItems,
    onFinish: onFormgetFinish,
    onValuesChange: onValuesChangeParam
  }), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: loading
  }))), /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "Script",
    key: "2"
  }, /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formid: "5f7be94d85cd1730c8544018",
    onValuesChange: onValuesChangeParamter,
    initialValues: initParameter
  }))));
};

var _default = ModelParameter;
exports.default = _default;
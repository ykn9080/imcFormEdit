"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.shouldUpdateCheck = exports.createInitValuesWithDefault = exports.replaceListbyInitValues = exports.shouldConditionFilter = exports.labelShowhide = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

require("antd/dist/antd.css");

require("../components/Common/Antd.css");

var _axios = _interopRequireDefault(require("axios"));

var _index = require("../config/index.js");

var _antd2 = require("antd");

var _AntFormElement = _interopRequireDefault(require("./AntFormElement"));

var _AntFormDbOption = require("./AntFormDbOption");

var _LodashUtil = require("../components/functions/LodashUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Title,
  Paragraph
} = _antd2.Typography;

const labelShowhide = (list, layout) => {
  let nostylelist = _lodash.default.filter(list, o => {
    return o.type === "nostyle";
  });

  nostylelist.map((k, i) => {
    let kk = _objectSpread({}, k);

    if (kk.alllabel === true) {
      //nostyle x, arr o
      //nostyle o, arr[0] x
      if (kk.offset === true) {
        kk.array.map((a, i) => {
          let aa = _objectSpread({}, a);

          if (!a.label) {
            if (a.label1) aa.label = a.label1;else if (kk.label) aa.label = kk.label;else aa.label = kk.label1;
            kk.array.splice(i, 1, aa);
          }

          return null;
        });
        if (kk.label) kk.label1 = kk.label;else kk.label1 = kk.array[0].label;
        delete kk.label;
      } else switch (layout) {
        case "horizontal":
          if (!kk.label) {
            kk.label = kk.array[0].label;
            kk.label1 = kk.array[0].label;
          }

          kk.array.map((a, i) => {
            let aa = _objectSpread({}, a);

            if (a.label1 && !a.label) {
              aa.label = a.label1;
              kk.array.splice(i, 1, aa);
            }

            return null;
          });
          kk.array[0].label1 = kk.array[0].label;
          delete kk.array[0].label;
          break;

        default:
          let firstlbl;
          if (kk.label) firstlbl = kk.label;else if (kk.label1) firstlbl = kk.label1;
          kk.array.map((a, i) => {
            let aa = _objectSpread({}, a);

            if (!a.label && a.label1) {
              aa.label = a.label1;
              kk.array.splice(i, 1, aa);
            }

            return null;
          });
          kk.label1 = firstlbl;
          delete kk.label;
          break;
      }
    } else {
      //nostyle o, arr x
      if (kk.label1) kk.label = kk.label1;else if (kk.array[0].label1) kk.label = kk.array[0].label1;else if (kk.array[0].label) kk.label = kk.array[0].label;
      kk.array.map((a, i) => {
        let aa = _objectSpread({}, a);

        if (!a.label1 && a.label) {
          aa.label1 = a.label;
        }

        delete aa.label;
        kk.array.splice(i, 1, aa);
        return null;
      });
    }

    nostylelist.splice(i, 1, kk);
    return null;
  });
  list.map((k, i) => {
    nostylelist.map((a, b) => {
      if (a.seq === k.seq) list.splice(i, 1, a);
      return null;
    });
    return null;
  });
  return list;
};

exports.labelShowhide = labelShowhide;

const boolParse = myString => {
  if (!myString) return;
  if (["true", "false"].indexOf(myString) === -1) return myString;else return myString === "true";
};

const optionParse = (row, val) => {
  if (!row.optionArray) {
    return humanParse(val);
  } else {
    const rtn = _lodash.default.find(row.optionArray, o => {
      return o.value === val;
    });

    return rtn === null || rtn === void 0 ? void 0 : rtn.text;
  }
};

const humanParse = val => {
  switch (val) {
    case "true":
    case true:
      return "Yes";

    case "false":
    case false:
      return "No";

    default:
      return val;
  }
};

const findShouldRow = (list, name) => {
  const shouldrow = _lodash.default.find(list, o => {
    return o.name === name;
  });

  return shouldrow;
};

const shouldConditionFilter = (list, savedValue) => {
  //filter saveValue based on
  list.map((k, i) => {
    if (k.shouldfield) {
      const row = findShouldRow(list, k.shouldfield);

      if (!(savedValue !== null && savedValue !== void 0 && savedValue[row === null || row === void 0 ? void 0 : row.name] && savedValue[row.name] === true)) {
        delete savedValue[k.name];
      }
    }

    return null;
  });
  return savedValue;
};

exports.shouldConditionFilter = shouldConditionFilter;

const replaceListbyInitValues = (list, changedInitVals) => {
  list.map((k, i) => {
    const val = changedInitVals === null || changedInitVals === void 0 ? void 0 : changedInitVals[k.name];

    if (typeof val !== "undefined") {
      k = _objectSpread(_objectSpread({}, k), {}, {
        defaultValue: val
      });
      list.splice(i, 1, k);
    }

    return;
  });
  return list;
};

exports.replaceListbyInitValues = replaceListbyInitValues;

const createInitValuesWithDefault = (list, changedInitVals) => {
  let newinitVal = {},
      newinitLabel,
      defVal;
  if (!list) return;
  list.map((k, i) => {
    defVal = k.defaultValue;

    if (typeof changedInitVals !== "undefined") {
      defVal = changedInitVals === null || changedInitVals === void 0 ? void 0 : changedInitVals[k.name];
    }

    if (typeof defVal !== "undefined") {
      if (k.type === "form.list") {
        let outList = [],
            outlabelList = [],
            defList = [],
            nameList = [],
            labelList = [];
        defList = defVal.split(";");

        if (k.array) {
          k.array.map((s, j) => {
            nameList.push(s.name);
            labelList.push(s.label);
            return null;
          });
        }

        defList.map((s, j) => {
          let obj = {},
              lobj = {};
          const valarr = s.split(",");
          nameList.map((q, z) => {
            obj = _objectSpread(_objectSpread({}, obj), {}, {
              [q]: boolParse(valarr[z])
            });
            return null;
          });
          labelList.map((q, z) => {
            lobj = _objectSpread(_objectSpread({}, lobj), {}, {
              [q]: optionParse(k, valarr[z])
            });
            return null;
          });
          outList.push(obj);
          outlabelList.push(lobj);
          return null;
        });
        newinitVal = {
          "": outList
        };
        newinitLabel = {
          "": outlabelList
        };
      } else {
        let lbl = optionParse(k, defVal);
        const val = boolParse(defVal);
        if (!lbl) lbl = val;
        k = _objectSpread(_objectSpread({}, k), {}, {
          defaultValue: val
        });
        list.splice(i, 1, k);
        newinitVal = _objectSpread(_objectSpread({}, newinitVal), {}, {
          [k.name]: val
        });
        newinitLabel = _objectSpread(_objectSpread({}, newinitLabel), {}, {
          [k.label]: lbl
        });
      } //}

    }

    if (k.type === "nostyle" && k.array && k.array.length > 0) {
      k.array.map((a, b) => {
        defVal = a.defaultValue;
        if (changedInitVals) defVal = changedInitVals[a.name];

        if (defVal) {
          a.defaultValue = boolParse(defVal);
          newinitVal = _objectSpread(_objectSpread({}, newinitVal), {}, {
            [a.name]: a.type === "input.number" ? defVal : boolParse(defVal)
          });
          newinitLabel = _objectSpread(_objectSpread({}, newinitLabel), {}, {
            [a.label || a.label1]: optionParse(a, defVal)
          });
        }

        return null;
      });
      list.splice(i, 1, k);
    }

    return null;
  });
  let param = (0, _LodashUtil.localHandle)("onFinish");
  if (!param) param = {};
  (0, _LodashUtil.localHandle)("onFinish", _objectSpread(_objectSpread({}, param), newinitVal));
  return {
    name: newinitVal,
    label: newinitLabel,
    list
  };
};
/**
 * shouldupdate===true인 field의 child row를
 * @param {Object} list form.data.list
 * @param {Object} k  each row of list
 * @returns {Object} if false return null if true return k
 */


exports.createInitValuesWithDefault = createInitValuesWithDefault;

const shouldUpdateCheck = (list, k) => {
  if (!k.shouldupdate) return k;

  const shouldParent = _lodash.default.find(list, o => {
    return o.name === k.shouldfield;
  });

  if (shouldParent.defaultValue === k.shouldvalue) return k;else return null;
};

exports.shouldUpdateCheck = shouldUpdateCheck;

const AntFormDisplay = props => {
  var _props$formArray3, _props$formArray3$set;

  let showall = (0, _reactRedux.useSelector)(state => state.global.showall); //edit

  const [formArray, setFormArray] = (0, _react.useState)();
  const [formSummary, setFormSummary] = (0, _react.useState)(null);
  const [loading] = (0, _react.useState)(false);
  const [fset, setFset] = (0, _react.useState)();
  const [list, setList] = (0, _react.useState)();
  const [othersetting, setOthersetting] = (0, _react.useState)({});

  let [form] = _antd2.Form.useForm();

  if (props.form) {
    form = props.form;
  }

  (0, _react.useEffect)(() => {
    if (props.changedInitial) {
      var _props$formArray, _props$formArray$sett;

      form.setFieldsValue(props === null || props === void 0 ? void 0 : (_props$formArray = props.formArray) === null || _props$formArray === void 0 ? void 0 : (_props$formArray$sett = _props$formArray.setting) === null || _props$formArray$sett === void 0 ? void 0 : _props$formArray$sett.initialValues);
    }

    if (formArray) {
      const lh = formArray.setting.lineheight;
      lineHeightSetting(lh);
    }
  });
  (0, _react.useEffect)(() => {
    if (props.changedInitial) {
      var _props$formArray2, _props$formArray2$set;

      form.setFieldsValue(props === null || props === void 0 ? void 0 : (_props$formArray2 = props.formArray) === null || _props$formArray2 === void 0 ? void 0 : (_props$formArray2$set = _props$formArray2.setting) === null || _props$formArray2$set === void 0 ? void 0 : _props$formArray2$set.initialValues);
    }
  }, [props === null || props === void 0 ? void 0 : (_props$formArray3 = props.formArray) === null || _props$formArray3 === void 0 ? void 0 : (_props$formArray3$set = _props$formArray3.setting) === null || _props$formArray3$set === void 0 ? void 0 : _props$formArray3$set.initialValues]);
  (0, _react.useEffect)(() => {
    form.resetFields();
    setTimeout(() => {
      if (props.formArray) {
        const lh = props.formArray.setting.lineheight;
        lineHeightSetting(lh);
      } else lineHeightSetting("small");
    }, [0]);
  }, [props.initialValues]);
  (0, _react.useEffect)(() => {
    if (props.formArray) {
      makeFormArray(props.formArray);
      setFormArray(props.formArray);
    } //execute when dboption applied
    else if (props.formid) _axios.default.get("".concat(_index.currentsetting.webserviceprefix, "bootform/").concat(props.formid)).then(response => {
      settingup(response.data);
    });
  }, [props.formid, props.formArray, props.patchlist, props.initialValues]);

  const lineHeightSetting = lh => {
    let ht = 10;

    switch (lh) {
      case "small":
        ht = 5;
        break;

      case "large":
        ht = 25;
        break;

      default:
        break;
    }

    if ((0, _jquery.default)(".ant-row.ant-form-item")) (0, _jquery.default)(".ant-row.ant-form-item").css("margin-bottom", ht);else setTimeout(() => {
      (0, _jquery.default)(".ant-row.ant-form-item").css("margin-bottom", ht);
    }, 200);
  };

  const settingup = data => {
    if (props.patchlist) list = makePatchList(props.patchlist, list);
    setFormArray(data.data);
    makeFormArray(data.data);
    let desc = "";
    if (data.desc) desc = data.desc;
    setFormSummary({
      title: data.name,
      desc: desc
    });
  };

  const makePatchList = (patchlist, list) => {
    //props.list contains obj to replace exisiting one
    //ie [{name:"country",optionArray:[{label:"Korea",value:"korea"}]}]
    const patchReplace = (patchlist, list) => {
      let nochangename = [];
      patchlist.map((a, b) => {
        list.map((k, i) => {
          if (a.name === k.name) {
            nochangename.push(a.name);
            k = _objectSpread(_objectSpread({}, k), a);
            list.splice(i, 1, k);
          }

          return null;
        });
        return null;
      });
      patchlist.map((a, b) => {
        let except = [];
        if (a.except) except = a.except;
        list.map((k, i) => {
          if (a.name === "replaceall" && except.indexOf(k.name) === -1 && k.type.indexOf("select") > -1 && nochangename.indexOf(k.name) === -1) {
            k.name1 = k.name;
            k = _objectSpread(_objectSpread({}, k), a);
          }

          if (k.name1) {
            k.name = k.name1;
            delete k.name1;
          }

          list.splice(i, 1, k);
          return null;
        });
        return null;
      });
      return list;
    };

    if (list.length > 0 && ["form.list", "noStyle"].indexOf(list[0].type) > -1) {
      const rtn = patchReplace(patchlist, list[0].array);
      list[0].array = rtn;
    } else {
      list = patchReplace(patchlist, list);
    }

    return list;
  };

  const makeFormArray = formArray => {
    let setting = {
      editable: false,
      name: "antform",
      layout: "",
      formColumn: 1,
      formItemLayout: {},
      tailLayout: {},
      initial: {},
      // = props.formArray && createInitValuesWithDefault(props.formArray.list),
      size: "middle",
      title: formSummary ? formSummary.title : "",
      desc: formSummary && formSummary.desc ? formSummary.desc : ""
    };
    if (props.title) setting = _objectSpread(_objectSpread({}, setting), {}, {
      title: props.title
    });
    if (props.desc) setting = _objectSpread(_objectSpread({}, setting), {}, {
      desc: props.desc
    }); // if (props.initialValues) {
    //   setFset({ ...fset, initialValues: props.initialValues });
    // }

    if (props.dropdownRender) setOthersetting({
      dropdownRender: props.dropdownRender
    });
    if (props.name) setting = _objectSpread(_objectSpread({}, setting), {}, {
      name: props.name
    });
    if (props.editable) setting = _objectSpread(_objectSpread({}, setting), {}, {
      editable: props.editable
    });
    let list1;

    if (formArray) {
      list1 = labelShowhide(formArray.list, formArray.setting.layout);
      list1 = _lodash.default.sortBy(list1, ["seq"]);
      if (props.patchlist) list1 = makePatchList(props.patchlist, list1);
      if (props.initialValues) list1 = replaceListbyInitValues(list1, props.initialValues);
      setList(list1);

      if (typeof formArray.setting != "undefined") {
        let st = formArray.setting;
        if (st.layout) setting = _objectSpread(_objectSpread({}, setting), {}, {
          layout: st.layout
        });
        if (st.formColumn) setting = _objectSpread(_objectSpread({}, setting), {}, {
          formColumn: st.formColumn
        });
        if (st.formItemLayout) setting = _objectSpread(_objectSpread({}, setting), {}, {
          formItemLayout: setting.layout === "horizontal" ? st.formItemLayout : null
        });
        if (st.tailLayout) setting = _objectSpread(_objectSpread({}, setting), {}, {
          tailLayout: setting.layout === "horizontal" ? {
            wrapperCol: {
              span: 14,
              offset: setting.formItemLayout.labelCol.span
            }
          } : null
        });
        if (st.onFinish) setting = _objectSpread(_objectSpread({}, setting), {}, {
          onFinish: st.onFinish
        });
        if (st.onValuesChange) setting = _objectSpread(_objectSpread({}, setting), {}, {
          onValuesChange: st.onValuesChange
        });
        if (st.size) setting = _objectSpread(_objectSpread({}, setting), {}, {
          size: st.size
        });
        if (props.initialValues) setting = _objectSpread(_objectSpread({}, setting), {}, {
          initialValues: props.initialValues
        });else if (props.name === "fsummary" | props.name === "esetup") setting = _objectSpread(_objectSpread({}, setting), {}, {
          initialValues: st.initialValues
        });else {
          if (formArray.list.length > 0 && formArray.list[0].type === "form.list") {
            const initial = createInitValuesWithDefault(formArray.list, props.initialValues).name;
            setting = _objectSpread(_objectSpread({}, setting), {}, {
              initialValues: initial
            });
          } else {
            setting = _objectSpread(_objectSpread({}, setting), {}, {
              initialValues: createInitValuesWithDefault(formArray.list, props.initialValues).name
            });
          }
        }
      }
    }

    setFset(setting); //onload values that filtered conditional fields

    const filteredval = shouldConditionFilter(list1, _objectSpread({}, setting.initialValues));
    if (props.filteredValues) props.filteredValues(filteredval);
  };

  const shouldUpdateWrap = (formitem, k) => {
    return /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, {
      noStyle: true,
      shouldUpdate: (prevValues, currentValues) => 1 === 1
    }, _ref => {
      let {
        getFieldValue
      } = _ref;
      let valarr = [],
          show = false;

      if (k.shouldvalue === true) {
        if (getFieldValue(k.shouldfield) === true) show = true;
      } else if (typeof k.shouldvalue !== "undefined") {
        if (["true", "false"].indexOf(k.shouldvalue) > -1) {
          show = getFieldValue(k.shouldfield);
        } else {
          valarr = k.shouldvalue.split(","); //"treemap,scatter".split(",");

          if (valarr.indexOf(getFieldValue(k.shouldfield)) > -1) show = true;
          if (getFieldValue(k.shouldfield) && getFieldValue(k.shouldfield).indexOf(k.shouldvalue) === 0) show = true; //if shouldfield value startwith shouldvalue
        }
      }

      return show && formitem;
    });
  };

  const Element = props => {
    let list1 = replaceListbyInitValues(list, props.initialValues);
    list1 = (0, _AntFormDbOption.makeBtnArray)(list1);
    return list1.map((k, i) => {
      let formitem = /*#__PURE__*/_react.default.createElement(_AntFormElement.default, _extends({
        key: i
      }, k, props));

      if (k.shouldupdate && showall !== true) formitem = shouldUpdateWrap(formitem, k);
      return formitem;
    });
  };

  const onFinish = val => {
    if (props.onFinish) props.onFinish(val);
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    const value = await form.validateFields();
    return value;
  };

  const onValuesChange = async (changedValues, allValues) => {
    if (fset.initialValues) {
      allValues = _objectSpread(_objectSpread({}, fset.initialValues), allValues);
    } //shouldConfitionFilter


    allValues = shouldConditionFilter(list, allValues);

    if (props.onValuesChange) {
      props.onValuesChange(changedValues, allValues);
    }
  };

  const formhead = /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd2.Typography, null, /*#__PURE__*/_react.default.createElement(Title, {
    level: 4
  }, fset === null || fset === void 0 ? void 0 : fset.title), /*#__PURE__*/_react.default.createElement(Paragraph, null, fset === null || fset === void 0 ? void 0 : fset.desc)));

  const ele = /*#__PURE__*/_react.default.createElement(Element, _extends({
    key: Math.random(),
    formColumn: fset === null || fset === void 0 ? void 0 : fset.formColumn,
    layout: fset === null || fset === void 0 ? void 0 : fset.layout,
    formItemLayout: fset === null || fset === void 0 ? void 0 : fset.formItemLayout,
    tailLayout: fset === null || fset === void 0 ? void 0 : fset.tailLayout,
    editable: fset === null || fset === void 0 ? void 0 : fset.editable,
    initialValues: fset === null || fset === void 0 ? void 0 : fset.initialValues //for input.color not working

  }, othersetting));

  const elem = (fset === null || fset === void 0 ? void 0 : fset.formColumn) > 1 ? /*#__PURE__*/_react.default.createElement(_antd2.Row, {
    gutter: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32
    }
  }, ele) : ele;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, fset && props.showtitle && formhead, fset && /*#__PURE__*/_react.default.createElement(_antd2.Form, _extends({
    name: fset.name,
    className: "SortForm"
  }, fset.formItemLayout, {
    layout: fset.layout,
    form: form,
    onFinish: props.onFinish ? onFinish : fset.onFinish,
    onValuesChange: props.onValuesChange ? onValuesChange : fset.onValuesChange,
    initialValues: fset === null || fset === void 0 ? void 0 : fset.initialValues,
    size: fset.size
  }), elem), /*#__PURE__*/_react.default.createElement(_antd2.Spin, {
    spinning: loading
  }));
};

var _default = AntFormDisplay;
exports.default = _default;
"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _actions = require("actions");

var _lodash = _interopRequireDefault(require("lodash"));

var _jquery = _interopRequireDefault(require("jquery"));

var _styles = require("@material-ui/core/styles");

require("antd/dist/antd.css");

require("components/Common/Antd.css");

var _antd2 = require("antd");

var _AntFormElement = _interopRequireDefault(require("./AntFormElement"));

var _SpeedDial = _interopRequireDefault(require("components/Common/SpeedDial"));

var _ElementInput = _interopRequireDefault(require("Form/ElementInput"));

var _DialogFull = _interopRequireDefault(require("components/Common/DialogFull"));

var _AntFormDisplay = _interopRequireDefault(require("./AntFormDisplay"));

var _AddBox = _interopRequireDefault(require("@material-ui/icons/AddBox"));

var _fa = require("react-icons/fa");

var _cg = require("react-icons/cg");

var _icons = require("@ant-design/icons");

var _DialogSelect = _interopRequireDefault(require("components/Common/DialogSelect"));

var _TabAnt = _interopRequireDefault(require("components/Common/TabAnt"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Popup = _interopRequireDefault(require("components/Common/Popup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  TabPane
} = _antd2.Tabs;
const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    flexGrow: 1
  },
  speedDialWrapper: {
    position: "relative",
    textAlign: "left",
    marginTop: theme.spacing(13),
    height: 380
  },
  radioGroup: {
    margin: theme.spacing(1, 0)
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(-292),
      right: theme.spacing(50)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  }
}));

const AntFormBuild = props => {
  const history = (0, _reactRouterDom.useHistory)();
  const classes = useStyles();
  const dispatch = (0, _reactRedux.useDispatch)();
  let tabPanelArray = [];
  let data;

  if (props.formdt) {
    data = props.formdt.data;
  }

  const [formArray, setFormArray] = (0, _react.useState)(data);
  const [formdt, setFormdt] = (0, _react.useState)(props.formdt);
  const [tabarray, setTabarray] = (0, _react.useState)("");
  let open = (0, _reactRedux.useSelector)(state => state.global.openDialog); //edit

  let open1 = (0, _reactRedux.useSelector)(state => state.global.openDialog1); //create new

  let currentData = (0, _reactRedux.useSelector)(state => state.global.currentData);
  let showall = (0, _reactRedux.useSelector)(state => state.global.showall);

  const buttonSeqChg = list => {
    var btnArr = _lodash.default.remove(list, function (n) {
      return n.type === "button";
    });

    btnArr.map((k, i) => {
      k.seq = k.seq + 1000;
      btnArr.splice(i, 1, k);
      return null;
    });
    list = list.concat(btnArr);
    return list;
  };

  const ReOrder = (start_pos, end_pos) => {
    console.log(start_pos, end_pos);
    let arr = formdt;
    let list = arr.data.list;
    let newArr = [];
    list = buttonSeqChg(list); // const rtn = seqCleanup(list, start_pos, end_pos);
    // start_pos = rtn[0];
    // end_pos = rtn[1];

    console.log(start_pos, end_pos); //seq rearrange before reorder
    // let list = _.sortBy(arr.data.list, ["seq"]);

    list.map((k, i) => {
      if (k.type !== "button") {
        k.seq = i;
        list.splice(i, 1, k);
      }

      return null;
    });
    if (start_pos < end_pos) _lodash.default.forEach(list, function (value, key) {
      if (value.type !== "button") {
        if (value.seq <= end_pos && value.seq > start_pos) value.seq--;else if (value.seq === start_pos) value.seq = end_pos;
      }

      newArr.push(value);
    });
    if (start_pos > end_pos) _lodash.default.forEach(list, function (value, key) {
      if (value.type !== "button") {
        if (value.seq >= end_pos && value.seq < start_pos) value.seq++;else if (value.seq === start_pos) value.seq = end_pos;
      }

      newArr.push(value);
    });
    newArr = _lodash.default.sortBy(newArr, ["seq"]);
    arr.data.list = newArr;
    setFormdt(arr);
    setFormArray(arr.data);
    dispatch((0, _actions.globalVariable)({
      currentData: arr
    })); //st>ed -> st prev +1 st->ed
  };

  (0, _react.useEffect)(() => {
    setFormArray(props.formdt.data);
  }, [props.formdt.data.list, open]);
  (0, _react.useEffect)(() => {
    dispatch((0, _actions.globalVariable)({
      formEdit: true
    }));
    dispatch((0, _actions.globalVariable)({
      showall: false
    }));
    MakeTabPanel1();
    setTabarray(tabPanelArray);
    setTimeout(() => {
      (0, _jquery.default)(".MuiTabs-scroller.MuiTabs-scrollable").css({
        width: "400px"
      });
      let $node = (0, _jquery.default)(".SortForm");
      if (formArray && formArray.setting.colnum > 1) $node = (0, _jquery.default)(".SortForm>div:first-child");
      $node.sortable({
        opacity: 0.8,
        placeholder: "ui-state-highlight",
        start: function start(event, ui) {
          var start_pos = ui.item.index();
          ui.item.data("start_pos", start_pos);
        },
        update: function update(event, ui) {
          var start_pos = ui.item.data("start_pos");
          var end_pos = ui.item.index(); //$('#sortable li').removeClass('highlights');

          ReOrder(start_pos, end_pos);
        }
      });
      return () => {
        $node.sortable({
          placeholder: "ui-state-highlight"
        });
      };
    }, 500);
  }, [open]); //이부분은 elementlist로 분가시킬것

  const MakeTabPanel1 = () => {
    const optGrp = [["input", "input.password", "input.textarea", "input.number", "input.color", "input.sketcher"], ["select", "select.multiple", "radio.group", "radio.button" // "checkbox.group",
    ], ["datepicker", "datetimepicker", "monthpicker", "rangepicker", "timepicker"], ["checkbox", "switch"], ["slider", "rate"], ["plaintext", "button", "divider"]];

    const findMaxSeq = () => {
      let maxseq = 0;
      formArray.list.map((k, i) => {
        if (k.seq >= maxseq) return maxseq = k.seq + 1;
        return null;
      });
      return maxseq;
    };

    const handleCreateNew = type => {
      let newseq = findMaxSeq();
      let eldt = {
        label: "",
        name: "",
        type: type,
        seq: newseq
      };
      dispatch((0, _actions.globalVariable)({
        elementData: eldt
      }));
      dispatch((0, _actions.globalVariable)({
        openDialog1: false
      }));
      dispatch((0, _actions.globalVariable)({
        openDialog: true
      }));
    };

    const MakeTabPanel = k => {
      let opt = {};
      if (["select", "select.multiple", "radio.group", "checkbox.group"].indexOf(k.title) > -1) opt = {
        optionArray: [{
          value: "korea",
          text: "Korea"
        }, {
          value: "usa",
          text: "USA"
        }, {
          value: "japan",
          text: "Japan"
        }]
      };
      return /*#__PURE__*/_react.default.createElement(_antd2.Row, {
        gutter: {
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32
        }
      }, /*#__PURE__*/_react.default.createElement(_antd2.Col, {
        span: 6
      }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        noWrap: true
      }, k.title)), /*#__PURE__*/_react.default.createElement(_antd2.Col, {
        span: 14
      }, /*#__PURE__*/_react.default.createElement(_AntFormElement.default, _extends({
        name: k.type,
        type: k.type
      }, opt))), /*#__PURE__*/_react.default.createElement(_antd2.Col, {
        span: 4
      }, /*#__PURE__*/_react.default.createElement(_antd2.Button, {
        type: "primary",
        onClick: () => handleCreateNew(k.type)
      }, "Select")));
    };

    const tabArray = ["input", "select", "datetime", "toggle", "level", "others"];
    optGrp.map((k, i) => {
      return tabPanelArray.push({
        title: tabArray[i],
        content: k.map((j, i) => {
          return /*#__PURE__*/_react.default.createElement(_antd2.Row, null, /*#__PURE__*/_react.default.createElement(_antd2.Col, {
            span: 24
          }, /*#__PURE__*/_react.default.createElement(MakeTabPanel, {
            title: j,
            type: j
          })));
        })
      });
    });
  };

  const makeFormlist = () => {
    makeInline("form.list");
  };

  const makeInline = type => {
    if (!type) type = "nostyle";
    let chklist = localStorage.getItem("chklist");
    if (chklist) chklist = JSON.parse(chklist);else {
      _antd2.message.warning("Please select checkbox");

      return;
    }
    let dList = currentData.data.list;

    const inList = _lodash.default.remove(dList, o => {
      return chklist.indexOf(o.seq) > -1;
    });

    if (!inList) return false;
    let lbl = inList[0].label,
        seq = inList[0].seq,
        leng = inList.length;
    let inArr = {
      label: lbl,
      type: type,
      seq: seq
    };
    let ro = [0],
        rat = 0;
    inList.map((k, i) => {
      let kk = _objectSpread({}, k);

      kk.seq = i;
      kk.label1 = k.label; //delete kk.label;

      kk.width = parseInt(100 / leng) + "%";
      inList.splice(i, 1, kk);
      rat += parseInt(100 / leng);
      ro.push(rat);
      return null;
    });
    inArr = _objectSpread(_objectSpread({}, inArr), {}, {
      array: inList
    });
    inArr = _objectSpread(_objectSpread({}, inArr), {}, {
      ratio: ro
    });
    dList.push(inArr);
    dList = _lodash.default.map(_lodash.default.sortBy(dList, "seq"));
    dList.map((k, i) => {
      k.seq = i;
      return null;
    }); //dispatch(globalVariable({ chklist: null }));

    localStorage.removeItem("chklist");
    dispatch((0, _actions.globalVariable)({
      currentData
    }));
    history.push("./formview?rtn=formedit");
  };

  const actions = [{
    icon: /*#__PURE__*/_react.default.createElement(_AddBox.default, null),
    name: "New",
    handleClick: () => {
      dispatch((0, _actions.globalVariable)({
        openDialog1: true
      }));
    }
  }, {
    icon: /*#__PURE__*/_react.default.createElement(_fa.FaRegHandshake, null),
    name: "Make Inline",
    handleClick: () => {
      makeInline();
    }
  }, {
    icon: /*#__PURE__*/_react.default.createElement(_cg.CgPlayListAdd, null),
    name: "Make Form List",
    handleClick: () => {
      makeFormlist();
    }
  }, {
    icon: showall ? /*#__PURE__*/_react.default.createElement(_icons.EyeOutlined, null) : /*#__PURE__*/_react.default.createElement(_icons.EyeInvisibleOutlined, null),
    name: showall ? "Show All" : "Hide",
    handleClick: () => {
      dispatch((0, _actions.globalVariable)({
        showall: !showall
      }));
    }
  }];
  const actbutton = [/*#__PURE__*/_react.default.createElement(_antd2.Button, {
    onClick: () => {
      dispatch((0, _actions.globalVariable)({
        openPopup: true
      }));
    }
  }, "MultiCreate"), /*#__PURE__*/_react.default.createElement(_antd2.Button, {
    onClick: () => {
      dispatch((0, _actions.globalVariable)({
        openDialog: true
      }));
    }
  }, "Create")];

  const onFinishMultiInsert = val => {
    let curlist = currentData.data.list;
    if (!curlist) curlist = []; //find max seq

    let maxseq = _lodash.default.maxBy(curlist, "seq");

    if (!maxseq) maxseq = 0;else maxseq = maxseq.seq;
    const keyList = Object.keys(val);
    let outlist = [],
        reordered = [];
    keyList.map((k, i) => {
      const fd = val[k];

      if (fd) {
        const fdarr = fd.split(",");
        fdarr.map((a, j) => {
          const lbl = a.charAt(0).toUpperCase() + a.slice(1);
          return outlist.push({
            type: k,
            label: lbl,
            name: a,
            seq: i + j + maxseq
          });
        });
      }

      return null;
    });
    reordered = curlist.concat(outlist);
    reordered.map((k, i) => {
      k.seq = i;
      reordered.splice(i, 1, k);
      return null;
    });
    currentData.data.list = reordered;
    dispatch((0, _actions.globalVariable)({
      currentData: currentData
    }));
    dispatch((0, _actions.globalVariable)({
      openPopup: false
    }));
    dispatch((0, _actions.globalVariable)({
      openDialog1: false
    }));
  };

  const onValuesChangeForm = (changedValues, allValues) => {// setInitParameter({ script: JSON.stringify(allValues, null, 4) });
    // setInitFormArray(allValues);
  }; // const onValuesChangeParamter = (changedValues, allValues) => {
  //   const stxt = allValues.script;
  //   const sobj = JSON.parse(allValues.script);
  //   console.log(stxt);
  //   makeParam(JSON.parse(allValues.script));
  // };


  const onUpdate = val => {
    setFormArray(val);
    props.reload();
  };

  console.log(props, formArray);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_antd2.Tabs, {
    defaultActiveKey: "1"
  }, /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "Form",
    key: "1"
  }, /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, _extends({}, props, {
    formArray: formArray,
    editable: true,
    onValuesChange: onValuesChangeForm
  }))), /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "Script",
    key: "2"
  }, /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formid: "5f7be94d85cd1730c8544018" // onValuesChange={onValuesChangeParamter}

  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.speedDialWrapper
  }, /*#__PURE__*/_react.default.createElement(_SpeedDial.default, {
    className: classes.speedDial,
    actions: actions,
    direction: "left",
    onDoubleClick: actions[0].handleClick
  })), /*#__PURE__*/_react.default.createElement(_DialogFull.default, {
    open: open,
    title: "Element Edit" // maxWidth="lg"
    ,
    fullWidth: false
  }, /*#__PURE__*/_react.default.createElement(_ElementInput.default, {
    onUpdate: onUpdate
  })), /*#__PURE__*/_react.default.createElement(_DialogSelect.default, {
    open: open1,
    dialogAction: actbutton
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_TabAnt.default, {
    tabArray: tabarray,
    mode: "left"
  })), /*#__PURE__*/_react.default.createElement(_Popup.default, {
    helpLink: "/admin/control/form/formedit?type=multiinsert"
  }, /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formid: "5eac0e7868c258495433823f",
    showtitle: true,
    onFinish: onFinishMultiInsert // title="Multiple Insert"
    // desc="Seperate comma multiple input"

  }))));
};

var _default = AntFormBuild;
exports.default = _default;
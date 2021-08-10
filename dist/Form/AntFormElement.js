"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _actions = require("../actions");

var _lodash = _interopRequireDefault(require("lodash"));

require("antd/dist/antd.css");

require("../components/Common/Antd.css");

var _styles = require("@material-ui/core/styles");

var _icons = require("@ant-design/icons");

var _antd2 = require("antd");

var _IconButton = _interopRequireDefault(require("../components/Common/IconButton"));

var _rcSlider = require("rc-slider");

require("rc-slider/assets/index.css");

require("rc-color-picker/assets/index.css");

var _Sketch = _interopRequireDefault(require("../components/Color/Sketch.js"));

var _LodashUtil = require("../components/functions/LodashUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  MonthPicker,
  RangePicker
} = _antd2.DatePicker;
const {
  Option,
  OptGroup
} = _antd2.Select;
const {
  Text
} = _antd2.Typography;
const useStyles = (0, _styles.makeStyles)(() => ({
  root: {
    flexGrow: 1
  },
  icon: {
    marginRight: 2
  }
}));

const AntFormElement = props => {
  const classes = useStyles();
  const history = (0, _reactRouterDom.useHistory)();
  const dispatch = (0, _reactRedux.useDispatch)();
  let edit = (0, _reactRedux.useSelector)(state => state.global.formEdit);
  let open = (0, _reactRedux.useSelector)(state => state.global.openDialog);
  let curdt = (0, _reactRedux.useSelector)(state => state.global.currentData);

  function onChangeChk(event) {
    let chklist = localStorage.getItem("chklist");
    if (!chklist) chklist = [];else chklist = JSON.parse(chklist);
    const chk = event.target.checked;
    const val = parseInt(event.target.value);
    if (chk) chklist.push(val);else _lodash.default.remove(chklist, function (num) {
      return num === val;
    });
    localStorage.setItem("chklist", JSON.stringify(chklist));
  }

  const Inliner = props => {
    return edit && ["nostyle", "button"].indexOf(props.type) === -1 && /*#__PURE__*/_react.default.createElement(_antd2.Checkbox, {
      value: props.seq // checked={checked[props.seq]}
      ,
      onChange: onChangeChk
    });
  };

  const EditDel = props => {
    const reorderlist = list => {
      list.map((k, i) => {
        k.seq = i;
        list.splice(i, 1, k);
        return null;
      });
      return list;
    };

    const deleteHandler = props => {
      let delIndex;

      const delfunc = props => {
        curdt.data.list.map((k, i) => {
          if (k.seq === props.seq) {
            delIndex = i;
            return curdt.data.list.splice(i, 1);
          }

          if (i > delIndex) return curdt.data.list.seq--;
          return null;
        });
        curdt.data.list = reorderlist(curdt.data.list);
        dispatch((0, _actions.globalVariable)({
          currentData: Object.assign({}, curdt)
        }));
      };

      if (props.type === "button" && props.btnArr) {
        if (props.type === "button" && props.btnArr) {
          if (props.btnArr.length === 1) delfunc(props.btnArr[0]);else buttonSelect(props, delfunc);
        }
      } else delfunc(props);
    };

    function buttonSelect(props, callback) {// const onChange = (e) => {
      //   callback(e.target.value);
      // };
    }

    const editHandler = props => {
      const fromEdit = val => {
        dispatch((0, _actions.globalVariable)({
          elementData: val
        }));
        dispatch((0, _actions.globalVariable)({
          openDialog: true
        }));
        dispatch((0, _actions.globalVariable)({
          openDialog2: false
        }));
        open = true;
      };

      if (props.type === "button" && props.btnArr) {
        if (props.btnArr.length === 1) fromEdit(props.btnArr[0]);else buttonSelect(props, fromEdit);
      } else fromEdit(props);
    };

    const splitInline = props => {
      props.array.map((k, i) => {
        k.seq = props.seq + i;
        if (k.label1) k.label = k.label1;
        delete k.width;
        return null;
      });
      let dList = [];
      dList = curdt.data.list;
      dList = _lodash.default.orderBy(dList, ["seq"]);
      dList.splice(props.seq, 1, ...props.array);
      dList.map((k, i) => {
        return k.seq = i;
      });
      curdt.data.list = dList;
      let newObj = {};
      newObj = curdt;
      dispatch((0, _actions.globalVariable)({
        currentData: newObj
      }));
      history.push("./formview?rtn=formedit");
    };

    return edit && /*#__PURE__*/_react.default.createElement("div", {
      className: "dvEditIcon"
    }, /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, {
      className: classes.icon,
      onClick: () => editHandler(props)
    }), ["nostyle", "form.list"].indexOf(props.type) > -1 ? /*#__PURE__*/_react.default.createElement(_antd2.Tooltip, {
      title: "split & make elements seperate "
    }, /*#__PURE__*/_react.default.createElement(_icons.ScissorOutlined, {
      onClick: () => splitInline(props)
    })) : /*#__PURE__*/_react.default.createElement(_antd2.Popconfirm, {
      title: "Are you sure delete?",
      onConfirm: () => deleteHandler(props),
      okText: "Yes",
      cancelText: "No"
    }, /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, {
      className: classes.icon // onClick={() => deleteHandler(props)}

    })));
  };

  const FormItem = props => {
    var _props$formItemLayout, _props$formItemLayout2, _props$formItemLayout3, _props$formItemLayout4;

    let formItemProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, props.name && {
      name: props.name
    }), props.rules && {
      rules: props.rules
    }), props.nostyle && {
      noStyle: true
    }), props.style && {
      style: props.style
    }), props.dependencies && {
      dependencies: props.dependencies
    }), props.onChange && {
      onChange: props.onChange
    }), props.valuePropName && {
      valuePropName: props.valuePropName
    });

    if (props.type !== "divider") {
      formItemProps = _objectSpread(_objectSpread({}, formItemProps), {}, {
        label: props.label
      });
    }

    if (props.type === "checkbox") {
      formItemProps = _objectSpread(_objectSpread({}, formItemProps), {}, {
        valuePropName: "checked"
      });
    }

    if (props.tooltipmsg) {
      const tlabel = /*#__PURE__*/_react.default.createElement(_antd2.Row, {
        gutter: 6
      }, /*#__PURE__*/_react.default.createElement(_antd2.Col, {
        span: 18
      }, props.label), /*#__PURE__*/_react.default.createElement(_antd2.Col, {
        span: 6
      }, /*#__PURE__*/_react.default.createElement(_antd2.Tooltip, {
        title: props.tooltipmsg
      }, /*#__PURE__*/_react.default.createElement(_icons.QuestionCircleOutlined, null))));

      formItemProps = _objectSpread(_objectSpread({}, formItemProps), {}, {
        label: tlabel
      });
    }

    let tailLayout = _objectSpread({}, (props.type === "button" && props.layout === "horizontal") | (["nostyle", "divider"].indexOf(props.type) > -1 && props.offset) && {
      wrapperCol: {
        span: 24 - (props === null || props === void 0 ? void 0 : (_props$formItemLayout = props.formItemLayout) === null || _props$formItemLayout === void 0 ? void 0 : (_props$formItemLayout2 = _props$formItemLayout.labelCol) === null || _props$formItemLayout2 === void 0 ? void 0 : _props$formItemLayout2.span),
        offset: props === null || props === void 0 ? void 0 : (_props$formItemLayout3 = props.formItemLayout) === null || _props$formItemLayout3 === void 0 ? void 0 : (_props$formItemLayout4 = _props$formItemLayout3.labelCol) === null || _props$formItemLayout4 === void 0 ? void 0 : _props$formItemLayout4.span
      }
    });

    let setting = {},
        msgLow = "";
    if (props.msglow) msgLow = props.msglow;
    if (props.placeholder) setting = {
      placeholder: props.placeholder
    };
    if (props.onChange) setting = _objectSpread(_objectSpread({}, setting), {}, {
      onChange: props.onChange
    }); //if (props.name) setting = { ...setting, name: props.name };
    // if (props.addonBefore)
    //   setting = { ...setting, addonBefore: props.addonBefore };

    if (props.disabled) setting = _objectSpread(_objectSpread({}, setting), {}, {
      disabled: true
    });
    if (props.rows) setting = _objectSpread(_objectSpread({}, setting), {}, {
      rows: props.rows
    });
    if (props.minRows) setting = _objectSpread(_objectSpread({}, setting), {}, {
      autoSize: {
        minRows: props.minRows,
        maxRows: props.maxRows
      }
    });
    if (props.getPopupContainer) setting = _objectSpread(_objectSpread({}, setting), {}, {
      getPopupContainer: props.getPopupContainer
    });
    if (props.ref) setting = _objectSpread(_objectSpread({}, setting), {}, {
      ref: props.ref
    });
    if (props.popovertop) setting = _objectSpread(_objectSpread({}, setting), {}, {
      popovertop: -320
    }); ///for form.list input.sketch color

    if (props.id) setting = _objectSpread(_objectSpread({}, setting), {}, {
      id: props.id
    });
    let defaultValue = "";

    if (props.defaultValue) {
      defaultValue = props.devaultValue;
    }

    if (!props.type) return false;

    let item = (() => {
      switch (props.type.toLowerCase()) {
        default:
          return;

        case "plaintext":
          return /*#__PURE__*/_react.default.createElement("span", {
            className: "ant-form-text"
          }, props.name);

        case "span":
          return /*#__PURE__*/_react.default.createElement("span", null, props.msgright);

        case "nostyle":
          const cal = wth => {
            return Math.round(24 * parseFloat(wth) / 100);
          };

          let offst = 0;
          if (props.ratio) offst = Math.round(24 * parseFloat(props.ratio[0]) / 100);
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd2.Row, {
            gutter: 4
          }, props.array.map((k, i) => {
            if (i > 0) offst = 0;
            return /*#__PURE__*/_react.default.createElement(_antd2.Col, {
              offset: offst,
              span: cal(k.width)
            }, /*#__PURE__*/_react.default.createElement(FormItem, _extends({}, k, {
              key: k.name + k.seq
            })));
          })));

        case "form.list":
          let initArr = props === null || props === void 0 ? void 0 : props.initialValues;

          if (initArr) {
            if (Array.isArray(initArr) === false) initArr = Object.values(initArr); //props.label, props.initialValues:{Value:[{value:"abc",color:"green"}]}, or [{},{}]
          }

          let spanlist = [],
              onenumlist = ["checkbox", "input.sketcher"];

          const onenum = _lodash.default.filter(props.array, o => {
            return onenumlist.indexOf(o.type) > -1;
          }).length;

          const longsize = 22 - onenum * 2;
          const spansize = parseInt(longsize / (props.array.length - onenum));
          props.array.map((a, b) => {
            if (onenumlist.indexOf(a.type) > -1) spanlist.push(2);else spanlist.push(spansize);
            return null;
          });
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd2.Form.List, {
            name: props.label
          }, (fields, _ref) => {
            let {
              add,
              remove
            } = _ref;
            return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, fields.map((field, j) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.alllabel === true && props.colhead === true && j === 0 && /*#__PURE__*/_react.default.createElement(_antd2.Row, {
              gutter: 4
            }, props.array.map((k, i) => {
              return /*#__PURE__*/_react.default.createElement(_antd2.Col, {
                key: i,
                span: spanlist[i]
              }, /*#__PURE__*/_react.default.createElement(Text, {
                strong: true,
                ellipsis: true
              }, k.label1));
            })), /*#__PURE__*/_react.default.createElement(_antd2.Row, {
              gutter: 4
            }, props.array.map((k, i) => {
              if (k.type.includes("select")) {
                if (props.dropdownRender && k.dropdownRender) {
                  k = _objectSpread(_objectSpread({}, k), {}, {
                    dropdownRender: props.dropdownRender
                  });
                }
              }

              if (props.alllabel === true && props.colhead !== true && i > 0) k = _objectSpread(_objectSpread({}, k), {}, {
                label: k.label1
              });
              k = _objectSpread(_objectSpread({}, k), {}, {
                popovertop: -320
              });
              return /*#__PURE__*/_react.default.createElement(_antd2.Col, {
                key: i,
                span: spanlist[i]
              }, /*#__PURE__*/_react.default.createElement(FormItem, _extends({}, k, field, {
                name: [field.name, k.name],
                fieldKey: [field.fieldKey, k.name]
              })));
            }), /*#__PURE__*/_react.default.createElement(_antd2.Col, {
              flex: "auto"
            }, /*#__PURE__*/_react.default.createElement("div", {
              style: {
                textAlign: "right"
              }
            }, /*#__PURE__*/_react.default.createElement(_icons.MinusCircleOutlined, {
              onClick: () => {
                remove(field.name);
              }
            })))))), /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd2.Button, {
              type: "dashed",
              onClick: () => {
                add();
              },
              block: true,
              icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null)
            }, "Add field")));
          }));

        case "icon":
          return /*#__PURE__*/_react.default.createElement(_IconButton.default, {
            tooltip: props.tooltip,
            style: {
              zIndex: 100000
            },
            awesome: props.iconname,
            fontSize: "small",
            "aria-controls": "back",
            onClick: props.onClick
          });

        case "input":
          return /*#__PURE__*/_react.default.createElement(_antd2.Input, setting);

        case "input.password":
          return /*#__PURE__*/_react.default.createElement(_antd2.Input.Password, setting);

        case "input.textarea":
          return /*#__PURE__*/_react.default.createElement(_antd2.Input.TextArea, setting);

        case "input.number":
          return props.min ? /*#__PURE__*/_react.default.createElement(_antd2.InputNumber, _extends({
            min: props.min,
            max: props.max
          }, setting)) : /*#__PURE__*/_react.default.createElement(_antd2.InputNumber, setting);

        case "input.color":
          return (
            /*#__PURE__*/
            // <ColorPicker
            //   animation="slide-down"
            //   {...setting}
            //   style={{ width: 120 }}
            // />
            _react.default.createElement("input", _extends({
              type: "color"
            }, setting))
          );

        case "input.sketcher":
          return /*#__PURE__*/_react.default.createElement(_Sketch.default, setting);

        case "datepicker":
          return (
            /*#__PURE__*/
            //<DatePicker format="YYYY-MM-DD" />
            _react.default.createElement(_antd2.DatePicker, null)
          );

        case "datetimepicker":
          return /*#__PURE__*/_react.default.createElement(_antd2.DatePicker, {
            showTime: true,
            format: "YYYY-MM-DD HH:mm:ss",
            style: {
              zIndex: 1000000
            }
          });

        case "monthpicker":
          return /*#__PURE__*/_react.default.createElement(MonthPicker, null);

        case "rangepicker":
          return /*#__PURE__*/_react.default.createElement(RangePicker, null);

        case "rangetimepicker":
          return /*#__PURE__*/_react.default.createElement(RangePicker, {
            showTime: true,
            format: "YYYY-MM-DD HH:mm:ss"
          });

        case "timepicker":
          return /*#__PURE__*/_react.default.createElement(_antd2.TimePicker, null);

        case "switch":
          return /*#__PURE__*/_react.default.createElement(_antd2.Switch, null);

        case "checkbox":
          return /*#__PURE__*/_react.default.createElement(_antd2.Checkbox, null, props.checkboxmsg);

        case "slider":
          let marks = "",
              min = 0,
              max = 100,
              range = false;

          if (typeof props.min != "undefined") {
            min = props.min;
            max = props.max;
          }

          if (props.marks) marks = props.marks;
          if (props.range) range = props.range;
          return /*#__PURE__*/_react.default.createElement(_antd2.Slider, {
            marks: marks,
            min: min,
            max: max,
            range: range
          });

        case "range":
          let prop = {};
          if (props.allowCross) prop = _objectSpread(_objectSpread({}, prop), {}, {
            allowCross: props.allowCross
          });
          if (props.count) prop = _objectSpread(_objectSpread({}, prop), {}, {
            count: props.count
          });
          if (props.marks) prop = _objectSpread(_objectSpread({}, prop), {}, {
            marks: props.marks
          });
          if (props.step) prop = _objectSpread(_objectSpread({}, prop), {}, {
            step: props.step
          });
          if (props.dots) prop = _objectSpread(_objectSpread({}, prop), {}, {
            dots: props.dots
          });
          if (props.dotStyle) prop = _objectSpread(_objectSpread({}, prop), {}, {
            dotStyle: props.dotStyle
          });
          if (props.activeDotStyle) prop = _objectSpread(_objectSpread({}, prop), {}, {
            activeDotStyle: props.activeDotStyle
          });
          if (props.defaultValue) prop = _objectSpread(_objectSpread({}, prop), {}, {
            defaultValue: props.defaultValue
          });
          if (props.onAfterChange) prop = _objectSpread(_objectSpread({}, prop), {}, {
            onAfterChange: val => props.onAfterChange(val)
          });
          if (props.pushable) prop = _objectSpread(_objectSpread({}, prop), {}, {
            pushable: true
          });
          return /*#__PURE__*/_react.default.createElement(_rcSlider.Range, prop);

        case "rate":
          return /*#__PURE__*/_react.default.createElement(_antd2.Rate, null);

        case "select":
          const dropdownRenderFunction = name => {
            if (typeof name === "object") name = name[1];

            const func = _lodash.default.find(props.dropdownRender, o => {
              return o.name = name;
            });

            if (func) func.function();
          };

          if (props.dropdownRender) setting = _objectSpread(_objectSpread({}, setting), {}, {
            dropdownRender: menu => /*#__PURE__*/_react.default.createElement("div", null, menu, /*#__PURE__*/_react.default.createElement(_antd2.Divider, {
              style: {
                margin: "4px 0"
              }
            }), /*#__PURE__*/_react.default.createElement("div", {
              style: {
                display: "flex",
                flexWrap: "nowrap",
                padding: 8
              }
            }, /*#__PURE__*/_react.default.createElement("a", {
              style: {
                flex: "none",
                padding: "8px",
                display: "block",
                cursor: "pointer"
              },
              onClick: () => dropdownRenderFunction(props.name)
            }, /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null), " Add item")))
          });
          let grplist;
          const uiq = (0, _LodashUtil.pickuniq)(props.optionArray, "group");
          if (uiq[0] !== undefined) grplist = uiq;

          const sublist = k => {
            const rtn = _lodash.default.filter(props.optionArray, o => {
              return o.group === k;
            });

            return rtn;
          };

          const single = /*#__PURE__*/_react.default.createElement(_antd2.Select, _extends({
            getPopupContainer: node => node.parentNode
          }, setting, {
            defaultValue: defaultValue
          }), typeof props.optionArray === "object" && props.optionArray.map((k, i) => {
            return /*#__PURE__*/_react.default.createElement(_antd2.Select.Option, {
              key: k.value,
              value: k.value
            }, k.text || k.label);
          }));

          const groupList = /*#__PURE__*/_react.default.createElement(_antd2.Select, _extends({}, setting, {
            defaultValue: defaultValue
          }), grplist && grplist.map((k, i) => {
            return /*#__PURE__*/_react.default.createElement(OptGroup, {
              label: k
            }, sublist(k).map((a, b) => {
              return /*#__PURE__*/_react.default.createElement(Option, {
                key: a.value,
                value: a.value
              }, a.text || a.label);
            }));
          })); //return single;


          return grplist && grplist.length > 0 ? groupList : single;
        // <Select
        //   getPopupContainer={(node) => node.parentNode}
        //   {...setting}
        //   defaultValue={defaultValue}
        // >
        //   {typeof props.optionArray === "object" &&
        //     props.optionArray.map((k, i) => {
        //       return (
        //         <Select.Option value={k.value}>{k.text}</Select.Option>
        //       );
        //     })}
        // </Select>

        case "select.multiple":
          return /*#__PURE__*/_react.default.createElement(_antd2.Select, _extends({
            mode: "multiple"
          }, setting, {
            getPopupContainer: node => node.parentNode
          }), typeof props.optionArray === "object" && props.optionArray.map((k, i) => {
            return /*#__PURE__*/_react.default.createElement(Option, {
              key: k.value,
              value: k.value
            }, k.text || k.label);
          }));

        case "radio.group":
          return /*#__PURE__*/_react.default.createElement(_antd2.Radio.Group, _extends({
            defaultValue: defaultValue
          }, setting), typeof props.optionArray === "object" && props.optionArray.map((k, i) => {
            return /*#__PURE__*/_react.default.createElement(_antd2.Radio, {
              key: k.value,
              value: k.value
            }, k.text || k.label);
          }));

        case "radio.button":
          return /*#__PURE__*/_react.default.createElement(_antd2.Radio.Group, _extends({
            defaultValue: defaultValue
          }, setting), typeof props.optionArray === "object" && props.optionArray.map((k, i) => {
            return /*#__PURE__*/_react.default.createElement(_antd2.Radio.Button, {
              key: k.value,
              value: k.value
            }, k.text || k.label);
          }));

        case "checkbox.group":
          const Chk = props => {
            return typeof props.optionArray === "object" && props.optionArray.map((k, i) => {
              return props.direction === "horizontal" ? /*#__PURE__*/_react.default.createElement(_antd2.Checkbox, {
                key: k.value,
                value: k.value
              }, k.text || k.label) : /*#__PURE__*/_react.default.createElement(_antd2.Col, {
                span: 24
              }, /*#__PURE__*/_react.default.createElement(_antd2.Checkbox, {
                key: k.value,
                value: k.value
              }, k.text || k.label));
            });
          };

          return /*#__PURE__*/_react.default.createElement(_antd2.Checkbox.Group, {
            defaultValue: defaultValue
          }, typeof props.optionArray === "object" && props.direction === "vertical" ? /*#__PURE__*/_react.default.createElement(_antd2.Row, null, /*#__PURE__*/_react.default.createElement(Chk, props)) : /*#__PURE__*/_react.default.createElement(Chk, props));

        case "divider":
          return /*#__PURE__*/_react.default.createElement(_antd2.Divider, _extends({
            orientation: props.orientation
          }, setting), props.label);

        case "button":
          let btnArr = [{
            label: "Submit",
            btnStyle: "secondary",
            action: "submit",
            seq: 0
          }, {
            label: "Cancel",
            btnStyle: "primary",
            action: "button",
            seq: 1
          }];
          if (props.btnArr) btnArr = props.btnArr;else btnArr = props;
          let blk = false,
              align = "left";

          if (props.align === "right") {
            align = "right";
          }

          if (props.block === true) blk = true;

          const item = (k, i) => {
            let btnProps = {
              key: i
            };
            if (k.btnStyle && k.btnStyle !== "primary") btnProps = _objectSpread(_objectSpread({}, btnProps), {}, {
              type: k.btnStyle
            });
            if (k.btnColor) btnProps = _objectSpread(_objectSpread({}, btnProps), {}, {
              type: k.btnColor
            });
            if (k.action && k.action === "submit") btnProps = _objectSpread(_objectSpread({}, btnProps), {}, {
              htmlType: k.action
            });

            if (k.onClick && k.onClick !== "") {
              btnProps = _objectSpread(_objectSpread({}, btnProps), {}, {
                onClick: () => {
                  eval(k.onClick);
                }
              });
            }

            if (k.hide) btnProps = _objectSpread(_objectSpread({}, btnProps), {}, {
              noStyle: true
            });

            if (blk) {
              btnProps = _objectSpread(_objectSpread({}, btnProps), {}, {
                block: true,
                style: {
                  marginBottom: 10
                }
              });
            }

            return btnProps;
          };

          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd2.Row, {
            gutter: 2,
            justify: "space-between"
          }, /*#__PURE__*/_react.default.createElement(_antd2.Col, {
            flex: "auto"
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              textAlign: align
            }
          }, _lodash.default.orderBy(btnArr, ["seq"]).map((k, i) => {
            let setid = {};
            setid = {
              id: "btn".concat(k.name)
            };
            return /*#__PURE__*/_react.default.createElement(_antd2.Button, _extends({}, setid, item(k, i)), k.label);
          })))));
      }
    })();

    const wrapItem = item => {
      return /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, _extends({
        name: props.name
      }, setting, {
        noStyle: true
      }), item);
    };

    if (props.msgright) {
      let flexset = {};
      if (props.type.includes("select")) flexset = {
        flex: "auto"
      };
      item = /*#__PURE__*/_react.default.createElement(_antd2.Row, {
        gutter: 4
      }, /*#__PURE__*/_react.default.createElement(_antd2.Col, flexset, wrapItem(item)), /*#__PURE__*/_react.default.createElement(_antd2.Col, null, props.msgright));
    }

    if (props.msgtop) item = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd2.Row, null, props.msgtop), wrapItem(item));

    if (props.btnright === true) {
      let flexset = {},
          btnset = {};
      if (props.type.includes("select")) flexset = {
        flex: "auto"
      };
      if (props.btnevent) btnset = {
        onClick: () => {
          try {
            eval(props.btnevent);
          } catch (_unused) {}
        }
      };
      item = /*#__PURE__*/_react.default.createElement(_antd2.Row, {
        gutter: 4
      }, /*#__PURE__*/_react.default.createElement(_antd2.Col, flexset, wrapItem(item)), /*#__PURE__*/_react.default.createElement(_antd2.Col, null, props.iconbtn === true ? /*#__PURE__*/_react.default.createElement(_IconButton.default, _extends({
        id: "btn" + props.name,
        tooltip: props.btntooltip,
        btntype: "ant",
        style: {
          zIndex: 100000,
          marginTop: 4
        },
        awesome: props.btntitle,
        fontSize: "small",
        "aria-controls": props.btntitle
      }, btnset)) : /*#__PURE__*/_react.default.createElement(_antd2.Tooltip, {
        title: props.btntooltip
      }, /*#__PURE__*/_react.default.createElement(_antd2.Button, _extends({
        id: "btn" + props.name
      }, btnset), props.btntitle))));
    }

    return /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, _extends({}, formItemProps, tailLayout, {
      key: props.label + props.seq,
      extra: msgLow
    }), item);
  };

  const grid = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd2.Row, {
    gutter: 4
  }, /*#__PURE__*/_react.default.createElement(_antd2.Col, {
    span: 1
  }, /*#__PURE__*/_react.default.createElement(Inliner, props)), /*#__PURE__*/_react.default.createElement(_antd2.Col, {
    span: 22
  }, /*#__PURE__*/_react.default.createElement(FormItem, props)), /*#__PURE__*/_react.default.createElement(_antd2.Col, {
    span: 1
  }, /*#__PURE__*/_react.default.createElement(EditDel, props))));

  let colnum = 24;
  colnum = colnum / props.formColumn; // if (props.formColumn === 1) {
  //   return !props.editable ? <FormItem {...props} /> : grid;
  // } else if (props.formColumn > 1) colnum = colnum / props.formColumn;

  return !props.editable ? /*#__PURE__*/_react.default.createElement(_antd2.Col, {
    span: colnum
  }, /*#__PURE__*/_react.default.createElement(FormItem, props)) : /*#__PURE__*/_react.default.createElement(_antd2.Col, {
    span: colnum
  }, grid);
};

var _default = AntFormElement;
exports.default = _default;
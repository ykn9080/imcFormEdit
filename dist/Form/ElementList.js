"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MakeTabPanel1 = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _antd = require("antd");

var _styles = require("@material-ui/core/styles");

var _AntFormElement = _interopRequireDefault(require("Form/AntFormElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: theme.spacing(40),
      minHeight: theme.spacing(20)
    }
  }
})); //이부분은 elementlist로 분가시킬것

const MakeTabPanel1 = data => {
  let tabPanelArray = [];
  const dispatch = (0, _reactRedux.useDispatch)();
  const optGrp = [["input", "input.password", "input.textarea", "inputnumber", "input.color", "input.sketcher"], ["select", "select.multiple", "radio.group", "checkbox.group"], ["datepicker", "datetimepicker", "monthpicker", "rangepicker", "timepicker"], ["checkbox", "switch"], ["slider", "rate"], ["plaintext", "button"]];

  const findSeq = () => {
    let maxseq = 0;
    data.list.map((k, i) => {
      if (k.seq >= maxseq) return maxseq = k.seq + 1;
    });
    console.log(maxseq);
    return maxseq;
  };

  const handleCreateNew = type => {
    let eldt = {
      label: "",
      name: "",
      type: type,
      seq: findSeq()
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
    return /*#__PURE__*/_react.default.createElement(_antd.Row, {
      gutter: {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 6
    }, /*#__PURE__*/_react.default.createElement(_antd.Typography, {
      noWrap: true
    }, k.title)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 14
    }, /*#__PURE__*/_react.default.createElement(_AntFormElement.default, _extends({
      name: k.type,
      type: k.type
    }, opt))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      onClick: () => handleCreateNew(k.type)
    }, "Select")));
  };

  const tabArray = ["input", "select", "datetime", "toggle", "level", "others"];
  optGrp.map((k, i) => {
    return tabPanelArray.push({
      title: tabArray[i],
      content: k.map((j, i) => {
        return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
          span: 24
        }, /*#__PURE__*/_react.default.createElement(MakeTabPanel, {
          title: j,
          type: j
        })));
      })
    });
  });
  return tabPanelArray;
};

exports.MakeTabPanel1 = MakeTabPanel1;

const ElementList = props => {
  const classes = useStyles();
  return null;
}; // const [elArray, setElArray] = useState([]);
// const [eltype, setEltype] = useState(props.eltype);
// const [selectedValue, setSelectedValue] = useState(0);
// const handleChange = event => {
//   setSelectedValue(event.target.value);
//   console.log(selectedValue, event.target.value);
// };
// const formrow = dt => {
//   return dt;
// };
// useEffect(() => {
//   let qrystr = "";
//   eltype.map((k, i) => {
//     qrystr += k + "&controlType=";
//   });
//   axios
//     .get(
//       `${currentsetting.webserviceprefix}formelement/id?controlType=${qrystr}`
//     )
//     .then(function(response) {
//       // if (response.data.data != "undefined")
//       console.log(response.data);
//       if (response.data.length > 0) setElArray(formrow(response.data));
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }, [eltype]);
// return (
//   <div className={classes.root}>
//     {elArray.map((k, i) => {
//       return (
//         <Paper key={i}>
//           <Grid container spacing={1}>
//             <Grid item xs={2}>
//               <Radio
//                 checked={selectedValue.toString() === i.toString()}
//                 onChange={handleChange}
//                 value={i}
//                 name="radio-button-demo"
//                 inputProps={{ "aria-label": i }}
//               />
//             </Grid>
//             <Grid item xs>
//               <BootFormElement {...k} />
//             </Grid>
//           </Grid>
//         </Paper>
//       );
//     })}
//   </div>
// );


var _default = ElementList;
exports.default = _default;
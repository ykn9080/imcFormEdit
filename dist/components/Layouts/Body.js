"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CenteredGrid = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactRedux = require("react-redux");

var _CardForm = _interopRequireDefault(require("components/Common/CardForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 250,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  iconright: {
    alignItems: "bottom"
  },
  primary: {// margin: theme.spacing(1),
  },
  landingImg: {
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  landingH3: {
    fontSize: "1.8em",
    textAlign: "center",
    marginTop: "1em"
  },
  landingTxt: {
    fontSize: "1.2em",
    textAlign: "center",
    width: "50%",
    margin: "auto",
    marginBottom: "1em"
  }
}));

const CenteredGrid = props => {
  const classes = useStyles();
  let keyval = "BreadCrumb";
  keyval = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  const ctrlist = (0, _reactRedux.useSelector)(state => state.global.controls); // login token

  const token = (0, _reactRedux.useSelector)(state => state.global.token); // const rowdt = useSelector(state => state.rowdt);
  // MultiDispatch({ rowdt: "vvvvvv" });
  //const [rowdt, setRowdt] = useState([2, 1, 3, 4]);

  const [rowdt, setRowdt] = (0, _react.useState)(ctrlist);

  const IconBtn = props => {
    const classes = useStyles();

    const addGridHandler = (row, val) => {
      //e.preventDefault();
      let newState = [...rowdt]; // clone the array

      newState[row] = val;
      setRowdt(newState);
    };

    return /*#__PURE__*/_react.default.createElement(_Grid.default, {
      item: true,
      xs: "auto"
    }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_Fab.default, {
      color: "primary",
      size: "small",
      "aria-label": "add",
      className: classes.iconright
    }, /*#__PURE__*/_react.default.createElement(_Add.default, {
      id: props.dt.row + "n" + (props.dt.val + 1),
      onClick: () => {
        addGridHandler(props.dt.row, props.dt.val + 2);
      }
    }))));
  };

  const GridRow = props => {
    return /*#__PURE__*/_react.default.createElement(_Grid.default, {
      item: true,
      xs: props.xssize
    }, /*#__PURE__*/_react.default.createElement(_CardForm.default, null));
  };

  let newArr = [];

  _lodash.default.each(rowdt, (val, key) => {
    let i;

    for (i = 0; i < val; i++) {
      newArr.push({
        row: key,
        col: i,
        val: val - 1,
        xs: 12 / val
      });
    }
  });

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.primary
  }, token
  /* Login Homepage */
  ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null) :
  /*#__PURE__*/

  /* Landing Page - no login token */
  _react.default.createElement(_react.default.Fragment, null)), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    justify: "center",
    className: classes.root,
    spacing: 2
  }, newArr.map((dt, index) => {
    return dt.col !== dt.val ? /*#__PURE__*/_react.default.createElement(GridRow, {
      dt: dt,
      xssize: dt.xs,
      key: dt.col + "_" + index
    }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(GridRow, {
      dt: dt,
      xssize: dt.xs - 1,
      key: dt.col + "_" + index
    }), /*#__PURE__*/_react.default.createElement(IconBtn, {
      dt: dt
    }));
  })));
};

exports.CenteredGrid = CenteredGrid;
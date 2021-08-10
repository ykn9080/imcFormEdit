"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

var _styles = require("@material-ui/core/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _colors = require("@material-ui/core/colors");

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  card: {
    //maxWidth: "100%"
    maxHeight: 400,
    minHeight: 300
  },
  cardDot: {
    borderStyle: "dashed",
    paddingTop: 50,
    maxHeight: 400,
    minHeight: 300,
    color: "grey"
  },
  icon: {
    margin: "0 auto"
  },
  media: {
    height: 0 //paddingTop: "56.25%" // 16:9

  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: _colors.red[500]
  }
}));

const CardSimple = props => {
  const classes = useStyles();
  const forceUpdate = (0, _useForceUpdate.default)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const history = (0, _reactRouterDom.useHistory)();

  const [expanded, setExpanded] = _react.default.useState(false);

  const [checked, setChecked] = _react.default.useState({});

  const handleChange = event => {
    setChecked(_objectSpread(_objectSpread({}, checked), {}, {
      [event.target.name]: event.target.checked
    }));
    console.log(checked, props);
  };

  const [open, setOpen] = _react.default.useState(false);

  const [open1, setOpen1] = _react.default.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeHandler = () => {
    setExpanded(!expanded);
  };

  const BlankCard = data => {
    return /*#__PURE__*/_react.default.createElement(_Card.default, {
      className: classes.cardDot
    }, /*#__PURE__*/_react.default.createElement(_CardHeader.default, {
      style: {
        textAlign: "center"
      },
      title: "Add New"
    }), /*#__PURE__*/_react.default.createElement(_CardActions.default, null, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      "aria-label": "add",
      className: classes.icon
    }, /*#__PURE__*/_react.default.createElement(_Add.default, {
      style: {
        fontSize: 50
      },
      onClick: () => {
        history.push("/controls", {
          data
        });
      }
    }))));
  }; //if (props.data.ctrid === "") return <BlankCard data={props.data} />;


  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
    className: classes.card
  }, /*#__PURE__*/_react.default.createElement(_CardHeader.default, {
    action: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: checked[props.seq],
      onChange: handleChange,
      name: props.seq,
      inputProps: {
        "aria-label": "secondary checkbox"
      }
    })
  }), /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    component: "p"
  }, "This impressive paella is a perfect party dish and a fun meal to cook together with your guests."))));
};

var _default = CardSimple;
exports.default = _default;
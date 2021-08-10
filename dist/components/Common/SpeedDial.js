"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _SpeedDial = _interopRequireDefault(require("@material-ui/lab/SpeedDial"));

var _SpeedDialIcon = _interopRequireDefault(require("@material-ui/lab/SpeedDialIcon"));

var _SpeedDialAction = _interopRequireDefault(require("@material-ui/lab/SpeedDialAction"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    height: 30,
    transform: "translateZ(0px)",
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const SpeedDialButton = props => {
  const actions = props.actions;
  const classes = useStyles();

  const [open, setOpen] = _react.default.useState(false);

  const [hidden, setHidden] = _react.default.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = name => {
    setOpen(false);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_SpeedDial.default, {
    ariaLabel: "SpeedDial openIcon example",
    className: classes.speedDial,
    hidden: hidden,
    icon: /*#__PURE__*/_react.default.createElement(_SpeedDialIcon.default, {
      openIcon: /*#__PURE__*/_react.default.createElement(_Add.default, null)
    }),
    onClose: handleClose,
    onOpen: handleOpen,
    direction: props.direction,
    onDoubleClick: props.onDoubleClick,
    open: open
  }, actions.map(action => /*#__PURE__*/_react.default.createElement(_SpeedDialAction.default, {
    key: action.name,
    icon: action.icon,
    tooltipTitle: action.name,
    onClick: action.handleClick
  }))));
};

var _default = SpeedDialButton;
exports.default = _default;
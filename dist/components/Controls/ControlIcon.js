"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ControlIcon;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _lodash = _interopRequireDefault(require("lodash"));

var _styles = require("@material-ui/core/styles");

var _SpeedDial = _interopRequireDefault(require("@material-ui/lab/SpeedDial"));

var _SpeedDialIcon = _interopRequireDefault(require("@material-ui/lab/SpeedDialIcon"));

var _SpeedDialAction = _interopRequireDefault(require("@material-ui/lab/SpeedDialAction"));

var _FileCopyOutlined = _interopRequireDefault(require("@material-ui/icons/FileCopyOutlined"));

var _Save = _interopRequireDefault(require("@material-ui/icons/Save"));

var _Print = _interopRequireDefault(require("@material-ui/icons/Print"));

var _Share = _interopRequireDefault(require("@material-ui/icons/Share"));

var _Favorite = _interopRequireDefault(require("@material-ui/icons/Favorite"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _LibraryAdd = _interopRequireDefault(require("@material-ui/icons/LibraryAdd"));

var _actions = require("actions");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));
const actions = [{
  icon: /*#__PURE__*/_react.default.createElement(_LibraryAdd.default, null),
  name: "Add Control"
}, {
  icon: /*#__PURE__*/_react.default.createElement(_Edit.default, null),
  name: "Edit"
}, {
  icon: /*#__PURE__*/_react.default.createElement(_Save.default, null),
  name: "Save"
}, {
  icon: /*#__PURE__*/_react.default.createElement(_Print.default, null),
  name: "Print"
}, {
  icon: /*#__PURE__*/_react.default.createElement(_Share.default, null),
  name: "Share"
}];

function ControlIcon(props) {
  const forceUpdate = (0, _useForceUpdate.default)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const classes = useStyles();

  const [open, setOpen] = _react.default.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = name => {
    console.log(props.ctrList);

    switch (name) {
      case "Add Control":
        props.addNewControl(props.ctrList);
        break;
    }

    setOpen(false);
  };

  return (
    /*#__PURE__*/
    // <div className={classes.root}>
    _react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_SpeedDial.default, {
      ariaLabel: "SpeedDial openIcon example",
      className: classes.speedDial,
      icon: /*#__PURE__*/_react.default.createElement(_SpeedDialIcon.default, {
        openIcon: /*#__PURE__*/_react.default.createElement(_Edit.default, null)
      }),
      onClose: handleClose,
      onOpen: handleOpen,
      open: open
    }, actions.map(action => /*#__PURE__*/_react.default.createElement(_SpeedDialAction.default, {
      key: action.name,
      icon: action.icon,
      tooltipTitle: action.name,
      onClick: () => handleClose(action.name)
    }))))
  );
}
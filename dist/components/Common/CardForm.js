"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactRedux = require("react-redux");

var _styles = require("@material-ui/core/styles");

var _clsx = _interopRequireDefault(require("clsx"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _colors = require("@material-ui/core/colors");

var _ArrowLeft = _interopRequireDefault(require("@material-ui/icons/ArrowLeft"));

var _ArrowRight = _interopRequireDefault(require("@material-ui/icons/ArrowRight"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var _IconButton2 = _interopRequireDefault(require("components/Common/IconButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  card: {
    // display: "block",
    // width: "30vw",
    // transitionDuration: "0.3s",
    // height: "45vw",
    // //maxWidth: "100%"
    // maxHeight: 400,
    // minHeight: 300,
    width: "100%",
    height: "100%"
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

var _default = props => {
  const classes = useStyles();

  const [expanded, setExpanded] = _react.default.useState(false);

  let card = (0, _reactRedux.useSelector)(state => state.global.card);

  let avataricon = /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    "aria-label": "recipe",
    className: classes.avatar
  }, /*#__PURE__*/_react.default.createElement(_IconButton2.default, {
    awesome: "cat",
    fontSize: "small"
  })),
      moreaction = /*#__PURE__*/_react.default.createElement(_MoreVert.default, null),
      title,
      subheader,
      img,
      imgtitle,
      cardcollapse,
      content;

  if (props.avataricon) avataricon = props.avataricon;
  if (props.moreaction) moreaction = props.moreaction;
  if (props.title) title = props.title;
  if (props.subheader) subheader = props.subheader;
  if (props.img) img = props.img;
  if (props.imgtitle) imgtitle = props.imgtitle;
  if (props.cardcollapse) cardcollapse = props.cardcollapse;
  if (props.content) content = props.content;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const resizeControl = (ctrList, _id, direction) => {
    console.log(_id, direction);

    _lodash.default.each(ctrList, function (value, key) {
      if (value._id === _id) {
        console.log(value.size);

        switch (direction) {
          case "left":
            if (value.size > 3) value.size = value.size - 1;
            break;

          case "right":
            if (value.size < 12) value.size = value.size + 1;
            break;

          default:
            return null;
        }

        console.log(value, value.size);
      }
    });

    card.resizeItemHandler(ctrList);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
    className: classes.card,
    variant: "outlined"
  }, /*#__PURE__*/_react.default.createElement(_CardHeader.default, {
    avatar: avataricon // <Avatar aria-label="recipe" className={classes.avatar}>
    //   {avataricon}
    // </Avatar>
    ,
    action: moreaction,
    title: title,
    subheader: subheader
  }), img && /*#__PURE__*/_react.default.createElement(_CardMedia.default, {
    className: classes.media,
    image: img,
    title: imgtitle
  }), /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    component: "p"
  }, content, props.children)), card.action && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CardActions.default, {
    disableSpacing: true
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "edit"
  }, /*#__PURE__*/_react.default.createElement(_Edit.default, {
    onClick: () => card.editItemHandler(card.data)
  })), " ", /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "delete"
  }, /*#__PURE__*/_react.default.createElement(_Delete.default, {
    onClick: () => card.removeItemHandler(card.dtList, card.data._id)
  })), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "delete"
  }, /*#__PURE__*/_react.default.createElement(_ArrowLeft.default, {
    onClick: () => resizeControl(card.dtList, card.data._id, "left")
  })), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "delete"
  }, /*#__PURE__*/_react.default.createElement(_ArrowRight.default, {
    onClick: () => resizeControl(card.dtList, card.data._id, "right")
  })), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    className: (0, _clsx.default)(classes.expand, {
      [classes.expandOpen]: expanded
    }),
    onClick: handleExpandClick,
    "aria-expanded": expanded,
    "aria-label": "show more"
  }, /*#__PURE__*/_react.default.createElement(_ExpandMore.default, null))), /*#__PURE__*/_react.default.createElement(_Collapse.default, {
    in: expanded,
    timeout: "auto",
    unmountOnExit: true
  }, /*#__PURE__*/_react.default.createElement(_CardContent.default, null, cardcollapse)))));
};

exports.default = _default;
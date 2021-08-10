"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RecipeReviewCard;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

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

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9

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

function RecipeReviewCard() {
  const classes = useStyles();

  const [expanded, setExpanded] = _react.default.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeHandler = () => {
    setExpanded(!expanded);
  };

  return /*#__PURE__*/_react.default.createElement(_Card.default, {
    className: classes.card
  }, /*#__PURE__*/_react.default.createElement(_CardHeader.default, {
    avatar: /*#__PURE__*/_react.default.createElement(_Avatar.default, {
      "aria-label": "recipe",
      className: classes.avatar
    }, "R"),
    action: /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      "aria-label": "settings"
    }, /*#__PURE__*/_react.default.createElement(_MoreVert.default, null)),
    title: "Shrimp and Chorizo Paella",
    subheader: "September 14, 2016"
  }), /*#__PURE__*/_react.default.createElement(_CardMedia.default, {
    className: classes.media,
    image: "/static/images/cards/paella.jpg",
    title: "Paella dish"
  }), /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    component: "p"
  }, "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.")), /*#__PURE__*/_react.default.createElement(_CardActions.default, {
    disableSpacing: true
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "edit"
  }, /*#__PURE__*/_react.default.createElement(_Edit.default, null)), " ", /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "delete",
    onClick: removeHandler
  }, /*#__PURE__*/_react.default.createElement(_Delete.default, null)), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
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
  }, /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    paragraph: true
  }, "Method:"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    paragraph: true
  }, "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    paragraph: true
  }, "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\xF3n, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    paragraph: true
  }, "Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don\u2019t open.)"), /*#__PURE__*/_react.default.createElement(_Typography.default, null, "Set aside off of the heat to let rest for 10 minutes, and then serve."))));
}
"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _actions = require("actions");

var _antd = require("antd");

var _lodash = _interopRequireDefault(require("lodash"));

var _icons = require("@ant-design/icons");

var _md = require("react-icons/md");

var _vsc = require("react-icons/vsc");

var _ti = require("react-icons/ti");

var _dataUtil = require("components/functions/dataUtil");

var _gr = require("react-icons/gr");

var _MoreMenu = _interopRequireDefault(require("components/SKD/MoreMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Search
} = _antd.Input;

const AntList = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const location = (0, _reactRouterDom.useLocation)();
  const display = (0, _reactRedux.useSelector)(state => state.global.display);
  const sortAction = (0, _reactRedux.useSelector)(state => state.global.sortAction);
  const searchWord = (0, _reactRedux.useSelector)(state => state.global.searchWord);
  let keyword = "";
  if (searchWord[location.pathname]) keyword = searchWord[location.pathname]; //loading for skeleton

  const loading = props.loading ? props.loading : false;
  const [attr, setAttr] = (0, _react.useState)(null);
  const [searchstr, setSearchstr] = (0, _react.useState)(keyword); //layout,datasource,size,footer,pagination

  (0, _react.useEffect)(() => {
    let listAttr = {
      className: "demo-loadmore-list",
      dataSource: props.listData,
      itemLayout: props.layout ? props.layout : "horizontal"
    };
    if (props.size) listAttr = _objectSpread(_objectSpread({}, listAttr), {}, {
      size: props.size
    });
    if (props.footer) listAttr = _objectSpread(_objectSpread({}, listAttr), {}, {
      footer: props.footer
    });
    paging();
    listAttr = sorting(listAttr);
    setAttr(listAttr);
  }, [props]);
  (0, _react.useEffect)(() => {
    paging();
  }, [display, sortAction]);
  (0, _react.useEffect)(() => {
    sorting();
  }, [sortAction]);

  const paging = () => {
    let size = 20,
        newattr = _objectSpread({}, attr);

    if (display === "list") size = 50;
    if (props.pagination) newattr = _objectSpread(_objectSpread({}, newattr), {}, {
      pagination: props.pagination
    });
    newattr = _objectSpread(_objectSpread({}, newattr), {}, {
      pagination: _objectSpread(_objectSpread({}, newattr.pagination), {}, {
        pageSize: size
      })
    });
    setAttr(newattr);
  };

  const sorting = newAttr => {
    if (!newAttr) newAttr = _objectSpread({}, attr);

    if (sortAction) {
      const sorted = _lodash.default.sortBy(newAttr.dataSource, [function (o) {
        return o.name;
      }]);

      newAttr = _objectSpread(_objectSpread({}, newAttr), {}, {
        dataSource: sorted
      });
    } else {
      newAttr = _objectSpread(_objectSpread({}, newAttr), {}, {
        dataSource: props.listData
      });
    }

    setAttr(newAttr);
    return newAttr;
  };

  const ListItem = _ref => {
    let {
      item
    } = _ref;
    //action icon: edit/delete icon
    let actlist = [];

    if (props.moremenu) {
      actlist.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 1
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: "99%",
          padding: 5
        }
      }, /*#__PURE__*/_react.default.createElement(_MoreMenu.default, {
        menu: [{
          title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
            title: "Edit",
            placement: "left"
          }, /*#__PURE__*/_react.default.createElement(_gr.GrEdit, null)),
          onClick: () => {
            props.moremenu(item, "edit");
          }
        }, {
          title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
            title: "Delete",
            placement: "left"
          }, /*#__PURE__*/_react.default.createElement(_gr.GrTrash, null)),
          onClick: () => {
            props.moremenu(item, "delete");
          }
        }],
        button: true
      }))))));
    }

    if (props.editHandler) actlist.push( /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, {
      onClick: () => props.editHandler(item)
    }));
    if (props.deleteHandler) actlist.push( /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
      placement: "topRight",
      title: "Are you sure to delete ?",
      onConfirm: () => props.deleteHandler(item),
      okText: "Yes",
      cancelText: "No"
    }, /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, null)));

    if (props.selectHandler) {
      actlist = [];
      actlist.push( /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "text",
        icon: /*#__PURE__*/_react.default.createElement(_icons.CheckSquareOutlined, null),
        onClick: () => props.selectHandler(item)
      }));
    }

    let itemAttr = {
      actions: actlist
    }; //extra for image

    if (item.extra) {
      const extra = /*#__PURE__*/_react.default.createElement("img", {
        width: item.extra.width,
        alt: item.extra.alt,
        src: item.extra.src
      });

      itemAttr = _objectSpread(_objectSpread({}, itemAttr), {}, {
        extra: extra
      });
    }

    itemAttr = _objectSpread(_objectSpread({}, itemAttr), {}, {
      onClick: () => {
        item.avatar.icon = /*#__PURE__*/_react.default.createElement(_icons.CheckSquareOutlined, null);
      }
    }); //title,desc,size,avatar

    let metaAttr = {};
    if (item.size) metaAttr = _objectSpread(_objectSpread({}, metaAttr), {}, {
      size: item.size
    });

    if (item.description && display === "icon") {
      let desc = (0, _dataUtil.highlightString)(item.description, searchstr);
      metaAttr = _objectSpread(_objectSpread({}, metaAttr), {}, {
        description: /*#__PURE__*/_react.default.createElement("p", {
          dangerouslySetInnerHTML: {
            __html: desc
          }
        })
      });
    }

    if (item.name) {
      let name = (0, _dataUtil.highlightString)(item.name, searchstr);
      if (item.href) metaAttr = _objectSpread(_objectSpread({}, metaAttr), {}, {
        title: /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
          to: item.href
        }, /*#__PURE__*/_react.default.createElement("p", {
          dangerouslySetInnerHTML: {
            __html: name
          }
        }))
      });else metaAttr = _objectSpread(_objectSpread({}, metaAttr), {}, {
        title: name
      });
    }

    if (item.avatar) {
      const av = item.avatar;
      let av1 = {};
      if (av.size) av1 = _objectSpread(_objectSpread({}, av1), {}, {
        size: av.size
      });
      if (display === "list") av1 = _objectSpread(_objectSpread({}, av1), {}, {
        size: 5
      });
      if (av.shape) av1 = _objectSpread(_objectSpread({}, av1), {}, {
        shape: av.shape
      });
      if (av.style) av1 = _objectSpread(_objectSpread({}, av1), {}, {
        style: av.style
      });
      if (av.icon) av1 = _objectSpread(_objectSpread({}, av1), {}, {
        icon: av.icon
      });
      if (av.src) av1 = _objectSpread(_objectSpread({}, av1), {}, {
        src: av.src
      });
      metaAttr = _objectSpread(_objectSpread({}, metaAttr), {}, {
        avatar: /*#__PURE__*/_react.default.createElement(_antd.Avatar, av1)
      });
    }

    return /*#__PURE__*/_react.default.createElement(_antd.List.Item, itemAttr, /*#__PURE__*/_react.default.createElement(_antd.List.Item.Meta, metaAttr));
  };

  const onChange = e => {
    const {
      value
    } = e.target;

    let newattr = _objectSpread({}, attr);

    if (value !== "") {
      newattr = _objectSpread(_objectSpread({}, newattr), {}, {
        pagination: false
      });
      setAttr(newattr);
    } else {
      newattr = _objectSpread(_objectSpread({}, newattr), {}, {
        pagination: props.pagination
      });
      setAttr(newattr);
    }

    setSearchstr(value);
    dispatch((0, _actions.globalVariable)({
      searchWord: _objectSpread(_objectSpread({}, searchWord), {}, {
        [location.pathname]: value
      })
    }));
  };

  const show = item => {
    return searchstr === "" | (item.name && item.name.toLowerCase().indexOf(searchstr) > -1) | (item.desc && item.desc.toLowerCase().indexOf(searchstr) > -1) | (item._id && item._id.indexOf(searchstr) > -1);
  };

  const toggleLayout = () => {
    if (display === "icon") dispatch((0, _actions.globalVariable)({
      display: "list"
    }));else dispatch((0, _actions.globalVariable)({
      display: "icon"
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingRight: 5
    }
  }, props.search !== false && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Sort list"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    icon: sortAction ? /*#__PURE__*/_react.default.createElement(_ti.TiArrowSortedDown, null) : /*#__PURE__*/_react.default.createElement(_ti.TiArrowUnsorted, null),
    onClick: () => dispatch((0, _actions.globalVariable)({
      sortAction: !sortAction
    }))
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Compact/Normal"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    icon: display === "icon" ? /*#__PURE__*/_react.default.createElement(_vsc.VscListFlat, null) : /*#__PURE__*/_react.default.createElement(_md.MdViewList, null),
    onClick: toggleLayout
  })), /*#__PURE__*/_react.default.createElement(Search, {
    placeholder: "input search text",
    allowClear: true,
    onSearch: value => console.log(value),
    value: searchstr,
    onChange: onChange,
    defaultValue: searchstr,
    style: {
      width: 200
    }
  })), /*#__PURE__*/_react.default.createElement(_antd.Skeleton, {
    loading: loading,
    active: true,
    avatar: true
  }, /*#__PURE__*/_react.default.createElement(_antd.List, _extends({}, attr, {
    renderItem: item => {
      return show(item) ? /*#__PURE__*/_react.default.createElement(ListItem, {
        item: item
      }) : null;
    }
  })))));
};

var _default = AntList;
exports.default = _default;
"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.loop = exports.makeFlatFromTree = exports.makeTreeDt = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.search.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactRedux = require("react-redux");

var _icons = require("@ant-design/icons");

require("react-sortable-tree/style.css");

require("antd/dist/antd.css");

require("./Antd.css");

var _antd2 = require("antd");

var _ContextMenu = _interopRequireDefault(require("./ContextMenu"));

var _fgLoadcss = require("fg-loadcss");

var _dataUtil = require("components/functions/dataUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  TreeNode
} = _antd2.Tree;

const makeTreeDt = (flatData, props) => {
  let treeDt = (0, _dataUtil.getTreeFromFlatData)({
    flatData: flatData.map(node => _objectSpread(_objectSpread({}, node), {}, {
      title: node[props.title]
    })),
    getKey: node => node[props._id],
    // resolve a node's key
    getParentKey: node => node[props.pid],
    // resolve a node's parent's key
    rootKey: props.root // The value of the parent key when there is no parent (i.e., at root level)

  });

  const addKey = (_tns, _preKey) => {
    const preKey = _preKey || "0";
    const tns = _tns || treeDt;
    tns.map((v, i) => {
      const key = "".concat(preKey, "-").concat(i);
      v.key = key;

      if (v.hasOwnProperty("children")) {
        addKey(v.children, key);
      }

      return null;
    });
  };

  addKey();
  return treeDt;
};

exports.makeTreeDt = makeTreeDt;

const makeFlatFromTree = treeData => {
  const flatAgainWithKey = (0, _dataUtil.getFlatDataFromTree)({
    treeData: treeData,
    getNodeKey: _ref => {
      let {
        node
      } = _ref;
      return node.key;
    },
    ignoreCollapsed: false
  });

  const findPkey = (rtn1, pid) => {
    const pobj = _lodash.default.find(rtn1, o => {
      return o._id === pid;
    });

    if (pobj) return pobj.key;
  };

  const rtn1 = _lodash.default.map(flatAgainWithKey, "node"); //add parentkey as pkey


  rtn1.map((k, i) => {
    const pkey = findPkey(rtn1, k.pid);
    k.pkey = pkey;
    rtn1.splice(i, 1, k);
    return null;
  });
  return rtn1;
};
/**
 * Make Tree node with flattened datalist
 * @param {Object} data Tree data list flatted
 * @param {String} searchValue keyword if any
 * @returns {Object}
 */


exports.makeFlatFromTree = makeFlatFromTree;

const loop = (data, searchValue) => {
  if (data) return data.map(item => {
    let index = -1,
        slength,
        setting = {};

    if (searchValue) {
      index = item.title.indexOf(searchValue);
      slength = searchValue.length;
    }

    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + slength);
    const title = index > -1 ? /*#__PURE__*/_react.default.createElement("span", null, beforeStr, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "red"
      },
      className: "site-tree-search-value"
    }, searchValue), afterStr) : item.title;
    if (item.icon) setting = _objectSpread(_objectSpread({}, setting), {}, {
      icon: item.icon
    });
    if (item.disabled) setting = _objectSpread(_objectSpread({}, setting), {}, {
      disabled: item.disabled
    });
    if (item.key) setting = _objectSpread(_objectSpread({}, setting), {}, {
      key: item.key
    });
    if (item._id) setting = _objectSpread(_objectSpread({}, setting), {}, {
      _id: item._id
    });

    if (item.children && item.children.length) {
      return /*#__PURE__*/_react.default.createElement(TreeNode, _extends({
        title: title
      }, setting), loop(item.children));
    }

    return /*#__PURE__*/_react.default.createElement(TreeNode, _extends({
      title: title
    }, setting));
  });
};

exports.loop = loop;

const TreeAnt = props => {
  let treeData = (0, _reactRedux.useSelector)(state => state.global.treeData);
  const [initTree, setInitTree] = (0, _react.useState)(props.treeData);
  const [gData, setgData] = (0, _react.useState)();
  const [flatAgain, setFlatAgain] = (0, _react.useState)();
  const [expandedKeys, setExpandedKeys] = (0, _react.useState)([]);
  const [selectedKeys, setSelectedKeys] = (0, _react.useState)([]);
  const [searchValue, setSearchValue] = (0, _react.useState)("");
  const [autoExpandParent, setAutoExpandParent] = (0, _react.useState)(true);
  const [newkey, setNewkey] = (0, _react.useState)(props.newkey);
  const [selected_id, setSelected_id] = (0, _react.useState)();
  const {
    Search
  } = _antd2.Input;
  (0, _react.useEffect)(() => {
    //if datatype is "flat", convert to treeData type,
    //props.treeProps designate fields of title,_id,pid,root of flat data
    //default is {title,_id,pid,root}
    // if (treeData === "")
    treeData = initTree;

    if (props.treeData !== initTree) {
      treeData = props.treeData;
      setInitTree(props.treeData);
    }

    if (props.treedatatype === "flat") {
      let treeProps = {
        title: "title",
        _id: "_id",
        pid: "pid",
        root: "root"
      };
      if (props.treeProps) treeProps = _objectSpread(_objectSpread({}, treeProps), props.treeProps);
      treeData = makeTreeDt(treeData, _objectSpread({}, treeProps));
    }

    if (props.expandedKeys) setExpandedKeys(props.expandedKeys);
    setgData(treeData); //make treeData flat again for added key value

    let rtn1 = makeFlatFromTree(treeData);
    if (newkey !== props.newkey) newCreateSelect(rtn1);

    if (props.selected_id && props.selected_id !== selected_id) {
      selectedfrom_id(rtn1, props.selected_id);
      setSelected_id(props.selected_id);
    }

    setFlatAgain(rtn1);
  }, [props]);
  (0, _react.useEffect)(() => {
    setNewkey(props.newkey);
  }, [props.newkey]);
  (0, _react.useEffect)(() => {
    const node = (0, _fgLoadcss.loadCSS)("https://use.fontawesome.com/releases/v5.12.0/css/all.css", document.querySelector("#font-awesome-css"));
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const newCreateSelect = flatData => {
    // expanding,selecting new node & delete new mark
    const list = _lodash.default.filter(flatData, o => {
      return o.pid === props.newkey;
    });

    if (list.length > 0) {
      const node1 = list[list.length - 1];

      if (selectedKeys !== node1.key) {
        expandSelect(node1.key);
      }
    }
  };

  const selectedfrom_id = (flatData, _id) => {
    const list = _lodash.default.find(flatData, o => {
      return o._id === _id;
    });

    if (list) expandSelect(list.key);
  };

  const expandSelect = key => {
    let expkeys = [...expandedKeys];
    expkeys.push(key);
    setExpandedKeys(_lodash.default.uniq(expkeys));
    setSelectedKeys([key]);
  };
  /* #region search collection */


  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = e => {
    const {
      value
    } = e.target;
    const expandedKeys = flatAgain.map(item => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }

      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const getParentKey = (key, tree) => {
    let parentKey;

    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];

      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }

    return parentKey;
  };
  /* #region anttree eventhandler collection */


  const onDragEnter = info => {// expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  const onSelect = (selectedKeys, info) => {
    //find id from key
    //setSelected_id(null);
    let key = "";
    if (selectedKeys.length === 1) key = selectedKeys[0];
    setSelectedKeys(selectedKeys);
    const dt = gData;
    const flatData = (0, _dataUtil.getFlatDataFromTree)({
      treeData: dt,
      //getNodeKey: ({ node }) => node._id, // This ensures your "id" properties are exported in the path
      getNodeKey: _ref2 => {
        let {
          node
        } = _ref2;
        return node._id;
      },
      // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones

    });

    const rtn1 = _lodash.default.map(flatData, "node"); //select node from each object


    rtn1.map(v => {
      if (v.key === key) {
        if (props.onSelect) props.onSelect(v);
      }

      return null;
    });
  };

  const onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }

        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    let data = gData; //[...this.state.gData];

    if (data === "") data = []; // Find dragObject

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || []; // where to insert 示例添加到尾部，可以是随意位置

        item.children.push(dragObj);
      });
    } else if ((info.node.props.children || []).length > 0 && // Has children
    info.node.props.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置

        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });

      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setgData(data);
    const rtn1 = makeFlatFromTree(data);
    const pid = findPid(rtn1, dropKey);
    let curobj;
    rtn1.map((k, i) => {
      if (k.key === dragKey) {
        k.pid = pid;
        rtn1.splice(i, 1, k);
        curobj = k;
      }

      return null;
    });

    if (props.onDrop) {
      props.onDrop(curobj);
    }

    setFlatAgain(rtn1); // forceUpdate();
  };

  const addNew = () => {
    if (props.contextCallback) props.contextCallback(0, null);
  };

  const findPid = (flatData, pkey) => {
    const pobj = _lodash.default.find(flatData, o => {
      return o.key === pkey;
    });

    if (pobj) return pobj._id;
  };
  /* #endregion */


  const onRightClick = _ref3 => {
    let {
      event,
      node
    } = _ref3;
    if (props.edit === false) return;

    const flatwithkey = _lodash.default.find(flatAgain, o => {
      return o.key === node.key;
    });

    localStorage.setItem("node", JSON.stringify(flatwithkey));
  }; //sample contextItems


  let contextItems = [{
    label: "Item 1"
  }, {
    label: "Menu item 2"
  }, {
    label: "Apple"
  }, {
    label: "This is orange"
  }, {
    label: "Conetxt menu is fun"
  }, {
    label: "Cool"
  }];
  if (props.contextItems) contextItems = props.contextItems; //when contextMenu clicked,

  const contextCallback = index => {
    const nodewithkey = localStorage.getItem("node"); // console.log(
    //   `you clicked ${index}, ${contextItems[index].label} and node key is ${nodeVal.key}`
    // );

    if (props.contextCallback) props.contextCallback(index, nodewithkey);
    localStorage.removeItem("node");
  };

  let setting = {};

  if (props.edit === true) {
    setting = {
      onRightClick: onRightClick,
      draggable: true,
      onDragEnter: onDragEnter,
      onDrop: onDrop
    };
  }

  if (props.defaultExpandAll) setting = _objectSpread(_objectSpread({}, setting), {}, {
    defaultExpandAll: true
  });
  if (props.defaultSelectedKeys && props.defaultSelectedKeys.length > 0) setting = _objectSpread(_objectSpread({}, setting), {}, {
    defaultSelectedKeys: props.defaultSelectedKeys
  }); //arraytype

  return /*#__PURE__*/_react.default.createElement("div", null, props.search && /*#__PURE__*/_react.default.createElement(_antd2.Row, {
    gutter: 2
  }, /*#__PURE__*/_react.default.createElement(_antd2.Col, {
    flex: "auto"
  }, /*#__PURE__*/_react.default.createElement(Search, {
    style: {
      marginBottom: 8
    },
    placeholder: "Search",
    onChange: onChange
  })), props.edit && /*#__PURE__*/_react.default.createElement(_antd2.Col, {
    span: 1
  }, /*#__PURE__*/_react.default.createElement(_antd2.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null),
    onClick: addNew
  }))), /*#__PURE__*/_react.default.createElement(_antd2.Tree, _extends({
    className: "draggable-tree" //defaultExpandAll
    ,
    defaultExpandedKeys: expandedKeys //defaultSelectedKeys={["0-0-0"]}
    //defaultExpandedKeys={["0-0"]}
    //blockNode //mark whole row
    ,
    showIcon: true,
    switcherIcon: /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null),
    onSelect: onSelect,
    onExpand: onExpand,
    expandedKeys: expandedKeys //selectedKeys={["0-0"]}
    ,
    autoExpandParent: autoExpandParent
  }, setting, {
    height: 800
  }), gData && loop(gData, searchValue)), props.edit === true && /*#__PURE__*/_react.default.createElement(_ContextMenu.default, {
    items: contextItems,
    callback: contextCallback // nodekey={nodekey}

  }));
};

var _default = TreeAnt;
exports.default = _default;
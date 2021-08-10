"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.loop = exports.makeFlatFromTree = exports.makeTreeDt = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _icons = require("@ant-design/icons");

var _antd = require("antd");

require("antd/dist/antd.css");

var _dataUtil = require("components/functions/dataUtil");

var _fgLoadcss = require("fg-loadcss");

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("react-sortable-tree/style.css");

require("./Antd.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  TreeNode
} = _antd.Tree;

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

exports.makeFlatFromTree = makeFlatFromTree;

const loop = (data, selectedKeys, modetype) => {
  return data.map(item => {
    const title = /*#__PURE__*/_react.default.createElement("span", null, item.title);

    let disabled = false;

    if (item.vtype[0] === "dataset" || item.vtype[0] === "nodeset") {
      disabled = true;
    }

    switch (modetype) {
      default:
        return null;

      case "os":
        // one-mode single
        if (item.pid !== item.pid1) {
          disabled = true;
        }

        selectedKeys.forEach(s => {
          if (s === "" || s !== item.key) {
            disabled = true;
          }
        });
        break;

      case "om":
        // one-mode multi
        if (item.pid !== item.pid1) {
          disabled = true;
        }

        break;

      case "ts":
        // two-mode single
        if (item.pid === item.pid1) {
          disabled = true;
        }

        selectedKeys.forEach(s => {
          if (s === "" || s !== item.key) {
            disabled = true;
          }
        });
        break;

      case "tm":
        // two-mode multi
        if (item.pid === item.pid1) {
          disabled = true;
        }

        break;

      case "vs":
        // vector single
        if (item.vtype[0] === "nodeset") {
          disabled = false;
        }

        if (item.vtype[0] === "layer") {
          disabled = true;
        }

        selectedKeys.forEach(s => {
          if (s === "" || s !== item.key) {
            disabled = true;
          }
        });
        break;

      case "sv":
        // M/L nodeset or rawdata select
        if (item.vtype[0] === "nodeset") {
          disabled = false;
        }

        if (item.vtype[0] === "layer") {
          disabled = true;
        }

        if (item.vtype[0] === "rawdataset") {
          disabled = false;
        }

        selectedKeys.forEach(s => {
          if (s === "" || s !== item.key) {
            disabled = true;
          }
        });
        break;

      case "gp":
        // M/L network select
        if (item.pid !== item.pid1) {
          disabled = true;
        }

        selectedKeys.forEach(s => {
          if (s === "" || s !== item.key) {
            disabled = true;
          }
        });
        break;
    }

    if (item.children && item.children.length) {
      return /*#__PURE__*/_react.default.createElement(TreeNode, {
        key: item.key,
        title: title,
        icon: item.icon,
        disabled: disabled
      }, loop(item.children, selectedKeys, modetype));
    }

    return /*#__PURE__*/_react.default.createElement(TreeNode, {
      key: item.key,
      title: title,
      icon: item.icon,
      disabled: disabled
    });
  });
};

exports.loop = loop;

const ModelTreeAnt = props => {
  let treeData = (0, _reactRedux.useSelector)(state => state.global.treeData);
  let tempModel = (0, _reactRedux.useSelector)(state => state.global.tempModel);
  const [initTree, setInitTree] = (0, _react.useState)(props.treeData);
  const [gData, setgData] = (0, _react.useState)();
  const [expandedKeys, setExpandedKeys] = (0, _react.useState)([]);
  const [selectedKeys, setSelectedKeys] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
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
    setgData(treeData);
  }, [props]);
  (0, _react.useEffect)(() => {
    const node = (0, _fgLoadcss.loadCSS)("https://use.fontawesome.com/releases/v5.12.0/css/all.css", document.querySelector("#font-awesome-css"));
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

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

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
  };

  const onCheck = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys);
  };

  const onClickTree = () => {
    let key = selectedKeys;
    setSelectedKeys(key);
    const dt = gData;
    const flatData = (0, _dataUtil.getFlatDataFromTree)({
      treeData: dt,
      getNodeKey: _ref2 => {
        let {
          node
        } = _ref2;
        return node._id;
      },
      ignoreCollapsed: false
    });

    const rtn1 = _lodash.default.map(flatData, "node");

    let filteredKey = rtn1.filter(v => {
      const f_key = v.key;
      return key.some(k => f_key === k);
    });
    if (props.onCheck) props.onCheck(filteredKey);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: onClickTree
  }, "Confirm"), /*#__PURE__*/_react.default.createElement("br", null), " ", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Tree, {
    checkable: true,
    onCheck: onCheck,
    className: "draggable-tree",
    showIcon: true,
    switcherIcon: /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null),
    onExpand: onExpand,
    defaultExpandedKeys: expandedKeys,
    expandedKeys: expandedKeys,
    height: 800
  }, gData && loop(gData, selectedKeys, tempModel.properties.modetype)));
};

var _default = ModelTreeAnt;
exports.default = _default;
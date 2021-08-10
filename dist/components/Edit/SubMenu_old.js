"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubMenu2 = exports.SubMenu = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _styles = require("@material-ui/core/styles");

var _MenuSortable = require("./MenuSortable");

var _ExpansionPanel = _interopRequireDefault(require("@material-ui/core/ExpansionPanel"));

var _ExpansionPanelDetails = _interopRequireDefault(require("@material-ui/core/ExpansionPanelDetails"));

var _ExpansionPanelSummary = _interopRequireDefault(require("@material-ui/core/ExpansionPanelSummary"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _ListSubheader = _interopRequireDefault(require("@material-ui/core/ListSubheader"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _reactSortableTree = _interopRequireDefault(require("react-sortable-tree"));

require("react-sortable-tree/style.css");

var _dataUtil = require("components/functions/dataUtil");

var _reactSmoothDnd = require("react-smooth-dnd");

var _DragHandle = _interopRequireDefault(require("@material-ui/icons/DragHandle"));

require("antd/dist/antd.css");

var _antd2 = require("antd");

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _ExpandLess = _interopRequireDefault(require("@material-ui/icons/ExpandLess"));

var _ArrowDropDown = _interopRequireDefault(require("@material-ui/icons/ArrowDropDown"));

var _ArrowDropUp = _interopRequireDefault(require("@material-ui/icons/ArrowDropUp"));

var _findChildrens = require("../functions/findChildrens");

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _AddBox = _interopRequireDefault(require("@material-ui/icons/AddBox"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));
const initialState = {
  mouseX: null,
  mouseY: null
};

const SubMenu = props => {
  let subMenu = (0, _reactRedux.useSelector)(state => state.global.subMenu);
  let tempMenu = (0, _reactRedux.useSelector)(state => state.global.tempMenu);
  const dispatch = (0, _reactRedux.useDispatch)();
  const classes = useStyles(); // react-sortable-tree execution

  const [treeData, setTreeData] = (0, _react.useState)([{
    title: "Chicken",
    expanded: true,
    children: [{
      title: "Egg"
    }]
  }]); //for panel expansion

  const [panelExpanded, setPanelExpanded] = _react.default.useState("panel2");

  const panelChange = panel => (event, isExpanded) => {
    setPanelExpanded(isExpanded ? panel : false);
  }; //for context


  const [state, setState] = _react.default.useState(initialState);

  const handleContext = (id, event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
    console.log(id);
  };

  const handleClose = () => {
    setState(initialState);
  }; //for sub menu fold/unfold


  const [open, setOpen] = _react.default.useState({});

  const [expanded, setExpanded] = _react.default.useState([]);

  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };

  const handleClick = (id, e) => {
    if (expanded === id) setExpanded([]);else setExpanded(id);
    setOpen(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
      [id]: !open[id]
    }));
  };

  const [selectedIndex, setSelectedIndex] = _react.default.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const addSubMenu = () => {
    console.log("add menu");
  };

  const selectedmenu = id => {
    dispatch((0, _actions.globalVariable)({
      selectedKey: id
    }));
    const ctr = findControl(tempMenu, "1", id);
    console.log("it's from submenu", ctr);
    dispatch((0, _actions.globalVariable)({
      control: ctr
    }));
  };

  const findControl = (tempMenu, comp, id) => {
    const ctr = tempMenu.filter((item, itemIndex) => item.comp === comp && item.id === id);

    if (ctr) {
      return ctr[0].layout.sort(function (a, b) {
        return a.rowseq < b.rowseq ? -1 : 1;
      });
    }
  };

  const NestedList = props => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactSmoothDnd.Draggable, {
      key: props.id
    }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      button: true,
      onClick: e => handleClick(props.id, e),
      onContextMenu: e => handleContext(props.id, e),
      style: {
        cursor: "context-menu"
      }
    }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      primary: props.title,
      style: {
        paddingLeft: props.depth * 15
      },
      className: "drag-handle"
    }), expanded === props.id ? /*#__PURE__*/_react.default.createElement(_ExpandLess.default, null) : /*#__PURE__*/_react.default.createElement(_ExpandMore.default, null))), /*#__PURE__*/_react.default.createElement(_Collapse.default, {
      in: open[props.id],
      timeout: "auto",
      unmountOnExit: true
    }, /*#__PURE__*/_react.default.createElement(_List.default, {
      component: "div",
      disablePadding: true
    }, props.data.map((sub, i) => {
      let subdata = (0, _findChildrens.directChild)(tempMenu, sub.id, "seq");
      return subdata.length > 0 ? /*#__PURE__*/_react.default.createElement(NestedList, {
        id: sub.id,
        title: sub.title,
        data: subdata,
        depth: props.depth + 1
      }) : /*#__PURE__*/_react.default.createElement(_reactSmoothDnd.Draggable, {
        key: sub.id
      }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
        onContextMenu: e => handleContext(sub.id, e),
        button: true,
        selected: selectedIndex === sub.id,
        onClick: event => {
          handleListItemClick(event, sub.id);
          selectedmenu(sub.id);
        },
        className: classes.nested
      }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
        primary: sub.title,
        style: {
          paddingLeft: props.depth * 15
        },
        className: "drag-handle"
      })));
    }))));
  }; // //react-sortable-hoc
  // const DragHandle = SortableHandle(() => (
  //   <ListItemIcon>
  //     <DragHandleIcon />
  //   </ListItemIcon>
  // ));
  // const SortableItem = SortableElement(({ text }) => (
  //   <ListItem ContainerComponent="div">
  //     <ListItemSecondaryAction>
  //       <DragHandle />
  //     </ListItemSecondaryAction>
  //     <ListItemText primary={text} />
  //   </ListItem>
  // ));
  //react-smooth-dnd


  const [items, setItems] = (0, _react.useState)([{
    id: "1",
    text: "Item 1"
  }, {
    id: "2",
    text: "Item 2"
  }, {
    id: "3",
    text: "Item 3"
  }, {
    id: "4",
    text: "Item 4"
  }]);

  const onDrop = _ref => {
    let {
      removedIndex,
      addedIndex
    } = _ref;
    console.log({
      removedIndex,
      addedIndex
    }); // setItems(items => arrayMove(items, removedIndex, addedIndex));
  };

  const contextmenu = /*#__PURE__*/_react.default.createElement(_Menu.default, {
    keepMounted: true,
    open: state.mouseY !== null,
    onClose: handleClose,
    anchorReference: "anchorPosition",
    anchorPosition: state.mouseY !== null && state.mouseX !== null ? {
      top: state.mouseY,
      left: state.mouseX
    } : undefined
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleClose
  }, "Copy"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleClose
  }, "Print"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleClose
  }, "Highlight"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleClose
  }, "Email"));

  const SubList = /*#__PURE__*/_react.default.createElement(_List.default, {
    style: {
      cursor: "context-menu"
    },
    component: "nav",
    "aria-labelledby": "nested-list-subheader",
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_reactSmoothDnd.Container, {
    dragHandleSelector: ".drag-handle",
    lockAxis: "y",
    onDrop: onDrop
  }, subMenu.map((m, index) => {
    let subdata = (0, _findChildrens.directChild)(tempMenu, m.id, "seq");
    return subdata.length > 0 ? /*#__PURE__*/_react.default.createElement(NestedList, {
      data: subdata,
      id: m.id,
      title: m.title,
      depth: 0
    }) : /*#__PURE__*/_react.default.createElement(_reactSmoothDnd.Draggable, {
      key: m.id
    }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      onContextMenu: e => handleContext(m.id, e),
      button: true,
      selected: selectedIndex === m.id,
      onClick: event => {
        handleListItemClick(event, m.id);
        selectedmenu(m.id);
      }
    }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      primary: m.title,
      className: "drag-handle"
    })));
  })), contextmenu);

  console.log(treeData);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ExpansionPanel.default, {
    expanded: panelExpanded === "panel1",
    onChange: panelChange("panel1")
  }, /*#__PURE__*/_react.default.createElement(_ExpansionPanelSummary.default, {
    expandIcon: /*#__PURE__*/_react.default.createElement(_ArrowDropDown.default, null),
    "aria-controls": "panel1bh-content",
    id: "panel1bh-header"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.heading
  }, "Summary")), /*#__PURE__*/_react.default.createElement(_ExpansionPanelDetails.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, null, "space for menu edit"))), /*#__PURE__*/_react.default.createElement(_ExpansionPanel.default, {
    expanded: panelExpanded === "panel2",
    onChange: panelChange("panel2")
  }, /*#__PURE__*/_react.default.createElement(_ExpansionPanelSummary.default, {
    expandIcon: /*#__PURE__*/_react.default.createElement(_ArrowDropDown.default, null),
    "aria-controls": "panel2bh-content",
    id: "panel2bh-header"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.Heading
  }, "Menu")), /*#__PURE__*/_react.default.createElement(_ExpansionPanelDetails.default, null, /*#__PURE__*/_react.default.createElement(_reactSortableTree.default, {
    treeData: treeData,
    onChange: treeData => setTreeData(treeData)
  }))));
};

exports.SubMenu = SubMenu;

const SubMenu2 = () => {
  const forceUpdate = (0, _useForceUpdate.default)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const [key, setKey] = (0, _react.useState)("");
  const data = [{
    title: "0-0",
    key: "0-0",
    children: [{
      title: "0-0-0",
      key: "0-0-0",
      children: [{
        title: "0-0-0-0",
        key: "0-0-0-0"
      }, {
        title: "0-0-0-1",
        key: "0-0-0-1"
      }, {
        title: "0-0-0-2",
        key: "0-0-0-2"
      }]
    }, {
      title: "0-0-1",
      key: "0-0-1",
      children: [{
        title: "0-0-1-0",
        key: "0-0-1-0"
      }, {
        title: "0-0-1-1",
        key: "0-0-1-1"
      }, {
        title: "0-0-1-2",
        key: "0-0-1-2"
      }]
    }, {
      title: "0-0-2",
      key: "0-0-2"
    }]
  }, {
    title: "0-1",
    key: "0-1",
    children: [{
      title: "0-1-0",
      key: "0-1-0",
      children: [{
        title: "0-1-0-0",
        key: "0-1-0-0"
      }, {
        title: "0-1-0-1",
        key: "0-1-0-1"
      }, {
        title: "0-1-0-2",
        key: "0-1-0-2"
      }]
    }, {
      title: "0-1-1",
      key: "0-1-1",
      children: [{
        title: "0-1-1-0",
        key: "0-1-1-0"
      }, {
        title: "0-1-1-1",
        key: "0-1-1-1"
      }, {
        title: "0-1-1-2",
        key: "0-1-1-2"
      }]
    }, {
      title: "0-1-2",
      key: "0-1-2"
    }]
  }, {
    title: "0-2",
    key: "0-2"
  }];
  let dataList = [{
    access: [],
    _id: "5e3bc558069da0e31aa6d891",
    id: "s3",
    comp: "1",
    creator: "ykn",
    desc: "sub3페이지",
    pid: "m2",
    private: false,
    seq: 0,
    title: "Sub3페이지임다다",
    layout: []
  }, {
    access: [],
    _id: "5e3bcb7f069da0e31aa6eb91",
    id: "m1",
    comp: "1",
    creator: "ykn",
    desc: "첫페이지소개",
    layout: [{
      rowseq: 0,
      colseq: 0,
      ctrid: ""
    }],
    pid: "",
    private: false,
    seq: 0,
    title: "FristMenu"
  }, {
    access: [],
    _id: "5e3bcb7f069da0e31aa6eb92",
    id: "m2",
    comp: "1",
    creator: "ykn",
    desc: "second페이지소개",
    pid: "",
    private: false,
    seq: 1,
    title: "SecondMenu",
    layout: []
  }, {
    access: [],
    _id: "5e3bcb7f069da0e31aa6eb93",
    id: "s2",
    comp: "1",
    creator: "ykn",
    desc: "sub2페이지",
    pid: "m1",
    private: false,
    seq: 1,
    title: "Sub2",
    layout: []
  }, {
    access: [],
    _id: "5e3bcb7f069da0e31aa6eb94",
    id: "s2-1",
    comp: "1",
    creator: "ykn",
    desc: "sub2-1페이지",
    pid: "s2",
    private: false,
    seq: 0,
    title: "Sub2-1",
    layout: []
  }, {
    access: [],
    _id: "5e3f6650069da0e31aa96369",
    id: "s1",
    comp: "1",
    creator: "ykn",
    desc: "sub1페이지1111",
    pid: "m1",
    private: false,
    seq: 0,
    title: "Sub1",
    layout: [{
      _id: "5e45f3d7df0eeb50f8ea1078",
      ctrid: "c1",
      rowseq: 0,
      colseq: 0
    }, {
      _id: "5e45f3d7df0eeb50f8ea1077",
      ctrid: "c2",
      rowseq: 1,
      colseq: 0
    }, {
      _id: "5e45f3d7df0eeb50f8ea1076",
      ctrid: "c3",
      rowseq: 1,
      colseq: 1
    }]
  }];
  let tempMenu = (0, _reactRedux.useSelector)(state => state.global.tempMenu);
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  if (selectedKey !== key) setKey(selectedKey);
  const {
    TreeNode
  } = _antd2.Tree;
  const [expandedKeys, setExpendedKeys] = (0, _react.useState)([]);
  let treeDt = (0, _dataUtil.getTreeFromFlatData)({
    flatData: tempMenu.map(node => _objectSpread(_objectSpread({}, node), {}, {
      title: node.title
    })),
    getKey: node => node.id,
    // resolve a node's key
    getParentKey: node => node.pid,
    // resolve a node's parent's key
    rootKey: "" // The value of the parent key when there is no parent (i.e., at root level)

  });
  const subList = (0, _findChildrens.getChildren)(treeDt, selectedKey);
  treeDt = (0, _dataUtil.getTreeFromFlatData)({
    flatData: subList.map(node => _objectSpread(_objectSpread({}, node), {}, {
      title: node.title
    })),
    getKey: node => node.id,
    // resolve a node's key
    getParentKey: node => node.pid,
    // resolve a node's parent's key
    rootKey: selectedKey // The value of the parent key when there is no parent (i.e., at root level)

  });

  const addKey = (_tns, _preKey) => {
    const preKey = _preKey || "0";
    const tns = _tns || treeDt;
    tns.map((v, i) => {
      const key = "".concat(preKey, "-").concat(i);
      console.log(key, v);
      v.key = key;

      if (v.hasOwnProperty("children")) {
        addKey(v.children, key);
      }

      return null;
    });
  };

  addKey();
  localStorage.setItem("subList", JSON.stringify(treeDt));
  const [gData, setgData] = (0, _react.useState)(treeDt);

  const onDragEnter = info => {
    console.log(info); // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  const findControl = (tempMenu, comp, id) => {
    const ctr = tempMenu.filter((item, itemIndex) => item.comp === comp && item.id === id);

    if (ctr) {
      return ctr[0].layout.sort(function (a, b) {
        return a.rowseq < b.rowseq ? -1 : 1;
      });
    }
  };

  const onSelect = (selectedKeys, info) => {
    //find id from key
    let key = "";
    if (selectedKeys.length === 1) key = selectedKeys[0];
    const dt = JSON.parse(localStorage.getItem("subList"));
    const flatData = (0, _dataUtil.getFlatDataFromTree)({
      treeData: dt,
      getNodeKey: _ref2 => {
        let {
          node
        } = _ref2;
        return node.id;
      },
      // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones

    });

    const rtn1 = _lodash.default.map(flatData, "node"); //select node from each object


    rtn1.map(v => {
      console.log(v, key);

      if (v.key === key) {
        const ctr = findControl(tempMenu, "1", v.id);
        dispatch((0, _actions.globalVariable)({
          control: ctr
        }));
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

    const data = gData; //[...this.state.gData];
    // Find dragObject

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

    console.log(data);
    localStorage.setItem("subList", JSON.stringify(data));
    setgData(data);
    setTimeout(function () {
      forceUpdate();
    }, 0); // this.setState({
    //   gData: data,
    // });
  };

  const loop = data => {
    console.log(data, JSON.parse(localStorage.getItem("subList")));
    return data.map(item => {
      if (item.children && item.children.length) {
        return /*#__PURE__*/_react.default.createElement(TreeNode, {
          key: item.key,
          title: item.title
        }, loop(item.children));
      }

      return /*#__PURE__*/_react.default.createElement(TreeNode, {
        key: item.key,
        title: item.title
      });
    });
  };

  return /*#__PURE__*/_react.default.createElement(_antd2.Tree, {
    className: "draggable-tree",
    defaultExpandedKeys: expandedKeys,
    draggable: true,
    blockNode: true,
    onDragEnter: onDragEnter,
    onDrop: onDrop,
    onSelect: onSelect
  }, loop(JSON.parse(localStorage.getItem("subList"))));
};

exports.SubMenu2 = SubMenu2;
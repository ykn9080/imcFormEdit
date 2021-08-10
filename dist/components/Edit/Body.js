"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _actions = require("actions");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

var _styles = require("@material-ui/core/styles");

var _CardList = _interopRequireDefault(require("components/Common/CardList"));

var _bson = require("bson");

var _BodyHead = require("./BodyHead");

var _EditForm = require("./EditForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//_id maker for MongoDB
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
  paper1: {
    padding: theme.spacing(1),
    minHeight: "100vh"
  },
  icon: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  iconright: {
    alignItems: "bottom"
  },
  primary: {
    margin: theme.spacing(1)
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -80,
    float: "right",
    right: 0,
    marginRight: 20
  },
  fabRight: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    float: "right",
    right: 0,
    marginRight: 20
  }
}));

const Body = props => {
  const forceUpdate = (0, _useForceUpdate.default)();
  const history = (0, _reactRouterDom.useHistory)();
  let ctrList;
  const dispatch = (0, _reactRedux.useDispatch)(); // const [editMode, setEditMode] = useState(false);
  // const [expanded, setExpanded] = useState(false);

  ctrList = (0, _reactRedux.useSelector)(state => state.global.control);
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  if (typeof ctrList == "undefined") ctrList = [];
  (0, _react.useEffect)(() => {
    (0, _jquery.default)(".MuiGrid-container").css({
      overflow: "hidden"
    });
  }, [selectedKey]);
  ctrList = _lodash.default.sortBy(ctrList, ["seq"]); // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const createControl = ctrList => {
    let maxseq = _lodash.default.maxBy(ctrList, "seq");

    if (typeof maxseq === "undefined") maxseq = -1;else maxseq = maxseq.seq;

    const _id = new _bson.ObjectID();

    return {
      _id: _id,
      ctrid: "",
      type: "",
      seq: maxseq + 1,
      size: 6
    };
  };

  const newData = createControl(ctrList);

  const addNewControl = ctrList => {//ctrList.push(makeNewControl(ctrList));
  };

  const removeControl = ctrList => {
    // console.log(ctrList, _id);
    // ctrList.map((e, i) => {
    //   console.log(e, _id);
    //   if (e._id === _id) ctrList.splice(i, 1);
    // });
    dispatch((0, _actions.globalVariable)({
      control: ctrList
    }));
    forceUpdate();
  };

  const editControl = data => {
    history.push("/admin/form/formedit", {
      data
    });
  };

  const resizeControl = ctrList => {
    dispatch((0, _actions.globalVariable)({
      control: ctrList
    }));
    forceUpdate();
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_BodyHead.BodyHead, {
    ctrList: ctrList
  }), /*#__PURE__*/_react.default.createElement(_EditForm.EditForm, null), /*#__PURE__*/_react.default.createElement(_CardList.default, {
    cardType: "complex",
    dtList: ctrList,
    removeItemHandler: removeControl,
    resizeItemHandler: resizeControl,
    newData: newData,
    addItemHandler: addNewControl,
    editItemHandler: editControl
  }));
};
/* #region  drag drop sample */
// const applyDrag = (arr, dragResult) => {
//   const { removedIndex, addedIndex, payload } = dragResult;
//   if (removedIndex === null && addedIndex === null) return arr;
//   const result = [...arr];
//   let itemToAdd = payload;
//   if (removedIndex !== null) {
//     itemToAdd = result.splice(removedIndex, 1)[0];
//   }
//   if (addedIndex !== null) {
//     result.splice(addedIndex, 0, itemToAdd);
//   }
//   return result;
// };
// const generateItems = (count, creator) => {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     result.push(creator(i));
//   }
//   return result;
// };
// export const DragHandle = () => {
//   const [items, setItems] = useState(
//     generateItems(50, index => {
//       return {
//         id: index,
//         data: "Draggable" + index
//       };
//     })
//   );
//   return (
//     <div>
//       <div className="simple-page">
//         <Container
//           dragHandleSelector=".column-drag-handle"
//           onDrop={e => setItems(applyDrag(items, e))}
//         >
//           {items.map(p => {
//             return (
//               <Draggable key={p.id}>
//                 <div className="draggable-item">
//                   <Card
//                     title="Default size card"
//                     extra={<a href="#">More</a>}
//                     style={{ width: 300 }}
//                   >
//                     <span
//                       className="column-drag-handle"
//                       style={{ float: "left", padding: "0 10px" }}
//                     >
//                       &#x2630;
//                     </span>
//                     <p>Card content</p>
//                     <p>Card content</p>
//                     <p>Card content</p>
//                   </Card>
//                 </div>
//               </Draggable>
//             );
//           })}
//         </Container>
//       </div>
//     </div>
//   );
// };

/* #endregion */


exports.Body = Body;
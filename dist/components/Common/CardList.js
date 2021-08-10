"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _CardAnt = _interopRequireDefault(require("components/Common/CardAnt"));

var _icons = require("@ant-design/icons");

require("components/Common/Antd.css");

var _FullScreenWrap = _interopRequireWildcard(require("components/SKD/FullScreenWrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    flexGrow: 1
  }
}));

const CardList = props => {
  //   const forceUpdate = useForceUpdate();
  let ctrList = (0, _reactRedux.useSelector)(state => state.global.control);
  let fullscreen = (0, _reactRedux.useSelector)(state => state.global.fullscreen);
  if (props.dtList) ctrList = props.dtList;
  console.log(ctrList);
  if (!ctrList) ctrList = [];
  const classes = useStyles(); //   const history = useHistory();
  //  let dtList = props.dtList;

  const dispatch = (0, _reactRedux.useDispatch)(); //   const makeNewControl = dtList => {
  //     let maxseq = _.maxBy(dtList, "seq");
  //     if (typeof maxseq === "undefined") maxseq = -1;
  //     else maxseq = maxseq.seq;
  //     const _id = new ObjectID();
  //     return {
  //       _id: _id,
  //       ctrid: "",
  //       type: "",
  //       seq: maxseq + 1,
  //       size: 6
  //     };
  //   };

  const ReOrder = (start_pos, end_pos) => {
    const list = _lodash.default.filter(ctrList, o => {
      return o.seq === start_pos | o.seq === end_pos;
    });

    const leftover = _lodash.default.filter(ctrList, o => {
      return o.seq !== start_pos && o.seq !== end_pos;
    });

    if (list.length === 2) {
      const imsi = list[0].seq;
      list[0].seq = list[1].seq;
      list[1].seq = imsi;
    }

    const merged = [].concat(list, leftover);
    dispatch((0, _actions.globalVariable)({
      control: merged
    })); // let arr = formdt;
    // const _id = arr._id;
    // let newArr = [];
    // let list = _.sortBy(arr.data.list, ["seq"]);
    // if (start_pos < end_pos)
    //   _.forEach(list, function (value, key) {
    //     if (value.type !== "button") {
    //       if (value.seq <= end_pos && value.seq > start_pos) value.seq--;
    //       else if (value.seq === start_pos) value.seq = end_pos;
    //     }
    //     newArr.push(value);
    //   });
    // if (start_pos > end_pos)
    //   _.forEach(list, function (value, key) {
    //     if (value.type !== "button") {
    //       if (value.seq >= end_pos && value.seq < start_pos) value.seq++;
    //       else if (value.seq === start_pos) value.seq = end_pos;
    //     }
    //     newArr.push(value);
    //   });
    // arr.data.list = newArr;
    // setFormdt(arr);
    // setFormArray(arr.data);
    // dispatch(globalVariable({ currentData: arr }));
    //st>ed -> st prev +1 st->ed
  };

  (0, _react.useEffect)(() => {
    if (props.reorder) {
      let $node = (0, _jquery.default)("#cardList123"); //let $node = $(".makeStyles-root-499");
      //$(".draggable-item").resizable();

      $node.sortable({
        opacity: 0.8,
        placeholder: "ui-state-highlight",
        start: function start(event, ui) {
          var start_pos = ui.item.index();
          ui.item.data("start_pos", start_pos);
        },
        update: function update(event, ui) {
          var start_pos = ui.item.data("start_pos");
          var end_pos = ui.item.index(); //$('#sortable li').removeClass('highlights');

          ReOrder(start_pos, end_pos);
        }
      });
      (0, _jquery.default)(".draggable-item").resizable();
      return () => {
        $node.sortable({
          placeholder: "ui-state-highlight"
        });
      };
    }
  }, [ReOrder, props.reorder]);

  const removeItemHandler = _id => {
    props.dtList.map((e, i) => {
      if (e._id === _id) return props.dtList.splice(i, 1);
      return null;
    });
    props.removeItemHandler(props.dtList); // dispatch(globalVariable({ control: dtList }));
    // forceUpdate();
  };

  const editItemHandler = dt => {
    props.editItemHandler(dt);
  };

  const actions = index => {
    return [/*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, {
      key: "delete",
      onClick: () => {
        dispatch((0, _actions.globalVariable)({
          fullscreen: {
            index: !fullscreen
          }
        }));
      }
    })];
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: classes.root,
    spacing: 1,
    id: "cardList123"
  }, ctrList.map((dt, index) => {
    return /*#__PURE__*/_react.default.createElement(_Grid.default, {
      item: true,
      xs: dt.size,
      key: dt._id
    }, /*#__PURE__*/_react.default.createElement(_FullScreenWrap.ConditionalWrap, {
      wrap: children => /*#__PURE__*/_react.default.createElement(_FullScreenWrap.default, null, children),
      index: index
    }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: dt.seq
    }, /*#__PURE__*/_react.default.createElement(_CardAnt.default, {
      removeItemHandler: removeItemHandler,
      resizeItemHandler: props.resizeItemHandler,
      editItemHandler: editItemHandler,
      data: dt,
      seq: dt.seq,
      extra1: actions(index) // dtList={props.dtList}
      ,
      index: index,
      key: dt._id
    }, dt.content))));
  })));
};

var _default = CardList;
exports.default = _default;
"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getColors = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.reverse.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _colors = require("@ant-design/colors");

var _antd = require("antd");

var _icons = require("@ant-design/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  Option
} = _antd.Select;
const {
  CheckableTag
} = _antd.Tag;

const MixColors = level => {
  let rtn = [];
  if (!level) level = 5;
  const cls = Object.keys(_colors.presetPalettes);
  cls.map((k, i) => {
    rtn.push(_colors.presetPalettes[k][level]);
    return null;
  });
  return rtn;
}; //type:multipel/single, conditionArray:(multi:[level], single:[color])
//ex:{"multiple",[5,7]} or {"single",["red","blue"]}


const getColors = (type, conditionArray) => {
  if (!type) {
    type = "multiple";
    conditionArray = [5, 7];
  }

  if (!conditionArray | conditionArray.length === 0) {
    switch (type) {
      case "multiple":
        conditionArray = [5, 7];
        break;

      default:
        conditionArray = ["blue", "red"];
        break;
    }
  }

  let rtn = [];

  switch (type) {
    case "multiple":
      conditionArray.map((k, i) => {
        rtn = rtn.concat(MixColors(k));
        return null;
      });
      break;

    default:
      conditionArray.map((k, i) => {
        rtn = rtn.concat((0, _colors.generate)(k));
        return null;
      });
      break;
  }

  return rtn;
};

exports.getColors = getColors;

const ColorAnt = props => {
  const [show, setShow] = (0, _react.useState)();
  const [selcolor, setSelcolor] = (0, _react.useState)([]);
  const [selectedTags, setSelectedTags] = (0, _react.useState)([]); //   console.log(blue); // ['#E6F7FF', '#BAE7FF', '#91D5FF', ''#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
  //   console.log(blue.primary);
  //   let colors = generate("#bfbfbf");
  //   console.log(colors); // ['#E6F7FF', '#BAE7FF', '#91D5FF', ''#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
  //   console.log(presetPalettes);
  //   // Generate dark color palettes by a given color
  //   let colors1 = generate("#1890ff", {
  //     theme: "dark",
  //     backgroundColor: "#141414",
  //   });
  //   console.log(colors1); // ["#111d2c", "#112a45", "#15395b", "#164c7e", "#1765ad", "#177ddc", "#3993dc", "#65b7f3", "#8bcbf3", "#b2dcf3"]
  //   console.log(presetDarkPalettes);

  const selectChange = val => {
    if (val === "single") setShow(false);else setShow(true);
  };

  const sel = /*#__PURE__*/_react.default.createElement(_antd.Select, {
    style: {
      width: 120
    },
    onChange: selectChange
  }, /*#__PURE__*/_react.default.createElement(Option, {
    value: "single"
  }, "Single"), /*#__PURE__*/_react.default.createElement(Option, {
    value: "multiple"
  }, "Multiple"));

  const CheckableTags = props => {
    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag); //console.log('You are interested in: ', nextSelectedTags);

      setSelectedTags(nextSelectedTags); //setSelcolor(nextSelectedTags);
    };

    console.log(props.colors, props);
    return props.colors.map(tag => /*#__PURE__*/_react.default.createElement(CheckableTag, {
      key: tag,
      checked: selectedTags.indexOf(tag) > -1,
      onChange: checked => handleChange(tag, checked)
    }, /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      style: {
        marginTop: 3
      },
      color: tag
    }, tag)));
  };

  const ColorMenu = props => {
    function handleMenuClick(e) {
      console.log("click", e.key, e.item.props.style.backgroundColor);
      if (props.type === "multi") setSelcolor(MixColors(e.key));else setSelcolor((0, _colors.generate)(e.item.props.style.backgroundColor));
    }

    let setting = {};
    if (props.mode) setting = {
      mode: props.mode
    };
    return /*#__PURE__*/_react.default.createElement(_antd.Menu, _extends({
      onClick: handleMenuClick
    }, setting), props.colors.map((k, i) => {
      return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: i,
        style: {
          backgroundColor: k
        }
      }, k);
    }));
  };

  const DropMenu = props => {
    return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
      overlay: /*#__PURE__*/_react.default.createElement(ColorMenu, {
        colors: props.colors,
        type: props.type
      }),
      placement: "bottomCenter",
      onChange: onChange
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, null, props.title, " "));
  };

  const onChange = val => {
    console.log(val);
  };

  const btnSelect = type => {
    console.log(selcolor, selectedTags);
    let newsel = [...selcolor];
    if (type === "reverse") newsel = _lodash.default.reverse(newsel);
    const newcolor = selectedTags.concat(newsel);
    if (props.select) props.select(newcolor);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, null, "Color Type : ", sel, show === true && /*#__PURE__*/_react.default.createElement(DropMenu, {
    colors: (0, _colors.generate)("#bfbfbf"),
    title: "Level",
    type: "multi"
  }), show === false && /*#__PURE__*/_react.default.createElement(DropMenu, {
    colors: MixColors(),
    title: "Color",
    type: "single"
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 10,
      width: 300
    }
  }, /*#__PURE__*/_react.default.createElement(CheckableTags, {
    colors: selcolor
  }), selcolor.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right",
      marginTop: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null),
    onClick: () => btnSelect("reverse")
  }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: btnSelect
  }, "Select"))))));
};

var _default = ColorAnt;
exports.default = _default;
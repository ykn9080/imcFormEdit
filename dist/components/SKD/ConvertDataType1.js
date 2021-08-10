"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ConvertToType = _ref => {
  let {
    fromType,
    selectToType
  } = _ref;
  const [toType, setToType] = (0, _react.useState)();

  const onChangeValue = e => {
    setToType(e.target.value);
    return selectToType(e.target.value);
  };

  const fromNodeOptions = [{
    label: 'Raw Data',
    value: 'raw'
  }, {
    label: 'Network(1-mode Network',
    value: 'network_1'
  }, {
    label: 'Network(2-mode Network',
    value: 'network_2'
  }];
  const fromRawOptions = [{
    label: 'Nodeset',
    value: 'nodeset'
  }, {
    label: 'Network(1-mode Network)',
    value: 'network_1'
  }, {
    label: 'Network(2-mode Network)',
    value: 'network_2'
  }];
  const fromNetworkOptions = [{
    label: 'Raw',
    value: 'raw'
  }];
  const fromImportDataOptions = [{
    label: 'Raw',
    value: 'raw'
  }, {
    label: 'Nodeset',
    value: 'nodeset'
  }, {
    label: 'Network(1-mode Network)',
    value: 'network_1'
  }, {
    label: 'Network(2-mode Network)',
    value: 'network_2'
  }];
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
    options: (() => {
      switch (fromType) {
        case "nodeset":
          return fromNodeOptions;

        case "raw":
          return fromRawOptions;

        case "network":
          return fromNetworkOptions;

        case "fileImportData":
        case "dbImportData":
          return fromImportDataOptions;

        default:
          return null;
      }
    })(),
    onChange: onChangeValue,
    value: toType
  }));
};

const ConvertDataType1 = _ref2 => {
  let {
    treeval,
    importData,
    onModalData,
    deactivateNext
  } = _ref2;
  const [fromType, setFromType] = (0, _react.useState)();
  const [toType, setToType] = (0, _react.useState)();
  const [toName, setToName] = (0, _react.useState)();
  const [toDesc, setToDesc] = (0, _react.useState)();
  const [allData, setAllData] = (0, _react.useState)();
  const [dataItemTitle, setDataItemTitle] = (0, _react.useState)();
  const [dataItemId, setDataItemId] = (0, _react.useState)();
  const [dataSetId, setDataSetId] = (0, _react.useState)();
  const [dataItemType, setDataItemType] = (0, _react.useState)();
  const [dataItemAttr, setDataItemAttr] = (0, _react.useState)();
  const [fromTypeLabel, setFromTypeLabel] = (0, _react.useState)();
  const [addHeader, setAddHeader] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (treeval) {
      setAllData(treeval);
      setDataItemTitle(treeval.title); //data item title

      setDataItemId(treeval._id); // data item current id - 5ef99d0b48fbce0ff854144a

      setDataSetId(treeval.pid); // parent id(dataset) of data item - 5ef99d0b48fbce0ff8541447

      setDataItemType(treeval.vtype); // from type of data item

      setDataItemAttr(treeval.attribute); //data item attribute

      switch (treeval.vtype[0]) {
        case "layer":
          return setFromType("network");

        case "nodeset":
          return setFromType("nodeset");

        case "rawdataset":
          return setFromType("raw");

        default:
          return null;
      }
    }
  }, [treeval]);
  (0, _react.useEffect)(() => {
    if (importData) {
      setFromType(importData.fromType);
      setDataSetId(importData.datasetID);

      if (importData.addHeader) {
        setAddHeader(importData.addHeader);
      }
    }
  }, [importData]);
  (0, _react.useEffect)(() => {
    if (fromType === "network") {
      setFromTypeLabel("Network");
    } else if (fromType === "nodeset") {
      setFromTypeLabel("Nodeset");
    } else if (fromType === "raw") {
      setFromTypeLabel("Raw Data");
    } else if (fromType === "fileImportData") {
      setFromTypeLabel("File Import Data");
    } else if (fromType === "dbImportData") {
      setFromTypeLabel("DB Import Data");
    }
  }, [fromType]);
  (0, _react.useEffect)(() => {
    deactivateNext(!toName || !toType);

    if (fromType === "nodeset" || fromType === "network" || fromType === "raw") {
      let convertData = {
        dataItem_ID: "".concat(dataItemId),
        fromType: fromType,
        toType: toType,
        name: toName,
        desc: toDesc
      };
      inputTreeSelectData(convertData);
    } else if (fromType === "fileImportData") {
      let convertData = {
        datasetID: "".concat(dataSetId),
        fromType: fromType,
        toType: toType,
        name: toName,
        desc: toDesc,
        addHeader: addHeader
      };
      inputImportData(convertData);
    } else if (fromType === "dbImportData") {
      let convertData = {
        datasetID: "".concat(dataSetId),
        fromType: fromType,
        toType: toType,
        name: toName,
        desc: toDesc
      };
      inputImportData(convertData);
    }
  }, [toType, toName, toDesc]);

  const onChangeToName = e => {
    setToName(e.target.value);
  };

  const onChangeToDesc = e => {
    setToDesc(e.target.value);
  };

  const selectToType = toType => {
    setToType(toType);
  };

  const inputTreeSelectData = convertData => {
    return onModalData(convertData);
  };

  const inputImportData = convertData => {
    return onModalData(convertData);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: "30px"
    }
  }, " Convert Data Type from ", /*#__PURE__*/_react.default.createElement("b", {
    style: {
      fontSize: 15,
      color: "blue"
    }
  }, fromTypeLabel), " to "), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(ConvertToType, {
    fromType: fromType,
    selectToType: selectToType
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%"
    }
  }, "Name"), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    width: "300",
    onChange: onChangeToName
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%"
    }
  }, "Description"), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    width: "300",
    onChange: onChangeToDesc
  })));
};

var _default = ConvertDataType1;
exports.default = _default;
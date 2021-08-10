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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Option
} = _antd.Select;

const ConvertDataType2 = _ref => {
  let {
    treeval,
    firstModalData,
    treedt,
    columnName,
    cd,
    importData,
    deactivateNext
  } = _ref;
  //props
  // const [allData, setAllData] = useState(); // treeval
  const [treeData, setTreeData] = (0, _react.useState)(treedt); //const [dataItemTitle, setDataItemTitle] = useState();

  const [dataItemId, setDataItemId] = (0, _react.useState)();
  const [dataSetId, setDataSetId] = (0, _react.useState)();
  const [fromType, setFromType] = (0, _react.useState)(); //const [dataItemAttr, setDataItemAttr] = useState();

  const [toType, setToType] = (0, _react.useState)();
  const [toName, setToName] = (0, _react.useState)();
  const [toDesc, setToDesc] = (0, _react.useState)();
  const [tableSelectedRows, setTableSelectedRows] = (0, _react.useState)();
  const [definitionValue, setDefinitionValue] = (0, _react.useState)();
  const [tableData, setTableData] = (0, _react.useState)();
  const [colInfo, setColInfo] = (0, _react.useState)();
  const [networkProperty, setNetworkProperty] = (0, _react.useState)();
  const [referenceNodeSet, setReferenceNodeSet] = (0, _react.useState)(); // NetworkProperty

  const [direction, setDirection] = (0, _react.useState)(false);
  const [multipleLink, setMultipleLink] = (0, _react.useState)(false);
  const [multipleOpt, setMultipleOpt] = (0, _react.useState)("Sum"); // Reference Nodeset

  const [srcRefNodeSet, setSrcRefNodeset] = (0, _react.useState)(null);
  const [tgtRefNodeSet, setTgtRefNodeset] = (0, _react.useState)(null);
  const [srcAddNewNodes, setSrcAddNewNodes] = (0, _react.useState)(false);
  const [tgtAddNewNodes, setTgtAddNewNodes] = (0, _react.useState)(false);
  const [dataSetName, setDataSetName] = (0, _react.useState)();
  const [chooseSrcNodeset, setChooseSrcNodeset] = (0, _react.useState)();
  const [chooseTgtNodeset, setChooseTgtNodeset] = (0, _react.useState)();
  const [connectNodeSrcParam, setConnectNodeSrcParam] = (0, _react.useState)();
  const [connectNodeTgtParam, setConnectNodeTgtParam] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (treeval) {
      //setAllData(treeval)
      //setDataItemTitle(treeval.title)
      setDataItemId(treeval._id);
      setDataSetId(treeval.pid); //setDataItemAttr(treeval.attribute)
    }

    if (firstModalData) {
      setToType(firstModalData.toType);
      setFromType(firstModalData.fromType);
      setToName(firstModalData.name);
      setToDesc(firstModalData.desc);
      setDataSetId(firstModalData.datasetID);
    }

    if (treeData) {
      let dataList = [];

      if (treeData[0].children) {
        treeData[0].children.map(td => {
          dataList.push(td);
          return null;
        });

        let nodeSetList = _lodash.default.filter(dataList, (o, i) => {
          return o.vtype[0] === "nodeset";
        });

        let nodeSetTitle = nodeSetList.map(v => v.title);
        setDataSetName(nodeSetTitle);
      }
    }
  }, [treeval, firstModalData, treeData]);
  (0, _react.useEffect)(() => {
    if (!tableSelectedRows) {
      deactivateNext(true);
    }

    if (tableSelectedRows) {
      if (tableSelectedRows.length === 0) {
        deactivateNext(true);
      } else {
        deactivateNext(false);
      }

      let colN = [];
      let colD = [];
      let colInfo = {};
      tableSelectedRows.map(v => colN.push(v.columnname));
      tableSelectedRows.map(v => colD.push(v.definition));
      colN.map((v, i) => colInfo[v] = colD[i]);
      setColInfo(colInfo);
    }
  }, [tableSelectedRows, definitionValue]);
  (0, _react.useEffect)(() => {
    if (treeval) {
      let dt = treeval.attribute;
      let colName = [];
      let valType = [];
      dt.map(v => colName.push(v.fieldname));
      dt.map(v => valType.push(v.datatype));
      let referenceNodeSet = {};

      if (toType === "network_1") {
        referenceNodeSet.srcNodeSet = srcRefNodeSet;
        referenceNodeSet.srcAddNew = srcAddNewNodes;
        setReferenceNodeSet(referenceNodeSet);
      } else if (toType === "network_2") {
        referenceNodeSet.srcNodeSet = srcRefNodeSet;
        referenceNodeSet.srcAddNew = srcAddNewNodes;
        referenceNodeSet.tgtNodeSet = tgtRefNodeSet;
        referenceNodeSet.tgtAddNew = tgtAddNewNodes;
        setReferenceNodeSet(referenceNodeSet);
      }

      switch (fromType) {
        case "nodeset":
          switch (toType) {
            case "raw":
              let nodeRawData = colName.map((v, i) => ({
                key: i,
                columnname: v,
                valuetype: valType[i],
                definition: "Attribute"
              }));
              let datakeylist = [];
              nodeRawData.map((v, i) => {
                datakeylist.push(v.key);
              });
              let label = {};
              label.key = datakeylist.length;
              label.columnname = "@LABEL";
              label.valuetype = "TEXT";
              label.definition = "Attribute";
              nodeRawData.push(label);
              return setTableData(nodeRawData);

            default:
              //nodeset > net1 or net2
              let nodeNet1Data = colName.map((v, i) => ({
                key: i,
                columnname: v,
                valuetype: valType[i]
              }));
              let datakeylist2 = [];
              nodeNet1Data.map((v, i) => {
                datakeylist2.push(v.key);
                return null;
              });
              let label2 = {};
              label2.key = datakeylist2.length;
              label2.columnname = "@LABEL";
              label2.valuetype = "TEXT";
              label2.definition = "Attribute";
              nodeNet1Data.push(label2);
              return setTableData(nodeNet1Data);
          }

        case "network":
          // let networkColumn = ["from", "to", "value"];
          let networkType = ["TEXT", "TEXT", "NUMBER"];
          let netData = columnName.map((v, i) => ({
            key: i,
            columnname: v,
            valuetype: networkType[i],
            definition: "Attribute"
          }));
          return setTableData(netData);

        default:
          //raw > node or net1 or net2
          let nodeNet1Data = colName.map((v, i) => ({
            key: i,
            columnname: v,
            valuetype: valType[i]
          }));
          return setTableData(nodeNet1Data);
      }
    } else if (importData) {
      let colName = [];
      let valType = [];
      let propsImportData = importData.dataType;
      propsImportData.map(v => colName.push(v.title));
      propsImportData.map(v => valType.push(v.valType));
      let referenceNodeSet = {};

      if (toType === "network_1") {
        referenceNodeSet.srcNodeSet = srcRefNodeSet;
        referenceNodeSet.srcAddNew = srcAddNewNodes;
        setReferenceNodeSet(referenceNodeSet);
      } else if (toType === "network_2") {
        referenceNodeSet.srcNodeSet = srcRefNodeSet;
        referenceNodeSet.srcAddNew = srcAddNewNodes;
        referenceNodeSet.tgtNodeSet = tgtRefNodeSet;
        referenceNodeSet.tgtAddNew = tgtAddNewNodes;
        setReferenceNodeSet(referenceNodeSet);
      }

      switch (fromType) {
        case "fileImportData":
        case "dbImportData":
          switch (toType) {
            case "raw":
              let toRawData = colName.map((v, i) => ({
                key: i,
                columnname: v,
                valuetype: valType[i],
                definition: "Attribute"
              }));
              return setTableData(toRawData);

            default:
              let toDefaultData = colName.map((v, i) => ({
                key: i,
                columnname: v,
                valuetype: valType[i]
              }));
              return setTableData(toDefaultData);
          }

        default:
          return;
      }
    }
  }, [fromType, toType, srcRefNodeSet, tgtRefNodeSet, srcAddNewNodes, tgtAddNewNodes, connectNodeSrcParam, connectNodeTgtParam]);
  (0, _react.useEffect)(() => {
    if (toType === "network_1" || "network_2") {
      let networkProperty = {};
      networkProperty.direction = direction;
      networkProperty.multipleLink = multipleLink;

      if (multipleLink === true && multipleOpt) {
        networkProperty.multipleOpt = multipleOpt;
      }

      setNetworkProperty(networkProperty);
    }
  }, [direction, multipleLink, multipleOpt]);
  (0, _react.useEffect)(() => {
    if (importData) {
      inputImportConvertData();
    } else {
      inputTreeSelectConvertData();
    }
  }, [colInfo, networkProperty, referenceNodeSet]);
  (0, _react.useEffect)(() => {
    if (treeData && (connectNodeSrcParam || connectNodeTgtParam === "connect")) {
      let dataList = [];

      if (treeData[0].children) {
        treeData[0].children.map(td => {
          dataList.push(td);
          return;
        });

        let nodeSetList = _lodash.default.filter(dataList, o => {
          return o.vtype[0] === "nodeset";
        });

        if (toType === "network_1") {
          if (chooseSrcNodeset && connectNodeSrcParam === "connect") {
            let selectSrcNodeSet = _lodash.default.filter(nodeSetList, o => {
              return o.title === chooseSrcNodeset;
            });

            let selectSrcNodeSetId = selectSrcNodeSet[0]._id;
            setSrcRefNodeset("".concat(selectSrcNodeSetId));
          } else if (connectNodeSrcParam === "create") {
            setSrcRefNodeset(null); // setSrcAddNewNodes(false)
          }
        } else if (toType === "network_2") {
          if (chooseSrcNodeset && connectNodeSrcParam === "connect") {
            let selectSrcNodeSet = _lodash.default.filter(nodeSetList, o => {
              return o.title === chooseSrcNodeset;
            });

            let selectSrcNodeSetId = selectSrcNodeSet[0]._id;
            setSrcRefNodeset("".concat(selectSrcNodeSetId));
          } else if (connectNodeSrcParam === "create") {
            setSrcRefNodeset(null); // setSrcAddNewNodes(false)
          }

          if (chooseTgtNodeset && connectNodeTgtParam === "connect") {
            let selectTgtNodeSet = _lodash.default.filter(nodeSetList, o => {
              return o.title === chooseTgtNodeset;
            });

            let selectTgtNodeSetId = selectTgtNodeSet[0]._id;
            setTgtRefNodeset("".concat(selectTgtNodeSetId));
          } else if (connectNodeTgtParam === "create") {
            setTgtRefNodeset(null); // setTgtAddNewNodes(false)
          }
        }
      }
    }
  }, [chooseSrcNodeset, chooseTgtNodeset, connectNodeSrcParam, connectNodeTgtParam]);

  const inputTreeSelectConvertData = () => {
    let convertData = {
      dataItem_ID: "".concat(dataItemId),
      fromType: fromType,
      toType: toType,
      name: toName,
      desc: toDesc,
      colInfo: colInfo,
      networkProperty: networkProperty,
      referenceNodeSet: referenceNodeSet
    };
    return cd(convertData);
  };

  const inputImportConvertData = () => {
    let importOriginData = importData.dataType.map(v => ({
      title: "".concat(v.title),
      dataIndex: v.dataIndex,
      valType: v.valType
    }));

    if (fromType === "fileImportData") {
      let convertData = {
        datasetID: dataSetId,
        filePath: importData.filePath,
        tableName: importData.tableName,
        addHeader: importData.addHeader,
        columnDataType: importOriginData,
        toType: toType,
        name: toName,
        desc: toDesc,
        colInfo: colInfo,
        networkProperty: networkProperty,
        referenceNodeSet: referenceNodeSet
      };
      return cd(convertData);
    } else if (fromType === "dbImportData") {
      let convertData = {
        datasetID: "".concat(dataSetId),
        dbInfo: importData.dbInfo,
        tableName: importData.tableName,
        columnDataType: importOriginData,
        toType: toType,
        name: toName,
        desc: toDesc,
        colInfo: colInfo,
        networkProperty: networkProperty,
        referenceNodeSet: referenceNodeSet
      };
      return cd(convertData);
    }
  };

  const onSelect = (text, record, index) => {
    switch (record.valuetype) {
      default:
        return;

      case "TEXT":
        switch (text) {
          case "Source Node":
          case "Target Node":
          case "Link Attribute":
          case "Node ID":
          case "Node Attribute":
            record.definition = text;
            return setDefinitionValue(record);

          default:
            return;
        }

      case "NUMBER":
        switch (text) {
          case "Weight":
          case "Link Attribute":
          case "Node Attribute":
            record.definition = text;
            return setDefinitionValue(record);

          default:
            return;
        }

    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setTableSelectedRows(selectedRows);
    }
  };

  function onDirectionChange(checked) {
    setDirection(checked);
  }

  function onMultipleLinkChange(checked) {
    setMultipleLink(checked);
  }

  function onMultipleOption(value) {
    setMultipleOpt(value);
  }

  const onChangesrcRefNodeset = e => {
    setConnectNodeSrcParam(e.target.value);
  };

  const onChangetgtRefNodeset = e => {
    setConnectNodeTgtParam(e.target.value);
  };

  function onSrcAddNewNodes(checked) {
    setSrcAddNewNodes(checked);
  }

  function onTgtAddNewNodes(checked) {
    setTgtAddNewNodes(checked);
  }

  function handleChangeSrc(value) {
    setChooseSrcNodeset(value);
  }

  function handleChangeTgt(value) {
    setChooseTgtNodeset(value);
  }

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };
  const rawNodeColumns = [{
    title: "Column Name",
    dataIndex: "columnname",
    width: 120
  }, {
    title: "Value Type",
    dataIndex: "valuetype",
    width: 100
  }, {
    title: "Definition",
    dataIndex: "definition",
    width: 180,
    render: (text, record, index) => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      style: {
        width: 150
      },
      name: "select",
      onChange: text => {
        onSelect(text, record, index);
      } // defaultValue={record.valuetype === "TEXT" ? "Node ID" : "Node Attribute"}
      ,
      placeholder: "Choose Definition"
    }, record.valuetype === "NUMBER" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Option, {
      value: "Node ID",
      disabled: true
    }, "Node ID"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Node Attribute"
    }, "Node Attribute")) : record.valuetype === "TEXT" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Option, {
      value: "Node ID"
    }, "Node ID"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Node Attribute"
    }, "Node Attribute")) : null))
  }];
  const toRawColumns = [{
    title: "Column Name",
    dataIndex: "columnname",
    width: 120
  }, {
    title: "Value Type",
    dataIndex: "valuetype",
    width: 100
  }, {
    title: "Definition",
    dataIndex: "definition",
    width: 180,
    render: () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      style: {
        width: 150
      },
      name: "select",
      defaultValue: "Attribute",
      disabled: true
    }))
  }];
  const toNetColumns = [{
    title: "Column Name",
    dataIndex: "columnname",
    width: 120
  }, {
    title: "Value Type",
    dataIndex: "valuetype",
    width: 100
  }, {
    title: "Definition",
    dataIndex: "definition",
    width: 180,
    render: (text, record, index) => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      style: {
        width: 150
      },
      name: "select",
      onChange: text => {
        onSelect(text, record, index);
      } // defaultValue={() => record.valuetype === "TEXT" ? "Source Node"
      // : record.valuetype === "TEXT" && text === "Source Node" ? "Target Node"
      // : record.valuetype === "NUMBER" ? "Weight" : null}
      ,
      placeholder: "Choose Definition"
    }, record.valuetype === "TEXT" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Option, {
      value: "Source Node"
    }, "Source Node"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Target Node"
    }, "Target Node"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Weight",
      disabled: true
    }, "Weight"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Link Attribute"
    }, "Link Attribute")) : record.valuetype === "NUMBER" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Option, {
      value: "Source Node",
      disabled: true
    }, "Source Node"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Target Node",
      disabled: true
    }, "Target Node"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Weight"
    }, "Weight"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Link Attribute"
    }, "Link Attribute")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Option, {
      value: "Source Node"
    }, "Source Node"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Target Node",
      disabled: true
    }, "Target Node"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Weight"
    }, "Weight"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "Link Attribute"
    }, "Link Attribute"))))
  }];

  const network_1View = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    rowSelection: _objectSpread({
      type: "checkbox"
    }, rowSelection),
    columns: toNetColumns,
    dataSource: tableData,
    pagination: {
      pageSize: 50
    },
    scroll: {
      y: 240
    }
  }), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("div", null, "Network Property"), /*#__PURE__*/_react.default.createElement("div", null, "Direction(Source \u2192 Target)"), /*#__PURE__*/_react.default.createElement("div", null, "Merge Multiple Link")), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    onChange: onDirectionChange
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    onChange: onMultipleLinkChange
  }), multipleLink === true ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    style: {
      marginLeft: 30,
      width: 100
    },
    name: "mergemultiple",
    onChange: onMultipleOption
  }, /*#__PURE__*/_react.default.createElement(Option, {
    value: "Sum"
  }, "Sum"), /*#__PURE__*/_react.default.createElement(Option, {
    value: "Average"
  }, "Average"), /*#__PURE__*/_react.default.createElement(Option, {
    value: "Max"
  }, "Max"), /*#__PURE__*/_react.default.createElement(Option, {
    value: "Min"
  }, "Min"))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    style: {
      marginLeft: 30,
      width: 100
    },
    name: "mergemultiple",
    defaultValue: "Sum",
    disabled: true
  }))))), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("div", null, "Reference Nodeset"), toType === "network_2" ? /*#__PURE__*/_react.default.createElement("div", null, "Source Nodeset") : null, /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
    onChange: onChangesrcRefNodeset,
    defaultValue: "create"
  }, /*#__PURE__*/_react.default.createElement(_antd.Radio, {
    style: radioStyle,
    value: "create"
  }, "Create new reference Nodeset"), /*#__PURE__*/_react.default.createElement(_antd.Radio, {
    style: radioStyle,
    value: "connect"
  }, "Connect to Existing Nodeset")), connectNodeSrcParam === "connect" ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    placeholder: "Choose Nodeset",
    style: {
      marginLeft: 30,
      width: 150
    },
    onSelect: handleChangeSrc
  }, dataSetName ? dataSetName.map((v, i) => {
    return /*#__PURE__*/_react.default.createElement(Option, {
      value: v,
      key: i
    }, v);
  }) : /*#__PURE__*/_react.default.createElement(Option, {
    disabled: true
  }, "None Nodeset"))) : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    placeholder: "Choose Nodeset",
    disabled: true,
    style: {
      marginLeft: 30,
      width: 150
    }
  }))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), connectNodeSrcParam === "connect" ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0
    }
  }, "Add new nodes", " ", /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    onChange: onSrcAddNewNodes,
    value: srcAddNewNodes
  })) : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0
    }
  }, "Add new nodes", " ", /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    disabled: true,
    onChange: onSrcAddNewNodes,
    value: srcAddNewNodes
  })))));

  const network_2View = /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("div", null, "Target Nodeset"), /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
    onChange: onChangetgtRefNodeset,
    defaultValue: "create"
  }, /*#__PURE__*/_react.default.createElement(_antd.Radio, {
    style: radioStyle,
    value: "create"
  }, "Create new reference Nodeset"), /*#__PURE__*/_react.default.createElement(_antd.Radio, {
    style: radioStyle,
    value: "connect"
  }, "Connect to Existing Nodeset")), connectNodeTgtParam === "connect" ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    placeholder: "Choose Nodeset",
    style: {
      marginLeft: 30,
      width: 150
    },
    onChange: handleChangeTgt
  }, dataSetName.map((v, i) => {
    return /*#__PURE__*/_react.default.createElement(Option, {
      value: v,
      key: i
    }, v);
  })), " ") : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    placeholder: "Choose Nodeset",
    disabled: true,
    style: {
      marginLeft: 30,
      width: 150
    }
  }))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), connectNodeTgtParam === "connect" ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0
    }
  }, "Add new nodes", " ", /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    onChange: onTgtAddNewNodes,
    value: tgtAddNewNodes
  })) : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0
    }
  }, "Add new nodes", " ", /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    disabled: true,
    onChange: onTgtAddNewNodes,
    value: tgtAddNewNodes
  }))));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, "Choose and Define Column"), (() => {
    switch (fromType) {
      case "fileImportData":
      case "dbImportData":
        switch (toType) {
          case "raw":
            return /*#__PURE__*/_react.default.createElement(_antd.Table, {
              rowSelection: _objectSpread({
                type: "checkbox"
              }, rowSelection),
              columns: toRawColumns,
              dataSource: tableData,
              pagination: {
                pageSize: 100
              },
              scroll: {
                y: 240
              }
            });

          case "nodeset":
            return /*#__PURE__*/_react.default.createElement(_antd.Table, {
              rowSelection: _objectSpread({
                type: "checkbox"
              }, rowSelection),
              columns: rawNodeColumns,
              dataSource: tableData,
              pagination: {
                pageSize: 100
              },
              scroll: {
                y: 240
              }
            });

          case "network_1":
            return /*#__PURE__*/_react.default.createElement("div", null, network_1View);

          case "network_2":
            return /*#__PURE__*/_react.default.createElement("div", null, network_1View, " ", network_2View);

          default:
            return null;
        }

      case "raw":
        switch (toType) {
          case "nodeset":
            return /*#__PURE__*/_react.default.createElement(_antd.Table, {
              rowSelection: _objectSpread({
                type: "checkbox"
              }, rowSelection),
              columns: rawNodeColumns,
              dataSource: tableData,
              pagination: {
                pageSize: 100
              },
              scroll: {
                y: 240
              }
            });

          case "network_1":
            return /*#__PURE__*/_react.default.createElement("div", null, network_1View);

          case "network_2":
            return /*#__PURE__*/_react.default.createElement("div", null, network_1View, " ", network_2View);

          default:
            return null;
        }

      case "nodeset":
        switch (toType) {
          case "raw":
            return /*#__PURE__*/_react.default.createElement(_antd.Table, {
              rowSelection: _objectSpread({
                type: "checkbox"
              }, rowSelection),
              columns: toRawColumns,
              dataSource: tableData,
              pagination: {
                pageSize: 50
              },
              scroll: {
                y: 240
              }
            });

          case "network_1":
            return /*#__PURE__*/_react.default.createElement("div", null, network_1View);

          case "network_2":
            return /*#__PURE__*/_react.default.createElement("div", null, network_1View, " ", network_2View);

          default:
            return null;
        }

      case "network":
        return /*#__PURE__*/_react.default.createElement(_antd.Table, {
          rowSelection: _objectSpread({
            type: "checkbox"
          }, rowSelection),
          columns: toRawColumns,
          dataSource: tableData,
          pagination: {
            pageSize: 100
          },
          scroll: {
            y: 240
          }
        });

      default:
        return null;
    }
  })());
};

var _default = ConvertDataType2;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DescRow = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _actions = require("actions");

var _antd = require("antd");

require("antd/dist/antd.css");

var _axios = _interopRequireDefault(require("axios"));

var _MoreMenu = _interopRequireDefault(require("components/SKD/MoreMenu"));

var _SelectDataEdit = _interopRequireDefault(require("Data/SelectDataEdit"));

var _react = _interopRequireWildcard(require("react"));

var _reactCsv = require("react-csv");

var _reactExportExcel = _interopRequireDefault(require("react-export-excel"));

var _gr = require("react-icons/gr");

var _reactRedux = require("react-redux");

var _ConvertDataType = _interopRequireDefault(require("./ConvertDataType1"));

var _ConvertDataType2 = _interopRequireDefault(require("./ConvertDataType2"));

var _index = require("config/index.js");

var _materialUiConfirm = require("material-ui-confirm");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ExcelFile = _reactExportExcel.default.ExcelFile;
const ExcelSheet = _reactExportExcel.default.ExcelFile.ExcelSheet;
const ExcelColumn = _reactExportExcel.default.ExcelFile.ExcelColumn;

const DescRow = _ref => {
  let {
    data,
    title,
    format,
    colspan,
    extra
  } = _ref;
  if (!format) format = -1;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Descriptions, {
    column: {
      xxl: 4,
      xl: 3,
      lg: 3,
      md: 3,
      sm: 2,
      xs: 1
    },
    title: title,
    size: "small",
    extra: extra
  }, Object.keys(data).map((a, b) => {
    let txt = data[a];
    let colspan1 = 1;
    const upperKey = a[0].toUpperCase() + a.slice(1);

    if (colspan && colspan[a]) {
      colspan1 = parseInt(colspan[a]);
    }

    return /*#__PURE__*/_react.default.createElement(_antd.Descriptions.Item, {
      label: upperKey,
      key: a + b,
      span: colspan1
    }, txt);
  })));
};

exports.DescRow = DescRow;

const DataViewDescription = _ref2 => {
  let {
    data,
    title,
    format,
    colspan,
    extra,
    dataTitle,
    columnHead,
    dataItem,
    treeval,
    treedt,
    onEditSummary,
    onDeleteSummary,
    treeUpdate
  } = _ref2;
  const [columnSelected, setColumnSelected] = (0, _react.useState)();
  const [dataSelected, setDataSelected] = (0, _react.useState)();
  const [dataItemTitle, setDataItemTitle] = (0, _react.useState)(dataTitle);
  const [allData, setAllData] = (0, _react.useState)(treeval);
  const [treeData, setTreeData] = (0, _react.useState)(treedt);
  const [firstModalData, setFirstModalData] = (0, _react.useState)();
  const [convertData, setConvertData] = (0, _react.useState)();
  const [confirmLoading, setConfirmLoading] = (0, _react.useState)();
  const [isNextDisabled, setNextDisabled] = (0, _react.useState)(true);
  const csvDownload = (0, _react.useRef)(null);
  const xlsxDownload = (0, _react.useRef)(null);
  const dispatch = (0, _reactRedux.useDispatch)();
  const confirm = (0, _materialUiConfirm.useConfirm)();
  let openConvert = (0, _reactRedux.useSelector)(state => state.global.openConvert);
  let visibleEdit = (0, _reactRedux.useSelector)(state => state.global.visibleEdit);
  let modalStep = (0, _reactRedux.useSelector)(state => state.global.modalStep);
  (0, _react.useEffect)(() => {
    dispatch((0, _actions.globalVariable)({
      modalStep: 0
    }));

    if (columnHead && dataItem && dataTitle && treeval) {
      setColumnSelected(columnHead);
      setDataSelected(dataItem);
      setDataItemTitle(dataTitle);
      setAllData(treeval);
    }
  }, [columnHead, dataItem, treeval]);
  let columnName = [];
  let exportData = [];

  if (columnSelected && dataSelected) {
    columnSelected.map(v => columnName.push(v.title));
    exportData = dataSelected;
  }

  const csvReport = {
    headers: columnName.map(v => ({
      label: "".concat(v),
      key: v
    })),
    data: exportData,
    filename: "".concat(dataItemTitle, ".csv"),
    ref: csvDownload,
    target: "_blank"
  };

  const editHandler = data => {
    dispatch((0, _actions.globalVariable)({
      visibleEdit: true
    }));
    dispatch((0, _actions.globalVariable)({
      selecedLoad: true
    }));
  };

  const editSummary = editData => {
    if (onEditSummary) onEditSummary(editData);
  };

  const deleteHandler = data => {
    let config = {
      method: "post",
      url: "".concat(_index.currentsetting.webserviceprefix, "deletebundle/"),
      data: {
        rootid: data.ID,
        collname: data.Type
      }
    };
    confirm({
      description: "Are you sure you want to delete this item?\n This cannot bet undone."
    }).then(() => {
      (0, _axios.default)(config).then(r => {
        if (r.status === 200) {
          if (onDeleteSummary) onDeleteSummary(data.ID);
        }
      });
    });
  };

  const menu = [{
    title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Edit",
      placement: "left"
    }, /*#__PURE__*/_react.default.createElement(_gr.GrEdit, null), " ", /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "Edit")),
    onClick: () => {
      editHandler(data);
    }
  }, // {
  //     title: (
  //         <Tooltip title="Copy" placement="left">
  //             <GrCopy />
  //         </Tooltip>
  //     ),
  //     onClick: () => {
  //     }
  // },
  {
    title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Convert Data Type",
      placement: "left"
    }, /*#__PURE__*/_react.default.createElement(_gr.GrDocumentConfig, null), " ", /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "Convert Data Type")),
    onClick: () => {
      dispatch((0, _actions.globalVariable)({
        openConvert: true
      }));
      dispatch((0, _actions.globalVariable)({
        modalStep: 1
      }));
    }
  }, {
    title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Export .csv File",
      placement: "left"
    }, /*#__PURE__*/_react.default.createElement(_gr.GrDocumentCsv, null), " ", /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "Export .csv")),
    onClick: () => {
      csvDownload.current.link.click();
    }
  }, {
    title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Export .xlsx File",
      placement: "left"
    }, /*#__PURE__*/_react.default.createElement(_gr.GrDocumentExcel, null), " ", /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "Export .xlsx")),
    onClick: () => {
      xlsxDownload.current.handleDownload();
    }
  }, {
    title: /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      title: "Delete",
      placement: "left"
    }, /*#__PURE__*/_react.default.createElement(_gr.GrTrash, null), " ", /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "Delete")),
    onClick: () => {
      deleteHandler(data);
    }
  }];

  const onModalNextStep = () => {
    dispatch((0, _actions.globalVariable)({
      modalStep: modalStep + 1
    }));
  };

  const onModalPrevStep = () => {
    dispatch((0, _actions.globalVariable)({
      modalStep: modalStep - 1
    }));
  };

  const onModalData = modal1data => {
    setFirstModalData(modal1data);
  };

  const onConvertData = convertdata => {
    setConvertData(convertdata);
  };

  const transportConvertData = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      dispatch((0, _actions.globalVariable)({
        openConvert: false
      }));
    }, 2000);
    let config = {
      method: "post",
      // url: `http://src.netminer.com:9403/convertDataItem`,
      url: "http://192.168.3.58:8011/convertDataItem",
      data: convertData
    };
    (0, _axios.default)(config).then(r => {
      console.log(r);

      if (r.status === 200) {
        if (treeUpdate) treeUpdate(treedt[0]._id);
      }
    });
  };

  const deactivateNext = nextDisabled => {
    setNextDisabled(nextDisabled);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 23
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "99%",
      padding: 5
    }
  }, data && /*#__PURE__*/_react.default.createElement(DescRow, {
    data: data,
    title: title,
    format: format,
    colspan: colspan,
    extra: extra
  }))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "99%",
      padding: 5
    }
  }, data.Title && /*#__PURE__*/_react.default.createElement(_MoreMenu.default, {
    menu: menu,
    button: true
  }), /*#__PURE__*/_react.default.createElement(_reactCsv.CSVLink, csvReport), /*#__PURE__*/_react.default.createElement(ExcelFile, {
    ref: xlsxDownload,
    element: /*#__PURE__*/_react.default.createElement("button", {
      style: {
        display: "none"
      }
    }),
    filename: dataItemTitle
  }, /*#__PURE__*/_react.default.createElement(ExcelSheet, {
    data: exportData,
    name: "".concat(dataItemTitle)
  }, columnName.map((v, i) => {
    return /*#__PURE__*/_react.default.createElement(ExcelColumn, {
      label: columnName[i],
      value: columnName[i],
      key: columnName[i]
    });
  })))))), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: "Convert Data Type",
    visible: openConvert,
    confirmLoading: confirmLoading,
    distroyOnClose: true,
    onCancel: () => {
      dispatch((0, _actions.globalVariable)({
        openConvert: false
      }));
    },
    okText: "Next",
    footer: [modalStep === 2 ? /*#__PURE__*/_react.default.createElement(_antd.Button, {
      onClick: onModalPrevStep
    }, "Prev") : null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "cancel",
      onClick: () => {
        // cleanUpBuilder();
        // onModalClear()
        dispatch((0, _actions.globalVariable)({
          modalStep: 0
        }));
        dispatch((0, _actions.globalVariable)({
          openConvert: false
        })); // dispatch(globalVariable({ modalStep}))
      }
    }, "Cancel"), modalStep === 1 ? /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "next",
      type: "primary",
      onClick: onModalNextStep,
      disabled: isNextDisabled && true
    }, "Next") : /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "save",
      type: "primary",
      onClick: transportConvertData,
      disabled: isNextDisabled && true
    }, "Save as a New")],
    width: 600
  }, (() => {
    switch (modalStep) {
      default:
        return null;

      case 1:
        return /*#__PURE__*/_react.default.createElement(_ConvertDataType.default, {
          treeval: allData,
          onModalData: onModalData,
          deactivateNext: deactivateNext
        });

      case 2:
        return /*#__PURE__*/_react.default.createElement(_ConvertDataType2.default, {
          treeval: allData,
          dataSelected: dataSelected,
          columnName: columnName,
          firstModalData: firstModalData,
          treedt: treeData,
          cd: onConvertData,
          deactivateNext: deactivateNext
        });
    }
  })()), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: "Rename Data Item",
    visible: visibleEdit,
    onCancel: () => {
      dispatch((0, _actions.globalVariable)({
        visibleEdit: false
      }));
    },
    footer: null,
    width: 600
  }, /*#__PURE__*/_react.default.createElement(_SelectDataEdit.default, {
    data: data,
    editSummary: editSummary
  })));
};

var _default = DataViewDescription;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

require("./upload.css");

var _styles = require("@material-ui/core/styles");

var _index = require("config/index.js");

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _List = _interopRequireDefault(require("components/Common/List"));

var _ai = require("react-icons/ai");

var _gr = require("react-icons/gr");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  spincenter: {
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight: 50,
    marginLeft: 20,
    marginRight: 0
  }
}));

const UploadFile = props => {
  let dir = "/data/datasrc/";
  let accept; // "py,txt,xls,xlsx,csv";

  let size = 200;
  if (props.accept) accept = props.accept;
  if (props.dir) dir = props.dir;
  if (props.size) size = props.size;
  const classes = useStyles();
  const fileRef = (0, _react.useRef)();
  const [open, setOpen] = (0, _react.useState)(false);
  const [selectedFile, setSelectedFile] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [listData, setListData] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (props.listData) {
      const rtn = updateListData(props.listData);
      setListData(rtn);
    }
  }, [props.listData]);
  (0, _react.useEffect)(() => {
    let listdt = [];
    if (listData) listdt = listData;
    if (selectedFile) listdt.push(selectedFile);
    const rtn = updateListData(listdt);
    setListData(rtn);
  }, [selectedFile]);

  const updateListData = listdt => {
    let imsiData1 = [];
    listdt.map((k, i) => {
      const filetype = k.name.split(".").pop();
      return imsiData1.push({
        name: k.name,
        description: sizeShortForm(k.size),
        size: k.size,
        filepath: dir + k.name,
        avatar: {
          size: 32,
          style: {
            backgroundColor: k.filepath ? "#4169E1" : "#E0218A"
          },
          shape: "square",
          icon: (() => {
            switch (filetype) {
              case "xls":
              case "xlsx":
                return /*#__PURE__*/_react.default.createElement(_ai.AiOutlineFileExcel, null);

              default:
                return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ai.AiFillFileUnknown, null));

              case "csv":
                return /*#__PURE__*/_react.default.createElement(_gr.GrDocumentCsv, null);

              case "txt":
                return /*#__PURE__*/_react.default.createElement(_gr.GrDocumentTxt, null);

              case "zip":
                return /*#__PURE__*/_react.default.createElement(_ai.AiOutlineFileZip, null);

              case "gif":
                return /*#__PURE__*/_react.default.createElement(_ai.AiOutlineFileGif, null);

              case "jpg":
                return /*#__PURE__*/_react.default.createElement(_ai.AiOutlineFileJpg, null);

              case "png":
                return /*#__PURE__*/_react.default.createElement(_ai.AiOutlineFileImage, null);

              case "nmf":
                return /*#__PURE__*/_react.default.createElement(_ai.AiOutlineFileMarkdown, null);
            }
          })()
        },
        content: k.filepath ? /*#__PURE__*/_react.default.createElement("span", {
          style: {
            color: "#4169E1"
          }
        }, "uploaded") : /*#__PURE__*/_react.default.createElement("span", {
          style: {
            color: "#E0218A"
          }
        }, "waiting for uploading...")
      });
    });
    return imsiData1;
  };

  const sizeShortForm = size => {
    let count = 0;
    if (!size) return false;
    let siz = parseInt(size);

    while (siz !== 0) {
      siz = parseInt(siz / 10);
      ++count;
    }

    if (count <= 3) return size + "byte";else if (count <= 6) return parseInt(size / 1000) + "KB";else if (count <= 9) return parseInt(size / 1000000) + "MB";else return parseInt(size / 1000000000) + "GB";
  };

  function getFileExtension3(filename) {
    return filename.split(".").pop();
  }

  const onChangeFile = event => {
    setSelectedFile(event.target.files[0]);
  };

  const openNotificationWithIcon = (type, message, description, placement) => {
    _antd.notification[type]({
      message: [message],
      description: [description],
      placement
    });
  };

  const onUploadHandler = () => {
    let acceptarr;
    if (accept) acceptarr = accept.split(",");

    if (acceptarr && selectedFile && acceptarr.indexOf("." + getFileExtension3(selectedFile.name)) === -1) {
      openNotificationWithIcon("error", "Error", "File extension should be py, Try again", "bottomRight");
      fileRef.current = "";
      return false;
    }

    const data = new FormData();
    data.append("dir", dir);
    data.append("file", selectedFile);
    data.append("size", size);
    let axiosConfig = {
      headers: {
        keepfilename: true
      }
    };
    setOpen(true);
    const uploading = new Promise((resolve, reject) => {
      let url = "".concat(_index.currentsetting.webserviceprefix, "uploadfile");
      if (props.type === "importNMF") url = "http://src.netminer.com:9403/importNMF";else if (props.type === "importFile") url = "http://192.168.3.58:8011/importFile/readFile";

      _axios.default.post(url, data, axiosConfig).then(res => {
        _antd.message.success("File successfully uploaded.");

        if (res.data.length === 0) reject("no data");
        resolve(res);
        setOpen(false);
        console.log("result::: ", res);
      });
    });
    Promise.all([uploading]).then(result => {
      let farr = result[0];
      farr.size = size; //filepath include

      let listData1 = [...listData];
      listData1.map((k, i) => {
        if (k.name === farr.originalname) {
          k.filepath = farr.filepath;
          k.splice(i, 1, k);
        }

        return null;
      });
      const rtn = updateListData(listData1);
      setListData(rtn);

      if (props.uploadedData) {
        props.uploadedData(farr);
        setListData(null);
      }
    });
  };

  const deleteHandler = item => {
    const deleteitem = item => {
      let listData1 = [...listData];

      _lodash.default.remove(listData1, function (currentObject) {
        return currentObject.name === item.name;
      });

      setListData(listData1);
      return listData1;
    };

    if (props.type) {
      deleteitem(item);
    } else {
      let config = {
        method: "post",
        url: "".concat(_index.currentsetting.webserviceprefix, "deletefile"),
        data: {
          filepath: dir + item.name //"/data/datasrc/리회원관.xlsx",

        }
      };
      (0, _axios.default)(config).then(r => {
        if (props.deleteHandler) {
          props.deleteHandler({
            item
          });
        }
      }).catch(e => {
        console.log(e);

        if (props.deleteHandler) {
          props.deleteHandler({
            result: "error",
            item
          });
        }
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "dvFileuploader"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "custom-file-upload"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    name: "file",
    multiple: true,
    placeholder: "select file",
    onChange: onChangeFile,
    onClick: e => e.target.value = null,
    ref: fileRef,
    accept: accept
  }), /*#__PURE__*/_react.default.createElement(_icons.FolderOpenOutlined, null), " Select file..."), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-success ",
    onClick: onUploadHandler
  }, "Upload")), listData && listData.length > 0 && /*#__PURE__*/_react.default.createElement(_List.default, {
    listData: listData,
    search: false,
    loading: loading,
    deleteHandler: deleteHandler,
    size: "small",
    layout: "horizontal"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.spincenter
  }, open && /*#__PURE__*/_react.default.createElement(_antd.Spin, null)));
};

var _default = UploadFile;
exports.default = _default;
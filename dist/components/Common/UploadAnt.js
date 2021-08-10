"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _index = require("config/index.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Demo extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      fileList: [],
      uploading: false
    });

    _defineProperty(this, "handleUpload", () => {
      const {
        fileList
      } = this.state;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append("files[]", file);
      });
      formData.append("dir", "/data/datasrc/");
      this.setState({
        uploading: true
      }); // You can use any AJAX library you like

      let axiosConfig = {
        headers: {
          keepfilename: true
        }
      };

      _axios.default.post("".concat(_index.currentsetting.webserviceprefix, "uploadfile"), formData, axiosConfig).then(res => {
        this.setState({
          fileList: [],
          uploading: false
        });

        _antd.message.success("File successfully uploaded.");

        console.log(res.data);
      }).catch(e => {
        this.setState({
          uploading: false
        });

        _antd.message.error("upload failed.");
      }); // axios({
      //   url: `${currentsetting.webserviceprefix}uploadfile`,
      //   method: 'post',
      //   processData: false,
      //   data: formData,
      //   success: () => {
      //     this.setState({
      //       fileList: [],
      //       uploading: false,
      //     });
      //     message.success('upload successfully.');
      //   },
      //   error: () => {
      //     this.setState({
      //       uploading: false,
      //     });
      //     message.error('upload failed.');
      //   },
      // });

    });
  }

  render() {
    const {
      uploading,
      fileList
    } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Upload, props, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.UploadOutlined, null)
    }, "Select File")), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      onClick: this.handleUpload,
      disabled: fileList.length === 0,
      loading: uploading,
      style: {
        marginTop: 16
      }
    }, uploading ? "Uploading" : "Start Upload"));
  }

} //export default UploadAnt;


exports.default = Demo;
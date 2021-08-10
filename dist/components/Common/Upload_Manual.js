"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ManualUpload extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handlePreview", file => {
      this.setState({
        previewModal: true,
        previewUrl: file.thumbUrl
      });
    });

    _defineProperty(this, "handleCloseModal", () => {
      this.setState({
        previewModal: false
      });
    });

    this.state = {
      fileList: props.fileList || [],
      files: [],
      previewModal: false,
      previewUrl: ""
    };
  }

  render() {
    const {
      multiple = true,
      buttonTitle = "上传图片",
      showUploadList = true
    } = this.props;

    const uploadButton = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null), /*#__PURE__*/_react.default.createElement("div", null, buttonTitle));

    const props = {
      onRemove: file => {
        const index = this.state.fileList.indexOf(file);
        const newFileList = this.state.fileList.slice();
        newFileList.splice(index, 1);
        this.props.onChange && this.props.onChange(newFileList);
        this.setState({
          fileList: newFileList,
          files: newFileList
        });
      },
      beforeUpload: file => {
        let count = [];
        let files = [];

        if (showUploadList) {
          files = this.state.files;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = e => {
          file.thumbUrl = e.target.result;
          files.push(file);
          files.map((item, index) => {
            if (file.name === item.name) {
              count.push(index);

              if (count.length > 1) {
                _antd.message.error("文件已存在!");

                files.splice(index, 1);
                return;
              }
            }

            return null;
          });
          this.setState({
            fileList: [...files]
          });
          this.props.onChange && this.props.onChange(this.state.fileList);
        };

        return false;
      },
      onPreview: this.handlePreview,
      fileList: showUploadList ? this.state.fileList : null,
      listType: "picture-card",
      multiple: multiple,
      showUploadList: showUploadList
    };
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Upload, props, !showUploadList && this.state.fileList.length >= 1 ? /*#__PURE__*/_react.default.createElement("img", {
      src: this.state.fileList[0].thumbUrl,
      style: {
        width: 86,
        height: 86
      }
    }) : uploadButton), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
      visible: this.state.previewModal,
      footer: null,
      onCancel: this.handleCloseModal
    }, /*#__PURE__*/_react.default.createElement("img", {
      style: {
        width: "100%"
      },
      src: this.state.previewUrl
    })));
  }

}

var _default = ManualUpload;
exports.default = _default;
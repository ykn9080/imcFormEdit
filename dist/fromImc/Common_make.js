"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sweetmsg = sweetmsg;
exports.sweetmsgautoclose = sweetmsgautoclose;
exports.clearinserted = clearinserted;
exports.sweetmsgLoading = exports.sweetmsgconfirm1 = exports.sweetmsgconfirm = void 0;

require("core-js/modules/es.regexp.to-string.js");

var _jquery = _interopRequireDefault(require("jquery"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sweetmsg(title, body, icon) {
  if (typeof body === "undefined" | body === "") _sweetalert.default.fire({
    title: "",
    text: title
  });else _sweetalert.default.fire({
    title: title,
    text: body
  }); // Swal.fire({
  //   icon: "error",
  //   title: title,
  //   text: body,
  //   footer: "<a href>Why do I have this issue?</a>"
  // });
}

function sweetmsgautoclose(title, body, options) {
  var timer = 2500;

  if (typeof options !== "undefined") {
    if (options.hasOwnProperty("timer")) timer = options.timer;
  }

  if (typeof body === "undefined" | body === "") _sweetalert.default.fire({
    title: "",
    text: title,
    timer: timer,
    showConfirmButton: false
  });else _sweetalert.default.fire({
    title: title,
    text: body,
    timer: timer,
    showConfirmButton: false
  });
}

function idMake(option) {
  var d = new Date();
  var yr = d.getFullYear().toString().substr(2, 2);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hr = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var msec = d.getMilliseconds();
  var id = yr + (("" + month).length < 2 ? "0" : "") + month + (("" + day).length < 2 ? "0" : "") + day + hr + min + sec;

  if (typeof option != "undefined") {
    //leaver the num from right side
    id += msec;
    var num = id.length - parseInt(option);
    id = id.substring(num);
  }

  return id;
}

const sweetmsgLoading = (confirmfunc, option) => {
  let timerInterval;

  _sweetalert.default.fire({
    title: (option === null || option === void 0 ? void 0 : option.title) || "Auto close alert!",
    html: (option === null || option === void 0 ? void 0 : option.html) || "I will close in <b></b> milliseconds.",
    timer: (option === null || option === void 0 ? void 0 : option.timer) || 2000,
    timerProgressBar: (option === null || option === void 0 ? void 0 : option.timerProgressBar) || true,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    didOpen: () => {
      _sweetalert.default.showLoading();

      timerInterval = setInterval(() => {
        const content = _sweetalert.default.getContent();

        if (content) {
          const b = content.querySelector("b");

          if (b) {
            b.textContent = _sweetalert.default.getTimerLeft();
          }
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then(result => {
    /* Read more about handling dismissals below */
    if (result.dismiss === _sweetalert.default.DismissReason.timer | result.isConfirmed) {
      console.log("I was closed by the timer");
      confirmfunc();
    }
  });
};

exports.sweetmsgLoading = sweetmsgLoading;

const sweetmsgconfirm1 = (confirmfunc, option) => {
  _sweetalert.default.fire({
    title: (option === null || option === void 0 ? void 0 : option.title) || "Are you sure?",
    text: (option === null || option === void 0 ? void 0 : option.text) || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then(result => {
    if (result.isConfirmed) {
      confirmfunc();
    }
  });
};

exports.sweetmsgconfirm1 = sweetmsgconfirm1;

const sweetmsgconfirm = (confirmfunc, option) => {
  var title = "Delete Confirm",
      body = "Are your sure to delete?",
      cookiekey = "cookie" + idMake();

  if (typeof option != "undefined") {
    if (option.hasOwnProperty("title")) title = option.title;
    if (option.hasOwnProperty("body")) body = option.body;
    if (option.hasOwnProperty("cookiekey")) cookiekey = option.cookiekey;
  } // body =
  //   "<div>" +
  //   body +
  //   "</div><div style='margin:0'><label id='cbcookie' type='checkbox'><i class='fa fa-square-o imdim'/>Don't ask</label></div>";


  _sweetalert.default.fire({
    title: title,
    text: body,
    html: true,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, do it!",
    cancelButtonText: "No, cancel!",
    closeOnConfirm: true,
    closeOnCancel: true
  }).then(isConfirm => {
    console.log(isConfirm);

    if (isConfirm.value) {
      switch (typeof confirmfunc) {
        case "string":
          eval(confirmfunc);
          break;

        case "function":
          confirmfunc();
          break;

        default:
          return null;
      }
    }
  });
};

exports.sweetmsgconfirm = sweetmsgconfirm;

function clearinserted() {
  //remove all the inserted
  (0, _jquery.default)("#spdlist").remove();
  (0, _jquery.default)("#archivegdt").remove();
  (0, _jquery.default)("#spdataajax").remove();
}
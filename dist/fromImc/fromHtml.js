"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleLogin = toggleLogin;

var _jquery = _interopRequireDefault(require("jquery"));

var _core = require("./core");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gb = (0, _reactRedux.useSelector)(state => state.global);

function lazyLoadImages() {
  // get all images with 'lazyload' class
  var $images = (0, _jquery.default)(".deferload"); // if there are images on the page run through each and update src

  if ($images.length > 0) {
    (0, _jquery.default)($images).each(function (i) {
      var image_url = (0, _jquery.default)(this).attr("data-src");
      (0, _jquery.default)(this).prop("src", image_url); // debugging

      var $lognumber = i + 1;
      console.log("Image No." + $lognumber + " loaded");
    });
  }
}

function toggleLogin(type) {
  (0, _jquery.default)(document).unbind("keypress");

  switch (type) {
    case "login":
      (0, _jquery.default)("#form1").hide();
      (0, _jquery.default)("#exTab2").show();
      (0, _jquery.default)("body").css("background-color", "");
      setTimeout(function () {
        (0, _jquery.default)("a[href$='dvLogin']").click();
      }, 100);
      (0, _jquery.default)(document).keypress(function (e) {
        if (e.which == 13) {
          (0, _jquery.default)("input[value='Log In']").click();
        }
      });
      break;

    case "join":
      (0, _jquery.default)("#form1").hide();
      (0, _jquery.default)("#exTab2").show();
      (0, _jquery.default)("body").css("background-color", "");
      setTimeout(function () {
        (0, _jquery.default)("a[href$='dvJoin']").click();
        (0, _jquery.default)('<button id="btnCancel1" class="btn btn-secondary btn-lg btn-block" lang="en">Cancel</button>').insertAfter((0, _jquery.default)("#btnRegister"));
        (0, _jquery.default)("#btnCancel1").click(function () {
          toggleLogin("cancel");
        });
      }, 1000);
      break;

    case "logout":
      var tb = JSON.parse(localStorage.getItem("imctable"));
      if (tb == null) return false;
      (0, _jquery.default)(["menu", "submenu", "control", "adminmenu", "adminsubmenu", "admincontrol"]).each(function (i, k) {
        if (tb.hasOwnProperty(k)) delete tb[k];
      });
      localStorage.setItem("imctable", JSON.stringify(tb));
      localStorage.removeItem("imcsetting");
      localStorage.removeItem("imccss");
      localStorage.removeItem("imcsystem");
      localStorage.removeItem("token");
      localStorage.removeItem("imclist"); //$.removeCookie('imcvisit', { path: '/' });

      gb.menutoggle = "open"; //pageInit();

      break;

    case "cancel":
      (0, _jquery.default)("#form1").show();
      (0, _jquery.default)("#exTab2").hide();
      (0, _jquery.default)("body").css("background-color", "rgb(239, 239, 231)");
      break;
  }
}

function editUser(id) {
  // window.location.assign("/setting/admin/usermanage.aspx?code=" + id);
  (0, _core.funLoading)(true);
  (0, _jquery.default)("#tableinsert").remove();
  (0, _jquery.default)("#dvamin").remove();
  (0, _jquery.default)("#ifuseredit").remove();
  (0, _jquery.default)("<div id='dvadmin' style='padding:0 10px 0 5px'/>").insertAfter((0, _jquery.default)("#dvTitle")); //.append("<iframe id='ifuseredit' style='border: 0px;' onload='funStop()' src='/setting/admin/usermanage.aspx?code=" + id+"' width='100%' min-height='700px'></iframe>")

  (0, _jquery.default)("#dvName").find("label").text("User Edit"); //$('#ifuseredit').load(function () {
  //    this.style.height = parseInt(this.contentWindow.document.body.offsetHeight) + 50 + 'px';
  //});
}

function triggerHtmlEvent(element, eventName) {
  var event;

  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
  } else {
    event = document.createEventObject();
    event.eventType = eventName;
    element.fireEvent("on" + event.eventType, event);
  }
}

(0, _jquery.default)(".translation-links a").click(function (e) {
  e.preventDefault();
  var lang = (0, _jquery.default)(this).data("lang");
  (0, _jquery.default)("#google_translate_element select option").each(function () {
    if ((0, _jquery.default)(this).text().indexOf(lang) > -1) {
      (0, _jquery.default)(this).parent().val((0, _jquery.default)(this).val());
      var container = document.getElementById("google_translate_element");
      var select = container.getElementsByTagName("select")[0];
      triggerHtmlEvent(select, "change");
    }
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.sort.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _reactBootstrap = require("react-bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _md = require("react-icons/md");

require("./Head.css");

var _Help = require("Admin/Help");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const adminMenu = [{
  access: [],
  _id: "5e8ed662bdb50363914263af",
  desc: "",
  layout: [],
  seq: 0,
  title: "Organization",
  type: "admin",
  pid: "",
  path: "/admin/organization"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263b1",
  desc: "",
  layout: [],
  seq: 2,
  title: "Control",
  pid: "",
  type: "admin",
  path: "/admin/control",
  breadcrumbName: "/admin/control"
}, {
  access: [],
  _id: "5e8ed662bdb5036391426999",
  desc: "",
  layout: [],
  seq: 3,
  title: "Model",
  pid: "",
  type: "admin",
  path: "/model",
  breadcrumbName: "/admin/model"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263x1",
  desc: "",
  layout: [],
  seq: 0,
  title: "Form",
  pid: "5e8ed662bdb50363914263b1",
  type: "admin",
  path: "/admin/control/form",
  breadcrumbName: "/admin/Form Build"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263x9",
  desc: "universial purpose, input data, make report with them",
  layout: [],
  seq: 1,
  title: "Allpurpose",
  pid: "5e8ed662bdb50363914263b1",
  type: "admin",
  path: "/admin/control/allpurpose",
  breadcrumbName: "/admin/Allpurpose Build"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263b2",
  desc: "",
  layout: [],
  seq: 4,
  title: "System",
  pid: "",
  type: "admin",
  path: "/admin/system"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263x1",
  desc: "",
  layout: [],
  seq: 0,
  title: "Data",
  pid: "5e8ed662bdb50363914263b2",
  type: "admin",
  path: "/admin/system/data"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263x5",
  desc: "",
  layout: [],
  seq: 1,
  title: "Style",
  pid: "5e8ed662bdb50363914263b2",
  type: "admin",
  path: "/admin/system/style"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263x6",
  desc: "",
  layout: [],
  seq: 0,
  title: "Icon",
  pid: "5e8ed662bdb50363914263x5",
  type: "admin",
  path: "/admin/system/style/icon"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263x7",
  desc: "",
  layout: [],
  seq: 0,
  title: "Image",
  pid: "5e8ed662bdb50363914263x5",
  type: "admin",
  path: "/admin/system/style/image"
}, {
  access: [],
  _id: "5e8ed662bdb50363914263x2",
  desc: "",
  layout: [],
  seq: 1,
  title: "Help",
  pid: "",
  type: "admin",
  path: "/admin/help"
}, {
  access: [],
  _id: "5e8ed71cbdb50363914263b3",
  desc: "",
  layout: [],
  pid: "5e8ed662bdb50363914263af",
  seq: 0,
  title: "Company",
  type: "admin",
  path: "/admin/organization/company"
}, {
  access: [],
  _id: "5e8ed71cbdb50363914263b4",
  desc: "",
  layout: [],
  pid: "5e8ed662bdb50363914263af",
  seq: 1,
  title: "User",
  type: "admin",
  path: "/admin/organization/user"
}, {
  access: [],
  _id: "5e8ed71cbdb50363914263b5",
  desc: "",
  layout: [],
  pid: "5e8ed662bdb50363914263af",
  seq: 2,
  title: "Group",
  type: "admin",
  path: "/admin/organization/group"
}, {
  access: [],
  _id: "5e8ed71cbdb50363914263b6",
  desc: "",
  layout: [],
  pid: "5e8ed662bdb50363914263af",
  seq: 3,
  title: "Organization",
  type: "admin",
  path: "/admin/organization/organization"
}, {
  access: [],
  _id: "5e8ed71cbdb50363914263b7",
  desc: "",
  layout: [],
  pid: "5e8ed662bdb50363914263af",
  seq: 4,
  title: "Product/Service",
  type: "admin",
  path: "/admin/organization/product & Service"
}];

const Topmenu = _ref => {
  let {
    menu
  } = _ref;
  const history = (0, _reactRouterDom.useHistory)();

  function handleSelect(selectedKey) {
    const ctrlist = menu.filter((item, itemIndex) => item._id === selectedKey);
    history.push(ctrlist[0].path); //dispatch(globalVariable({ controls: ctrlist.layout }));
  } //const menulist = JSON.parse(localStorage.getItem("imctable")).menu;
  // useEffect(() => {
  //   //login후 /function/api.js의 remotelogin callback에서 dispatch를 못해서
  //   //일단 localStorage에 저장한후 메뉴로 historyback할때 globalVariable로 dispatch시킴
  //   let menu = myData;
  //   if (localStorage.getItem("menu"))
  //     menu = JSON.parse(localStorage.getItem("menu"));
  //   // else{
  //   //   //openmenu를 fetch해서 가져옴
  //   // }
  //   dispatch(globalVariable({ menu: menu }));
  // }, []);
  // let token = useSelector((state) => state.persist.token);
  // let menu = useSelector((state) => state.persist.menu);
  // let menupersist = useSelector(
  //   (state) => state.persist["persist/REHYDRATE"].persist.menu
  // );
  // let openmenu = useSelector((state) => state.persist.openmenu);


  let topmenu = [];
  if (menu) topmenu = menu //.filter((item, itemIndex) => item.comp === login.comp && typeof item.pid === "undefined")
  .filter((item, itemIndex) => item.pid === "" | typeof item.pid === "undefined").sort(function (a, b) {
    return a.seq < b.seq ? -1 : 1;
  });
  console.log(menu);
  return (
    /*#__PURE__*/
    // <Nav className="mr-auto" onSelect={handleSelect}>
    //   <AntMenu menuList={topmenu} />
    // </Nav>
    _react.default.createElement(_reactBootstrap.Nav, {
      className: "mr-auto",
      onSelect: handleSelect
    }, topmenu && topmenu.map((dt, i) => {
      //const ddList = menulist(dt, dt.id);
      const ddList = menu.filter((item, itemIndex) => item.pid === dt._id).sort(function (a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
      return ddList.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
        key: dt.title + i,
        onClick: () => handleSelect(dt._id)
      }, dt.title) : /*#__PURE__*/_react.default.createElement(NavDropRecur, {
        myData: menu,
        dt: ddList,
        title: dt.title,
        id: dt._id,
        key: dt._id
      });
    }))
  );
};

const NavDropRecur = props => {
  /*make menu recursive, */
  const subfilter = id => {
    return props.myData.filter((item, itemIndex) => id === item.pid).sort(function (a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
  };

  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown, {
    title: props.title,
    id: props.id
  }, props.dt.map((dtt, index) => {
    //let subdata = menulist(props.myData, dtt.id);
    let subdata = subfilter(dtt._id);
    return subdata.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown.Item, {
      eventKey: dtt._id,
      key: dtt._id + index
    }, dtt.title) : /*#__PURE__*/_react.default.createElement(NavDropRecur, {
      dt: subdata,
      myData: props.myData,
      title: dtt.title,
      id: dtt._id,
      key: dtt._id
    });
  }));
};

const Head1 = props => {
  let menu1;
  const dispatch = (0, _reactRedux.useDispatch)();
  const history = (0, _reactRouterDom.useHistory)();
  const token = (0, _reactRedux.useSelector)(state => state.global.token);
  const [menu, setMenu] = (0, _react.useState)(); // const match = props.match;
  // let title = match.params.name,
  //   titleUpper = "";
  // if (typeof match.params.child != "undefined") title = match.params.child;
  // if (typeof match.params.grandchild != "undefined")
  //   title = match.params.grandchild;
  // console.log(match.params, title);
  // if (title) titleUpper = title.charAt(0).toUpperCase() + title.slice(1);

  (0, _react.useEffect)(() => {
    const usermenu = localStorage.getItem("menu");
    const openmenu = localStorage.getItem("openmenu");
    const token1 = localStorage.getItem("token");

    if (token1) {
      menu1 = JSON.parse(usermenu);
      dispatch((0, _actions.globalVariable)({
        token: token1
      }));
    } else {
      //localStorage.removeItem("menu");
      menu1 = JSON.parse(openmenu);
    } //setMenu(menu1);


    setMenu(adminMenu);
  }, [token]);

  function handleSelect(selectedKey) {
    switch (selectedKey) {
      case "edit":
        //const menu = JSON.parse(localStorage.getItem("menu"));
        //const submenu = directChild(menu, "", "seq");
        var clone = (0, _cloneDeep.default)(menu);
        clone.map((k, i) => {
          k.path = "/edit" + k.path;
          return null;
        });
        dispatch((0, _actions.globalVariable)({
          tempMenu: clone
        })); //dispatch(globalVariable({ subMenu: submenu }));

        break;

      case "admin":
        break;

      default:
        break;
    }
  }

  const topbrand = /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Brand, {
    href: "#home"
  }, "IMCMaster");

  const navDropdownTitle = /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "user",
    size: "lg"
  });

  const navCog = /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "cog",
    size: "lg",
    style: {
      marginTop: 8
    }
  });

  const help = () => {
    const his = (0, _Help.helpSet)({
      query: "home",
      tag: "new"
    });
    history.push(his);
  };

  const logout = () => {
    // dispatch(persistVariable({ token: "" }));
    // dispatch(persistVariable({ menu: "" }));
    // dispatch(persistVariable({ login: "" }));
    //aft login menu delete
    //user delete
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    dispatch((0, _actions.globalVariable)({
      token: null
    })); // const usermenu = localStorage.getItem("menu");
    // const openmenu = localStorage.getItem("openmenu");
  };

  const topright = /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
    onSelect: handleSelect
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown, {
    title: navDropdownTitle,
    id: "basic-nav-dropdown1"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown.Item, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/Login"
  }, "Log In")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown.Item, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/Join"
  }, "Join")))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
    href: "#link",
    onClick: help
  }, /*#__PURE__*/_react.default.createElement(_md.MdHelp, {
    style: {
      fontSize: 25,
      marginTop: 6
    }
  })));

  const toprightAfterLogin = /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
    onSelect: handleSelect
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown, {
    title: navDropdownTitle,
    id: "basic-nav-dropdown1"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown.Item, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    onClick: logout
  }, "Log Out")))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/admin",
    style: {
      color: "inherit"
    }
  }, navCog)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
    href: "#link",
    onClick: help
  }, /*#__PURE__*/_react.default.createElement(_md.MdHelp, {
    style: {
      fontSize: 25,
      marginTop: 6
    }
  })));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !token ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar, {
    bg: "dark",
    variant: "dark"
  }, topbrand, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Toggle, {
    "aria-controls": "basic-navbar-nav"
  }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Collapse, {
    id: "basic-navbar-nav"
  }, /*#__PURE__*/_react.default.createElement(Topmenu, {
    menu: menu
  }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    inline: true,
    style: {
      paddingRight: "40"
    }
  }, toprightAfterLogin))) : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar, {
    bg: "dark",
    variant: "dark"
  }, topbrand, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Toggle, {
    "aria-controls": "basic-navbar-nav"
  }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Collapse, {
    id: "basic-navbar-nav"
  }, /*#__PURE__*/_react.default.createElement(Topmenu, {
    menu: menu
  }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    inline: true,
    style: {
      paddingRight: "40"
    }
  }, topright))));
};

var _default = Head1;
exports.default = _default;
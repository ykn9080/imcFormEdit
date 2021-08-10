"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiDispatch = MultiDispatch;
exports.persistor = exports.gb = void 0;

require("core-js/modules/es.promise.js");

var _reactRedux = require("react-redux");

var _actions = require("../actions");

var _redux = require("redux");

var _reduxPersist = require("redux-persist");

var _ = require("./");

const store = (0, _redux.createStore)(_.glovalVariableReducer);
const gb = store.getState();
exports.gb = gb;
const persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;

function MultiDispatch(obj) {
  /* 
  for setting global variable easily
  ex) MultiDispatch({name:"ykn", pass:"9080"})
  */
  const dispatch = (0, _reactRedux.useDispatch)(); //useEffect(() => {

  const typelist = Object.keys(obj);
  typelist.map(async typ => {
    await dispatch((0, _actions.globalVariable)({
      [typ]: obj[typ]
    }));
  }); //}, []);
}
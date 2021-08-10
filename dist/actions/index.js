"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalVariable = exports.decrement = exports.increment = void 0;

const increment = () => {
  return {
    type: "INCREMENT"
  };
};

exports.increment = increment;

const decrement = () => {
  return {
    type: "DECREMENT"
  };
}; //gloval variable collection


exports.decrement = decrement;

const globalVariable = obj => {
  return {
    type: Object.keys(obj)[0],
    payload: obj[Object.keys(obj)[0]]
  };
};

exports.globalVariable = globalVariable;
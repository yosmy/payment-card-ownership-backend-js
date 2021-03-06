"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _resolution = require("@yosmy/resolution");

var _ui = require("@yosmy/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ManageOwnership = function ManageOwnership(_ref) {
  var ui = _ref.ui,
      api = _ref.api,
      card = _ref.card;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      ownership = _useState2[0],
      setOwnership = _useState2[1];

  var _useState3 = (0, _react.useState)({
    progress: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      execution = _useState4[0],
      setExecution = _useState4[1];

  (0, _react.useEffect)(function () {
    setExecution({
      progress: true
    });
    api.pickOwnership(card).then(function (ownership) {
      setOwnership(ownership);
      setExecution({
        progress: false
      });
    })["catch"](function (e) {
      switch (e) {
        case "nonexistent-ownership":
          setOwnership(false);
          setExecution({
            progress: false
          });
          break;

        default:
          console.log(222);
          throw e;
      }
    });
  }, [api]);

  if (ownership === null) {
    return /*#__PURE__*/_react["default"].createElement(ui.layout, {
      progress: execution.progress
    }, /*#__PURE__*/_react["default"].createElement(_ui.LinePlaceholder, null));
  }

  if (ownership && ownership.proved) {
    return /*#__PURE__*/_react["default"].createElement(ui.layout, {
      progress: execution.progress
    }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Verificada"));
  }

  return /*#__PURE__*/_react["default"].createElement(ui.layout, {
    progress: execution.progress
  }, /*#__PURE__*/_react["default"].createElement(_ui.Container, {
    flow: "row"
  }, ownership === false ? /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Sin verificar") : /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Verificando"), /*#__PURE__*/_react["default"].createElement(ApproveOwnership, {
    ui: {
      layout: function layout(_ref2) {
        var children = _ref2.children;
        return /*#__PURE__*/_react["default"].createElement(_ui.Container, {
          margin: {
            left: 1
          }
        }, children);
      }
    },
    onApprove: function onApprove(reason) {
      api.approveOwnership(card, reason, // onReturn
      function (ownership) {
        setOwnership(ownership);
      });
    }
  })));
};

ManageOwnership.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired
  }).isRequired,
  api: _propTypes["default"].shape({
    pickOwnership: _propTypes["default"].func.isRequired,
    approveOwnership: _propTypes["default"].func.isRequired
  }).isRequired,
  card: _propTypes["default"].string.isRequired
};

var ApproveOwnership = function ApproveOwnership(_ref3) {
  var ui = _ref3.ui,
      onApprove = _ref3.onApprove;

  var _useState5 = (0, _react.useState)({
    location: "/start",
    payload: {}
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      url = _useState6[0],
      setUrl = _useState6[1];

  var _useState7 = (0, _react.useState)({
    progress: false,
    error: null
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      execution = _useState8[0],
      setExecution = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      reason = _useState10[0],
      setReason = _useState10[1];

  return /*#__PURE__*/_react["default"].createElement(ui.layout, null, (0, _resolution.resolve)(url.location, [{
    location: /^\/start/,
    element: function element() {
      return /*#__PURE__*/_react["default"].createElement(_ui.SecondaryButton, {
        onClick: function onClick() {
          setUrl({
            location: "/finish",
            payload: {}
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Verificar a mano"));
    }
  }, {
    location: /^\/finish/,
    element: function element() {
      return /*#__PURE__*/_react["default"].createElement(_ui.Container, {
        flow: "row",
        align: {
          main: "flex-start",
          cross: "flex-start"
        }
      }, /*#__PURE__*/_react["default"].createElement(_ui.Container, null, /*#__PURE__*/_react["default"].createElement(_ui.Input, {
        value: reason,
        placeholder: "Escribe el motivo",
        onChange: function onChange(value) {
          setReason(value);
        }
      }), execution.error && /*#__PURE__*/_react["default"].createElement(_ui.Error, null, execution.error)), /*#__PURE__*/_react["default"].createElement(_ui.SecondaryButton, {
        margin: {
          left: 2
        },
        onClick: function onClick() {
          if (!reason) {
            setExecution(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                error: "Escribe el motivo"
              });
            });
            return;
          }

          setExecution({
            progress: true,
            error: null
          });
          onApprove(reason);
        }
      }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Verificar")));
    }
  }]));
};

ApproveOwnership.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired
  }).isRequired,
  onApprove: _propTypes["default"].func.isRequired // (reason)

};
var _default = ManageOwnership;
exports["default"] = _default;
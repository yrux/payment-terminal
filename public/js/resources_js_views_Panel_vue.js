"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Panel_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/counts/index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/counts/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {};
  },
  mounted: function mounted() {},
  props: {
    title: {
      type: String,
      "default": ""
    },
    loading: {
      type: Boolean,
      "default": true
    },
    'count': null
  },
  computed: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Panel.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Panel.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_auth_otherrequests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/auth/otherrequests */ "./resources/js/services/auth/otherrequests.js");
/* harmony import */ var _services_auth_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/auth/user */ "./resources/js/services/auth/user.js");
/* harmony import */ var _components_counts_index_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/counts/index.vue */ "./resources/js/components/counts/index.vue");


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    countWidget: _components_counts_index_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      value: [423, 446, 675, 510, 590, 610, 760],
      today_loading: true,
      users: [],
      //date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
      overall: {
        marketing: 0,
        marketing_spent: 0,
        target: 0,
        achieved: 0,
        refunds: 0,
        chargebacks: 0,
        net: 0,
        brand_queries: 0,
        lag_percentage: 0,
        inflated_marketing_spent: 0,
        marketing_left_percent: 0,
        target_left_percent: 0,
        net_target: 0
      },
      user_id: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var users;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _services_auth_user__WEBPACK_IMPORTED_MODULE_2__["default"].getlist('?role_id=4').then(function (e) {
                return e.data;
              });

            case 2:
              users = _context.sent;
              _this.users = [{
                id: 0,
                email: 'All BUH'
              }].concat(_toConsumableArray(users));

              _this.$store.commit('setPanelFull', true);

              _this.getTodayGraphs();

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  watch: {
    date: function date() {
      this.getTodayGraphs();
    },
    user_id: function user_id() {
      this.getTodayGraphs();
    }
  },
  methods: {
    getTodayGraphs: function getTodayGraphs() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var dt, query, _yield$otherrequestse, overall;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.today_loading = true;
                dt = _this2.date + '-01';

                if (!(_this2.user.role_id == 1)) {
                  _context2.next = 10;
                  break;
                }

                query = '?date=' + dt;

                if (_this2.user_id > 0) {
                  query += '&user_id=' + _this2.user_id;
                }

                _context2.next = 7;
                return _services_auth_otherrequests__WEBPACK_IMPORTED_MODULE_1__["default"].get('admin/get-dashboard' + query).then(function (e) {
                  return e.data;
                });

              case 7:
                _yield$otherrequestse = _context2.sent;
                overall = _yield$otherrequestse.overall;
                _this2.overall = overall;

              case 10:
                _this2.today_loading = false;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  computed: {
    user: function user() {
      return this.$store.getters.loggedInUser;
    },
    wallets: function wallets() {
      return this.$store.getters.wallets;
    }
  }
});

/***/ }),

/***/ "./resources/js/services/auth/otherrequests.js":
/*!*****************************************************!*\
  !*** ./resources/js/services/auth/otherrequests.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var otherrequestservice = /*#__PURE__*/function () {
  function otherrequestservice() {
    _classCallCheck(this, otherrequestservice);
  }

  _createClass(otherrequestservice, [{
    key: "get",
    value: function get(uri) {
      return axios.get("/api/".concat(uri)).then(function (response) {
        return response;
      })["catch"](function (error) {
        return error;
      });
    }
  }, {
    key: "post",
    value: function post(uri, formData) {
      return axios.post("/api/".concat(uri), formData).then(function (response) {
        return response;
      })["catch"](function (error) {
        return error;
      });
    }
  }]);

  return otherrequestservice;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new otherrequestservice());

/***/ }),

/***/ "./resources/js/services/auth/user.js":
/*!********************************************!*\
  !*** ./resources/js/services/auth/user.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var userservice = /*#__PURE__*/function () {
  function userservice() {
    _classCallCheck(this, userservice);
  }

  _createClass(userservice, [{
    key: "getlist",
    value: function getlist(params) {
      return axios.get("/api/user".concat(params)).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return error;
      });
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(formData) {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.post('/api/user', formData).then(function (e) {
                  return {
                    status: 1,
                    data: e.data.data
                  };
                })["catch"](function (e) {
                  return {
                    status: 0,
                    data: e.response.data.errors
                  };
                });

              case 2:
                res = _context.sent;
                return _context.abrupt("return", res);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "delete",
    value: function _delete(_ref) {
      var query = _ref.query,
          id = _ref.id;
      return axios["delete"]("/api/user/".concat(id));
    }
  }, {
    key: "get",
    value: function get(id) {
      return axios.get("/api/user/".concat(id)).then(function (e) {
        return e.data.data;
      });
    }
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(formData, id) {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                formData.append('_method', 'put');
                _context2.next = 3;
                return axios.post('/api/user/' + id, formData).then(function (e) {
                  return {
                    status: 1,
                    data: e.data.data
                  };
                })["catch"](function (e) {
                  return {
                    status: 0,
                    data: e.response.data.errors
                  };
                });

              case 3:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return userservice;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new userservice());

/***/ }),

/***/ "./resources/js/components/counts/index.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/counts/index.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_e45b1edc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=e45b1edc& */ "./resources/js/components/counts/index.vue?vue&type=template&id=e45b1edc&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/components/counts/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_e45b1edc___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_e45b1edc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/counts/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Panel.vue":
/*!**************************************!*\
  !*** ./resources/js/views/Panel.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Panel_vue_vue_type_template_id_21128e75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Panel.vue?vue&type=template&id=21128e75& */ "./resources/js/views/Panel.vue?vue&type=template&id=21128e75&");
/* harmony import */ var _Panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panel.vue?vue&type=script&lang=js& */ "./resources/js/views/Panel.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Panel_vue_vue_type_template_id_21128e75___WEBPACK_IMPORTED_MODULE_0__.render,
  _Panel_vue_vue_type_template_id_21128e75___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Panel.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/counts/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/counts/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/counts/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Panel.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/views/Panel.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Panel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Panel.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/counts/index.vue?vue&type=template&id=e45b1edc&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/counts/index.vue?vue&type=template&id=e45b1edc& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e45b1edc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e45b1edc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e45b1edc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=e45b1edc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/counts/index.vue?vue&type=template&id=e45b1edc&");


/***/ }),

/***/ "./resources/js/views/Panel.vue?vue&type=template&id=21128e75&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/Panel.vue?vue&type=template&id=21128e75& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_template_id_21128e75___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_template_id_21128e75___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_template_id_21128e75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Panel.vue?vue&type=template&id=21128e75& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Panel.vue?vue&type=template&id=21128e75&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/counts/index.vue?vue&type=template&id=e45b1edc&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/counts/index.vue?vue&type=template&id=e45b1edc& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.loading
        ? _c(
            "v-sheet",
            { staticClass: "pa-3", attrs: { color: "lighten-5" } },
            [
              _c("v-skeleton-loader", {
                staticClass: "mx-auto",
                attrs: { type: "card" },
              }),
            ],
            1
          )
        : _c(
            "v-card",
            { staticClass: "mx-auto" },
            [
              _c(
                "v-list-item",
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", { staticClass: "text-h5" }, [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.title) +
                            "\n                "
                        ),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-row",
                    { attrs: { align: "center" } },
                    [
                      _c(
                        "v-col",
                        { staticClass: "text-h3", attrs: { cols: "12" } },
                        [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm.count) +
                              "\n                "
                          ),
                        ]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Panel.vue?vue&type=template&id=21128e75&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Panel.vue?vue&type=template&id=21128e75& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.user.role_id == 1
    ? _c(
        "v-row",
        [
          _c(
            "v-col",
            { attrs: { cols: "6", sm: "12" } },
            [
              _c(
                "v-menu",
                {
                  ref: "menu",
                  attrs: {
                    "close-on-content-click": false,
                    "return-value": _vm.date,
                    transition: "scale-transition",
                    "offset-y": "",
                    "max-width": "290px",
                    "min-width": "auto",
                  },
                  on: {
                    "update:returnValue": function ($event) {
                      _vm.date = $event
                    },
                    "update:return-value": function ($event) {
                      _vm.date = $event
                    },
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "activator",
                        fn: function (ref) {
                          var on = ref.on
                          var attrs = ref.attrs
                          return [
                            _c(
                              "v-text-field",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      label: "Filter Targets",
                                      "prepend-icon": "mdi-calendar",
                                      readonly: "",
                                    },
                                    model: {
                                      value: _vm.date,
                                      callback: function ($$v) {
                                        _vm.date = $$v
                                      },
                                      expression: "date",
                                    },
                                  },
                                  "v-text-field",
                                  attrs,
                                  false
                                ),
                                on
                              )
                            ),
                          ]
                        },
                      },
                    ],
                    null,
                    false,
                    3165769120
                  ),
                  model: {
                    value: _vm.menu,
                    callback: function ($$v) {
                      _vm.menu = $$v
                    },
                    expression: "menu",
                  },
                },
                [
                  _vm._v(" "),
                  _c(
                    "v-date-picker",
                    {
                      attrs: { type: "month", "no-title": "", scrollable: "" },
                      model: {
                        value: _vm.date,
                        callback: function ($$v) {
                          _vm.date = $$v
                        },
                        expression: "date",
                      },
                    },
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { text: "", color: "primary" },
                          on: {
                            click: function ($event) {
                              _vm.menu = false
                            },
                          },
                        },
                        [_vm._v("\n                Cancel\n            ")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { text: "", color: "primary" },
                          on: {
                            click: function ($event) {
                              return _vm.$refs.menu.save(_vm.date)
                            },
                          },
                        },
                        [_vm._v("\n                OK\n            ")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "6", sm: "12" } },
            [
              _c("v-select", {
                attrs: {
                  items: _vm.users,
                  "item-text": "email",
                  "item-value": "id",
                  label: "BUH",
                  required: "",
                },
                model: {
                  value: _vm.user_id,
                  callback: function ($$v) {
                    _vm.user_id = $$v
                  },
                  expression: "user_id",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "text-center",
              attrs: { cols: "12", sm: "6", xs: "12", md: "3" },
            },
            [
              _c("h2", { staticClass: "text-center mb-2" }, [
                _vm._v("Marketing Budget Used"),
              ]),
              _vm._v(" "),
              _c(
                "v-progress-circular",
                {
                  attrs: {
                    value: _vm.overall.marketing_left_percent,
                    size: 200,
                    width: 15,
                    color: "purple",
                  },
                },
                [
                  _vm._v(
                    _vm._s(
                      parseFloat(_vm.overall.marketing_left_percent).toFixed(2)
                    ) + " %"
                  ),
                ]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "text-center",
              attrs: { cols: "12", sm: "6", xs: "12", md: "3" },
            },
            [
              _c("h2", { staticClass: "text-center mb-2" }, [
                _vm._v("Target Achieved"),
              ]),
              _vm._v(" "),
              _c(
                "v-progress-circular",
                {
                  attrs: {
                    value: _vm.overall.target_left_percent,
                    size: 200,
                    width: 15,
                    color: "teal",
                  },
                },
                [
                  _vm._v(
                    _vm._s(
                      parseFloat(_vm.overall.target_left_percent).toFixed(2)
                    ) + " %"
                  ),
                ]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.marketing,
                    title: "Marketing Allocated",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.marketing_spent,
                    title: "Marketing Spent",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.target,
                    title: "Target",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.net_target,
                    title: "Net Target",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.achieved,
                    title: "Achieved",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: 0,
                    title: "Expense",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.refunds,
                    title: "Refunds",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.chargebacks,
                    title: "Chargebacks",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.net,
                    title: "Net",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.brand_queries,
                    title: "Form Submits",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("v-col", { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } }, [
            _c(
              "div",
              { staticClass: "mb-4" },
              [
                _c("countWidget", {
                  attrs: {
                    loading: _vm.today_loading,
                    count: _vm.overall.lag_percentage,
                    title: "Lag %",
                  },
                }),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          parseFloat(_vm.overall.inflated_marketing_spent) > 0 &&
          _vm.user_id > 0
            ? _c(
                "v-col",
                { attrs: { cols: "12", sm: "6", xs: "12", md: "3" } },
                [
                  _c(
                    "div",
                    { staticClass: "mb-4" },
                    [
                      _c("countWidget", {
                        attrs: {
                          loading: _vm.today_loading,
                          count: _vm.overall.inflated_marketing_spent,
                          title: "Marketing Spent Inflated",
                        },
                      }),
                    ],
                    1
                  ),
                ]
              )
            : _vm._e(),
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
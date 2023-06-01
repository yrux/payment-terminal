"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_PaymentRefund_Form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PaymentRefund/Form.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PaymentRefund/Form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_auth_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/auth/default */ "./resources/js/services/auth/default.js");


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

var itemtypeservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('payment-refunds');
var userservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('user');
var brandservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('brands');
var merchantservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('merchants');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "auth.paymentrefunds.add",
  watch: {},
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return userservice.getlist('').then(function (e) {
                return e.data;
              });

            case 2:
              _this.users = _context.sent;
              _context.next = 5;
              return brandservice.getlist('').then(function (e) {
                return e.data;
              });

            case 5:
              _this.brands = _context.sent;
              _context.next = 8;
              return merchantservice.getlist('').then(function (e) {
                return e.data;
              });

            case 8:
              _this.merchants = _context.sent;

              if (!_this.$route.params.id) {
                _context.next = 17;
                break;
              }

              _context.next = 12;
              return itemtypeservice.get(_this.form.id);

            case 12:
              res = _context.sent;
              _this.form = {
                brand_id: res.brand_id ? res.brand_id : 0,
                user_id: res.user_id ? res.user_id : 0,
                merchant_id: res.merchant_id ? res.merchant_id : 0,
                refund_type: res.refund_type ? res.refund_type : 0,
                amount: res.amount ? res.amount : 0,
                notes: res.notes ? res.notes : '',
                refund_date: res.refund_date ? res.refund_date : '',
                refund_id: res.refund_id ? res.refund_id : '',
                id: _this.$route.params.id
              };

              _this.bread.push({
                text: "Edit",
                to: {
                  name: "auth.paymentrefunds.edit",
                  params: {
                    id: _this.$route.params.id
                  }
                },
                disabled: false,
                exact: true
              });

              _context.next = 18;
              break;

            case 17:
              _this.bread.push({
                text: "Add",
                to: {
                  name: "auth.paymentrefunds.add"
                },
                disabled: false,
                exact: true
              });

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
    resetError: function resetError() {
      this.errors = {
        brand_id: [],
        user_id: [],
        amount: [],
        notes: [],
        merchant_id: [],
        refund_id: [],
        refund_type: [],
        refund_date: []
      };
    },
    addpermission: function () {
      var _addpermission = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var formdata, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.resetError();

                if (this.btnloading) {
                  _context2.next = 24;
                  break;
                }

                if (!this.$refs.form.validate()) {
                  _context2.next = 24;
                  break;
                }

                this.btnloading = true;
                formdata = new FormData();
                formdata.append("brand_id", this.form.brand_id);
                formdata.append("user_id", this.form.user_id);
                formdata.append("merchant_id", this.form.merchant_id);
                formdata.append("amount", this.form.amount);
                formdata.append("refund_type", this.form.refund_type);
                formdata.append("refund_id", this.form.refund_id);
                formdata.append("notes", this.form.notes);
                formdata.append("refund_date", this.form.refund_date);

                if (!(this.form.id > 0)) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 16;
                return itemtypeservice.update(formdata, this.form.id);

              case 16:
                res = _context2.sent;
                _context2.next = 22;
                break;

              case 19:
                _context2.next = 21;
                return itemtypeservice.create(formdata);

              case 21:
                res = _context2.sent;

              case 22:
                this.btnloading = false;

                if (!res.status) {
                  if (res.data.brand_id) {
                    this.errors.brand_id = res.data.brand_id;
                  }

                  if (res.data.user_id) {
                    this.errors.user_id = res.data.user_id;
                  }

                  if (res.data.merchant_id) {
                    this.errors.merchant_id = res.data.merchant_id;
                  }

                  if (res.data.refund_type) {
                    this.errors.refund_type = res.data.refund_type;
                  }

                  if (res.data.amount) {
                    this.errors.amount = res.data.amount;
                  }

                  if (res.data.refund_id) {
                    this.errors.refund_id = res.data.refund_id;
                  }

                  if (res.data.notes) {
                    this.errors.notes = res.data.notes;
                  }

                  if (res.data.refund_date) {
                    this.errors.refund_date = res.data.refund_date;
                  } //errors here

                } else {
                  //suuccess here
                  this.$router.push({
                    name: "auth.paymentrefunds.listing"
                  });
                }

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addpermission() {
        return _addpermission.apply(this, arguments);
      }

      return addpermission;
    }()
  },
  computed: {
    user: function user() {
      return this.$store.getters.loggedInUser;
    }
  },
  data: function data() {
    return {
      refund_types: [{
        id: 0,
        text: 'Refund'
      }, {
        id: 1,
        text: 'Chargeback'
      }],
      brands: [],
      users: [],
      merchants: [],
      menu: false,
      form: {
        id: this.$route.params.id ? this.$route.params.id : 0,
        brand_id: 0,
        user_id: 0,
        amount: 0,
        merchant_id: 0,
        refund_id: '',
        notes: '',
        refund_type: 1,
        refund_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
      },
      errors: {
        brand_id: [],
        user_id: [],
        amount: [],
        notes: [],
        refund_date: [],
        merchant_id: [],
        refund_id: [],
        refund_type: []
      },
      bread: [{
        text: "Dashboard",
        to: {
          name: "auth.dashboard"
        },
        disabled: false,
        exact: true
      }, {
        text: "Refund/Charbacks",
        to: {
          name: "auth.paymentrefunds.listing"
        },
        disabled: false,
        exact: true
      }],
      loading: false,
      btnloading: false,
      rules: {
        required: function required(value) {
          return !!value || "Required.";
        }
      }
    };
  }
});

/***/ }),

/***/ "./resources/js/services/auth/default.js":
/*!***********************************************!*\
  !*** ./resources/js/services/auth/default.js ***!
  \***********************************************/
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

var defaultservice = /*#__PURE__*/function () {
  function defaultservice(baseuri) {
    _classCallCheck(this, defaultservice);

    // Constructor
    this.baseuri = baseuri;
  }

  _createClass(defaultservice, [{
    key: "getlist",
    value: function getlist(params) {
      return axios.get("/api/".concat(this.baseuri).concat(params !== null && params !== void 0 ? params : '')).then(function (response) {
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
                formData.append('_method', 'POST');
                _context.next = 3;
                return axios.post('/api/' + this.baseuri, formData).then(function (e) {
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
                res = _context.sent;
                return _context.abrupt("return", res);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
      return axios["delete"]("/api/".concat(this.baseuri, "/").concat(id));
    }
  }, {
    key: "get",
    value: function get(id) {
      return axios.get("/api/".concat(this.baseuri, "/").concat(id)).then(function (e) {
        return e.data.data;
      });
    }
  }, {
    key: "getw",
    value: function getw(id) {
      return axios.get("/api/".concat(this.baseuri, "/").concat(id)).then(function (e) {
        return e.data;
      });
    }
  }, {
    key: "getProductData",
    value: function getProductData(brand_id, item_type_id) {
      return axios.get("/api/".concat(this.baseuri, "/").concat(brand_id, "/").concat(item_type_id)).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return error;
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
                formData.append('_method', 'PUT'); // formData.append('_method', 'POST')

                _context2.next = 3;
                return axios.post('/api/' + this.baseuri + '/' + id, formData).then(function (e) {
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
        }, _callee2, this);
      }));

      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "getQrcode",
    value: function () {
      var _getQrcode = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios({
                  url: '/api/' + this.baseuri,
                  method: 'GET',
                  responseType: 'text/plain'
                }).then(function (response) {
                  return response.data;
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getQrcode(_x4) {
        return _getQrcode.apply(this, arguments);
      }

      return getQrcode;
    }()
  }]);

  return defaultservice;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultservice);

/***/ }),

/***/ "./resources/js/views/PaymentRefund/Form.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/PaymentRefund/Form.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Form_vue_vue_type_template_id_57ef5814___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=57ef5814& */ "./resources/js/views/PaymentRefund/Form.vue?vue&type=template&id=57ef5814&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/js/views/PaymentRefund/Form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_57ef5814___WEBPACK_IMPORTED_MODULE_0__.render,
  _Form_vue_vue_type_template_id_57ef5814___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/PaymentRefund/Form.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/PaymentRefund/Form.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/PaymentRefund/Form.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PaymentRefund/Form.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/PaymentRefund/Form.vue?vue&type=template&id=57ef5814&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/PaymentRefund/Form.vue?vue&type=template&id=57ef5814& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_57ef5814___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_57ef5814___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_57ef5814___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Form.vue?vue&type=template&id=57ef5814& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PaymentRefund/Form.vue?vue&type=template&id=57ef5814&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PaymentRefund/Form.vue?vue&type=template&id=57ef5814&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PaymentRefund/Form.vue?vue&type=template&id=57ef5814& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
      _c("v-breadcrumbs", {
        attrs: { items: _vm.bread },
        scopedSlots: _vm._u([
          {
            key: "divider",
            fn: function () {
              return [_c("v-icon", [_vm._v("mdi-forward")])]
            },
            proxy: true,
          },
        ]),
      }),
      _vm._v(" "),
      _c(
        "v-row",
        {
          staticClass: "pa-10 rounded elevation-10",
          attrs: { "no-gutters": "" },
        },
        [
          _c(
            "v-col",
            { attrs: { cols: "12", sm: "12" } },
            [
              _c(
                "v-form",
                {
                  ref: "form",
                  attrs: { "lazy-validation": "" },
                  model: {
                    value: _vm.loading,
                    callback: function ($$v) {
                      _vm.loading = $$v
                    },
                    expression: "loading",
                  },
                },
                [
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "4", sm: "4" } },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.brands,
                              "item-text": "name",
                              "item-value": "id",
                              label: "Brand",
                              required: "",
                              "error-messages": _vm.errors.brand_id,
                            },
                            model: {
                              value: _vm.form.brand_id,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "brand_id", $$v)
                              },
                              expression: "form.brand_id",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "4", sm: "4" } },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.users,
                              "item-text": "email",
                              "item-value": "id",
                              label: "Sale Person",
                              required: "",
                              "error-messages": _vm.errors.user_id,
                            },
                            model: {
                              value: _vm.form.user_id,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "user_id", $$v)
                              },
                              expression: "form.user_id",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "4", sm: "4" } },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.refund_types,
                              "item-text": "text",
                              "item-value": "id",
                              label: "Refund/Chargeback Type",
                              required: "",
                            },
                            model: {
                              value: _vm.form.refund_type,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "refund_type", $$v)
                              },
                              expression: "form.refund_type",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "4", sm: "4" } },
                        [
                          _c(
                            "v-menu",
                            {
                              ref: "menu",
                              attrs: {
                                "close-on-content-click": false,
                                "return-value": _vm.form.refund_date,
                                transition: "scale-transition",
                                "offset-y": "",
                                "min-width": "auto",
                              },
                              on: {
                                "update:returnValue": function ($event) {
                                  return _vm.$set(
                                    _vm.form,
                                    "refund_date",
                                    $event
                                  )
                                },
                                "update:return-value": function ($event) {
                                  return _vm.$set(
                                    _vm.form,
                                    "refund_date",
                                    $event
                                  )
                                },
                              },
                              scopedSlots: _vm._u([
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
                                                label: "Refund Date",
                                                "prepend-icon": "mdi-calendar",
                                                readonly: "",
                                              },
                                              model: {
                                                value: _vm.form.refund_date,
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    _vm.form,
                                                    "refund_date",
                                                    $$v
                                                  )
                                                },
                                                expression: "form.refund_date",
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
                              ]),
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
                                  attrs: { "no-title": "", scrollable: "" },
                                  model: {
                                    value: _vm.form.refund_date,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.form, "refund_date", $$v)
                                    },
                                    expression: "form.refund_date",
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
                                    [
                                      _vm._v(
                                        "\n                                Cancel\n                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: { text: "", color: "primary" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.$refs.menu.save(
                                            _vm.form.refund_date
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                OK\n                            "
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
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "4", sm: "4" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              type: "number",
                              "error-messages": _vm.errors.amount,
                              label: "Total",
                            },
                            model: {
                              value: _vm.form.amount,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "amount", $$v)
                              },
                              expression: "form.amount",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "4", sm: "4" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              rules: [_vm.rules.required],
                              "error-messages": _vm.errors.refund_id,
                              label: "Refund ID",
                            },
                            model: {
                              value: _vm.form.refund_id,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "refund_id", $$v)
                              },
                              expression: "form.refund_id",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        {
                          staticClass: "pb-0",
                          attrs: { cols: "12", sm: "12" },
                        },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.merchants,
                              "item-text": "name",
                              "item-value": "id",
                              label: "Merchant",
                              required: "",
                              "error-messages": _vm.errors.merchant_id,
                            },
                            model: {
                              value: _vm.form.merchant_id,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "merchant_id", $$v)
                              },
                              expression: "form.merchant_id",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        {
                          staticClass: "pb-0",
                          attrs: { cols: "12", sm: "12" },
                        },
                        [
                          _c("v-textarea", {
                            attrs: {
                              "error-messages": _vm.errors.notes,
                              label: "Notes",
                            },
                            model: {
                              value: _vm.form.notes,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "notes", $$v)
                              },
                              expression: "form.notes",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        {
                          staticClass: "pb-0",
                          attrs: { cols: "12", sm: "12" },
                        },
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                color: "secondary",
                                elevation: "1",
                                large: "",
                                raised: "",
                                loading: _vm.btnloading,
                                disabled: _vm.btnloading,
                              },
                              on: { click: _vm.addpermission },
                            },
                            [_vm._v(_vm._s(_vm.form.id > 0 ? "Update" : "Add"))]
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



/***/ })

}]);
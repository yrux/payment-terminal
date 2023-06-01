"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Payment_Form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Payment/Form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Payment/Form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var itemtypeservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('payments');
var userservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('user');
var brandservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('brands');
var merchantservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('merchants');
var flagservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('m-flags');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "auth.payments.add",
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
              return flagservice.getlist('?flag_type=SERVICESTYPES').then(function (e) {
                return e.data;
              });

            case 8:
              _this.services = _context.sent;

              if (!_this.$route.params.id) {
                _context.next = 18;
                break;
              }

              _context.next = 12;
              return itemtypeservice.get(_this.form.id);

            case 12:
              res = _context.sent;
              _this.form = {
                brand_id: res.brand_id ? res.brand_id : 0,
                user_id: res.user_id ? res.user_id : 0,
                payment_gateway: res.payment_gateway ? res.payment_gateway : 0,
                services: res.services ? res.services.split(',') : '',
                amount: res.amount ? res.amount : 0,
                subtotal: res.subtotal ? res.subtotal : 0,
                tax_percent: res.tax_percent ? res.tax_percent : 0,
                customer_email: res.customer_email ? res.customer_email : '',
                customer_name: res.customer_name ? res.customer_name : '',
                description: res.description ? res.description : '',
                sales_email: res.sales_email ? res.sales_email : '',
                id: _this.$route.params.id
              };
              _this.form.allow_tax = res.allow_tax == 1 ? true : false;

              _this.bread.push({
                text: "Edit",
                to: {
                  name: "auth.payments.edit",
                  params: {
                    id: _this.$route.params.id
                  }
                },
                disabled: false,
                exact: true
              });

              _context.next = 19;
              break;

            case 18:
              _this.bread.push({
                text: "Add",
                to: {
                  name: "auth.payments.add"
                },
                disabled: false,
                exact: true
              });

            case 19:
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
        services: [],
        amount: [],
        customer_name: [],
        customer_email: [],
        payment_gateway: [],
        description: [],
        sales_email: []
      };
    },
    addpermission: function () {
      var _addpermission = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var formdata, servicesSend, i, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.resetError();

                if (this.btnloading) {
                  _context2.next = 30;
                  break;
                }

                if (!this.$refs.form.validate()) {
                  _context2.next = 30;
                  break;
                }

                this.btnloading = true;
                formdata = new FormData();
                servicesSend = [];

                for (i = 0; i < this.form.services.length; i++) {
                  if (this.form.services[i].flag_value) {
                    servicesSend.push(this.form.services[i].flag_value);
                  } else {
                    servicesSend.push(this.form.services[i]);
                  }
                }

                formdata.append("brand_id", this.form.brand_id);
                formdata.append("user_id", this.user.id); // formdata.append("services", this.form.services);

                formdata.append("services", servicesSend);
                formdata.append("amount", this.total);
                formdata.append("sales_email", this.form.sales_email);
                formdata.append("payment_gateway", this.form.payment_gateway);
                formdata.append("customer_email", this.form.customer_email);
                formdata.append("customer_name", this.form.customer_name);
                formdata.append("description", this.form.description);
                formdata.append("subtotal", this.form.subtotal);
                formdata.append("allow_tax", this.form.allow_tax == true ? 1 : 0);
                formdata.append("tax_percent", this.form.allow_tax == true ? this.form.tax_percent : 0);

                if (!(this.form.id > 0)) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 22;
                return itemtypeservice.update(formdata, this.form.id);

              case 22:
                res = _context2.sent;
                _context2.next = 28;
                break;

              case 25:
                _context2.next = 27;
                return itemtypeservice.create(formdata);

              case 27:
                res = _context2.sent;

              case 28:
                this.btnloading = false;

                if (!res.status) {
                  if (res.data.brand_id) {
                    this.errors.brand_id = res.data.brand_id;
                  }

                  if (res.data.user_id) {
                    this.errors.user_id = res.data.user_id;
                  }

                  if (res.data.services) {
                    this.errors.services = res.data.services;
                  }

                  if (res.data.amount) {
                    this.errors.amount = res.data.amount;
                  }

                  if (res.data.customer_email) {
                    this.errors.customer_email = res.data.customer_email;
                  }

                  if (res.data.customer_name) {
                    this.errors.customer_name = res.data.customer_name;
                  }

                  if (res.data.payment_gateway) {
                    this.errors.payment_gateway = res.data.payment_gateway;
                  }

                  if (res.data.description) {
                    this.errors.description = res.data.description;
                  }

                  if (res.data.sales_email) {
                    this.errors.sales_email = res.data.sales_email;
                  }

                  if (res.data.subtotal) {
                    this.errors.subtotal = res.data.subtotal;
                  }

                  if (res.data.allow_tax) {
                    this.errors.allow_tax = res.data.allow_tax;
                  }

                  if (res.data.tax_percent) {
                    this.errors.tax_percent = res.data.tax_percent;
                  } //errors here

                } else {
                  //suuccess here
                  this.$router.push({
                    name: "auth.payments.listing"
                  });
                }

              case 30:
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
    }(),
    getExistingCustomer: function getExistingCustomer() {},
    autofillDetails: function autofillDetails(ev) {
      this.form.brand_id = ev.brand_id;
      this.form.sales_email = ev.pseudo_email;
    }
  },
  computed: {
    total: function total() {
      var subtotal = this.form.subtotal;
      var total = 0;

      if (this.form.allow_tax == true) {
        total = this.form.subtotal / 100 * this.form.tax_percent;
      }

      return parseFloat(parseFloat(total) + parseFloat(subtotal)).toFixed(2);
    },
    user: function user() {
      return this.$store.getters.loggedInUser;
    },
    pseudos: function pseudos() {
      return this.$store.getters.loggedInUser.brands;
    },
    paymentGateways: function paymentGateways() {
      return this.$store.getters.paymentGateways;
    },
    merchants: function merchants() {
      var _this2 = this;

      if (parseInt(this.form.brand_id) > 0) {
        return this.brands.find(function (e) {
          return e.id == _this2.form.brand_id;
        }).merchants;
      }

      return [];
    }
  },
  data: function data() {
    return {
      serviceSearch: null,
      brands: [],
      users: [],
      services: [],
      form: {
        id: this.$route.params.id ? this.$route.params.id : 0,
        brand_id: 0,
        user_id: 0,
        services: [],
        amount: 0,
        payment_gateway: 0,
        customer_name: '',
        customer_email: '',
        description: '',
        sales_email: '',
        subtotal: 0,
        allow_tax: 1,
        tax_percent: 10.25
      },
      errors: {
        brand_id: [],
        user_id: [],
        services: [],
        amount: [],
        customer_name: [],
        customer_email: [],
        description: [],
        payment_gateway: [],
        subtotal: [],
        allow_tax: [],
        tax_percent: []
      },
      bread: [{
        text: "Dashboard",
        to: {
          name: "auth.dashboard"
        },
        disabled: false,
        exact: true
      }, {
        text: "Payments",
        to: {
          name: "auth.payments.listing"
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

/***/ "./resources/js/views/Payment/Form.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/Payment/Form.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Form_vue_vue_type_template_id_24516d6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=24516d6c& */ "./resources/js/views/Payment/Form.vue?vue&type=template&id=24516d6c&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/js/views/Payment/Form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_24516d6c___WEBPACK_IMPORTED_MODULE_0__.render,
  _Form_vue_vue_type_template_id_24516d6c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Payment/Form.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Payment/Form.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Payment/Form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Payment/Form.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Payment/Form.vue?vue&type=template&id=24516d6c&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Payment/Form.vue?vue&type=template&id=24516d6c& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_24516d6c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_24516d6c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_24516d6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Form.vue?vue&type=template&id=24516d6c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Payment/Form.vue?vue&type=template&id=24516d6c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Payment/Form.vue?vue&type=template&id=24516d6c&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Payment/Form.vue?vue&type=template&id=24516d6c& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
                        { staticClass: "pb-0", attrs: { cols: "6", sm: "6" } },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.pseudos,
                              "item-text": "pseudo_email",
                              "return-object": "",
                              label: "Select Pseudo",
                            },
                            on: { change: _vm.autofillDetails },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "6", sm: "6" } },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.brands,
                              "item-text": "name",
                              "item-value": "id",
                              label: "Brand",
                              required: "",
                              disabled: "",
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
                        { staticClass: "pb-0", attrs: { cols: "3", sm: "3" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              type: "number",
                              rules: [_vm.rules.required],
                              "error-messages": _vm.errors.subtotal,
                              label: "Amount",
                            },
                            model: {
                              value: _vm.form.subtotal,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "subtotal", $$v)
                              },
                              expression: "form.subtotal",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "3", sm: "3" } },
                        [
                          _c("v-checkbox", {
                            attrs: { label: "Allow Tax" },
                            model: {
                              value: _vm.form.allow_tax,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "allow_tax", $$v)
                              },
                              expression: "form.allow_tax",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.form.allow_tax
                        ? _c(
                            "v-col",
                            {
                              staticClass: "pb-0",
                              attrs: { cols: "3", sm: "3" },
                            },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  type: "number",
                                  rules: [_vm.rules.required],
                                  "error-messages": _vm.errors.tax_percent,
                                  label: "TAX %",
                                },
                                model: {
                                  value: _vm.form.tax_percent,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.form, "tax_percent", $$v)
                                  },
                                  expression: "form.tax_percent",
                                },
                              }),
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "3", sm: "3" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              disabled: "",
                              type: "number",
                              "error-messages": _vm.errors.amount,
                              label: "Total",
                            },
                            model: {
                              value: _vm.total,
                              callback: function ($$v) {
                                _vm.total = $$v
                              },
                              expression: "total",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "6", sm: "6" } },
                        [
                          _c("v-combobox", {
                            attrs: {
                              items: _vm.services,
                              "search-input": _vm.serviceSearch,
                              "item-text": "flag_value",
                              "item-value": "flag_value",
                              "hide-selected": "",
                              "error-messages": _vm.errors.services,
                              hint: "Select from pre-filled services or create new",
                              label: "Services",
                              multiple: "",
                              "persistent-hint": "",
                              "small-chips": "",
                            },
                            on: {
                              "update:searchInput": function ($event) {
                                _vm.serviceSearch = $event
                              },
                              "update:search-input": function ($event) {
                                _vm.serviceSearch = $event
                              },
                            },
                            scopedSlots: _vm._u([
                              {
                                key: "no-data",
                                fn: function () {
                                  return [
                                    _c(
                                      "v-list-item",
                                      [
                                        _c(
                                          "v-list-item-content",
                                          [
                                            _c("v-list-item-title", [
                                              _vm._v(
                                                '\n                                    No results matching "'
                                              ),
                                              _c("strong", [
                                                _vm._v(
                                                  _vm._s(_vm.serviceSearch)
                                                ),
                                              ]),
                                              _vm._v('". Press '),
                                              _c("kbd", [_vm._v("enter")]),
                                              _vm._v(
                                                " to create a new one\n                                    "
                                              ),
                                            ]),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                  ]
                                },
                                proxy: true,
                              },
                            ]),
                            model: {
                              value: _vm.form.services,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "services", $$v)
                              },
                              expression: "form.services",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "6", sm: "6" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              rules: [_vm.rules.required],
                              "error-messages": _vm.errors.customer_email,
                              label: "Customer Email",
                            },
                            model: {
                              value: _vm.form.customer_email,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "customer_email", $$v)
                              },
                              expression: "form.customer_email",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "6", sm: "6" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              rules: [_vm.rules.required],
                              "error-messages": _vm.errors.customer_name,
                              label: "Customer Name",
                            },
                            model: {
                              value: _vm.form.customer_name,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "customer_name", $$v)
                              },
                              expression: "form.customer_name",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "6", sm: "6" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              disabled: "",
                              rules: [_vm.rules.required],
                              "error-messages": _vm.errors.sales_email,
                              label: "Sales Email",
                            },
                            model: {
                              value: _vm.form.sales_email,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "sales_email", $$v)
                              },
                              expression: "form.sales_email",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.form.brand_id > 0
                        ? _c(
                            "v-col",
                            {
                              staticClass: "pb-0",
                              attrs: { cols: "6", sm: "6" },
                            },
                            [
                              _c("v-select", {
                                attrs: {
                                  items: _vm.merchants,
                                  "item-text": "name",
                                  "item-value": "id",
                                  label: "Merchant",
                                  required: "",
                                  "error-messages": _vm.errors.payment_gateway,
                                },
                                model: {
                                  value: _vm.form.payment_gateway,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.form, "payment_gateway", $$v)
                                  },
                                  expression: "form.payment_gateway",
                                },
                              }),
                            ],
                            1
                          )
                        : _vm._e(),
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
                              "error-messages": _vm.errors.description,
                              label: "Description",
                            },
                            model: {
                              value: _vm.form.description,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "description", $$v)
                              },
                              expression: "form.description",
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
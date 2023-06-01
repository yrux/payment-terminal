"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_UserSubmission_View_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserSubmission/View.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserSubmission/View.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
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

var itemtypeservice = new _services_auth_default__WEBPACK_IMPORTED_MODULE_1__["default"]('user-submissions');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "auth.usersubmissions.view",
  watch: {},
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.$route.params.id) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return itemtypeservice.get(_this.form.id);

            case 3:
              res = _context.sent;
              _this.form = {
                id: _this.$route.params.id,
                name: res.name,
                email: res.email,
                name_to_appear: res.name_to_appear,
                competitors: res.competitors,
                industry: parseInt(res.industry),
                brief_description: res.brief_description,
                brand: res.brand,
                briefform: res.briefform,
                formData: JSON.parse(res.formData)
              };

              _this.bread.push({
                text: "Form Detail",
                to: {
                  name: "auth.usersubmissions.view",
                  params: {
                    id: _this.$route.params.id
                  }
                },
                disabled: false,
                exact: true
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
    downloadForm: function downloadForm() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.$store.commit("updatePrintbtn", true);

                _context2.next = 3;
                return _this2.$nextTick();

              case 3:
                window.print();

                _this2.$store.commit("updatePrintbtn", false);

              case 5:
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
    }
  },
  data: function data() {
    return {
      bread: [{
        text: "Dashboard",
        to: {
          name: "auth.dashboard"
        },
        disabled: false,
        exact: true
      }, {
        text: "User Submissions",
        to: {
          name: "auth.usersubmissions.listing"
        },
        disabled: false,
        exact: true
      }],
      industry: [{
        id: 1,
        text: 'Aerospace'
      }, {
        id: 2,
        text: 'Transport'
      }, {
        id: 3,
        text: 'Computer'
      }, {
        id: 4,
        text: 'Telecommunication'
      }, {
        id: 5,
        text: 'Agriculture'
      }, {
        id: 6,
        text: 'Construction'
      }, {
        id: 7,
        text: 'Education'
      }, {
        id: 8,
        text: 'Pharmaceutical'
      }, {
        id: 9,
        text: 'Food'
      }, {
        id: 10,
        text: 'Health care'
      }, {
        id: 11,
        text: 'Hospitality'
      }, {
        id: 12,
        text: 'Entertainment'
      }, {
        id: 13,
        text: 'News Media'
      }, {
        id: 14,
        text: 'Energy'
      }, {
        id: 15,
        text: 'Manufacturing'
      }, {
        id: 16,
        text: 'Music'
      }, {
        id: 17,
        text: 'Mining'
      }, {
        id: 18,
        text: 'Worldwide web'
      }, {
        id: 19,
        text: 'Electronics'
      }, {
        id: 20,
        text: 'Others'
      }],
      form: {
        id: this.$route.params.id ? this.$route.params.id : 0,
        name: '',
        email: '',
        name_to_appear: '',
        competitors: '',
        industry: 0,
        brief_description: '',
        brand: {},
        briefform: {},
        formData: []
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

/***/ "./resources/js/views/UserSubmission/View.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/UserSubmission/View.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _View_vue_vue_type_template_id_241ed08e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.vue?vue&type=template&id=241ed08e& */ "./resources/js/views/UserSubmission/View.vue?vue&type=template&id=241ed08e&");
/* harmony import */ var _View_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View.vue?vue&type=script&lang=js& */ "./resources/js/views/UserSubmission/View.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _View_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _View_vue_vue_type_template_id_241ed08e___WEBPACK_IMPORTED_MODULE_0__.render,
  _View_vue_vue_type_template_id_241ed08e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/UserSubmission/View.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/UserSubmission/View.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/UserSubmission/View.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_View_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./View.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserSubmission/View.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_View_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/UserSubmission/View.vue?vue&type=template&id=241ed08e&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/UserSubmission/View.vue?vue&type=template&id=241ed08e& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_View_vue_vue_type_template_id_241ed08e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_View_vue_vue_type_template_id_241ed08e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_View_vue_vue_type_template_id_241ed08e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./View.vue?vue&type=template&id=241ed08e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserSubmission/View.vue?vue&type=template&id=241ed08e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserSubmission/View.vue?vue&type=template&id=241ed08e&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserSubmission/View.vue?vue&type=template&id=241ed08e& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
        staticClass: "no-print",
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
            { staticClass: "no-print" },
            [
              _c(
                "v-btn",
                {
                  staticClass: "mb-3 white--text",
                  attrs: { small: "", block: "", color: "blue" },
                  on: { click: _vm.downloadForm },
                },
                [_vm._v("Download Form")]
              ),
              _vm._v(" "),
              _c("v-divider"),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            {
              staticClass: "on-print-font-change",
              attrs: { cols: "12", sm: "12" },
            },
            [
              _c(
                "v-form",
                [
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { staticClass: "pb-0", attrs: { cols: "6", sm: "6" } },
                        [
                          _c("v-text-field", {
                            attrs: { readonly: "", label: "Brand" },
                            model: {
                              value: _vm.form.brand.name,
                              callback: function ($$v) {
                                _vm.$set(_vm.form.brand, "name", $$v)
                              },
                              expression: "form.brand.name",
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
                            attrs: { readonly: "", label: "Brand" },
                            model: {
                              value: _vm.form.briefform.name,
                              callback: function ($$v) {
                                _vm.$set(_vm.form.briefform, "name", $$v)
                              },
                              expression: "form.briefform.name",
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
                            attrs: { readonly: "", label: "Name" },
                            model: {
                              value: _vm.form.name,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "name", $$v)
                              },
                              expression: "form.name",
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
                            attrs: { readonly: "", label: "Email" },
                            model: {
                              value: _vm.form.email,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "email", $$v)
                              },
                              expression: "form.email",
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
                          _c("v-select", {
                            attrs: {
                              readonly: "",
                              items: _vm.industry,
                              "item-text": "text",
                              "item-value": "id",
                              label: "What industry your business falls into?",
                              required: "",
                            },
                            model: {
                              value: _vm.form.industry,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "industry", $$v)
                              },
                              expression: "form.industry",
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
                          _c("v-text-field", {
                            attrs: {
                              readonly: "",
                              label:
                                "Word/Name IF you want to appear (type in exactly as you wanted)",
                            },
                            model: {
                              value: _vm.form.name_to_appear,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "name_to_appear", $$v)
                              },
                              expression: "form.name_to_appear",
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
                              readonly: "",
                              label:
                                "Please provide a brief description of your business. You may also want to list website addresses of your competitors / niche, if any.",
                            },
                            model: {
                              value: _vm.form.brief_description,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "brief_description", $$v)
                              },
                              expression: "form.brief_description",
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
                        [_c("v-divider")],
                        1
                      ),
                      _vm._v(" "),
                      _vm._l(_vm.form.formData, function (formD, formk) {
                        return _c(
                          "v-col",
                          {
                            key: formk,
                            staticClass: "pb-0",
                            attrs: { cols: parseInt(formD.grid) },
                          },
                          [
                            formD.type == "text" ||
                            formD.type == "number" ||
                            formD.type == "color"
                              ? _c("v-text-field", {
                                  attrs: {
                                    readonly: "",
                                    label: formD.placehoolder,
                                  },
                                  model: {
                                    value: formD.value,
                                    callback: function ($$v) {
                                      _vm.$set(formD, "value", $$v)
                                    },
                                    expression: "formD.value",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            formD.type == "textarea"
                              ? _c("v-textarea", {
                                  attrs: {
                                    readonly: "",
                                    label: formD.placehoolder,
                                  },
                                  model: {
                                    value: formD.value,
                                    callback: function ($$v) {
                                      _vm.$set(formD, "value", $$v)
                                    },
                                    expression: "formD.value",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            formD.type == "multiselect"
                              ? _c("v-select", {
                                  attrs: {
                                    items: formD.options.map(function (e) {
                                      return e.label
                                    }),
                                    readonly: "",
                                    label: formD.placehoolder,
                                    multiple: "",
                                    chips: "",
                                  },
                                  model: {
                                    value: formD.value,
                                    callback: function ($$v) {
                                      _vm.$set(formD, "value", $$v)
                                    },
                                    expression: "formD.value",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            formD.type == "multiselectothers"
                              ? _c("v-select", {
                                  attrs: {
                                    items: formD.value,
                                    readonly: "",
                                    label: formD.placehoolder,
                                    multiple: "",
                                    chips: "",
                                  },
                                  model: {
                                    value: formD.value,
                                    callback: function ($$v) {
                                      _vm.$set(formD, "value", $$v)
                                    },
                                    expression: "formD.value",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            formD.type == "select"
                              ? _c("v-select", {
                                  attrs: {
                                    items: formD.options.map(function (e) {
                                      return e.label
                                    }),
                                    readonly: "",
                                    label: formD.placehoolder,
                                  },
                                  model: {
                                    value: formD.value,
                                    callback: function ($$v) {
                                      _vm.$set(formD, "value", $$v)
                                    },
                                    expression: "formD.value",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            formD.type == "selectother"
                              ? _c("v-select", {
                                  attrs: {
                                    items: formD.options.map(function (e) {
                                      return e.label
                                    }),
                                    readonly: "",
                                    label: formD.placehoolder,
                                  },
                                  model: {
                                    value: formD.value,
                                    callback: function ($$v) {
                                      _vm.$set(formD, "value", $$v)
                                    },
                                    expression: "formD.value",
                                  },
                                })
                              : _vm._e(),
                          ],
                          1
                        )
                      }),
                    ],
                    2
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
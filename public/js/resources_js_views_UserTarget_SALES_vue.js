"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_UserTarget_SALES_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserTarget/SALES.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserTarget/SALES.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_auth_otherrequests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/auth/otherrequests */ "./resources/js/services/auth/otherrequests.js");


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "auth.usertargets.buh",
  watch: {},
  computed: {
    buhHasTarget: function buhHasTarget() {
      var _this$currentBuhTarge;

      if ((_this$currentBuhTarge = this.currentBuhTarget) !== null && _this$currentBuhTarge !== void 0 && _this$currentBuhTarge.id) {
        return true;
      }

      return false;
    }
  },
  data: function data() {
    return {
      picker: '',
      users: [],
      loader: false,
      selectUserId: 0,
      target: 0,
      showForm: false,
      targetSaving: false,
      currentBuhTarget: {},
      targetLeftToAssign: 0
    };
  },
  mounted: function mounted() {
    var date = new Date();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    this.picker = date.getFullYear() + '-' + month;
    this.getTargets();
  },
  methods: {
    getTargets: function getTargets() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var date, formData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.loader = true;
                _this.showForm = false;
                date = _this.picker + '-01';
                formData = new FormData();
                formData.append('role_id', 3);
                formData.append('date', date);
                _context.next = 8;
                return _services_auth_otherrequests__WEBPACK_IMPORTED_MODULE_1__["default"].post("user-targets", formData).then(function (e) {
                  return e.data;
                }).then(function (e) {
                  _this.users = e.users;
                  _this.currentBuhTarget = e.currentBuhTarget;
                  _this.targetLeftToAssign = e.targetLeftToAssign;
                });

              case 8:
                _this.loader = false;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    assignTarget: function assignTarget(uid) {
      if (this.buhHasTarget) {
        this.showForm = true;
        this.selectUserId = uid;
      } else {
        this.$store.commit("setNotification", 'Target has not been assigned to you by Admin, Please wait for Admin to assign the target on you');
      }
    },
    assignTargetRequest: function assignTargetRequest() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var date, formData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.targetSaving = true;
                date = _this2.picker + '-01';
                formData = new FormData();
                formData.append('role_id', 3);
                formData.append('user_id', _this2.selectUserId);
                formData.append('for_month', date);
                formData.append('amount', _this2.target);
                _context2.next = 9;
                return _services_auth_otherrequests__WEBPACK_IMPORTED_MODULE_1__["default"].post("set-targets", formData).then(function (e) {
                  return e.data;
                });

              case 9:
                _this2.targetSaving = false;

                _this2.getTargets();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
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

/***/ "./resources/js/views/UserTarget/SALES.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/UserTarget/SALES.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SALES_vue_vue_type_template_id_39ddf6f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SALES.vue?vue&type=template&id=39ddf6f8& */ "./resources/js/views/UserTarget/SALES.vue?vue&type=template&id=39ddf6f8&");
/* harmony import */ var _SALES_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SALES.vue?vue&type=script&lang=js& */ "./resources/js/views/UserTarget/SALES.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SALES_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SALES_vue_vue_type_template_id_39ddf6f8___WEBPACK_IMPORTED_MODULE_0__.render,
  _SALES_vue_vue_type_template_id_39ddf6f8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/UserTarget/SALES.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/UserTarget/SALES.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/UserTarget/SALES.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SALES_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SALES.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserTarget/SALES.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SALES_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/UserTarget/SALES.vue?vue&type=template&id=39ddf6f8&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/UserTarget/SALES.vue?vue&type=template&id=39ddf6f8& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SALES_vue_vue_type_template_id_39ddf6f8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SALES_vue_vue_type_template_id_39ddf6f8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SALES_vue_vue_type_template_id_39ddf6f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SALES.vue?vue&type=template&id=39ddf6f8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserTarget/SALES.vue?vue&type=template&id=39ddf6f8&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserTarget/SALES.vue?vue&type=template&id=39ddf6f8&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/UserTarget/SALES.vue?vue&type=template&id=39ddf6f8& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
      _c(
        "v-row",
        [
          _c(
            "v-col",
            { attrs: { cols: "4" } },
            [
              _c("v-date-picker", {
                attrs: { "full-width": "", type: "month" },
                on: { change: _vm.getTargets },
                model: {
                  value: _vm.picker,
                  callback: function ($$v) {
                    _vm.picker = $$v
                  },
                  expression: "picker",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "8" } },
            [
              _vm.buhHasTarget
                ? _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-chip",
                        {
                          staticClass: "ma-2",
                          attrs: { color: "green", "text-color": "white" },
                        },
                        [
                          _c("strong", [
                            _vm._v("$" + _vm._s(_vm.targetLeftToAssign)),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "ml-3" }, [
                            _vm._v("Target Left to Assign/Left for you"),
                          ]),
                        ]
                      ),
                    ],
                    1
                  )
                : _c(
                    "v-col",
                    [
                      _c(
                        "v-chip",
                        {
                          staticClass: "ma-2",
                          attrs: { color: "red", "text-color": "white" },
                        },
                        [
                          _vm._v(
                            "\n                    Target Not Yet Assigned to you\n                "
                          ),
                        ]
                      ),
                    ],
                    1
                  ),
              _vm._v(" "),
              _c("v-simple-table", {
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function () {
                      return [
                        _c("thead", [
                          _c("tr", [
                            _c("th", { staticClass: "text-left" }, [
                              _vm._v(
                                "\n                                Name\n                            "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("th", { staticClass: "text-left" }, [
                              _vm._v(
                                "\n                                Target\n                            "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("th", { staticClass: "text-left" }, [
                              _vm._v(
                                "\n                                Achieved\n                            "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("th", { staticClass: "text-left" }),
                          ]),
                        ]),
                        _vm._v(" "),
                        !_vm.loader
                          ? _c(
                              "tbody",
                              _vm._l(_vm.users, function (user) {
                                return _c("tr", { key: user.id }, [
                                  _c("td", [_vm._v(_vm._s(user.name))]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(
                                      _vm._s(
                                        user.target ? user.target.amount : 0
                                      )
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [_vm._v(_vm._s(user.achieved))]),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    [
                                      _c(
                                        "v-tooltip",
                                        {
                                          attrs: { top: "" },
                                          scopedSlots: _vm._u(
                                            [
                                              {
                                                key: "activator",
                                                fn: function (ref) {
                                                  var on = ref.on
                                                  var attrs = ref.attrs
                                                  return [
                                                    _c(
                                                      "v-btn",
                                                      _vm._g(
                                                        _vm._b(
                                                          {
                                                            attrs: {
                                                              color: "info",
                                                              fab: "",
                                                              "x-small": "",
                                                              dark: "",
                                                            },
                                                            on: {
                                                              click: function (
                                                                $event
                                                              ) {
                                                                return _vm.assignTarget(
                                                                  user.id
                                                                )
                                                              },
                                                            },
                                                          },
                                                          "v-btn",
                                                          attrs,
                                                          false
                                                        ),
                                                        on
                                                      ),
                                                      [
                                                        _c("v-icon", [
                                                          _vm._v("mdi-target"),
                                                        ]),
                                                      ],
                                                      1
                                                    ),
                                                  ]
                                                },
                                              },
                                            ],
                                            null,
                                            true
                                          ),
                                        },
                                        [
                                          _vm._v(" "),
                                          _c("span", [
                                            _vm._v("Assign/Update Target"),
                                          ]),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                ])
                              }),
                              0
                            )
                          : _c(
                              "tbody",
                              _vm._l(10, function (k) {
                                return _c("tr", { key: k }, [
                                  _c(
                                    "td",
                                    {
                                      staticClass: "pa-0",
                                      attrs: { colspan: "3" },
                                    },
                                    [
                                      _c("v-skeleton-loader", {
                                        attrs: { type: "list-item" },
                                      }),
                                    ],
                                    1
                                  ),
                                ])
                              }),
                              0
                            ),
                      ]
                    },
                    proxy: true,
                  },
                ]),
              }),
              _vm._v(" "),
              _vm.showForm
                ? _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [_c("v-divider")],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "6" } },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.users,
                              "item-text": "name",
                              "item-value": "id",
                              label: "User",
                              required: "",
                            },
                            model: {
                              value: _vm.selectUserId,
                              callback: function ($$v) {
                                _vm.selectUserId = $$v
                              },
                              expression: "selectUserId",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "6" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              type: "number",
                              step: "any",
                              label: "Input Target Amount $",
                            },
                            model: {
                              value: _vm.target,
                              callback: function ($$v) {
                                _vm.target = $$v
                              },
                              expression: "target",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                loading: _vm.targetSaving,
                                disabled: _vm.targetSaving,
                                color: "teal",
                                elevation: "1",
                                large: "",
                                raised: "",
                                block: "",
                              },
                              on: { click: _vm.assignTargetRequest },
                            },
                            [
                              _vm._v(
                                "\n                        Assign Target\n                    "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  )
                : _vm._e(),
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
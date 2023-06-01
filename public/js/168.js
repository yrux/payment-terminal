"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[168],{6573:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{Z:()=>a});var s=n(9669);const a=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,a;return t=e,(n=[{key:"get",value:function(e){return s.get("/api/".concat(e)).then((function(e){return e})).catch((function(e){return e}))}},{key:"post",value:function(e,t){return s.post("/api/".concat(e),t).then((function(e){return e})).catch((function(e){return e}))}}])&&r(t.prototype,n),a&&r(t,a),Object.defineProperty(t,"prototype",{writable:!1}),e}())},168:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var r=n(7757),s=n.n(r),a=n(6573);function i(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function u(e,t,n,r,s,a,i){try{var o=e[a](i),u=o.value}catch(e){return void n(e)}o.done?t(u):Promise.resolve(u).then(r,s)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function i(e){u(a,r,s,i,o,"next",e)}function o(e){u(a,r,s,i,o,"throw",e)}i(void 0)}))}}const l={mounted:function(){var e=this;return c(s().mark((function t(){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.Z.get("support-messages-thread-admin").then((function(e){return e.data}));case 2:e.threads=t.sent,setInterval((function(){a.Z.get("support-messages-thread-admin").then((function(e){return e.data})).then((function(t){e.threads=[],e.threads=t}))}),4e3);case 4:case"end":return t.stop()}}),t)})))()},data:function(){return{threads:[],selectedItem:null,messages:[],messagePages:0,messagePage:1,fetchMore:!0,inputDisabled:!1,messageBox:""}},watch:{selectedItem:function(){this.fetchMore=!0,this.messages=[],this.messagePages=0,this.messagePage=0,this.getMessage()}},computed:{user:function(){return this.$store.getters.loggedInUser}},methods:{getMessage:function(){var e=this;1==this.fetchMore&&a.Z.get("support-messages/"+this.threads[this.selectedItem].id+"?page="+this.messagePage).then((function(e){return e.data})).then((function(t){0==t.data.length&&(e.fetchMore=!1),e.messagePages=t.last_page,e.messagePage=t.current_page,e.messages=[].concat(i(t.data),i(e.messages))}))},readMessage:function(e){if(13==e.keyCode&&e.shiftKey){e.preventDefault();var t=this.messageBox;return this.sendMessage(t),!1}},sendMessage:function(e){var t=this;return c(s().mark((function n(){var r;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.inputDisabled=!0,(r=new FormData).append("message",e),n.next=5,a.Z.post("support-messages/"+t.threads[t.selectedItem].id,r).then((function(e){return e.data.data})).then((function(e){t.messages.push(e)}));case 5:t.messageBox="",t.inputDisabled=!1;case 7:case"end":return n.stop()}}),n)})))()}}};const m=(0,n(1900).Z)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{staticClass:"pa-4",attrs:{cols:"3"}},[n("v-list",{attrs:{elevation:"3"}},[n("v-list-item-group",{attrs:{color:"primary"},model:{value:e.selectedItem,callback:function(t){e.selectedItem=t},expression:"selectedItem"}},e._l(e.threads,(function(t){return n("v-list-item",{key:t.id},[n("v-list-item-avatar",[n("v-img",{attrs:{src:t.user_id==e.user.id?t.to.image_url:t.user.image_url}})],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.user_id==e.user.id?t.to.name:t.user.name)}})],1),e._v(" "),n("v-list-item-icon",[n("v-badge",{attrs:{content:t.messages_count,value:t.messages_count,color:"green",overlap:""}},[n("v-icon",[e._v("\n                                    mdi-message-outline\n                                ")])],1)],1)],1)})),1)],1)],1),e._v(" "),n("v-col",{staticClass:"pa-4",attrs:{cols:"9"}},[n("v-list",e._l(e.messages,(function(t){return n("v-list-item",{key:t.id},[t.user_id!=e.user.id?n("v-list-item-avatar",[n("v-img",{attrs:{src:t.user.image_url}})],1):e._e(),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{class:t.user_id==e.user.id?"text-right":"",domProps:{innerHTML:e._s(t.message)}})],1),e._v(" "),t.user_id==e.user.id?n("v-list-item-avatar",[n("v-img",{attrs:{src:t.user.image_url}})],1):e._e()],1)})),1),e._v(" "),parseInt(e.selectedItem)>=0?n("v-row",[n("v-col",{attrs:{cols:"12",sm:"12"}},[n("v-textarea",{attrs:{clearable:"",disabled:e.inputDisabled,label:"Type Message","auto-grow":"",outlined:"",rows:"1","row-height":"15",hint:"Shift+Enter to Send","persistent-hint":""},on:{keydown:e.readMessage},model:{value:e.messageBox,callback:function(t){e.messageBox=t},expression:"messageBox"}})],1)],1):e._e()],1)],1)],1)}),[],!1,null,null,null).exports}}]);
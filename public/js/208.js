"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[208],{1369:(e,t,r)=>{r.d(t,{Z:()=>u});var a=r(7757),n=r.n(a);function s(e,t,r,a,n,s,o){try{var i=e[s](o),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(a,n)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(a,n){var o=e.apply(t,r);function i(e){s(o,a,n,i,c,"next",e)}function c(e){s(o,a,n,i,c,"throw",e)}i(void 0)}))}}function i(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var c=r(9669);const u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseuri=t}var t,r,a,s,u;return t=e,r=[{key:"getlist",value:function(e){return c.get("/api/".concat(this.baseuri).concat(null!=e?e:"")).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"create",value:(u=o(n().mark((function e(t){var r;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.post("/api/"+this.baseuri,t).then((function(e){return{status:1,data:e.data.data}})).catch((function(e){return{status:0,data:e.response.data.errors}}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e,this)}))),function(e){return u.apply(this,arguments)})},{key:"delete",value:function(e){e.query;var t=e.id;return c.delete("/api/".concat(this.baseuri,"/").concat(t))}},{key:"get",value:function(e){return c.get("/api/".concat(this.baseuri,"/").concat(e)).then((function(e){return e.data.data}))}},{key:"getProductData",value:function(e,t){return c.get("/api/".concat(this.baseuri,"/").concat(e,"/").concat(t)).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"update",value:(s=o(n().mark((function e(t,r){var a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.append("_method","put"),e.next=3,c.post("/api/"+this.baseuri+"/"+r,t).then((function(e){return{status:1,data:e.data.data}})).catch((function(e){return{status:0,data:e.response.data.errors}}));case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e,this)}))),function(e,t){return s.apply(this,arguments)})}],r&&i(t.prototype,r),a&&i(t,a),Object.defineProperty(t,"prototype",{writable:!1}),e}()},8208:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var a=r(7757),n=r.n(a);function s(e,t,r,a,n,s,o){try{var i=e[s](o),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(a,n)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(a,n){var o=e.apply(t,r);function i(e){s(o,a,n,i,c,"next",e)}function c(e){s(o,a,n,i,c,"throw",e)}i(void 0)}))}}var i=new(r(1369).Z)("rental-servers");var c;const u={name:"auth.rentalservers.add",watch:{},mounted:function(){var e=this;return o(n().mark((function t(){var r;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$route.params.id){t.next=8;break}return t.next=3,i.get(e.form.id);case 3:r=t.sent,e.form={name:r.name?r.name:"",server_ip:r.server_ip?r.server_ip:"",data_center:r.data_center?r.data_center:"",category:r.category?r.category:0,id:e.$route.params.id},e.bread.push({text:"Edit",to:{name:"auth.rentalservers.edit",params:{id:e.$route.params.id}},disabled:!1,exact:!0}),t.next=9;break;case 8:e.bread.push({text:"Add",to:{name:"auth.rentalservers.add"},disabled:!1,exact:!0});case 9:case"end":return t.stop()}}),t)})))()},methods:{resetError:function(){this.errors={name:[],server_ip:[],data_center:[],category:[]}},addpermission:(c=o(n().mark((function e(){var t,r;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.resetError(),!this.$refs.form.validate()){e.next=19;break}if(this.btnloading=!0,(t=new FormData).append("name",this.form.name),t.append("server_ip",this.form.server_ip),t.append("data_center",this.form.data_center),t.append("category",this.form.category),this.btnloading=!1,!(this.form.id>0)){e.next=15;break}return e.next=12,i.update(t,this.form.id);case 12:r=e.sent,e.next=18;break;case 15:return e.next=17,i.create(t);case 17:r=e.sent;case 18:r.status?this.$router.push({name:"auth.rentalservers.listing"}):(r.data.name&&(this.errors.name=r.data.name),r.data.server_ip&&(this.errors.server_ip=r.data.server_ip),r.data.data_center&&(this.errors.data_center=r.data.data_center),r.data.category&&(this.errors.category=r.data.category));case 19:case"end":return e.stop()}}),e,this)}))),function(){return c.apply(this,arguments)})},computed:{user:function(){return this.$store.getters.loggedInUser}},data:function(){return{form:{id:this.$route.params.id?this.$route.params.id:0,name:"",server_ip:"",data_center:"",category:0},categories:[{id:1,text:"Dialers"},{id:2,text:"Broadcasters"},{id:3,text:"Switch"}],errors:{name:[],server_ip:[],data_center:[],category:[]},bread:[{text:"Dashboard",to:{name:"auth.dashboard"},disabled:!1,exact:!0},{text:"Rental Servers",to:{name:"auth.rentalservers.listing"},disabled:!1,exact:!0}],loading:!1,btnloading:!1,rules:{required:function(e){return!!e||"Required."}}}}};const d=(0,r(1900).Z)(u,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-breadcrumbs",{attrs:{items:e.bread},scopedSlots:e._u([{key:"divider",fn:function(){return[r("v-icon",[e._v("mdi-forward")])]},proxy:!0}])}),e._v(" "),r("v-row",{staticClass:"pa-10 rounded elevation-10",attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"12",sm:"12"}},[r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[r("v-row",[r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:[e.rules.required],"error-messages":e.errors.name,label:"Name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-select",{attrs:{items:e.categories,"item-text":"text","item-value":"id",label:"Category",required:"","error-messages":e.errors.category},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:[e.rules.required],"error-messages":e.errors.data_center,label:"Data Center"},model:{value:e.form.data_center,callback:function(t){e.$set(e.form,"data_center",t)},expression:"form.data_center"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:[e.rules.required],"error-messages":e.errors.server_ip,label:"IP"},model:{value:e.form.server_ip,callback:function(t){e.$set(e.form,"server_ip",t)},expression:"form.server_ip"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"12",sm:"12"}},[r("v-btn",{attrs:{color:"secondary",elevation:"1",large:"",raised:"",loading:e.btnloading,disabled:e.btnloading},on:{click:e.addpermission}},[e._v(e._s(e.form.id>0?"Update":"Add"))])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[181],{1369:(e,t,r)=>{r.d(t,{Z:()=>c});var a=r(7757),s=r.n(a);function n(e,t,r,a,s,n,i){try{var o=e[n](i),u=o.value}catch(e){return void r(e)}o.done?t(u):Promise.resolve(u).then(a,s)}function i(e){return function(){var t=this,r=arguments;return new Promise((function(a,s){var i=e.apply(t,r);function o(e){n(i,a,s,o,u,"next",e)}function u(e){n(i,a,s,o,u,"throw",e)}o(void 0)}))}}function o(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var u=r(9669);const c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseuri=t}var t,r,a,n,c,m;return t=e,r=[{key:"getlist",value:function(e){return u.get("/api/".concat(this.baseuri).concat(null!=e?e:"")).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"create",value:(m=i(s().mark((function e(t){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.append("_method","POST"),e.next=3,u.post("/api/"+this.baseuri+"/",t).then((function(e){return{status:1,data:e.data.data}})).catch((function(e){return{status:0,data:e.response.data.errors}}));case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e,this)}))),function(e){return m.apply(this,arguments)})},{key:"delete",value:function(e){e.query;var t=e.id;return u.delete("/api/".concat(this.baseuri,"/").concat(t))}},{key:"get",value:function(e){return u.get("/api/".concat(this.baseuri,"/").concat(e)).then((function(e){return e.data.data}))}},{key:"getw",value:function(e){return u.get("/api/".concat(this.baseuri,"/").concat(e)).then((function(e){return e.data}))}},{key:"getProductData",value:function(e,t){return u.get("/api/".concat(this.baseuri,"/").concat(e,"/").concat(t)).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"update",value:(c=i(s().mark((function e(t,r){var a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.append("_method","PUT"),e.next=3,u.post("/api/"+this.baseuri+"/"+r,t).then((function(e){return{status:1,data:e.data.data}})).catch((function(e){return{status:0,data:e.response.data.errors}}));case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e,this)}))),function(e,t){return c.apply(this,arguments)})},{key:"getQrcode",value:(n=i(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u({url:"/api/"+this.baseuri,method:"GET",responseType:"text/plain"}).then((function(e){return e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)}))),function(e){return n.apply(this,arguments)})}],r&&o(t.prototype,r),a&&o(t,a),Object.defineProperty(t,"prototype",{writable:!1}),e}()},1181:(e,t,r)=>{r.r(t),r.d(t,{default:()=>f});var a=r(7757),s=r.n(a),n=r(1369);function i(e,t,r,a,s,n,i){try{var o=e[n](i),u=o.value}catch(e){return void r(e)}o.done?t(u):Promise.resolve(u).then(a,s)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(a,s){var n=e.apply(t,r);function o(e){i(n,a,s,o,u,"next",e)}function u(e){i(n,a,s,o,u,"throw",e)}o(void 0)}))}}var u=new n.Z("payments"),c=new n.Z("user"),m=new n.Z("brand"),d=(new n.Z("merchants"),new n.Z("m-flags"));var l;const p={name:"auth.payments.add",watch:{},mounted:function(){var e=this;return o(s().mark((function t(){var r;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.getlist("").then((function(e){return e.data}));case 2:return e.users=t.sent,t.next=5,m.getlist("").then((function(e){return e.data}));case 5:return e.brands=t.sent,t.next=8,d.getlist("?flag_type=SERVICESTYPES").then((function(e){return e.data}));case 8:if(e.services=t.sent,!e.$route.params.id){t.next=17;break}return t.next=12,u.get(e.form.id);case 12:r=t.sent,e.form={brand_id:r.brand_id?r.brand_id:0,user_id:r.user_id?r.user_id:0,payment_gateway:r.payment_gateway?r.payment_gateway:0,services:r.services?r.services.split(","):"",amount:r.amount?r.amount:0,customer_email:r.customer_email?r.customer_email:"",customer_name:r.customer_name?r.customer_name:"",description:r.description?r.description:"",sales_email:r.sales_email?r.sales_email:"",id:e.$route.params.id},e.bread.push({text:"Edit",to:{name:"auth.payments.edit",params:{id:e.$route.params.id}},disabled:!1,exact:!0}),t.next=18;break;case 17:e.bread.push({text:"Add",to:{name:"auth.payments.add"},disabled:!1,exact:!0});case 18:case"end":return t.stop()}}),t)})))()},methods:{resetError:function(){this.errors={brand_id:[],user_id:[],services:[],amount:[],customer_name:[],customer_email:[],payment_gateway:[],description:[],sales_email:[]}},addpermission:(l=o(s().mark((function e(){var t,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.resetError(),!this.$refs.form.validate()){e.next=24;break}if(this.btnloading=!0,(t=new FormData).append("brand_id",this.form.brand_id),t.append("user_id",this.user.id),t.append("services",this.form.services),t.append("amount",this.form.amount),t.append("sales_email",this.form.sales_email),t.append("payment_gateway",this.form.payment_gateway),t.append("customer_email",this.form.customer_email),t.append("customer_name",this.form.customer_name),t.append("description",this.form.description),this.btnloading=!1,!(this.form.id>0)){e.next=20;break}return e.next=17,u.update(t,this.form.id);case 17:r=e.sent,e.next=23;break;case 20:return e.next=22,u.create(t);case 22:r=e.sent;case 23:r.status?this.$router.push({name:"auth.payments.listing"}):(r.data.brand_id&&(this.errors.brand_id=r.data.brand_id),r.data.user_id&&(this.errors.user_id=r.data.user_id),r.data.services&&(this.errors.services=r.data.services),r.data.amount&&(this.errors.amount=r.data.amount),r.data.customer_email&&(this.errors.customer_email=r.data.customer_email),r.data.customer_name&&(this.errors.customer_name=r.data.customer_name),r.data.payment_gateway&&(this.errors.payment_gateway=r.data.payment_gateway),r.data.description&&(this.errors.description=r.data.description),r.data.sales_email&&(this.errors.sales_email=r.data.sales_email));case 24:case"end":return e.stop()}}),e,this)}))),function(){return l.apply(this,arguments)}),getExistingCustomer:function(){}},computed:{user:function(){return this.$store.getters.loggedInUser},paymentGateways:function(){return this.$store.getters.paymentGateways},merchants:function(){var e=this;return parseInt(this.form.brand_id)>0?this.brands.find((function(t){return t.id==e.form.brand_id})).merchants:[]}},data:function(){return{brands:[],users:[],services:[],form:{id:this.$route.params.id?this.$route.params.id:0,brand_id:0,user_id:0,services:[],amount:0,payment_gateway:0,customer_name:"",customer_email:"",description:"",sales_email:""},errors:{brand_id:[],user_id:[],services:[],amount:[],customer_name:[],customer_email:[],description:[],payment_gateway:[]},bread:[{text:"Dashboard",to:{name:"auth.dashboard"},disabled:!1,exact:!0},{text:"Payments",to:{name:"auth.payments.listing"},disabled:!1,exact:!0}],loading:!1,btnloading:!1,rules:{required:function(e){return!!e||"Required."}}}}};const f=(0,r(1900).Z)(p,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-breadcrumbs",{attrs:{items:e.bread},scopedSlots:e._u([{key:"divider",fn:function(){return[r("v-icon",[e._v("mdi-forward")])]},proxy:!0}])}),e._v(" "),r("v-row",{staticClass:"pa-10 rounded elevation-10",attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"12",sm:"12"}},[r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[r("v-row",[r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-select",{attrs:{items:e.brands,"item-text":"name","item-value":"id",label:"Brand",required:"","error-messages":e.errors.brand_id},model:{value:e.form.brand_id,callback:function(t){e.$set(e.form,"brand_id",t)},expression:"form.brand_id"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-text-field",{attrs:{type:"number",rules:[e.rules.required],"error-messages":e.errors.amount,label:"Amount"},model:{value:e.form.amount,callback:function(t){e.$set(e.form,"amount",t)},expression:"form.amount"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-select",{attrs:{items:e.services,"item-text":"flag_value",multiple:"","item-value":"flag_value",label:"Services",required:"","error-messages":e.errors.services},model:{value:e.form.services,callback:function(t){e.$set(e.form,"services",t)},expression:"form.services"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:[e.rules.required],"error-messages":e.errors.customer_email,label:"Customer Email"},model:{value:e.form.customer_email,callback:function(t){e.$set(e.form,"customer_email",t)},expression:"form.customer_email"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:[e.rules.required],"error-messages":e.errors.customer_name,label:"Customer Name"},model:{value:e.form.customer_name,callback:function(t){e.$set(e.form,"customer_name",t)},expression:"form.customer_name"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-text-field",{attrs:{rules:[e.rules.required],"error-messages":e.errors.sales_email,label:"Sales Email"},model:{value:e.form.sales_email,callback:function(t){e.$set(e.form,"sales_email",t)},expression:"form.sales_email"}})],1),e._v(" "),e.form.brand_id>0?r("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[r("v-select",{attrs:{items:e.merchants,"item-text":"name","item-value":"id",label:"Merchant",required:"","error-messages":e.errors.payment_gateway},model:{value:e.form.payment_gateway,callback:function(t){e.$set(e.form,"payment_gateway",t)},expression:"form.payment_gateway"}})],1):e._e(),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"12",sm:"12"}},[r("v-textarea",{attrs:{"error-messages":e.errors.description,label:"Description"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),e._v(" "),r("v-col",{staticClass:"pb-0",attrs:{cols:"12",sm:"12"}},[r("v-btn",{attrs:{color:"secondary",elevation:"1",large:"",raised:"",loading:e.btnloading,disabled:e.btnloading},on:{click:e.addpermission}},[e._v(e._s(e.form.id>0?"Update":"Add"))])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);
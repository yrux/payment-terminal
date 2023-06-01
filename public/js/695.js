"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[695],{1369:(e,t,a)=>{a.d(t,{Z:()=>l});var r=a(7757),n=a.n(r);function o(e,t,a,r,n,o,s){try{var i=e[o](s),u=i.value}catch(e){return void a(e)}i.done?t(u):Promise.resolve(u).then(r,n)}function s(e){return function(){var t=this,a=arguments;return new Promise((function(r,n){var s=e.apply(t,a);function i(e){o(s,r,n,i,u,"next",e)}function u(e){o(s,r,n,i,u,"throw",e)}i(void 0)}))}}function i(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=a(9669);const l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseuri=t}var t,a,r,o,l,c;return t=e,a=[{key:"getlist",value:function(e){return u.get("/api/".concat(this.baseuri).concat(null!=e?e:"")).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"create",value:(c=s(n().mark((function e(t){var a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.post("/api/"+this.baseuri,t).then((function(e){return{status:1,data:e.data.data}})).catch((function(e){return{status:0,data:e.response.data.errors}}));case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e,this)}))),function(e){return c.apply(this,arguments)})},{key:"delete",value:function(e){e.query;var t=e.id;return u.delete("/api/".concat(this.baseuri,"/").concat(t))}},{key:"get",value:function(e){return u.get("/api/".concat(this.baseuri,"/").concat(e)).then((function(e){return e.data.data}))}},{key:"getProductData",value:function(e,t){return u.get("/api/".concat(this.baseuri,"/").concat(e,"/").concat(t)).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"update",value:(l=s(n().mark((function e(t,a){var r;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.append("_method","put"),e.next=3,u.post("/api/"+this.baseuri+"/"+a,t).then((function(e){return{status:1,data:e.data.data}})).catch((function(e){return{status:0,data:e.response.data.errors}}));case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e,this)}))),function(e,t){return l.apply(this,arguments)})},{key:"getQrcode",value:(o=s(n().mark((function e(t){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u({url:"/api/"+this.baseuri,method:"GET",responseType:"text/plain"}).then((function(e){return e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)}))),function(e){return o.apply(this,arguments)})}],a&&i(t.prototype,a),r&&i(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}()},5695:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var r=a(7757),n=a.n(r);function o(e,t,a,r,n,o,s){try{var i=e[o](s),u=i.value}catch(e){return void a(e)}i.done?t(u):Promise.resolve(u).then(r,n)}var s=new(a(1369).Z)("user-submissions");const i={name:"auth.usersubmissions.view",watch:{},mounted:function(){var e,t=this;return(e=n().mark((function e(){var a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.$route.params.id){e.next=6;break}return e.next=3,s.get(t.form.id);case 3:a=e.sent,t.form={id:t.$route.params.id,name:a.name,email:a.email,name_to_appear:a.name_to_appear,competitors:a.competitors,industry:parseInt(a.industry),brief_description:a.brief_description,brand:a.brand,briefform:a.briefform,formData:JSON.parse(a.formData)},t.bread.push({text:"Form Detail",to:{name:"auth.usersubmissions.view",params:{id:t.$route.params.id}},disabled:!1,exact:!0});case 6:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(r,n){var s=e.apply(t,a);function i(e){o(s,r,n,i,u,"next",e)}function u(e){o(s,r,n,i,u,"throw",e)}i(void 0)}))})()},methods:{},computed:{user:function(){return this.$store.getters.loggedInUser}},data:function(){return{bread:[{text:"Dashboard",to:{name:"auth.dashboard"},disabled:!1,exact:!0},{text:"User Submissions",to:{name:"auth.usersubmissions.listing"},disabled:!1,exact:!0}],industry:[{id:1,text:"Aerospace"},{id:2,text:"Transport"},{id:3,text:"Computer"},{id:4,text:"Telecommunication"},{id:5,text:"Agriculture"},{id:6,text:"Construction"},{id:7,text:"Education"},{id:8,text:"Pharmaceutical"},{id:9,text:"Food"},{id:10,text:"Health care"},{id:11,text:"Hospitality"},{id:12,text:"Entertainment"},{id:13,text:"News Media"},{id:14,text:"Energy"},{id:15,text:"Manufacturing"},{id:16,text:"Music"},{id:17,text:"Mining"},{id:18,text:"Worldwide web"},{id:19,text:"Electronics"},{id:20,text:"Others"}],form:{id:this.$route.params.id?this.$route.params.id:0,name:"",email:"",name_to_appear:"",competitors:"",industry:0,brief_description:"",brand:{},briefform:{},formData:[]}}}};const u=(0,a(1900).Z)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-breadcrumbs",{attrs:{items:e.bread},scopedSlots:e._u([{key:"divider",fn:function(){return[a("v-icon",[e._v("mdi-forward")])]},proxy:!0}])}),e._v(" "),a("v-row",{staticClass:"pa-10 rounded elevation-10",attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-form",[a("v-row",[a("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[a("v-text-field",{attrs:{readonly:"",label:"Brand"},model:{value:e.form.brand.name,callback:function(t){e.$set(e.form.brand,"name",t)},expression:"form.brand.name"}})],1),e._v(" "),a("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[a("v-text-field",{attrs:{readonly:"",label:"Brand"},model:{value:e.form.briefform.name,callback:function(t){e.$set(e.form.briefform,"name",t)},expression:"form.briefform.name"}})],1),e._v(" "),a("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[a("v-text-field",{attrs:{readonly:"",label:"Name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[a("v-text-field",{attrs:{readonly:"",label:"Email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),a("v-col",{staticClass:"pb-0",attrs:{cols:"6",sm:"6"}},[a("v-select",{attrs:{readonly:"",items:e.industry,"item-text":"text","item-value":"id",label:"What industry your business falls into?",required:""},model:{value:e.form.industry,callback:function(t){e.$set(e.form,"industry",t)},expression:"form.industry"}})],1),e._v(" "),a("v-col",{staticClass:"pb-0",attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{readonly:"",label:"Word/Name IF you want to appear (type in exactly as you wanted)"},model:{value:e.form.name_to_appear,callback:function(t){e.$set(e.form,"name_to_appear",t)},expression:"form.name_to_appear"}})],1),e._v(" "),a("v-col",{staticClass:"pb-0",attrs:{cols:"12",sm:"12"}},[a("v-textarea",{attrs:{readonly:"",label:"Please provide a brief description of your business. You may also want to list website addresses of your competitors / niche, if any."},model:{value:e.form.brief_description,callback:function(t){e.$set(e.form,"brief_description",t)},expression:"form.brief_description"}})],1),e._v(" "),a("v-col",{staticClass:"pb-0",attrs:{cols:"12",sm:"12"}},[a("v-divider")],1),e._v(" "),e._l(e.form.formData,(function(t,r){return a("v-col",{key:r,staticClass:"pb-0",attrs:{cols:parseInt(t.grid)}},["text"==t.type||"number"==t.type||"color"==t.type?a("v-text-field",{attrs:{readonly:"",label:t.placehoolder},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"formD.value"}}):e._e(),e._v(" "),"textarea"==t.type?a("v-textarea",{attrs:{readonly:"",label:t.placehoolder},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"formD.value"}}):e._e(),e._v(" "),"multiselect"==t.type?a("v-select",{attrs:{items:t.options.map((function(e){return e.label})),readonly:"",label:t.placehoolder,multiple:"",chips:""},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"formD.value"}}):e._e(),e._v(" "),"select"==t.type?a("v-select",{attrs:{items:t.options.map((function(e){return e.label})),readonly:"",label:t.placehoolder},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"formD.value"}}):e._e(),e._v(" "),"selectother"==t.type?a("v-select",{attrs:{items:t.options.map((function(e){return e.label})),readonly:"",label:t.placehoolder},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"formD.value"}}):e._e()],1)}))],2)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[890],{890:(t,e,n)=>{n.r(e),n.d(e,{default:()=>d});var s=n(7757),a=n.n(s),o=n(2986);function i(t,e,n,s,a,o,i){try{var r=t[o](i),l=r.value}catch(t){return void n(t)}r.done?e(l):Promise.resolve(l).then(s,a)}var r,l;const c={name:"Login",components:{},mounted:function(){this.$nextTick((function(){}))},data:function(){return{loader:null,loading:!1,btnloading:!1,snackbar:!1,loggedinemail:"",loggedinpassword:"",show3:!1,password:"Password",erorrs:{email:"",password:""},rules:{required:function(t){return!!t||"Required."},email:function(t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||"Invalid e-mail."}}}},methods:{dologin:(r=a().mark((function t(){var e,n,s;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.$refs.form.validate()){t.next=20;break}return this.btnloading=!0,t.next=4,o.Z.dologin(this.loggedinemail,this.loggedinpassword);case 4:if(e=t.sent,this.btnloading=!1,!e.data){t.next=20;break}if(!e.status){t.next=18;break}return this.$store.commit("setLoginStatus",!0),this.$store.commit("setAuthToken",e.data.token),t.next=12,o.Z.me();case 12:n=t.sent,this.$store.commit("setloggedInUser",n),n.permissions.length>0&&(s=n.permissions.map((function(t){return t.permission_id})),this.$store.commit("setPermissions",s)),this.$router.push({name:"auth.panel"}),t.next=20;break;case 18:this.erorrs.email=e.data,this.snackbar=!0;case 20:case"end":return t.stop()}}),t,this)})),l=function(){var t=this,e=arguments;return new Promise((function(n,s){var a=r.apply(t,e);function o(t){i(a,n,s,o,l,"next",t)}function l(t){i(a,n,s,o,l,"throw",t)}o(void 0)}))},function(){return l.apply(this,arguments)})},watch:{}};const d=(0,n(1900).Z)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{staticClass:"pa-10",attrs:{"no-gutters":""}},[n("v-col",{staticClass:"text-center align-content-center"},[n("p",[t._v("Welcome to,")]),t._v(" "),n("h1",[t._v("Brief From")])])],1),t._v(" "),n("v-container",{staticClass:"grey lighten-5 loginscreen col-md-6"},[n("v-card",{staticClass:"d-flex align-content-center flex-wrap",staticStyle:{padding:"22px"},attrs:{outlined:""}},[n("v-row",[n("v-col",{attrs:{md:"12"}},[n("div",{staticClass:"justify-center"},[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[n("v-text-field",{attrs:{rules:[t.rules.required,t.rules.email],label:"Email",solo:"",clearable:""},model:{value:t.loggedinemail,callback:function(e){t.loggedinemail=e},expression:"loggedinemail"}}),t._v(" "),n("v-text-field",{staticClass:"input-group--focused",attrs:{"append-icon":t.show3?"mdi-eye":"mdi-eye-off",rules:[t.rules.required],type:t.show3?"text":"password",name:"input-10-2",label:"Password",value:"",solo:"",clearable:""},on:{"click:append":function(e){t.show3=!t.show3}},model:{value:t.loggedinpassword,callback:function(e){t.loggedinpassword=e},expression:"loggedinpassword"}}),t._v(" "),n("v-btn",{staticClass:"col",attrs:{elevation:"1",color:"primary",large:"",raised:"",loading:t.btnloading,disabled:t.btnloading},on:{click:t.dologin}},[t._v("Login")])],1)],1)])],1)],1),t._v(" "),n("v-snackbar",{scopedSlots:t._u([{key:"action",fn:function(e){var s=e.attrs;return[n("v-btn",t._b({attrs:{color:"pink",text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v("\n\t\t\t\t\tClose\n\t\t\t\t")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n\t\t\t"+t._s(t.erorrs.email)+"\n\n\t\t\t")])],1)],1)}),[],!1,null,null,null).exports}}]);
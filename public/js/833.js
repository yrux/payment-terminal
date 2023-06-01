"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[833],{6573:(t,e,n)=>{function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}n.d(e,{Z:()=>s});var r=n(9669);const s=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,s;return e=t,(n=[{key:"get",value:function(t){return r.get("/api/".concat(t)).then((function(t){return t})).catch((function(t){return t}))}},{key:"post",value:function(t,e){return r.post("/api/".concat(t),e).then((function(t){return t})).catch((function(t){return t}))}}])&&a(e.prototype,n),s&&a(e,s),Object.defineProperty(e,"prototype",{writable:!1}),t}())},8833:(t,e,n)=>{n.r(e),n.d(e,{default:()=>l});var a,r=n(7757),s=n.n(r),i=n(6573);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e,n,a,r,s,i){try{var o=t[s](i),u=o.value}catch(t){return void n(t)}o.done?e(u):Promise.resolve(u).then(a,r)}const c=(o(a={name:"auth.tickets.ts.status",data:function(){return{ticket_running_statuses:[{id:4,name:"Callback Sucessful - Fixed"},{id:5,name:"Callback Sucessful - Not Fixed"},{id:6,name:"No Answer - End Call"},{id:7,name:"No Answer - Left Voicemail"}],form:{ticket_running_status:""},bread:[{text:"Dashboard",to:{name:"auth.dashboard"},disabled:!1,exact:!0},{text:"Tickets",to:{name:"auth.tickets.listing"},disabled:!1,exact:!0},{text:"TS > Status",to:{name:"auth.tickets.ts.status"},disabled:!1,exact:!0}],loading:!0,btnloading:!1,rules:{required:function(t){return!!t||"Required."}}}},watch:{},mounted:function(){},methods:{updateStatus:function(){var t,e=this;return(t=s().mark((function t(){var n;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.btnloading=!0,!e.$refs.form.validate()){t.next=8;break}return(n=new FormData).append("ticket_running_status",e.form.ticket_running_status),t.next=6,i.Z.post("ticket/"+e.$route.params.id+"/update-running-status",n);case 6:t.sent,e.$store.commit("setNotification","Status Marked");case 8:e.btnloading=!1;case 9:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var s=t.apply(e,n);function i(t){u(s,a,r,i,o,"next",t)}function o(t){u(s,a,r,i,o,"throw",t)}i(void 0)}))})()}}},"watch",{}),o(a,"computed",{permissions:function(){return this.$store.getters.getPermissions},user:function(){return this.$store.getters.loggedInUser}}),a);const l=(0,n(1900).Z)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{attrs:{"no-gutters":""}},[n("v-breadcrumbs",{attrs:{items:t.bread},scopedSlots:t._u([{key:"divider",fn:function(){return[n("v-icon",[t._v("mdi-forward")])]},proxy:!0}])})],1),t._v(" "),n("v-row",{staticClass:"pa-10 rounded elevation-10",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12",sm:"12"}},[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[n("v-row",[n("v-col",{staticClass:"pb-0",attrs:{cols:"8",sm:"12"}},[n("v-select",{attrs:{"item-text":"name","item-value":"id",rules:[t.rules.required],items:t.ticket_running_statuses,label:"Status"},model:{value:t.form.ticket_running_status,callback:function(e){t.$set(t.form,"ticket_running_status",e)},expression:"form.ticket_running_status"}})],1),t._v(" "),n("v-col",{staticClass:"pb-0",attrs:{cols:"4",sm:"12"}},[n("v-btn",{attrs:{color:"secondary",elevation:"1",large:"",raised:"",loading:t.btnloading,disabled:t.btnloading},on:{click:t.updateStatus}},[t._v("Update Status")])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);
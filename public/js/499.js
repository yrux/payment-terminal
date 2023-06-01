"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[499],{6573:(t,e,n)=>{function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.d(e,{Z:()=>r});var o=n(9669);const r=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,r;return e=t,(n=[{key:"get",value:function(t){return o.get("/api/".concat(t)).then((function(t){return t})).catch((function(t){return t}))}},{key:"post",value:function(t,e){return o.post("/api/".concat(t),e).then((function(t){return t})).catch((function(t){return t}))}}])&&i(e.prototype,n),r&&i(e,r),Object.defineProperty(e,"prototype",{writable:!1}),t}())},3499:(t,e,n)=>{n.r(e),n.d(e,{default:()=>s});var i=n(7757),o=n.n(i),r=n(6573);function c(t,e,n,i,o,r,c){try{var a=t[r](c),s=a.value}catch(t){return void n(t)}a.done?e(s):Promise.resolve(s).then(i,o)}const a={name:"auth.tickets.activities",watch:{},mounted:function(){var t,e=this;return(t=o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$store.commit("setPanelFull",!0),t.next=3,r.Z.get("ticket/"+e.$route.params.id+"/activity").then((function(t){return t.data}));case 3:e.activities=t.sent;case 4:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(i,o){var r=t.apply(e,n);function a(t){c(r,i,o,a,s,"next",t)}function s(t){c(r,i,o,a,s,"throw",t)}a(void 0)}))})()},methods:{},computed:{user:function(){return this.$store.getters.loggedInUser}},data:function(){return{color_icons:{1:{color:"green lighten-1",icon:"mdi-at"},2:{color:"indigo",icon:"mdi-stairs"},3:{color:"purple darken-1",icon:"mdi-buffer"},4:{color:"red lighten-2",icon:"mdi-email"},5:{color:"orange",icon:"mdi-list-status"}},bread:[{text:"Dashboard",to:{name:"auth.dashboard"},disabled:!1,exact:!0},{text:"Tickets",to:{name:"auth.tickets.listing"},disabled:!1,exact:!0},{text:"View Activities",to:{name:"auth.tickets.activities"},disabled:!0,exact:!0}],activities:[]}}};const s=(0,n(1900).Z)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-timeline",{attrs:{"align-top":"",dense:t.$vuetify.breakpoint.smAndDown}},t._l(t.activities,(function(e,i){return n("v-timeline-item",{key:e.id,attrs:{color:t.color_icons[e.activity_type].color,icon:t.color_icons[e.activity_type].icon,"fill-dot":""}},[n("v-card",{attrs:{color:t.color_icons[e.activity_type].color}},[n("v-card-text",{staticClass:"white--text"},[n("p",{staticClass:"body-1"},[t._v(t._s(e.activity))]),t._v(" "),n("small",{staticClass:"black--text font-weight-bold text-decoration-underline"},[t._v(t._s(e.created_at_formatted))])])],1)],1)})),1)}),[],!1,null,null,null).exports}}]);
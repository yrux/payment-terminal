"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[766],{6573:(t,e,r)=>{function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}r.d(e,{Z:()=>s});var a=r(9669);const s=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,s;return e=t,(r=[{key:"get",value:function(t){return a.get("/api/".concat(t)).then((function(t){return t})).catch((function(t){return t}))}},{key:"post",value:function(t,e){return a.post("/api/".concat(t),e).then((function(t){return t})).catch((function(t){return t}))}}])&&n(e.prototype,r),s&&n(e,s),Object.defineProperty(e,"prototype",{writable:!1}),t}())},1766:(t,e,r)=>{r.r(e),r.d(e,{default:()=>u});var n=r(7757),a=r.n(n),s=r(6573);function o(t,e,r,n,a,s,o){try{var i=t[s](o),c=i.value}catch(t){return void r(t)}i.done?e(c):Promise.resolve(c).then(n,a)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var s=t.apply(e,r);function i(t){o(s,n,a,i,c,"next",t)}function c(t){o(s,n,a,i,c,"throw",t)}i(void 0)}))}}const c={name:"auth.usertargets.buh",watch:{},computed:{buhHasTarget:function(){var t;return!(null===(t=this.currentBuhTarget)||void 0===t||!t.id)}},data:function(){return{picker:"",users:[],loader:!1,selectUserId:0,target:0,showForm:!1,targetSaving:!1,currentBuhTarget:{},targetLeftToAssign:0}},mounted:function(){var t=new Date,e=t.getMonth()+1;e=e<10?"0"+e:e,this.picker=t.getFullYear()+"-"+e,this.getTargets()},methods:{getTargets:function(){var t=this;return i(a().mark((function e(){var r,n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loader=!0,t.showForm=!1,r=t.picker+"-01",(n=new FormData).append("role_id",3),n.append("date",r),e.next=8,s.Z.post("user-targets",n).then((function(t){return t.data})).then((function(e){t.users=e.users,t.currentBuhTarget=e.currentBuhTarget,t.targetLeftToAssign=e.targetLeftToAssign}));case 8:t.loader=!1;case 9:case"end":return e.stop()}}),e)})))()},assignTarget:function(t){this.buhHasTarget?(this.showForm=!0,this.selectUserId=t):this.$store.commit("setNotification","Target has not been assigned to you by Admin, Please wait for Admin to assign the target on you")},assignTargetRequest:function(){var t=this;return i(a().mark((function e(){var r,n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.targetSaving=!0,r=t.picker+"-01",(n=new FormData).append("role_id",3),n.append("user_id",t.selectUserId),n.append("for_month",r),n.append("amount",t.target),e.next=9,s.Z.post("set-targets",n).then((function(t){return t.data}));case 9:t.targetSaving=!1,t.getTargets();case 11:case"end":return e.stop()}}),e)})))()}}};const u=(0,r(1900).Z)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-row",[r("v-col",{attrs:{cols:"4"}},[r("v-date-picker",{attrs:{"full-width":"",type:"month"},on:{change:t.getTargets},model:{value:t.picker,callback:function(e){t.picker=e},expression:"picker"}})],1),t._v(" "),r("v-col",{attrs:{cols:"8"}},[t.buhHasTarget?r("v-col",{attrs:{cols:"12"}},[r("v-chip",{staticClass:"ma-2",attrs:{color:"green","text-color":"white"}},[r("strong",[t._v("$"+t._s(t.targetLeftToAssign))]),t._v(" "),r("span",{staticClass:"ml-3"},[t._v("Target Left to Assign/Left for you")])])],1):r("v-col",[r("v-chip",{staticClass:"ma-2",attrs:{color:"red","text-color":"white"}},[t._v("\n                    Target Not Yet Assigned to you\n                ")])],1),t._v(" "),r("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",{staticClass:"text-left"},[t._v("\n                                Name\n                            ")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("\n                                Target\n                            ")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("\n                                Achieved\n                            ")]),t._v(" "),r("th",{staticClass:"text-left"})])]),t._v(" "),t.loader?r("tbody",t._l(10,(function(t){return r("tr",{key:t},[r("td",{staticClass:"pa-0",attrs:{colspan:"3"}},[r("v-skeleton-loader",{attrs:{type:"list-item"}})],1)])})),0):r("tbody",t._l(t.users,(function(e){return r("tr",{key:e.id},[r("td",[t._v(t._s(e.name))]),t._v(" "),r("td",[t._v(t._s(e.target?e.target.amount:0))]),t._v(" "),r("td",[t._v(t._s(e.achieved))]),t._v(" "),r("td",[r("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var a=n.on,s=n.attrs;return[r("v-btn",t._g(t._b({attrs:{color:"info",fab:"","x-small":"",dark:""},on:{click:function(r){return t.assignTarget(e.id)}}},"v-btn",s,!1),a),[r("v-icon",[t._v("mdi-target")])],1)]}}],null,!0)},[t._v(" "),r("span",[t._v("Assign/Update Target")])])],1)])})),0)]},proxy:!0}])}),t._v(" "),t.showForm?r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-divider")],1),t._v(" "),r("v-col",{attrs:{cols:"6"}},[r("v-select",{attrs:{items:t.users,"item-text":"name","item-value":"id",label:"User",required:""},model:{value:t.selectUserId,callback:function(e){t.selectUserId=e},expression:"selectUserId"}})],1),t._v(" "),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{type:"number",step:"any",label:"Input Target Amount $"},model:{value:t.target,callback:function(e){t.target=e},expression:"target"}})],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{attrs:{loading:t.targetSaving,disabled:t.targetSaving,color:"teal",elevation:"1",large:"",raised:"",block:""},on:{click:t.assignTargetRequest}},[t._v("\n                        Assign Target\n                    ")])],1)],1):t._e()],1)],1)],1)}),[],!1,null,null,null).exports}}]);
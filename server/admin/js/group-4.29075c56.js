(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["group-4"],{"0737":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"about"},[r("h1",[t._v("管理员列表")]),r("el-table",{attrs:{data:t.items,size:"mini"}},[r("el-table-column",{attrs:{prop:"_id",label:"ID",width:"230"}}),r("el-table-column",{attrs:{prop:"username",label:"用户名"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return t.$router.push("/admin_users/edit/"+e.row._id)}}},[t._v("编辑")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return t.remove(e.row)}}},[t._v("删除")])]}}])})],1)],1)},i=[],o=(r("96cf"),r("1da1")),a={data:function(){return{items:[]}},methods:{fetch:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/admin_users");case 2:r=e.sent,t.items=r.data;case 4:case"end":return e.stop()}}),e)})))()},remove:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$confirm('是否确认要删除分类 "'.concat(t.username,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$http.delete("rest/admin_users/".concat(t._id));case 2:e.$message({type:"success",message:"删除成功!"}),e.fetch();case 4:case"end":return r.stop()}}),r)}))));case 1:case"end":return r.stop()}}),r)})))()}},created:function(){this.fetch()}},s=a,c=r("2877"),u=Object(c["a"])(s,n,i,!1,null,null,null);e["default"]=u.exports},1148:function(t,e,r){"use strict";var n=r("a691"),i=r("1d80");t.exports="".repeat||function(t){var e=String(i(this)),r="",o=n(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(r+=e);return r}},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("d3b7"),r("e6cf");function n(t,e,r,n,i,o,a){try{var s=t[o](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,o){var a=t.apply(e,r);function s(t){n(a,i,o,s,c,"next",t)}function c(t){n(a,i,o,s,c,"throw",t)}s(void 0)}))}}},"408a":function(t,e,r){var n=r("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},"6fc5":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"video"},[r("h1",[t._v("视频列表")]),r("el-table",{attrs:{data:t.items,size:"mini"}},[r("el-table-column",{attrs:{prop:"_id",label:"ID",width:"230"}}),r("el-table-column",{attrs:{prop:"title",label:"标题"}}),r("el-table-column",{attrs:{prop:"img",label:"封面"},scopedSlots:t._u([{key:"default",fn:function(t){return[r("img",{staticStyle:{height:"1.5rem"},attrs:{src:t.row.img,alt:""}})]}}])}),r("el-table-column",{attrs:{prop:"watch",label:"播放量"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return t.$router.push("/videos/edit/"+e.row._id)}}},[t._v("编辑")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){return t.remove(e.row)}}},[t._v("删除")])]}}])})],1)],1)},i=[],o=(r("96cf"),r("1da1")),a={data:function(){return{items:[]}},methods:{fetch:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/videos");case 2:r=e.sent,t.items=r.data;case 4:case"end":return e.stop()}}),e)})))()},remove:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$confirm('是否确认要删除视频 "'.concat(t.title,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$http.delete("rest/videos/".concat(t._id));case 2:e.$message({type:"success",message:"删除成功!"}),e.fetch();case 4:case"end":return r.stop()}}),r)}))));case 1:case"end":return r.stop()}}),r)})))()}},created:function(){this.fetch()}},s=a,c=r("2877"),u=Object(c["a"])(s,n,i,!1,null,null,null);e["default"]=u.exports},"7b83":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"video"},[r("h1",[t._v(t._s(t.id?"编辑":"新建")+"视频")]),r("el-form",{attrs:{"label-width":"150px"},nativeOn:{submit:function(e){return e.preventDefault(),t.save(e)}}},[r("el-form-item",{attrs:{label:"所属分类"}},[r("el-select",{attrs:{multiple:""},model:{value:t.model.categories,callback:function(e){t.$set(t.model,"categories",e)},expression:"model.categories"}},t._l(t.categories,(function(t){return r("el-option",{key:t._id,attrs:{label:t.name,value:t._id}})})),1)],1),r("el-form-item",{attrs:{label:"标题"}},[r("el-input",{model:{value:t.model.title,callback:function(e){t.$set(t.model,"title",e)},expression:"model.title"}})],1),r("el-form-item",{attrs:{label:"播放量"}},[r("el-input",{model:{value:t.model.watch,callback:function(e){t.$set(t.model,"watch",e)},expression:"model.watch"}})],1),r("el-form-item",[t._v(" 选择scr或上传本地视频封面 ")]),r("el-form-item",{attrs:{label:"视频封面src"}},[r("el-input",{model:{value:t.model.img,callback:function(e){t.$set(t.model,"img",e)},expression:"model.img"}})],1),r("el-form-item",{staticStyle:{"margin-top":"0.6rem"},attrs:{label:"视频封面"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadUrl,"show-file-list":!1,"on-success":function(e){return t.$set(t.model,"img",e.url)},headers:t.getAuthHeaders()}},[t.model.img?r("img",{staticClass:"avatar",attrs:{src:t.model.img}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),r("el-form-item",[t._v(" 选择src或上传本地视频 ")]),r("el-form-item",{attrs:{label:"src"}},[r("el-input",{model:{value:t.model.src,callback:function(e){t.$set(t.model,"src",e)},expression:"model.src"}})],1),r("el-form-item",{staticStyle:{"margin-top":"0.6rem"},attrs:{label:"视频"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadVideoUrl,"show-file-list":!1,drag:"","on-success":t.success,headers:t.getAuthHeaders(),"on-progress":t.uploadVideoProcess}},[r("video",{directives:[{name:"show",rawName:"v-show",value:!t.isShow,expression:"!isShow"}],staticClass:"avatar",staticStyle:{width:"350px"},attrs:{type:"video/mp4",src:t.model.src,controls:"true",readyState:"3"}}),r("el-progress",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticStyle:{"margin-top":"20px"},attrs:{type:"circle",percentage:t.per}})],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary","native-type":"submit"}},[t._v("保存")])],1)],1)],1)},i=[],o=(r("b680"),r("96cf"),r("1da1")),a={props:{id:{}},data:function(){return{model:{},categories:[],per:0,isShow:!1}},methods:{save:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.id){e.next=5;break}return e.next=3,t.$http.put("rest/videos/".concat(t.id),t.model);case 3:e.next=7;break;case 5:return e.next=7,t.$http.post("rest/videos",t.model);case 7:t.$router.push("/videos/list"),t.$message({type:"success",message:"保存成功"});case 9:case"end":return e.stop()}}),e)})))()},fetch:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/videos/".concat(t.id));case 2:r=e.sent,t.model=Object.assign({},t.model,r.data);case 4:case"end":return e.stop()}}),e)})))()},fetchCategories:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/categories");case 2:r=e.sent,t.categories=r.data;case 4:case"end":return e.stop()}}),e)})))()},uploadVideoProcess:function(t,e){this.per=1*e.percentage.toFixed(0)},success:function(t){this.$set(this.model,"src",t.url),this.isShow=!1}},watch:{per:function(t){this.model.src,this.isShow=!0}},created:function(){this.fetchCategories(),this.id&&this.fetch()}},s=a,c=r("2877"),u=Object(c["a"])(s,n,i,!1,null,null,null);e["default"]=u.exports},"8d9b":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"about"},[r("h1",[t._v(t._s(t.id?"编辑":"新建")+"管理员")]),r("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(e){return e.preventDefault(),t.save(e)}}},[r("el-form-item",{attrs:{label:"用户名"}},[r("el-input",{model:{value:t.model.username,callback:function(e){t.$set(t.model,"username",e)},expression:"model.username"}})],1),r("el-form-item",{attrs:{label:"密码"}},[r("el-input",{attrs:{type:"password"},model:{value:t.model.password,callback:function(e){t.$set(t.model,"password",e)},expression:"model.password"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary","native-type":"submit"}},[t._v("保存")])],1)],1)],1)},i=[],o=(r("96cf"),r("1da1")),a={props:{id:{}},data:function(){return{model:{}}},methods:{save:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.id){e.next=5;break}return e.next=3,t.$http.put("rest/admin_users/".concat(t.id),t.model);case 3:e.next=7;break;case 5:return e.next=7,t.$http.post("rest/admin_users",t.model);case 7:t.$router.push("/admin_users/list"),t.$message({type:"success",message:"保存成功"});case 9:case"end":return e.stop()}}),e)})))()},fetch:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/admin_users/".concat(t.id));case 2:r=e.sent,t.model=r.data;case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.id&&this.fetch()}},s=a,c=r("2877"),u=Object(c["a"])(s,n,i,!1,null,null,null);e["default"]=u.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,r,n){var i=e&&e.prototype instanceof d?e:d,o=Object.create(i.prototype),a=new j(n||[]);return o._invoke=$(t,r,a),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=c;var l="suspendedStart",f="suspendedYield",h="executing",m="completed",p={};function d(){}function v(){}function g(){}var w={};w[o]=function(){return this};var y=Object.getPrototypeOf,b=y&&y(y(R([])));b&&b!==r&&n.call(b,o)&&(w=b);var x=g.prototype=d.prototype=Object.create(w);function _(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function k(t){function e(r,i,o,a){var s=u(t[r],t,i);if("throw"!==s.type){var c=s.arg,l=c.value;return l&&"object"===typeof l&&n.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,o,a)}),(function(t){e("throw",t,o,a)})):Promise.resolve(l).then((function(t){c.value=t,o(c)}),(function(t){return e("throw",t,o,a)}))}a(s.arg)}var r;function i(t,n){function i(){return new Promise((function(r,i){e(t,n,r,i)}))}return r=r?r.then(i,i):i()}this._invoke=i}function $(t,e,r){var n=l;return function(i,o){if(n===h)throw new Error("Generator is already running");if(n===m){if("throw"===i)throw o;return S()}r.method=i,r.arg=o;while(1){var a=r.delegate;if(a){var s=E(a,r);if(s){if(s===p)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=u(t,e,r);if("normal"===c.type){if(n=r.done?m:f,c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=m,r.method="throw",r.arg=c.arg)}}}function E(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var i=u(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,p;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function R(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function r(){while(++i<t.length)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:S}}function S(){return{value:e,done:!0}}return v.prototype=x.constructor=g,g.constructor=v,g[s]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},_(k.prototype),k.prototype[a]=function(){return this},t.AsyncIterator=k,t.async=function(e,r,n,i){var o=new k(c(e,r,n,i));return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},_(x),x[s]="Generator",x[o]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=R,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(L),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return s.type="throw",s.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;L(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:R(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=n}catch(i){Function("r","regeneratorRuntime = r")(n)}},b680:function(t,e,r){"use strict";var n=r("23e7"),i=r("a691"),o=r("408a"),a=r("1148"),s=r("d039"),c=1..toFixed,u=Math.floor,l=function(t,e,r){return 0===e?r:e%2===1?l(t,e-1,r*t):l(t*t,e/2,r)},f=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},h=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!s((function(){c.call({})}));n({target:"Number",proto:!0,forced:h},{toFixed:function(t){var e,r,n,s,c=o(this),h=i(t),m=[0,0,0,0,0,0],p="",d="0",v=function(t,e){var r=-1,n=e;while(++r<6)n+=t*m[r],m[r]=n%1e7,n=u(n/1e7)},g=function(t){var e=6,r=0;while(--e>=0)r+=m[e],m[e]=u(r/t),r=r%t*1e7},w=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==m[t]){var r=String(m[t]);e=""===e?r:e+a.call("0",7-r.length)+r}return e};if(h<0||h>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(p="-",c=-c),c>1e-21)if(e=f(c*l(2,69,1))-69,r=e<0?c*l(2,-e,1):c/l(2,e,1),r*=4503599627370496,e=52-e,e>0){v(0,r),n=h;while(n>=7)v(1e7,0),n-=7;v(l(10,n,1),0),n=e-1;while(n>=23)g(1<<23),n-=23;g(1<<n),v(1,1),g(2),d=w()}else v(0,r),v(1<<-e,0),d=w()+a.call("0",h);return h>0?(s=d.length,d=p+(s<=h?"0."+a.call("0",h-s)+d:d.slice(0,s-h)+"."+d.slice(s-h))):d=p+d,d}})}}]);
//# sourceMappingURL=group-4.29075c56.js.map
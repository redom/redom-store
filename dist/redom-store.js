(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):(a=a||self,a.main=b())})(this,function(){'use strict';function a(a,b){for(let c in b)a[c]=b[c];return a}return class{constructor(a){this.subscribers=[],this.state=a||{}}subscribe(a){return this.subscribers.push(a),()=>{this.unsubscribe(a)}}unsubscribe(a){let b=[];for(let c=0;c<this.subscribers.length;c++)this.subscribers[c]===a?a=null:b.push(this.subscribers[c]);this.subscribers=b}setState(b,c){this.state=a(a({},this.state),b);let d=this.subscribers;for(let a=0;a<d.length;a++)d[a](this.state,c)}getState(){return this.state}dispatch(a){function b(b){this.setState(b,!1,a)}return function(){let c=[this.state];for(let a=0;a<arguments.length;a++)c.push(arguments[a]);let d=a.apply(this,c);if(null!==d)return d.then?d.then(b):b(d)}}}});

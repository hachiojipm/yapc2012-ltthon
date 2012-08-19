(function(){
	if(!"console" in window){
		window.console = {};
	}
	var cnsl = [ "assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
	var len = cnsl.length;
	for(var i = 0; i < cnsl.len; i++){
		var e = cnsl[i];
		if(!e in window.console){
			window.console[e] = function(){};
		}
	}

	if(!Function.prototype.hasOwnProperty("bind")){
		Function.prototype.bind = function(){
			var func = this;
			var t = arguments[0];
			var len = arguments.length;
			var newargary = [];
			for(var i = 1; i < len; i++){
				newargary.push(arguments[i]);
			}

			return function(){
				return func.apply(t, newargary);
			}
		}
	}
})();

var at = {};
at.version = 1.1;

at.parentid = function(t){
	var t$ = $(t);
	var pid = t$.attr("id");
	if(pid && pid.length > 0){
	}else if(t$.get(0).tagName.match(/body/i)){
		pid = "_body";
	}else{
		pid = at.parentid(t$.parent());
	}
	return pid;
}

at.anchortrace = function(){
	$("body").on("click", "a, area", function(){
		var href = $(this).attr("href");
		var pathname = location.pathname;
		if(href && !href.match("^http")){
			href = pathname.replace(/[^\/]*$/,"") + href;
			while(href.match(/\.\.\//)){
		href = href.replace(/[^\/]*\/\.\.\//, "");	
		}
		href = href.replace(/\.\//,"").replace(/\/\//, "/");
		}
		pathname += location.search

		console.debug("_trackEvent", pathname, "#" + at.parentid(this), href);

		_gaq.push(["_trackEvent", pathname, "#" + at.parentid(this), href ]);
	});
}

var common = {
	getCookie: function(key){
		var cookies = document.cookie;
		var cookiesarray = cookies.split(";");
		var len = cookiesarray.length;
		var reg = new RegExp("^\\s*" + key + "=");
		for(var i = 0; i < len; i++){
			if(reg.test(cookiesarray[i])){
				return unescape(cookiesarray[i].split("=")[1]);
			}
		}
	},
	setCookie: function(key, value){
		document.cookie = key + "=" + escape(value);
	}
}

$(function(){
	console.log("Anchor Tracer : " + at.version);
	at.anchortrace();
});

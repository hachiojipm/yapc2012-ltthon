if(!("console" in window && "time" in window.console)){
	window.console = {};
	window.console.log = function(str){}
	window.console.info = function(str){}
	window.console.debug = function(str){}
}

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

		//var _gaq = _gaq || [];
		_gaq.push(["_trackEvent", pathname, "#" + at.parentid(this), href ]);
	});
}


$(function(){
	console.log("Anchor Tracer : " + at.version);
	at.anchortrace();
});

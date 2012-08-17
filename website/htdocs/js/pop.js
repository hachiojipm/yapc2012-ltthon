$(function(){
	var pop = $("#pop");
	var popbgc = [ "#1E2E53", "#66B542", "#4A3C1B", "#C27E00", "#6380CB", "#5C8963", "#CC145A", "#4D4D4D"];

	if(pop && pop.length > 0){
		var rand = (Math.random() * popbgc.length) << 0;
		pop.html( $("<img>").attr("src", "./images/bookpop" + rand + ".png"));
		pop.css({ backgroundColor: popbgc[rand]});

		var footer = $("footer");
		if(footer && footer.length > 0){
			var popclose = $("<div>", {id: "popclose"});
			footer.prepend(popclose);

			if(common.getCookie("bookpop") == "0"){
				pop.css({display: "none"});
				popclose.text("▲OPEN");
			}else{
				popclose.text("▼CLOSE");
			}

			popclose.css({ backgroundColor: popbgc[rand]});
			footer.on("click", function(){
				var popdisplay = pop.css("display");
				if(popdisplay === "none"){
					$("article").animate({ paddingBottom: 350});
					common.setCookie("bookpop", 1);
				}else{
					$("article").animate({ paddingBottom: 100});
					common.setCookie("bookpop", 0);
				}
				pop.stop().slideToggle("normal", changeBtnText.bind(pop, popclose));
			});
		}
	}

	var changeBtnText = function(){
		var toggle = arguments[0];
		if(pop.css("display") === "none"){
			toggle.text("▲OPEN");
		}else{
			toggle.text("▼CLOSE");

		}
	}
});

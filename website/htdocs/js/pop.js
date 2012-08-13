$(function(){
	var pop = $("#pop");
	var popbgc = [ "#1E2E53", "#66B742"];
	if(pop && pop.length > 0){
		var rand = (Math.random()*2 << 0) + 1;
		console.log(rand);
		pop.html( $("<img>").attr("src", "./images/bookpop" + rand + ".png"));
		pop.css({ backgroundColor: popbgc[rand-1]});

		var footer = $("footer");
		if(footer && footer.length > 0){
			footer.prepend('<div id="popclose">▼CLOSE</div>');
			var toggle = footer.find("#popclose");
			toggle.css({ backgroundColor: popbgc[rand-1]});
			footer.on("click", function(){
				var popdisplay = pop.css("display");
				if(popdisplay === "none"){
					$("article").animate({ paddingBottom: 350});
				}else{
					$("article").animate({ paddingBottom: 100});
				}
				pop.stop().slideToggle("normal", changeBtnText.bind(pop, toggle));
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

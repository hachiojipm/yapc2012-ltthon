$(function(){
	var slide = {};

	var box = $(".slidebox");

	slide.sliding = function(){
		var ml = 0;
		if($(this).hasClass("torightside")){
			ml = -946;
		}

		$(this).parents(".slidetext").stop().animate({
			marginLeft: ml
		}, "fast");
	}

	slide.onHashChange = function(){
		slide.hash = location.hash.replace(/^#/, "");
		console.log(slide.hash);
		var target = box.find(".to"+slide.hash);
		console.log(target);
		if(target.length > 0){
			slide.sliding.apply(target);
		}
	}

	slide.onHashChange();

	box.find(".torightside").on("click", function(){
		location.hash = "rightside";
		slide.hash = location.hash.replace(/^#/, "");
	});

	box.find(".toleftside").on("click", function(){
		location.hash = "leftside";
		slide.hash = location.hash.replace(/^#/, "");
	});

	$(window).on("hashchange", slide.onHashChange);
	if(ie <= 7){
		slide.timerid = setInterval(function(){
			if(slide.prehash !== slide.hash){
				slide.onHashChange();
				slide.prehash = slide.hash;
			}
		}, 200);
	}
});

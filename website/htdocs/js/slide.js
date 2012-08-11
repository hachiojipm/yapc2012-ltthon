$(function(){
	var box = $(".slidebox");

	box.find(".torightside").on("click", function(){
		$(this).parents(".slidetext").stop().animate({
			marginLeft: -946
		}, "fast");
	});
	box.find(".toleftside").on("click", function(){
		$(this).parents(".slidetext").stop().animate({
			marginLeft: 0
		}, "fast");
	});
});

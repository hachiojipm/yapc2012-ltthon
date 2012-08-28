$(function(){
	//初期設定
	var pop = $("#pop");
	var popbgc = [ "#1E2E53", "#66B542", "#4A3C1B", "#C27E00", "#6380CB", "#5C8963", "#CC145A", "#4D4D4D", "#DE87CA","#79AEE8"];
	var linklist = new Array();
	linklist[7] = {posx:636, posy:219, href:"interview.html", src:"images/mozlink.png"};//moznionのインタビュー記事

	//帯の表示非表示切り替え時に、左上に出てくるボタンの文字を変更する処理
	var changeBtnText = function(){
		var toggle = arguments[0];
		if(pop.css("display") === "none"){
			toggle.text("▲OPEN");
		}else{
			toggle.text("▼CLOSE");
		}
	};

	//帯の表示・非表示処理
	var togglePopView = function(){
		//Firefoxは暗黙にeventプロパティを用意してくれないので、同じ物であるarguments[0]で初期化。
		//ただし、この関数はclickイベント以外からも呼ばれているので、引数がEventオブジェクトではなかった場合、
		//意味を成さない偽eventプロパティを作成する。
		var event = event || "target" in arguments[0] ? arguments[0] : { target: common.d.getElementsByTagName("body")[0]};


		//クリックポイントが、帯からのリンク先へのボタン（祖先に".poplink"を持つ）じゃなければ
		//帯の表示非表示処理を行う。
		if($(event.target).parents(".poplink").length == 0){
			var delay = arguments[0].hasOwnProperty("delay") ? arguments[0].delay : 0;
			var popdisplay = pop.css("display");
			if(popdisplay === "none"){
				$("article").animate({ paddingBottom: 350});
				common.setCookie("bookpop", 1);
			}else{
				$("article").animate({ paddingBottom: 100});
				common.setCookie("bookpop", 0);
			}
			var popclose = $("#popclose");
			if(popclose.length > 0){
				pop.stop().delay(delay).slideToggle("normal", changeBtnText.bind(pop, popclose));
			}
		}
	};

	if(pop && pop.length > 0){
		var rand;
		//location.searchを使って、出す帯の種類を指定されていた場合、それを表示対象にする。
		var searchlist = location.search.split("&");
		var regexp = new RegExp("pop=\(.*\)");
		for(var i = 0; i < searchlist.length; i++){
			if(regexp.test(searchlist[i])){
				rand = RegExp.$1 % popbgc.length;
			}
		}
		
		//rand == undefined なら、ランダム
		rand = (typeof rand == "undefined") ? (Math.random() * popbgc.length) << 0 : rand;
		var popimg = $("<img>").attr("src", "./images/bookpop" + rand + ".png");
		var wrappopimg = $("<div>").addClass("wrappopimg");
		pop.html( wrappopimg.html(popimg))
		.css({
			backgroundColor: popbgc[rand],
			display: "none"
		});

		//対象の帯にリンク先が指定されていた際の処理
		if(linklist[rand]||false){
			var img = $("<img>").attr({
				src: linklist[rand].src || ""
			});
			var anchor = $("<a>").attr({
				href: linklist[rand].href || "http://yapcasia.org/2012/"
			})
			.addClass("poplink")
			.css({
				top: linklist[rand].posy || 0,
				left: linklist[rand].posx || 0
			});

			wrappopimg.append( anchor.html( img ));
		}

		//帯の表示非表示用イベントの設定
		var footer = $("footer");
		if(footer && footer.length > 0){
			var popclose = $("<div>", {id: "popclose"});
			footer.prepend(popclose);
			popclose.text("▲OPEN");

			popclose.css({ backgroundColor: popbgc[rand]});

			footer.on("click", togglePopView);

			var bookpopflag = common.getCookie("bookpop") || 1;

			if(bookpopflag !== "0"){
				togglePopView({delay: 1000});
			}
		}
	}
});

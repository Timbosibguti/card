window.onload = function() {
	var page=1;
	var pagemax=1;
	var select = function(a,b){
		for(var i = 0; i<document.getElementsByClassName("names").length;i++)
		for(var j = 0; j<document.getElementsByClassName("names")[i].getElementsByTagName("li").length;j++){
			if(i==a&&j==b)
			document.getElementsByClassName("names")[i].getElementsByTagName("li")[j].classList.add('selected');
			else 
			document.getElementsByClassName("names")[i].getElementsByTagName("li")[j].classList.remove('selected');
		}

		document.getElementsByClassName("img")[0].src=data[a][b]["avatar"];
		document.getElementsByClassName("name")[0].innerText=data[a][b]["first_name"];
		document.getElementsByClassName("s-name")[0].innerText=data[a][b]["last_name"];
	}
	
	var data = {};
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "https://reqres.in/api/users", false);
	xhr.onload = function() {
		if (this.readyState !== 4) return;
		if (this.status !== 200) return;
		try{
		var response = JSON.parse(this.responseText);
		} catch (e){
					alert("json parsing error");
				}
		pagemax=response["total_pages"];
		data[0] = response["data"];
		var s = '<div class="card"><div class="left"><ul class="names">';
		for (var i = 0; i < data[0].length; i++) {
			s += "<li>" + data[0][i]["first_name"] + "</li>";
		}
		s += '</ul></div></div>'
		document.getElementsByClassName("cards")[0].innerHTML += s;
		select(0,0);
		for (var i = 1; i < response["total_pages"]; i++) {

			document.getElementsByClassName("radio")[0].innerHTML += "\<label class=\"container\"\>\<input type=\"radio\" name=\"switch\"\>\<span class=\"checkmark\"\>"+ (i+1)+ "\</span\>\</label\>";
			var xhr = new XMLHttpRequest();
			xhr.open('GET', "https://reqres.in/api/users?page=" + (i + 1), false);
			xhr.onload = function() {
				try {
				var response = JSON.parse(this.responseText)
				} catch (e){
					alert("json parsing error");
				}
				data[i] = response["data"];
				var s = '<div class="card"><div class="left"><ul class="names">';
				for (var j = 0; j < data[0].length; j++) {
					s += "<li>" + data[i][j]["first_name"] + "</li>";
				}
				s += '</ul></div></div>'
				document.getElementsByClassName("cards")[0].innerHTML += s;
				console.log(response["data"]);
			}
			xhr.onerror = function()
			{
			  alert("request error");
			}
			xhr.send();
		}
		for(var i = 0; i<document.getElementsByClassName("names").length;i++)
		for(var j = 0; j<document.getElementsByClassName("names")[i].getElementsByTagName("li").length;j++){
			document.getElementsByClassName("names")[i].getElementsByTagName("li")[j].addEventListener('click', select.bind( null, i, j));
		}
		var rad = document.getElementsByName("switch");
		var pagechange = function(p)
		{
				var cards = document.getElementsByClassName("card");
				for (var j = 0; j < cards.length; j++) cards[j].style.left=cards[0].offsetWidth*(-(p-1))+"px";
				page = p;
		};
		for (var i = 0; i < rad.length; i++) {
			rad[i].value = i + 1;
			rad[i].addEventListener('change', function() {
				pagechange(this.value);
			});
		}
		document.getElementsByClassName("check")[0].getElementsByTagName("span")[0].addEventListener('click', function(){
		if(page-1<1){
			page=pagemax;
		} else {
			page--;
		}
		rad[page-1].checked=true;
		pagechange(page);
		});
		document.getElementsByClassName("check")[0].getElementsByTagName("span")[document.getElementsByClassName("check")[0].getElementsByTagName("span").length-1].addEventListener('click', function(){
		if(page+1>pagemax){
			page=1;
		} else {
			page++
		}
		rad[page-1].checked=true;
		pagechange(page);
		});
		window.onresize = function(){
		var cards = document.getElementsByClassName("card");
				for (var j = 0; j < cards.length; j++) cards[j].style.left=cards[0].offsetWidth*(-(page-1))+"px";
		}
	};
	xhr.onerror = function()
	{
	  alert("request error");
	}
	xhr.send();
	
}
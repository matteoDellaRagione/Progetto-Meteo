 darkSelector = {
	darkMode: false,
	day: null,
	month: null,
	year: null
}
//window.localStorage.setItem("darkmode",a);

//document.body.style.backgroundColor = "black";)
//if(window.localStorage.getItem("darkmode",(darkSelector.darkMode)=="true"))
	//document.body.style.backgroundColor = "black";
//window.localStorage.setItem("darkmode",darkSelector.darkMode);

function darkmode(){
	var currentDate = new Date();
	if (document.getElementById('darkmode').checked){
		document.body.style.backgroundColor = "black";
		document.body.style.color = '#faf9f9'
		darkSelector.darkMode = true
		darkSelector.day = currentDate.getDate()
		darkSelector.month = currentDate.getMonth() + 1
		darkSelector.year = currentDate.getFullYear()
		console.log(darkSelector.darkMode);
		console.log(darkSelector.day)
		window.localStorage.setItem("darkmode",darkSelector.darkMode);
	}
	else {document.body.style.backgroundColor = "white";
		  document.body.style.color = '#22333b'
		 darkSelector.darkMode = false;
		 darkSelector.day = null
		 darkSelector.month = null
		 darkSelector.year = null
		 console.log(darkSelector.darkMode);
		 console.log(darkSelector.day)
		 window.localStorage.setItem("darkmode",darkSelector.darkMode);
	}
}

/*async function getCordinatesFromName(name) {
	var response = await fetch("https://geocode.maps.co/search?q="+name,{method:"GET"});
	let jsonObj = await response.json();
	var lat = jsonObj[0].boundingbox[0];
	var long = jsonObj[0].boundingbox[3];
	console.log(lat)
	console.log(long)
}*/

/*async function initialize() {
	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=45,46362&lon=9,188116&units=metric&appid=e21c453d380f0ca1bc5d071698438e15",
	{method:"GET"});
	let jsonObj = await response.json();
	document.getElementById('weather-Milan').innerText = "Temperatura: " + jsonObj.main.temp + "°";

}
initialize();*/
//getCordinatesFromName("Firenze");
if(window.localStorage.getItem('darkmode')=="true") { 
	document.body.style.backgroundColor = 'black'
	document.body.style.color = '#faf9f9'
	document.getElementById('darkmode').checked = true	
}
const api = new Worker("js-da-me/api.js");
api.onmessage = function(e) {
	
	document.getElementById('weather-Milan').innerText = "Temperatura: " + e.data.main.temp + "°";
}
const ImageLoaderWorker = new Worker('js-da-me/images.js')
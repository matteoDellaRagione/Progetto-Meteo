async function getCordinatesFromName(name) {
	var response = await fetch("https://geocode.maps.co/search?q="+name,{method:"GET"});
	let jsonObj = await response.json();
	var lat = jsonObj[0].boundingbox[0];
	var long = jsonObj[0].boundingbox[3];
	console.log(lat)
	console.log(long)
}

async function initialize() {

	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=45,46362&lon=9,188116&units=metric&appid=e21c453d380f0ca1bc5d071698438e15",
	{method:"GET"});
	
	let jsonObj1 = await response.json();
	response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=41,3875&lon=2,16835&units=metric&appid=e21c453d380f0ca1bc5d071698438e15",
	{method:"GET"});
	let jsonObj2 = await response.json();
	response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=25,20498&lon=55,271057&units=metric&appid=e21c453d380f0ca1bc5d071698438e15",
	{method:"GET"});
	let jsonObj3 = await response.json();
	response = {
		milano:jsonObj1,
		barcellona:jsonObj2,
		dubai:jsonObj3,
	}
	self.postMessage(response)

}

async function getCitta(citta) {
	const api_key = "AIzaSyAJLoKPEUiU-NhvVPCvPozei2rMOf7_m1o"
	var response = await fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=photos&input="+citta+"&inputtype=textquery&key="+api_key,{method:"GET",headers: {
		'Content-Type': 'application/json',
  }, mode: 'no-cors'});
  console.log(response)
	let c = await response.json();
	
}


self.onmessage = initialize()






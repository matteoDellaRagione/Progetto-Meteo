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
	let jsonObj = await response.json();
	self.postMessage(jsonObj)

}
self.onmessage = getCordinatesFromName("firenze")
self.onmessage = initialize()



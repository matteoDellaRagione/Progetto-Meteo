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
		if(document.getElementById('floatingInput')) {
			console.log(document.getElementById('floatingInput'))
			document.getElementById('form').style.color = "black"
		}
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

function getMeteo(citta) {
	console.log(citta.weather[0].main)	
	switch(citta.weather[0].main){
		case 'Clouds': return 'Nuvoloso';
		case 'Clear': return 'Soleggiato';
		case 'Rain': return 'Piovoso';
		default: return 'Nevoso'

	}
}
function view(){
	console.log(document.documentURI)
}
view()

/*function getInput() {
	if(document.documentURI=="https://localhost:4433/registrazione") {
		var search = document.getElementById("search")
		search.addEventListener("onclick", event => {
			event.preventDefault()
			console.log("ciao")
		})
	}
}
getInput();*/

if(window.localStorage.getItem('darkmode')=="true") { 
	document.body.style.backgroundColor = 'black'
	document.body.style.color = '#faf9f9'
	document.getElementById('darkmode').checked = true
	if(document.getElementById('floatingInput')) {
		console.log(document.getElementById('floatingInput'))
		document.getElementById('form').style.color = "black"
	}	
}
const api = new Worker("js-da-me/api.js");
api.onmessage = function(e) {
	console.log(e.data.dubai)
	document.getElementById('weather-Milan').innerText = "Temperatura: " + e.data.milano.main.temp + "°\n"+getMeteo(e.data.milano);
	document.getElementById('weather-Barcellona').innerText = "Temperatura: " + e.data.barcellona.main.temp + "°\n"+getMeteo(e.data.barcellona);
	document.getElementById('weather-Dubai').innerText = "Temperatura: " + e.data.dubai.main.temp + "°\n"+getMeteo(e.data.dubai);
}

const ImageLoaderWorker = new Worker('js-da-me/images.js') 

const imgElements = document.querySelectorAll('img[data-src]')

ImageLoaderWorker.addEventListener('message', event => {
	// Grab the message data from the event
	const imageData = event.data
  
	// Get the original element for this image
	const imageElement = document.querySelector(`img[data-src='${imageData.imageURL}']`)  
	// We can use the `Blob` as an image source! We just need to convert it
	// to an object URL first
	const objectURL = URL.createObjectURL(imageData.blob)
  
	// Once the image is loaded, we'll want to do some extra cleanup
	imageElement.onload = () => {
	  // Let's remove the original `data-src` attribute to make sure we don't
	  // accidentally pass this image to the worker again in the future
	  imageElement.removeAttribute("data-src")
  
	  // We'll also revoke the object URL now that it's been used to prevent the
	  // browser from maintaining unnecessary references
	  URL.revokeObjectURL(objectURL)
	}
  
	imageElement.setAttribute('src', objectURL)
  })

imgElements.forEach(imageElement => {
  const imageURL = imageElement.getAttribute('data-src')
  ImageLoaderWorker.postMessage(imageURL)
})


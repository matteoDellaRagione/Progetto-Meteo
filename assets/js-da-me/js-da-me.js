 darkSelector = {
	darkMode: false,
	day: null,
	month: null,
	year: null
}
if(document.getElementById("gi"))
	document.getElementById("gi").addEventListener('click',getInfo)

function darkmode(){
	if (document.getElementById('darkmode').checked){
		document.body.style.backgroundColor = "black";
		document.body.style.color = '#faf9f9'
		darkSelector.darkMode = true
		window.sessionStorage.setItem("darkmode",darkSelector.darkMode);
		if(document.getElementById('floatingInput')) {
			document.getElementById('form').style.color = "black"
		}
	}
	else {document.body.style.backgroundColor = "white";
		  document.body.style.color = '#22333b'
		 darkSelector.darkMode = false;
		 window.sessionStorage.setItem("darkmode",darkSelector.darkMode);
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

//onclick funzione
function getInfo(){
	var obj = document.getElementById("search").value
console.log(document.getElementById("search").value)
$.ajax({
	method: "post",
	dataType:"json",
	// specifico la URL della risorsa da contattare
	url: "/search",
	//contentType: "application/json; charset=utf-8",
	// imposto l'azione in caso di successo
	success: (risposta)=>{
	//visualizzo il contenuto del file nel div htmlm
		alert(risposta)
		console.log(risposta.info)
	  $("#dati-file").attr("src","data:image/jpg;base64,"+risposta.info); //classe dell'immagine
	},
	error: function(){
		alert(errore)
		console.log("errore")
	},
	data: { info: obj }
})
//preventDefault()
}


if(window.sessionStorage.getItem('darkmode')=="true") { 
	document.body.style.backgroundColor = 'black'
	document.body.style.color = '#faf9f9'
	document.getElementById('darkmode').checked = true
	if(document.getElementById('floatingInput')) {
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
	// Prendi i dati
	const imageData = event.data
  
	// Ottendo l'elemento originale relativo all'immagine
	const imageElement = document.querySelector(`img[data-src='${imageData.imageURL}']`)  
	//Per utilizzare il blob come immagine lo trasformo in url
	const objectURL = URL.createObjectURL(imageData.blob)
  
	imageElement.onload = () => {
	  // Elimino data-src per evitare di riutilizzarlo
	  imageElement.removeAttribute("data-src")
  
	  // revoco l'url perchè non serve più
	  URL.revokeObjectURL(objectURL)
	}
  
	imageElement.setAttribute('src', objectURL)
  })

imgElements.forEach(imageElement => {
  const imageURL = imageElement.getAttribute('data-src')
  ImageLoaderWorker.postMessage(imageURL)
})





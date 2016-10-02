// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    var slides = document.getElementsByClassName("slick-slide");
	
	if(slides != null){
		// process slides and strip out content into JSON
		// {
			// image:"",
			
		// }
		var container = "";
		for(i = 0; i < slides.length; i++){
			// every slide, create a new div
			var newDiv = document.createElement('div');
			for(j = 0; j < slides[i].children.length; j++){
				newDiv.innerHTML += slides[i].children[j].outerHTML;
			}
			container += newDiv.outerHTML;
		}
		sendResponse(container);
	}else {
		sendResponse({});
	}
	sendResponse(null);
});
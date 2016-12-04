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
		var counter = 0;
		for(i = 0; i < slides.length; i++){
			counter += 1;
			var counterDiv = '<div class="slideNumber">' + counter.toString() + '/' + slides.length.toString() + '</div>'			
			// every slide, create a new div
			var newDiv = document.createElement('div');
			newDiv.className = 'material';
			newDiv.innerHTML += counterDiv;
			for(j = 0; j < slides[i].children.length; j++){
				var contents = '<div class="slideContents">' + slides[i].children[j].outerHTML + '</div>';
				newDiv.innerHTML += contents;
			}
			container += newDiv.outerHTML;
		}
		sendResponse(container);
	}else {
		sendResponse({});
	}
	sendResponse(null);
});
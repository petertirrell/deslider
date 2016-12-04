// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the returned "reformatted" slideshow from the current page.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabSlides(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.sendMessage(tab.id, {text: ''}, function(slides){
			callback(slides);
		});
	});
  });  
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabSlides(function(slides) {
	  // get slides by class
	  if(slides == null){
		  renderStatus('No slideshow was detected on this page!');
	  }
	  else{
		var contentDiv = document.getElementById('content');
		contentDiv.innerHTML = slides;  	
	  }		
  });
});

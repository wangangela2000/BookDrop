'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// add any functionality and listeners you want here
	$(".single-btn button").click(changecolor);

}

function changecolor(e){
	e.preventDefault();
	var button = $(this);

}

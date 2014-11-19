// Script to determine if the screen resolution has been changed.
// if it has, then we need to make sure the objects and text resize themselves accordingly...
// @author Adam Stevenson 2014

// screen variables
var initResElement   = document.getElementById("contentPanel");
var initScreenWidth = initResElement.offsetWidth;
var initScreenHeight = initResElement.offsetHeight;
var isChanged;

// If the width or height of the content panel changes, then refresh.
setInterval(function()
{
	// detect changes in width and height
	validateResChange();
},1500);

function validateResChange(){
	// parameters
	var changedScreenWidth = document.getElementById("contentPanel").offsetWidth;
	var changedScreenHeight = document.getElementById("contentPanel").offsetWidth;

	if(initScreenWidth != changedScreenWidth ||
		initScreenHeight != changedScreenHeight){
					
		// define new initial values
		initScreenWidth = changedScreenWidth;
		initScreenHeight = changedScreenHeight;

		if(initScreenWidth == changedScreenWidth && initScreenHeight == changedScreenHeight)isChanged = "true";
			else isChanged = "false";

		//apply changes
		if(isChanged == "true") applyContentChange();
	}
}

function applyContentChange(){

	// assign the class names that directly effect text and objects
	var allClasses = ["h1","h2","p3","p4","p5","p6","contentPanel"];;

	// get each element on the page
	var allElements = document.getElementsByTagName("*");

	// cycle through each element
	for (var i = 0, maxElements = allElements.length; i < maxElements; i++)     
		// cycle through each class name
		for(var j = 0, maxClasses = allClasses.length; j < maxClasses; j++)
			// apply refresh
			if(allElements[i].className == allClasses[j]) allElements[i].className = allClasses[j];
}

// For parsing a url; used by scripts to append the '?', to create the oppertunity to
// append variables to the end
function parseQuery ( query ) {
   var Params = new Object ();
   if ( ! query ) return Params; // return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}
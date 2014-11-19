// @author Adam Stevenson 2014

// Script to determine if the screen resolution has been changed.
// if it has, then we need to make sure the objects and text resize themselves accordingly...

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
	var changedScreenHeight = document.getElementById("contentPanel").offsetHeight;

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

// On click functions, and tracking for the count of a message.
$(document).ready(function(){

	// key press and click functions for messages
	var messageName = document.getElementById('contactMessageName');
	var messageEmail = document.getElementById('contactMessageEmail');
	var messageContent = document.getElementById('contactMessageContent');
	var messageContentCount = document.getElementById('contactMessageCount');

	// define defaults
	messageContent.value = "Enter Message...";
	messageContentCount.value = "300";
	var messageCharCount = 300;

	// active fields
	var messageInitialActive = true; // if the default message is active in content textview
	var messageNameInitialActive = true; // if the default message is active in content textview
	var messageEmailInitialActive = true; // if the default message is active in content textview

	// functions
	messageContent.onclick = function(){ 
		$( messageContent ).keydown();

		if(messageInitialActive == true){

			messageInitialActive = false; // indicates that the initial message has now been deemed inactive
			messageContent.value = "";
		}

	};

	messageName.onclick = function(){ 
		$( messageName ).keydown();

		if(messageNameInitialActive == true){

			messageNameInitialActive = false; // indicates that the initial message has now been deemed inactive
			messageName.value = "";
		}

	};

	messageEmail.onclick = function(){ 
		$( messageEmail ).keydown();

		if(messageEmailInitialActive == true){

			messageEmailInitialActive = false; // indicates that the initial message has now been deemed inactive
			messageEmail.value = "";
		}

	};

	$( messageContent ).keydown(function() {
		
		messageContentCount.value -= 1;

		// use to enforce max amount of characters
		messageCharCount -= 1;
	});

});

// twitter feed
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id))
		{
			js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);
		}
}(document,"script","twitter-wjs");


// When the user enters a message, with a username, email and content, the information
// is sent to the database, where it can be used later on to view all revelant information (in a secure fashion).
//
// @param messageUsername + Email + Content = information to be sent.
function insertMessage(){

  // Parameters for determining the request
  var messageUsername = document.getElementById('contactMessageName').value; 
  var messageUsernameState = false;
  var messageEmail = document.getElementById('contactMessageEmail').value;
  var messageEmailRegEx = isValidEmailAddress(messageEmail);
  var messageEmailState = false;
  var messageContent = document.getElementById('contactMessageContent').value;
  var messageContentState = false; 

  // Format validation for username, email and content. 
  // function isValidEmailAddress is used to check the email address is valid, otherwise everything
  // seems to be fairly basic.
  if(messageUsername === "" || messageUsername.length <3 || messageUsername === "Name...") messageUsernameState = false;
  	else messageUsernameState = true;
  
  if(messageEmail === "" || messageEmailRegEx === false || messageEmail === "Email Address...") messageEmailState = false;
    else messageEmailState = true;

  if(messageContent === "" || messageContent === "Enter Message...") messageContentState = false;
    else messageContentState = true;

  if(messageUsernameState == false || messageEmailState == false || messageContentState == false){

    // username error message
    if(messageUsernameState == false) alert("The username field is empty, or has not been populated."); 

    // email error message
    if(messageEmailState == false) alert("Your email address is not in a correct format, please revise and try again.")

    // content error message
    if(messageContentState == false) alert('You have not entered any message');
  }

  // if everything checks out, then proceed to creating the XOR Request, for the purpose of sending a message...
  // first we need to create the query string - basically append username, email and content to the php script url...
  if(messageContentState && messageEmailState && messageContentState){

    var queryString = "username=" + messageUsername + "&userEmail=" + messageEmail + "&userMessage=" + messageContent;
    var url = 'classes/contact/cont_insert_message.php';

    // Create an XML request
    var messageRequest = createRequest("POST", url);
    // Define the Request Header
    messageRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Before we send the request, we need to create a function to capture the response text;
    // I.e, create a function that will receive data sent from the server
    messageRequest.onreadystatechange = function(){

      /*Holds the status of the XMLHttpRequest. Changes from 0 to 4: 
      0: request not initialized 
      1: server connection established
      2: request received 
      3: processing request 
      4: request finished and response is ready
      status  200: "OK"
      404: Page not found
      */
      switch(messageRequest.status){

        // If we have an "ok" status
        case 200:

          switch(messageRequest.readyState){

            case 0: 
              alert("An error occurred setting up the script.");
              break;

            case 1:
              alert("There was an error connecting to the server, please check your internet connection.");
              break;

            case 4:
              // this is what we want, comes after states 2 and 3; request recieved and processed with a response
              var retrievedText = messageRequest.responseText;
              alert(retrievedText); // the response message, which essentially is a confirmation of it being sent and processed.
              break;

            default:
              if(messageRequest.readyState == 2 || messageRequest.readyState == 3){}
                else alert("Something strange has occured...please try again");
              break;
          }

          break;

        // Page not found
        case 404: alert("Script responsible for sending the message has not been found.");
          break;

        // default...not likely to occur
        default: alert("something strange has occured...please try again!");
          break;
      }
    }

    // send the username, email and message information to be inserted into the database, which will then be
    // forwarded to my email address; good to have both a message history, and a way of having a notification
    // about messages.
    messageRequest.send(queryString); 
  }
  
  // check if the email address is in a valid format or not
  function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
  };  

  function createRequest(method, url) {
    var thisRequest = new XMLHttpRequest();

    if ("withCredentials" in thisRequest) {
        // thisRequest has 'withCredentials' property only if it supports CORS
        thisRequest.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") { // if IE use XDR
        thisRequest = new XDomainRequest();
        thisRequest.open(method, url);
    } else {
        thisRequest = null;
    }
    return thisRequest;
  }
}

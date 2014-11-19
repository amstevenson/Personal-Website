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


/* URL QUERY APPENDING 
/ For parsing a url; used by scripts to append the '?', to create the oppertunity to
/ append variables to the end
*/
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


/* PROJECT GALLERY */
//Check the document has loaded
$(document).ready(function(){

    //Hide classes "galleryOverlay" and "galleryHover"
    $('.galleryOverlay, .galleryHover').hide()

    //The function for the mouse hovering over a gallery container
    $(".galleryContain").hover(function(){

        //Initialize local variables...
        var $this = $(this),
        $content = $this.find('.galleryHover'),
        $overlay = $this.find('.galleryOverlay');

        //On hover, move the div from -450px on z axis to 0 (start of div) to view
        $content.stop().show().css({"left" : "-400px"}).animate({left : 0}, 600);

        //Enable the overlay div and set it to 0.9% opacity over 0.75 seconds
        $overlay.stop().fadeTo(750, 0.9)
        
        }, function() {

            //Initialize local variables...
            var $this = $(this),
            $content = $this.find('.galleryHover'),
            $overlay = $this.find('.galleryOverlay');

            //Animate the div +450 on z-axis to give illusion of moving to right
            $content.stop().animate({left : 450}, 750)

            //Fadeout the overlaying background over 1second
            $overlay.stop().fadeTo(1000, 0)
    });
});

//projects hover
$(document).ready(function(){

    //on hover animate the opacity of the div
    $(".otherWork").hover(function(){

        $(".otherWork").animate({opacity : 1}, 850);

    }, function() {

        $(".otherWork").animate({opacity : 0.6}, 850);

    });

});

// display gallery objects
$(document).ready(function(){

        $("#gallery1").hide(0).delay(500).fadeIn(1000)

        $("#gallery2").hide(0).delay(650).fadeIn(1000)

        $("#gallery3").hide(0).delay(800).fadeIn(1000)

        $("#gallery4").hide(0).delay(950).fadeIn(1000)
});
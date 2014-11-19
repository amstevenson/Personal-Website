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

// see: http://www.webdevdoor.com/jquery/expandable-collapsible-panels-jquery/
(function($) {
    $(document).ready(function () { 
        /*-------------------- EXPANDABLE PANELS ----------------------*/
        var panelspeed = 500; //panel animate speed in milliseconds
        var totalpanels = 4; //total number of collapsible panels   
        var defaultopenpanel = 1; //leave 0 for no panel open   
        var accordian = false; //set panels to behave like an accordian, with one panel only ever open at once      
  
        var panelheight = new Array();
        var currentpanel = defaultopenpanel;
        var iconheight = parseInt($('.icon-close-open').css('height'));
        var highlightopen = true;
          
        //Initialise collapsible panels
        function panelinit() {
                for (var i=1; i<=totalpanels; i++) {
                    panelheight[i] = parseInt($('#cp-'+i).find('.expandable-panel-content').css('height'));
                    $('#cp-'+i).find('.expandable-panel-content').css('margin-top', -panelheight[i]);
                    if (defaultopenpanel == i) {
                        $('#cp-'+i).find('.icon-close-open').css('background-position', '0px -'+iconheight+'px');
                        $('#cp-'+i).find('.expandable-panel-content').css('margin-top', 0);
                        $('#cp-'+i + ' .expandable-panel-heading').addClass('header-active');
                    }
                }
        }
  
        $('.expandable-panel-heading').click(function() {           
            var obj = $(this).next();
            var objid = parseInt($(this).parent().attr('ID').substr(3,2));  
            currentpanel = objid;
            if (accordian == true) {
                resetpanels();
            }
              
            if (parseInt(obj.css('margin-top')) <= (panelheight[objid]*-1)) {
                obj.clearQueue();
                obj.stop();
                obj.prev().find('.icon-close-open').css('background-position', '0px -'+iconheight+'px');
                obj.animate({'margin-top':0}, panelspeed);
                if (highlightopen == true) {
                    $('#cp-'+currentpanel + ' .expandable-panel-heading').addClass('header-active');
                }
            } else {
                obj.clearQueue();
                obj.stop();
                obj.prev().find('.icon-close-open').css('background-position', '0px 0px');
                obj.animate({'margin-top':(panelheight[objid]*-1)}, panelspeed); 
                if (highlightopen == true) {
                    $('#cp-'+currentpanel + ' .expandable-panel-heading').removeClass('header-active');   
                }
            }
        });
          
        function resetpanels() {
            for (var i=1; i<=totalpanels; i++) {
                if (currentpanel != i) {
                    $('#cp-'+i).find('.icon-close-open').css('background-position', '0px 0px');
                    $('#cp-'+i).find('.expandable-panel-content').animate({'margin-top':-panelheight[i]}, panelspeed);
                    if (highlightopen == true) {
                        $('#cp-'+i + ' .expandable-panel-heading').removeClass('header-active');
                    }
                }
            }
        }
              
  
        $(window).load(function() {
            panelinit();
        }); //END LOAD
    }); //END READY
})(jQuery);
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


/* SEARCHING PROJECTS

Listen for the users choice; upon selection, display the relevant content...

OOP is used to initiate all of the variables, and allow the starting values to be
passed across from the webpage, to the actual script.

@param chosenTypeText - the text for the type of search
@param searchText - The text when searching by name
@param compareString - populated by either type, name, or date published
@see compareMethod - function to populate div with relevant project content

@author Adam Stevenson
*/
var obj; // list of projects
var projectTotal; // the amount of projects

var PROJECTLIBRARY = PROJECTLIBRARY || (function(){
    var _args = {}; // private

    return {
        init : function(Args) {

            _args = Args;
        },
        projectSetup : function() {
           
            obj = _args[0];
            projectTotal = obj.length;

            projectPopulate();
        }
    };
}());

function projectPopulate(){
    // placeholder var
    var searchTypeTag;

    // option variables
    var anySelect = document.getElementById('searchOptions');

    var byName = document.getElementById('searchOptionOne');
    var byType = document.getElementById('searchOptionTwo');
    var byPublication = document.getElementById('searchOptionThree');

    // storing text values
    var chosenName = document.getElementById('searchOptionByName');
    var chosenType = document.getElementById('searchOptionByType');
    var chosenPublication = document.getElementById('searchOptionByPublication');
    var panelToChange = document.getElementById('projPanel');

    // The specific text for each search type option
    var chosenTypeText;
    var chosenPublicationText;

    // on first load, ensure the search bar is showing
    byName.style.display = 'inline';

    anySelect.onchange = function() {
                            
        // First option
        if(anySelect.selectedIndex == 0)

            byName.style.display = 'inline'; // display the search box; by name

        else byName.style.display = 'none'; // else, do nothing

        // Second option
        if(anySelect.selectedIndex == 1) {

            byType.style.display = 'inline'; // display the types of projects

            chosenTypeText = chosenType.options[chosenType.selectedIndex].text;

            // define variables to pass to search function
            searchTypeTag = "type";

            // function to populate content of projects div
            refineResults(chosenTypeText, searchTypeTag);

        } else  byType.style.display = 'none';

        // Third option
        if(anySelect.selectedIndex == 2){

            byPublication.style.display = 'inline';

            chosenPublicationText = chosenPublication.options[chosenPublication.selectedIndex].text;

            // define variables to pass to search function
            searchTypeTag = "publish";

            // function to populate content of projects div
            refineResults(chosenTypeText, searchTypeTag);

        } else byPublication.style.display = 'none';
                                
    }

    // if a user clicks on the text box for entering a search, clear it
    chosenName.onclick = function(){ chosenName.value = "";}

    // Populate project panel with projects for a given type
    chosenType.onchange = function(){

        chosenTypeText = chosenType.options[chosenType.selectedIndex].text;
        var amountOfResults;
                            
        // define variables to pass to search function
        searchTypeTag = "type";

        // function to populate content of projects div
        refineResults(chosenTypeText, searchTypeTag);

    }

    // Populate project panel with projects for a given year of publication
    chosenPublication.onchange = function(){

        chosenPublicationText = chosenType.options[chosenPublication.selectedIndex].text;
        var amountOfResults;
                            
        // define variables to pass to search function
        searchTypeTag = "publish";

        // function to populate content of projects div
        refineResults(chosenPublicationText, searchTypeTag);

    }

    /* listen out for the submit button. When it is submitted, fetch any 
    results that match the name of the given search parameter
    */
    $('#searchOptionByNameForm').submit(function(){
                            
        // define variables to pass to search function
        searchTypeTag = "name";
        var searchText = chosenName.value;

        // function to populate content of projects div
        refineResults(searchText, searchTypeTag);

        // prevent page refresh
        return false;
    });

    /* Once a search type has been selected, or the text for a general search has been entered,
    this method will populate the div responsible for displaying the projects relevant to the overall query.
    */
    function refineResults(compareString, compareMethod){

        panelToChange.innerHTML = " "; // refresh div content

        for(var i = 0; i < projectTotal; i++){

            //if we are searching by name
            if(compareMethod = "name"){
                if(obj[i].proj_name.search(compareString) != -1 ){
                    //add each project that matches the chosen type, to the innerHTML
                    panelToChange.innerHTML += 
                    "<div class = 'projPanelInner'>" +
                    "<a href =" + obj[i].proj_link + "><img class = 'projPanelImage'" +
                    "src = 'images/projects/" + obj[i].proj_icon + "'></a></img>" +
                    "<p class = 'projTextName'><a class = 'galleryLink' href =" +
                    obj[i].proj_link + ">" + obj[i].proj_name + "<br></a></p>" + 
                    "<p class = 'projTextDescription'> Time Period: " + obj[i].proj_timeperiod + 
                    "<br><br>" + obj[i].proj_description + "<br><br>Project Type: " +
                    obj[i].proj_type + "</p></div>";
                                
                }
            }   

            //if we are searching by type
            if(compareMethod = "type"){
                if(compareString === obj[i].proj_type ){
                    //add each project that matches the chosen type, to the innerHTML
                    panelToChange.innerHTML += 
                    "<div class = 'projPanelInner'>" +
                    "<a href =" + obj[i].proj_link + "><img class = 'projPanelImage'" +
                    "src = 'images/projects/" + obj[i].proj_icon + "'></a></img>" +
                    "<p class = 'projTextName'><a class = 'galleryLink' href =" +
                    obj[i].proj_link + ">" + obj[i].proj_name + "<br></a></p>" + 
                    "<p class = 'projTextDescription'> Time Period: " + obj[i].proj_timeperiod + 
                    "<br><br>" + obj[i].proj_description + "<br><br>Project Type: " +
                     obj[i].proj_type + "</p></div>";
                                
                }
            }

            //if we are searching by publication
            if(compareMethod = "publish"){
                if(obj[i].proj_timeperiod.search(compareString) != -1 ){
                    //add each project that matches the chosen type, to the innerHTML
                    panelToChange.innerHTML += 
                    "<div class = 'projPanelInner'>" +
                    "<a href =" + obj[i].proj_link + "><img class = 'projPanelImage'" +
                    "src = 'images/projects/" + obj[i].proj_icon + "'></a></img>" +
                    "<p class = 'projTextName'><a class = 'galleryLink' href =" +
                    obj[i].proj_link + ">" + obj[i].proj_name + "<br></a></p>" + 
                    "<p class = 'projTextDescription'> Time Period: " + obj[i].proj_timeperiod + 
                    "<br><br>" + obj[i].proj_description + "<br><br>Project Type: " +
                    obj[i].proj_type + "</p></div>";
                                
                }
            }
        }
        return false;
    }
}


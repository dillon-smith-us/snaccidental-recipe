// Is content for each category, going to be dynamically displayed or will it be a display on or off type of thing. 
// Ask about the 30 results per page or 30 total in class 
// Run a basic API fetch to see what data we get.

// Split into two teams of getting more of the HTML Fleshed out and umm getting a test API call to see what info we are receiving. 


// Function for generating search results. 
    // Includes image, and includes Title of Recipe and both are a link to the recipe page. 
    // At the bottom there should a a previous button and a next button

// Function that fetches the API and uses our object that has the "include array" and "restrict array". 
    // That will be adding to the parameters of the fetch. 
    // Will then start the function that generated the search results.

// Section 1
// Event listeners for the sections to determine if they are being included or not & then event listeners on the section div to listen for the individual items and then add them to our search array. 
// event listener for the search button.

// Section 2
// Function that takes the input and both adds the item to the search array and lists the item out in the visible page of what is being included in the search. 
    // The items will need to be able to be closed/removed from the list. 
    // Look up jQuery spell checker in include some stop for if they enter items wrong. 
        // <script src="js/jquery.spellchecker.min.js"></script>
        // <link href="css/jquery.spellchecker.css" rel="stylesheet" /> 
        // https://github.com/badsyntax/jquery-spellchecker/wiki/Documentation
    // Some sort of stop if they try to search with having no items 
    // Discuss route for how we are going to add restrictions/ checkbox vs. search input. Should be added to separate array.

// Event listener for the two buttons that determine seach one or search two.


// Errors to keep an eye out for "fixing"
    // If search results pull up no recipes
        // Try again
        // Use less ingredients
        // Use different ingredients
        // Check your ingredients are actual ingredients
    // Require a minimum of three ingredients


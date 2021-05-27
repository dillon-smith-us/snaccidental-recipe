// Ask about the 30 results per page or 30 total in class 

// These are our section arrays, where checked items will be added to them.
let allergensArray = [];
let dietArray = [];
let cuisineArray = [];
let ingredientsArray = [];
let recipeArray = [];
let ingredientsList1 = $("#returnCall");
let checkedBoxItem;

// Function for generating search results. 
// Includes image, and includes Title of Recipe and both are a link to the recipe page. 
// At the bottom there should a a previous button and a next button

// That will be adding to the parameters of the fetch. 
// Will then start the function that generated the search results.

// This function will take the checked items and search for recipes in relation to them.
function searchOneInitialize() {
    let apiOdy = "872fa65d52a2467f9914c55d89dbf2ba";
    /* Parameter explanations:
        number | number | The number of expected results (between 1 and 100).
        instructionsRequired | boolean | Whether the recipes must have instructions.
        addRecipeInformation | boolean | If set to true, you get more information about the recipes returned.
        *sort | string | The strategy to sort recipes by.
        *sortDirection | string | 	The direction in which to sort. Must be either 'asc' (ascending) or 'desc' (descending).
        intolerances | string | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered.
        diet | string | The diet for which the recipes must be suitable.
        cuisine | string | The The cuisine(s) of the recipes. One or more, comma separated (will be interpreted as 'OR').
        includeIngredients | string | A comma-separated list of ingredients that should/must be used in the recipes.
        titleMatch | string | Enter text that must be found in the title of the recipes. */ 
    // Variables that pull the joined strings from their respective arrays.
    let allergens = "&intolerances=" + allergensArray.join();
    let diet = "&diet=" + dietArray.join();
    let cuisine = "&cuisine=" + cuisineArray.join();
    let ingredients = "&includeIngredients=" + ingredientsArray.join();
    let recipe = "&titleMatch=" + recipeArray.join();
    // This will add all the arrays being used to one master array that can then be input into the API call.
    let masterArray = [];
    if (allergensArray.length !== 0) {
        masterArray.push(dietArray.join())
    }
    if (dietArray.length !== 0) {
        masterArray.push(dietArray.join())
    }
    if (cuisineArray.length !== 0) {
        masterArray.push(cuisineArray.join());
    }
    if (ingredientsArray.length !== 0) {
        masterArray.push(ingredientsArray.join());
    }
    if (recipeArray.length !== 0) {
        masterArray.push(recipeArray.join());
    }
    // requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + masterArray.join() + "&apiKey=" + apiOdy;
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?&cuisine=&includeIngredients=strawberry&number=10&addRecipeInformation=true&apiKey=" + apiOdy;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Complex search data.")
            console.log(data)
            displayRecipes(data);
        })
}

searchOneInitialize();

// This function will run the api that grabs the recipe URL and then will display the image and title on the page.
function displayRecipes(data) {

}

// Event listeners to add checked items to the search array, and display them on the screen in the added ingredients section. 
//need to add css text transform for capitalization

$("#diet").on("click", ".diet", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    dietArray.push(checkedBoxItem);
    
});

$("#allergens").on("click", ".allergens", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    allergensArray.push(checkedBoxItem);
    
})

$("#cuisine").on("click", ".cuisine", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    cuisineArray.push(checkedBoxItem);
    
    
});

$("#meat").on("click", ".meat", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
   
    
});

$("#meatSubstitute").on("click", ".meatSubstitute", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
});

$("#seafood").on("click", ".seafood", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    

    
});

$("#vegetables").on("click", ".vegetables", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
    
});

$("#grains").on("click", ".grains", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
});

$("#fruits").on("click", ".fruits", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
});

$("#dairies").on("click", ".dairies", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
});

$("#spices").on("click", ".spices", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
});

$("#oils").on("click", ".oils", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
});

$("#nuts").on("click", ".nuts", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    ingredientsArray.push(checkedBoxItem);
    
});

$("#desserts").on("click", ".desserts", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    recipeArray.push(checkedBoxItem);
    
});

$("#sauces").on("click", ".sauces", function (event) {
    event.preventDefault;
    checkedBoxItem = $(this).val();
    ingredientsList1.append(checkedBoxItem + ", ");
    recipeArray.push(checkedBoxItem);
    
    
});


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

// This makes the accodion work.
// Needs to be converted to jQuery.
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// I think we could use the offset property to skip to the next 10 results.
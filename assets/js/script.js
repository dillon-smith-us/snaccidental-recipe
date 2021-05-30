// These are our section arrays, where checked items will be added to them.
let allergensArray = [];
let dietArray = [];
let cuisineArray = [];
let ingredientsArray = [];
let recipeArray = [];
let ingredientsList = $("#returnCall");
let checkedBoxItem;
let value;
let imageDiv = $("#searchResults")

// This function will take the checked items and search for recipes in relation to them.
function searchOneInitialize() {
    // Empty results div on search run.
    imageDiv.empty();
    let apiOdy = "872fa65d52a2467f9914c55d89dbf2ba";
    let apiChris = "75de8262c10e4899bf623668f3281309";
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
    console.log(recipe);
    // This will add all the arrays being used to one master array.
    let masterArray = [];
    if (allergensArray.length !== 0) {
        masterArray.push(allergens)
    }
    if (dietArray.length !== 0) {
        masterArray.push(diet)
    }
    if (cuisineArray.length !== 0) {
        masterArray.push(cuisine);
    }
    if (ingredientsArray.length !== 0) {
        masterArray.push(ingredients);
    }
    if (recipeArray.length !== 0) {
        masterArray.push(recipe);
    }
    // The arrays are joined into one string.
    master = masterArray.join();
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + master + "&apiKey=" + apiChris;
    // Below is the test API that is static; comment out the above API and use the one below; also on line 67 uncomment out the call for this function otherwise it won't run on page refresh.
    //requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true&includeIngredients=chicken&apiKey=" + apiChris;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Complex search data.")
            console.log(data)
            displayRecipes(data);
        })
        localStorage.setItem("master", master);   
}



// searchOneInitialize();

// This function will run the api that grabs the recipe URL and then will display the image and title on the page.
function displayRecipes(data) {
    for (let i = 0; i < data.results.length; i++) {
        let image = data.results[i].image;
        let title = data.results[i].title;
        let link = data.results[i].sourceUrl;
        // https://www.foodista.com/recipe/WGM3YMVS/rocky-road-ice-cream
        // https://spoonacular.com/rocky-road-ice-cream-658725
        let linkDiv = $("<a>");
        linkDiv.attr("href", link);
        linkDiv.attr("target", "_blank");
        linkDiv.attr("class", "resultsDiv")
        let div = $("<div>");
        linkDiv.append(div);
        let img = $("<img>");
        img.attr("src", image);
        img.attr("class", "resultsImg");
        // img.attr("class", "enter class name");
        div.append(img);
        let para = $("<p>");
        para.attr("class", "resultsText");
        // para.attr("class", "enter class name");
        para.text(title);
        div.append(para);
        imageDiv.append(linkDiv);
    }
}

// These are event listeners that add checked items to the search array, and display them on the screen in the added ingredients section. 
$("#allergens").on("click", ".allergens", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        console.log("value " + value);
        allergensArray.push(value);
        console.log(allergensArray);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        console.log("value2 " + value);
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        allergensArray.splice($.inArray(value, allergensArray), 1);
        console.log(allergensArray);
    }
})

$("#diet").on("click", ".diet", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        dietArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        dietArray.splice($.inArray(value, dietArray), 1);
    }
})

$("#cuisine").on("click", ".cuisine", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        cuisineArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        cuisineArray.splice($.inArray(value, cuisineArray), 1);
    }
})

$("#meat").on("click", ".meat", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#meatSubstitute").on("click", ".meatSubstitute", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#seafood").on("click", ".seafood", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#vegetables").on("click", ".vegetables", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#grains").on("click", ".grains", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#fruits").on("click", ".fruits", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#dairies").on("click", ".dairies", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#spices").on("click", ".spices", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})
$("#oils").on("click", ".oils", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#nuts").on("click", ".nuts", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        ingredientsArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
    }
})

$("#desserts").on("click", ".desserts", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("value", $(this).val());
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        recipeArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        recipeArray.splice($.inArray(value, recipeArray), 1);
    }
})

$("#sauces").on("click", ".sauces", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("data-inputID", $(this).attr("id"));
        liEl.attr("class", "checklistItems");
        liEl.attr("data-search", "checkbox");
        liEl.append(checkedBoxItem + " ");
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        recipeArray.push(value);
        console.log(recipeArray);
    } else {
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        recipeArray.splice($.inArray(value, recipeArray), 1);
        console.log(recipeArray);
    }
})

$("#returnCall").on("click", ".listItems", function (event) {
    event.preventDefault;
    // This will uncheck the box in the appropriate accordion.
    // if ($(this).attr)
    console.log($(this).data('data-search'));
    let removeCheckboxItem = $("input[id='" + $(this).attr("data-inputID") + "']");
    removeCheckboxItem.prop("checked", false);
    console.log($(this));
    // These statements determine which array to remove from.
    let liValue = removeCheckboxItem.val();
    if (removeCheckboxItem.is(".allergens")) {
        allergensArray.splice($.inArray(liValue, allergensArray), 1);
    } else if (removeCheckboxItem.is(".diet")) {
        dietArray.splice($.inArray(liValue, dietArray), 1);
    } else if (removeCheckboxItem.is(".cuisine")) {
        cuisineArray.splice($.inArray(liValue, cuisineArray), 1);
    } else if (removeCheckboxItem.is(".desserts")) {
        recipeArray.splice($.inArray(liValue, recipeArray), 1);
    } else if (removeCheckboxItem.is(".sauces")) {
        recipeArray.splice($.inArray(liValue, recipeArray), 1);
    } else {
        ingredientsArray.splice($.inArray(liValue, ingredientsArray), 1);
    };
    console.log(allergensArray);
    console.log(dietArray);
    console.log(cuisineArray);
    console.log(recipeArray);
    console.log(ingredientsArray);
    let liRemoval = $(this);
    liRemoval.remove();
})

$("#returnCall").on("click", ".searchItems", function (event) {
    event.preventDefault;
    // These statements determine which array to remove from.
    let liValue = removeCheckboxItem.val();
    if (removeCheckboxItem.is(".allergens")) {
        allergensArray.splice($.inArray(liValue, allergensArray), 1);
    } else if (removeCheckboxItem.is(".diet")) {
        dietArray.splice($.inArray(liValue, dietArray), 1);
    } else if (removeCheckboxItem.is(".cuisine")) {
        cuisineArray.splice($.inArray(liValue, cuisineArray), 1);
    } else if (removeCheckboxItem.is(".desserts")) {
        recipeArray.splice($.inArray(liValue, recipeArray), 1);
    } else if (removeCheckboxItem.is(".sauces")) {
        recipeArray.splice($.inArray(liValue, recipeArray), 1);
    } else {
        ingredientsArray.splice($.inArray(liValue, ingredientsArray), 1);
    };
    console.log(allergensArray);
    console.log(dietArray);
    console.log(cuisineArray);
    console.log(recipeArray);
    console.log(ingredientsArray);
    let liRemoval = $(this);
    liRemoval.remove();
})

/* Search Input
    We need a slider to determine if ingredients or dish is being entered.
    Slider event listener will change the data-type attribute on the input to {ingredient} or {dish}.
    The add button listener will first spell check what was input to make sure nothing is spelled wrong.
    let input = whatever is in the input
    Capitalize the input.
    probably have to have a new variable that is the capitalized input
    It will then append it to the ingredients list with the below items
        - let liEl = $("<li>");
        - let iconEl = $("<i>")
        - iconEl.attr("class", "fas fa-trash");
        - array variable *need to make a variable from the input text where the spaces are removed, if there are any, you will also need to make sure any spaces at the beginning or end are removed.
        liEl.attr("value", "above variable");
        liEl.append(capitalized input + " ");
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        
        ingredientsArray.push(the variable that starts with *);

        // var Typo = require("typo-js");
    //var dictionary = new Typo(lang_code);
    //var is_spelled_correctly = dictionary.check("mispelled");
    /*
    let liEl = $("<li>")
    
    $("#searchOneBtn").click(function() {
        liEl.text("#input");
        ingredientsArray.push(liEl);
        
     

        var input = $( "#input" );
        input.val(input.val() + "");

        ingredientsList.append(liEl);
    })

*/
/*  
document.getElementById("searchOneBtn").onclick = function() {
   
   var text = document.getElementsByClassName("input").value; 

   
   var li = "<li>" + text + "</li>";

   
   ingredientsArray.append(li);
}
*/

//Look up jQuery spell checker in include some stop for if they enter items wrong. 
//<script src="js/jquery.spellchecker.min.js"></script>
// <link href="css/jquery.spellchecker.css" rel="stylesheet" /> 
// https://github.com/badsyntax/jquery-spellchecker/wiki/Documentation
// */

/*checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
let liEl = $("<li>");
let iconEl = $("<i>")
iconEl.attr("class", "fas fa-trash");
liEl.attr("data-inputID", $(this).attr("id"));
liEl.append(checkedBoxItem + " ");
liEl.append(iconEl);
ingredientsList.append(liEl);d
value = $(this).val();
ingredientsArray.push(value);

*/
// let liEl = $("<li>");
//let iconEl = $("<i>")

$("#addBtn").click(function () {
    let input = $("#searchInput").val();
    let lcInput = input.toLowerCase();
    let trimmed = $.trim(lcInput);
    console.log(trimmed);

    console.log(lcInput.trim());
    
  //function capitalize() {
   // lcInput.css("text-transform", "capitalize")
  //};
    //function capitalizeFirstLetter(lcInput) {
    //    return lcInput.charAt(0).toUpperCase() + string.slice(1);
//}



    let liEl = $("<li>");
    let iconEl = $("<i>");
    liEl.append(lcInput + " ");

    //ingredientsArray.push(liEl);
    iconEl.attr("class", "fas fa-trash");
    liEl.attr("class", $(this).attr("id"));
    liEl.append(iconEl);

    

    //liEl.append(input);
    ingredientsList.append(liEl);
    
    if($("#togBtn").is(":checked")) {
        recipeArray.push(input);
     } else {
        ingredientsArray.push(input);
    };



    //input.val(input.val() + "");
    //ingredientsArray.push(input);
    console.log("ingredients " + ingredientsArray);
    console.log("recipes " + recipeArray);

    
    $("#searchInput").val("")

})

//local storage


$("#lastSearch").on("click", function(event) {
    event.preventDefault;
    imageDiv.empty();
    let apiOdy = "872fa65d52a2467f9914c55d89dbf2ba";
    let apiChris = "75de8262c10e4899bf623668f3281309";
let savedSearch = localStorage.getItem("master");
    //master = masterArray.join();
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + savedSearch + "&apiKey=" + apiChris;
 

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Complex search data.")
            console.log(data)
            displayRecipes(data);
        })

    

})








    


    
    



    



//$("#togBtn").on("click", function(event) {

////}
//)


// This makes the accordion work.
// Needs to be converted to jQuery.
let accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
    accordions[i].onclick = function () {
        this.classList.toggle('active');

        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            // accordion is currently open, so close it
            panel.style.maxHeight = null;
        } else {
            // accordion is currently closed, so open it
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
}

// This runs the first API with the selected parameters.
$("#searchBtn").on("click", searchOneInitialize);

// This will both empty the ingredients list and uncheck all check boxes.
$("#clearBtn").on("click", function () {
    ingredientsList.empty();
    $(":checkbox").attr("checked", false);
})

/* Errors to keep an eye out for "fixing"
    If search results pull up no recipes
    Try again
    Use less ingredients
    Use different ingredients
    Check your ingredients are actual ingredients
    Require a minimum of three ingredients */

// Some sort of stop if they try to search with having no items.
// At the bottom there should a a previous button and a next button
// I think we could use the offset property to skip to the next 10 results.
// Event listener for the two buttons that determine seach one or search two.
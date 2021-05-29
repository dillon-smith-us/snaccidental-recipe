// These are our section arrays, where checked items will be added to them.
let allergensArray = [];
let dietArray = [];
let cuisineArray = [];
let ingredientsArray = [];
let recipeArray = [];
let ingredientsList1 = $("#returnCall");
let checkedBoxItem;
let value;

// This function will take the checked items and search for recipes in relation to them.
function searchOneInitialize() {
    // Empty results div on search run.
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
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + master + "&apiKey=" + apiOdy;

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

// This function will run the api that grabs the recipe URL and then will display the image and title on the page.
function displayRecipes(data) {
    let imageDiv = $("#resultsOne")
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        ingredientsList1.append(liEl);
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
        iconEl.attr("data-inputID", $(this).attr("id"));
        liEl.attr("value", $(this).val());
        liEl.attr("data-inputID", $(this).attr("id"));
        liEl.append(checkedBoxItem);
        liEl.append(iconEl);
        ingredientsList1.append(liEl);
        value = $(this).val();
        console.log("Sauce value " + value)
        recipeArray.push(value);
        console.log(recipeArray);
    } else {
        value = $(this).val();
        console.log("value2 " + value);
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        recipeArray.splice($.inArray(value, recipeArray), 1);
        console.log(recipeArray);
    }
})

$("#returnCall").on("click", "path", function(event) {
    event.preventDefault;
    // This will uncheck the box in the appropriate accordion.
    let removeCheckboxItem = $("input[id='" + $(this).attr("data-inputID") + "']");
    removeCheckboxItem.prop("checked", false);
    let liRemoval = $(this).closest("li");
    console.log(liRemoval);
    let liValue = liRemoval.val();
    console.log(liValue);
    console.log("liValue " + liValue);
    // These statements determine which array to remove from.
    if (removeCheckboxItem.is(".allergens")) {
        allergensArray.splice($.inArray(liValue, allergensArray), 1);
    } else if (removeCheckboxItem.is(".diet")) {
        dietArray.splice($.inArray(liValue, dietArray), 1);
    } else if (removeCheckboxItem.is(".cuisine")) {
        cuisineArray.splice($.inArray(liValue, cuisineArray), 1);
    } else if (removeCheckboxItem.is(".desserts") || removeCheckboxItem.is(".sauces")) {
        recipeArray.splice($.inArray(liValue, recipeArray), 1);
    } else {
        ingredientsArray.splice($.inArray(liValue, ingredientsArray), 1);
    };
    console.log(recipeArray);
    liRemoval.remove();
})

/* Section 2
    Function that takes the input and both adds the item to the search array and lists the item out in the visible page of what is being included in the search. 
    The items will need to be able to be closed/removed from the list. 
    Look up jQuery spell checker in include some stop for if they enter items wrong. 
    <script src="js/jquery.spellchecker.min.js"></script>
    <link href="css/jquery.spellchecker.css" rel="stylesheet" /> 
    https://github.com/badsyntax/jquery-spellchecker/wiki/Documentation
    Some sort of stop if they try to search with having no items */

// This makes the accordion work.
// Needs to be converted to jQuery.
let accordions = document.getElementsByClassName("accordion");

for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function() {
    this.classList.toggle('active');

    var panel = this.nextElementSibling;
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
$("#searchOneBtn").on("click", searchOneInitialize);

/* Errors to keep an eye out for "fixing"
    If search results pull up no recipes
    Try again
    Use less ingredients
    Use different ingredients
    Check your ingredients are actual ingredients
    Require a minimum of three ingredients */

// At the bottom there should a a previous button and a next button
// I think we could use the offset property to skip to the next 10 results.
// Event listener for the two buttons that determine seach one or search two.
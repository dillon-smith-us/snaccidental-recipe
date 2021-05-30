// These are our section arrays, where checked items will be added to them.
let allergensArray = [];
let dietArray = [];
let cuisineArray = [];
let ingredientsArray = [];
let dishArray = [];
// These are our API keys; multiple are needed in case we run out of available API calls in one of them.
let apiOdy = "872fa65d52a2467f9914c55d89dbf2ba";
let apiChris = "75de8262c10e4899bf623668f3281309";
// The rest of our variables.
let ingredientsList = $("#returnCall");
let imageDiv = $("#searchResults")
let checkedBoxItem;
let value;

// This function will take the checked/added items and search for recipes with those parameters.
function searchInitialize() {
    // Empty results div on search run.
    imageDiv.empty();
    // Variables that pull the joined strings from their respective arrays.
    let allergens = "&intolerances=" + allergensArray.join();
    let diet = "&diet=" + dietArray.join();
    let cuisine = "&cuisine=" + cuisineArray.join();
    let ingredients = "&includeIngredients=" + ingredientsArray.join();
    let recipe = "&titleMatch=" + dishArray.join();
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
    if (dishArray.length !== 0) {
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
            return;
        })
    localStorage.setItem("master", master);
    return;
}

// searchInitialize();

// This function will take the local storage that holds the previous search, and it runs the search with the stored API parameters.
$("#lastSearch").on("click", function (event) {
    event.preventDefault;
    imageDiv.empty();
    let savedSearch = localStorage.getItem("master");
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + savedSearch + "&apiKey=" + apiChris;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Complex search data.")
            console.log(data)
            displayRecipes(data);
            return;
        })
    return;
})

// This function displays the found recipes' images and titles on the page, as well as makes them clickable links.
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
        div.append(img);
        let para = $("<p>");
        para.attr("class", "resultsText");
        para.text(title);
        div.append(para);
        imageDiv.append(linkDiv);
    }
    return;
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

$("#sauces").on("click", ".sauces", function (event) {
    event.preventDefault;
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("data-inputID", $(this).attr("id"));
        liEl.attr("value", $(this).attr("value"));
        liEl.attr("class", "checklistItems");
        liEl.append(checkedBoxItem + " ");
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        value = $(this).val();
        dishArray.push(value);
        console.log("Sauce +dishArray: " + dishArray);
    } else {
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        dishArray.splice($.inArray(value, dishArray), 1);
        console.log("Sauce -dishArray: " + dishArray);
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
        dishArray.push(value);
    } else {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        value = $(this).val();
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        dishArray.splice($.inArray(value, dishArray), 1);
    }
})

$("#returnCall").on("click", ".checklistItems", function (event) {
    event.preventDefault;
    // This will uncheck the box in the appropriate accordion.
    let removeCheckboxItem = $("input[id='" + $(this).attr("data-inputID") + "']");
    removeCheckboxItem.prop("checked", false);
    // These statements determine which array to remove from when the item is removed from #returnCall div.
    let liValue = removeCheckboxItem.val();
    if (removeCheckboxItem.is(".allergens")) {
        allergensArray.splice($.inArray(liValue, allergensArray), 1);
    } else if (removeCheckboxItem.is(".diet")) {
        dietArray.splice($.inArray(liValue, dietArray), 1);
    } else if (removeCheckboxItem.is(".cuisine")) {
        cuisineArray.splice($.inArray(liValue, cuisineArray), 1);
    } else if (removeCheckboxItem.is(".desserts")) {
        dishArray.splice($.inArray(liValue, dishArray), 1);
    } else if (removeCheckboxItem.is(".sauces")) {
        dishArray.splice($.inArray(liValue, dishArray), 1);
    } else {
        ingredientsArray.splice($.inArray(liValue, ingredientsArray), 1);
    };
    console.log(allergensArray);
    console.log(dietArray);
    console.log(cuisineArray);
    console.log(dishArray);
    console.log(ingredientsArray);
    let liRemoval = $(this);
    liRemoval.remove();
    return;
})


// 
$("#returnCall").on("click", ".searchItems", function (event) {
    event.preventDefault;
    let liValue = $(this).attr("data-value");
    // These statements determine which array to remove from.
    if ($(this).is(".dishArray")) {
        dishArray.splice($.inArray(liValue, dishArray), 1);
    } else {
        ingredientsArray.splice($.inArray(liValue, ingredientsArray), 1);
    };
    console.log("dishArray: " + dishArray);
    console.log("ingredientsArray: " + ingredientsArray);
    let liRemoval = $(this);
    liRemoval.remove();
    return;
})

/* Below add button still needs some sort of spell checker.
let Typo = require("typo-js");
let dictionary = new Typo(lang_code);
let is_spelled_correctly = dictionary.check("mispelled");
let liEl = $("<li>")

Look up jQuery spell checker in include some stop for if they enter items wrong. 
<script src="js/jquery.spellchecker.min.js"></script>
<link href="css/jquery.spellchecker.css" rel="stylesheet" /> 
https://github.com/badsyntax/jquery-spellchecker/wiki/Documentation */

// This function will add the typed ingredient dish to the page and to the appropriate array.
function addItems(event) {
    event.preventDefault();
    let input = $("#searchInput").val();
    // First makes sure input text is all lower case, in case there are random capitalized letters in the middle anywhere.
    let lcInput = input.toLowerCase();
    // Then makes sure the beginning and end is trimmed of any additional spaces.
    let trimmedInput = $.trim(lcInput);
    // console.log("Trimmed Text:" + trimmedInput + ":Trimmed End");
    // The input will now have any internal spaces removed and replaced with a dash, as that is how it will need to be for the array.
    let arrayInput = trimmedInput.split(" ").join("-");
    // This section will append to the page, as well as capitalize what is going on display.
    let liEl = $("<li>");
    let iconEl = $("<i>");
    liEl.append(trimmedInput + " ");
    liEl.css("text-transform", "capitalize");
    iconEl.attr("class", "fas fa-trash");
    liEl.attr("data-value", arrayInput);
    liEl.append(iconEl);

    // console.log(":" + arrayInput + ":");
    // This if statement determines which classes to give the list item based on whether the toggle is on ingredients or dish and will also push to the correct array.
    if ($("#togBtn").is(":checked")) {
        liEl.attr("class", "searchItems dishArray");
        dishArray.push(arrayInput);
    } else {
        liEl.attr("class", "searchItems ingredientsArray");
        ingredientsArray.push(arrayInput);
    };
    ingredientsList.append(liEl);
    console.log("ingredients: " + ingredientsArray);
    console.log("recipes: " + dishArray);
    // This will clear the input box after the ingredient or dish has been added.
    $("#searchInput").val("")
    return;
}

$("#submit").on("submit", addItems);

$("#addBtn").on("click", addItems);

// This makes the accordion work.
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
        return;
    }
}

// This runs the first API with the selected parameters.
$("#searchBtn").on("click", searchInitialize);

// This will both empty the ingredients list and uncheck all check boxes.
$("#clearBtn").on("click", function () {
    ingredientsList.empty();
    $(":checkbox").attr("checked", false);
    return;
})

/* Errors to keep an eye out for "fixing"
    If search results pull up no recipes
    Try again
    Use less ingredients
    Use different ingredients
    Check your ingredients are actual ingredients
    Require a minimum of three ingredients */


// Contact page, links need to display as links and open into new webpage.
// Add {return;} to accordion event listeners.
// Need to make clear button clear arrays.
// Which recipe website (recipe owner or spoonacular) do we want the user directed to when they click on a result?

// Make it so when you hit enter it equals the add button.

// Some sort of stop if they try to search with having no items.
// At the bottom there should a a previous button and a next button
// I think we could use the offset property to skip to the next 10 results.
/* Possible additional parameters:
    *sort | string | The strategy to sort recipes by.
    *sortDirection | string | 	The direction in which to sort. Must be either 'asc' (ascending) or 'desc' (descending). */
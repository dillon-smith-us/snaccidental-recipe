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
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + master + "&apiKey=" + apiOdy;

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

// This function will take the local storage that holds the previous search, and it runs the search with the stored API parameters.
$("#lastSearch").on("click", function (event) {
    event.preventDefault;
    imageDiv.empty();
    let savedSearch = localStorage.getItem("master");
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + savedSearch + "&apiKey=" + apiOdy;

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
function accordionHandler() {
    if ($(this).is(":checked")) {
        checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        // Appends the checked item to the display div.
        let liEl = $("<li>");
        let iconEl = $("<i>")
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("data-inputID", $(this).attr("id"));
        liEl.attr("value", $(this).attr("value"));
        liEl.attr("class", "checklistItems");
        liEl.append(checkedBoxItem + " ");
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        // Pushes the checked item into the appropriate array.
        value = $(this).val();
        if ($(this).is(".allergens")) {
            allergensArray.push(value);
        } else if ($(this).is(".diet")) {
            dietArray.push(value);
        } else if ($(this).is(".cuisine")) {
            cuisineArray.push(value);
        } else if ($(this).is(".desserts")) {
            dishArray.push(value);
        } else {
            ingredientsArray.push(value);
        }
        // Console logs for testing.
        console.log("+allergensArray: " + allergensArray);
        console.log("+dietArray: " + dietArray);
        console.log("+cuisineArray: " + cuisineArray);
        console.log("+ingredientsArray: " + ingredientsArray);
        console.log("+dishArray: " + dishArray);
    } else {
        // Removes the unchecked item from the display div.
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        // Removes the unchecked item from the appropriate array.
        value = $(this).val();
        if ($(this).is(".allergens")) {
            allergensArray.splice($.inArray(value, allergensArray), 1);
        } else if ($(this).is(".diet")) {
            dietArray.splice($.inArray(value, dietArray), 1);
        } else if ($(this).is(".cuisine")) {
            cuisineArray.splice($.inArray(value, cuisineArray), 1);
        } else if ($(this).is(".desserts")) {
            dishArray.splice($.inArray(value, dishArray), 1);
        } else {
            ingredientsArray.splice($.inArray(value, ingredientsArray), 1);
        }
        // Console logs for testing.
        console.log("-allergensArray: " + allergensArray);
        console.log("-dietArray: " + dietArray);
        console.log("-cuisineArray: " + cuisineArray);
        console.log("-ingredientsArray: " + ingredientsArray);
        console.log("-dishArray: " + dishArray);
    }
    return;
}

// These are the events for each accordion.
$("#allergens").on("click", ".allergens", accordionHandler);
$("#diet").on("click", ".diet", accordionHandler);
$("#cuisine").on("click", ".cuisine", accordionHandler);
$("#meat, #meatSubstitute, #seafood, #vegetables, #grains, #fruits, #dairies, #spices, #oils, #nuts, #sauces").on("click", ".ingredients", accordionHandler);
$("#desserts").on("click", ".dish", accordionHandler);


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
    } else if (removeCheckboxItem.is(".ingredients")) {
        ingredientsArray.splice($.inArray(liValue, ingredientsArray), 1);
    } else {
        dishArray.splice($.inArray(liValue, dishArray), 1);
    };
    console.log("-allergensArray: " + allergensArray);
    console.log("-dietArray: " + dietArray);
    console.log("-cuisineArray: " + cuisineArray);
    console.log("-ingredientsArray: " + ingredientsArray);
    console.log("-dishArray: " + dishArray);
    let liRemoval = $(this);
    liRemoval.remove();
    return;
})

$("#returnCall").on("click", ".searchItems", function (event) {
    event.preventDefault;
    let liValue = $(this).attr("data-value");
    // These statements determine which array to remove from.
    if ($(this).is(".dishArray")) {
        dishArray.splice($.inArray(liValue, dishArray), 1);
    } else {
        ingredientsArray.splice($.inArray(liValue, ingredientsArray), 1);
    };
    console.log("-allergensArray: " + allergensArray);
    console.log("-dietArray: " + dietArray);
    console.log("-cuisineArray: " + cuisineArray);
    console.log("-ingredientsArray: " + ingredientsArray);
    console.log("-dishArray: " + dishArray);
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
    console.log("Trimmed Text:" + trimmedInput + ":Trimmed End");
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

    console.log(":" + arrayInput + ":");
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

// Both of these eventListeners call the addItems function, so that you can either click the "add" button or hit "enter" on the keyboard to add the input to the display div.
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

// This eventListener runs the first API with the selected parameters once the search button is clicked.
$("#searchBtn").on("click", searchInitialize);

// This will both empty the ingredients list and uncheck all check boxes.
$("#clearBtn").on("click", function () {
    ingredientsList.empty();
    $(":checkbox").attr("checked", false);
    allergensArray = [];
    dietArray = [];
    cuisineArray = [];
    ingredientsArray = [];
    dishArray = [];
    console.log("+allergensArray: " + allergensArray);
    console.log("+dietArray: " + dietArray);
    console.log("+cuisineArray: " + cuisineArray);
    console.log("+ingredientsArray: " + ingredientsArray);
    console.log("+dishArray: " + dishArray);
    return;
})

/* Errors to keep an eye out for "fixing"
    If search results pull up no recipes
    Try again
    Use less ingredients
    Use different ingredients
    Check your ingredients are actual ingredients
    Require a minimum of three ingredients */
    // Some sort of stop if they try to search with having no items.

// Need to make clear button clear arrays.
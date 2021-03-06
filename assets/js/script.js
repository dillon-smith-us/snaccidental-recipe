// These are our section arrays, where checked and manually added items will be pushed into them.
let allergensArray = [];
let dietArray = [];
let cuisineArray = [];
let ingredientsArray = [];
let dishArray = [];
// These are our API keys; multiple are needed in case we run out of available API calls in one of them.
let apiID = ["872fa65d52a2467f9914c55d89dbf2ba", "872fa65d52a2467f9914c55d89dbf2ba", "43072a01d9bb46329766f0731ac529d1", "a3a9c0a3044c4b569fe6060b071a3835", "1d0203fe27f0498bb95550cb74f96edd"];
let x = 0;
// These are the rest of our variables.
let ingredientsList = $("#returnCall");
let imageDiv = $("#searchResults")

// On page load this modal will provide the instructions for the web application.
$(document).ready(function () {
    $('#openModal').modal({
        showClose: false
    });
    return;
});

// This function will take the checked/added items and search for recipes with those parameters.
function searchInitialize(error) {
    // Empties results div on search run.
    imageDiv.empty();
    // These variables take the strings within their array and join them into one string, within that array.
    let allergens = "&intolerances=" + allergensArray.join();
    let diet = "&diet=" + dietArray.join();
    let cuisine = "&cuisine=" + cuisineArray.join();
    let ingredients = "&includeIngredients=" + ingredientsArray.join();
    let recipe = "&titleMatch=" + dishArray.join();
    // These statements will add all the arrays being used (from the above already joined variables) into one master array.
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
    // Stops search if array is empty and shows a modal stating selections need to be made.
    if (masterArray.length === 0) {
        $('#emptyArray').modal({
        });
        return;
    }
    // Joins the individual arrays into one string.
    let master = masterArray.join();
    // Checks if our API is empty and needs to switch to a new API call.
    if (error.code === 402) {
        if (x === 4) {
            x = 0;
        } else {
            x++;
        }
    }
    // The API call.
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + master + "&apiKey=" + apiID[x];

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.code === 402) {
                searchInitialize(data)
                return;
            }
            displayRecipes(data);
            return;
        })
    // Stores the "last" called master array into local storage, so it can be called by the Last Search button.
    localStorage.setItem("master", master);
    return;
}

// This function will take the local storage that holds the previous search, and it runs the search with the stored API parameters.
function lastSearch() {
    imageDiv.empty();
    let savedSearch = localStorage.getItem("master");
    requestURL = "https://api.spoonacular.com/recipes/complexSearch?number=10&instructionsRequired=true&addRecipeInformation=true" + savedSearch + "&apiKey=" + apiID[x];

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Checks if our API is empty and needs to switch to a new API call.
            if (data.code === 402) {
                if (x === 4) {
                    x = 0;
                    lastSearch();
                } else {
                    x++;
                    lastSearch();
                }
                return;
            }
            displayRecipes(data);
            return;
        })
    return;
}

// Generates last search on button click.
$("#lastSearch").on("click", lastSearch);

// This function displays the found recipes' images and titles on the page, as well as makes them clickable links.
function displayRecipes(data) {
    // A modal that tells the user possible fixes for there being no results.
    if (data.totalResults === 0) {
        $('#errorModal').modal({
        });
        return;
    }
    // Displays all the results.
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

// This is the event handler for all of the accordion eventListeners; it will add the items to the display div and to their respective arrays when checked, as well as remove them when unchecked.
function accordionHandler() {
    let value = $(this).val();
    if ($(this).is(":checked")) {
        let checkedBoxItem = $("label[for='" + $(this).attr("id") + "']").text();
        // Appends the checked item to the display div.
        let liEl = $("<li>");
        let iconEl = $("<i>");
        iconEl.attr("class", "fas fa-trash");
        liEl.attr("data-id", $(this).attr("id"));
        liEl.attr("value", $(this).attr("value"));
        liEl.attr("class", "checklistItems");
        liEl.append(checkedBoxItem + " ");
        liEl.append(iconEl);
        ingredientsList.append(liEl);
        // Pushes the checked item into the appropriate array.
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
    } else {
        // Removes the unchecked item from the display div.
        let removalEl = $("li[value='" + $(this).attr("value") + "']");
        removalEl.remove();
        // Removes the unchecked item from the appropriate array.
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
    }
    return;
}

// These are the eventListeners for each accordion.
$("#allergens").on("click", ".allergens", accordionHandler);
$("#diet").on("click", ".diet", accordionHandler);
$("#cuisine").on("click", ".cuisine", accordionHandler);
$("#meat, #meatSubstitute, #seafood, #vegetables, #grains, #fruits, #dairies, #spices, #oils, #nuts, #sauces").on("click", ".ingredients", accordionHandler);
$("#desserts").on("click", ".dish", accordionHandler);

// This eventListener handles removing items from the display div/arrays that were added via checkbox.
$("#returnCall").on("click", ".checklistItems", function (event) {
    event.preventDefault;
    // Unchecks the box in the appropriate accordion.
    let removeCheckboxItem = $("input[id='" + $(this).attr("data-id") + "']");
    removeCheckboxItem.prop("checked", false);
    // These statements determine from which array to remove the trashed display div item.
    let checkedItemVal = removeCheckboxItem.val();
    if (removeCheckboxItem.is(".allergens")) {
        allergensArray.splice($.inArray(checkedItemVal, allergensArray), 1);
    } else if (removeCheckboxItem.is(".diet")) {
        dietArray.splice($.inArray(checkedItemVal, dietArray), 1);
    } else if (removeCheckboxItem.is(".cuisine")) {
        cuisineArray.splice($.inArray(checkedItemVal, cuisineArray), 1);
    } else if (removeCheckboxItem.is(".ingredients")) {
        ingredientsArray.splice($.inArray(checkedItemVal, ingredientsArray), 1);
    } else {
        dishArray.splice($.inArray(checkedItemVal, dishArray), 1);
    };
    // Removes the item from the display div.
    let checkedItemRemoval = $(this);
    checkedItemRemoval.remove();
    return;
})

// This eventListener handles removing items from the display div/arrays that were added via manual entry.
$("#returnCall").on("click", ".searchItems", function (event) {
    event.preventDefault;
    let searchItemVal = $(this).attr("data-value");
    // These statements determine from which array to remove the trashed display div item.
    if ($(this).is(".dishArray")) {
        dishArray.splice($.inArray(searchItemVal, dishArray), 1);
    } else {
        ingredientsArray.splice($.inArray(searchItemVal, ingredientsArray), 1);
    };
    // Removes the item from the display div
    let searchItemRemoval = $(this);
    searchItemRemoval.remove();
    return;
})

// This function will add the manual entry item to the display div and the appropriate array.
function addItems(event) {
    event.preventDefault();
    let input = $("#searchInput").val();
    // Sets input text to lower case, in case there are random capitalized letters anywhere.
    let lcInput = input.toLowerCase();
    // Trims the beginning and end of the input text of any additional spaces.
    let trimmedInput = $.trim(lcInput);
    // Removes spaces between words and replaces it with a dash, so it is formatted correctly for the array (e.g. the API parameters).
    let arrayInput = trimmedInput.split(" ").join("-");
    // Append the added item to the page, as well as capitalizes it for display.
    let liEl = $("<li>");
    let iconEl = $("<i>");
    liEl.append(trimmedInput + " ");
    liEl.css("text-transform", "capitalize");
    iconEl.attr("class", "fas fa-trash");
    liEl.attr("data-value", arrayInput);
    liEl.append(iconEl);
    // This if statement determines which classes to give the list item based on whether the toggle is on ingredients or dish and will also push it to the correct array.
    if ($("#togBtn").is(":checked")) {
        liEl.attr("class", "searchItems dishArray");
        dishArray.push(arrayInput);
    } else {
        liEl.attr("class", "searchItems ingredientsArray");
        ingredientsArray.push(arrayInput);
    };
    ingredientsList.append(liEl);
    // Clears the input box after the ingredient or dish has been added.
    $("#searchInput").val("")
    return;
}

// Both of these eventListeners call the addItems function, so that you can either click the "add" button or hit "enter" on the keyboard to add the input to the display div.
$("#submit").on("submit", addItems);
$("#addBtn").on("click", addItems);

// This function makes the accordion work. It is in vanilla JavaScript, because it functions better that way.
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

// This eventListener will empty the display div, uncheck all boxes, and empty all arrays. It does not clear the results display.
$("#clearBtn").on("click", function () {
    ingredientsList.empty();
    $(":checkbox").attr("checked", false);
    allergensArray = [];
    dietArray = [];
    cuisineArray = [];
    ingredientsArray = [];
    dishArray = [];
    return;
})
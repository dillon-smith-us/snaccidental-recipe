// These are our section arrays, where checked and manually added items will be pushed into them.
let allergensArray = [];
let dietArray = [];
let cuisineArray = [];
let ingredientsArray = [];
let dishArray = [];
// These are our API keys; multiple are needed in case we run out of available API calls in one of them.
let apiOdy = "872fa65d52a2467f9914c55d89dbf2ba";
let apiChris = "75de8262c10e4899bf623668f3281309";
// These are the rest of our variables.
let ingredientsList = $("#returnCall");
let imageDiv = $("#searchResults")

//page load modal
$(document).ready(function() {
    let id = "#box";
    let Height = $(document).height();
    let Width = $(window).width();

    $("#showPopup").css({"width" :Width, "height" :Height});

    let windowHeight = $(window).height();
    let windowWwidth = $(window).width();
    $(id).css("top", windowHeight/2-$(id).height()/2);
    $(id).css("left", windowWwidth/2-$(id).width()/2);
    $(id).fadeIn(100);
    $(".window .button").click(function (e) {
        e.preventDefault();
        $("#showPopup").hide();
        $(".window").hide();
    });

    $("#button").click(function () {
        $(this).hide();
        $(".window").hide();
        
    });
    
});




// This function will take the checked/added items and search for recipes with those parameters.
function searchInitialize() {
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
    // Joins the individual arrays into one string.
    let master = masterArray.join();
    // Our API call.
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
    // Stores the "last" called master array into local storage, so it can be called by the Last Search button.
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
    console.log("-allergensArray: " + allergensArray);
    console.log("-dietArray: " + dietArray);
    console.log("-cuisineArray: " + cuisineArray);
    console.log("-ingredientsArray: " + ingredientsArray);
    console.log("-dishArray: " + dishArray);
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
    console.log("-allergensArray: " + allergensArray);
    console.log("-dietArray: " + dietArray);
    console.log("-cuisineArray: " + cuisineArray);
    console.log("-ingredientsArray: " + ingredientsArray);
    console.log("-dishArray: " + dishArray);
    // Removes the item from the display div
    let searchItemRemoval = $(this);
    searchItemRemoval.remove();
    return;
})
//spell check modal

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
    console.log("-ingredientsArray: " + ingredientsArray);
    console.log("-dishArray: " + dishArray);
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
    console.log("+allergensArray: " + allergensArray);
    console.log("+dietArray: " + dietArray);
    console.log("+cuisineArray: " + cuisineArray);
    console.log("+ingredientsArray: " + ingredientsArray);
    console.log("+dishArray: " + dishArray);
    return;
})

/* Modal pop-ups for the following:
    If a search is run with nothing in the array.
    If results are zero:
        Try using less ingredients.
        Use different combination of ingredients.
        Check spelling of manually added ingredients.
        Check ingredients are actually ingredients.
        If you are using obscure ingredients, maybe try just searching with it and nothing else. */

// Make sure to remove console logs.
// Update the second #returnCall; and play around with variable names some more.
// Should we even have the desserts section and instead just allow the user to search for those items?

/* Debugging:
    Checkboxes:
        Make sure each checkbox appears in the display div as well as the appropriate array.
        Make sure unchecking the checkbox removes it from the display div as well as the appropriate array.
        Make sure using the trashbin icon removes it from the display div as well as the appropriate array.
    Search Items: 
        Check each item to see if recipes pull for it; determine if the item value should be plural or not.
        If no recipes pull either way, it should be removed.*/
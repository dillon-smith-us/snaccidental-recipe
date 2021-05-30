let requestURL;

// This function obtains the data that contains all the contributor usernames for this project.
function obtainUserProfiles() {
    requestURL = "https://api.github.com/repos/dillon-smith-us/snaccidental-recipe/contributors";

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            findContributorData(data);
        })
    return;
}

// This function obtains all the data for each of the contributors for this project.
function findContributorData(data) {
    for (let i = 0; i < data.length; i++) {
        let username = data[i].login;
        requestURL = "https://api.github.com/users/" + username;

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayUserData(data);
            })
    }
    return;
}

// This function displays all of the relevant data for the individual contributors on this project.
function displayUserData(data) {
    let contactEl = $("#contact");
    let name = data.name;
    let ulEl = $("<ul>");
    ulEl.append(name);
    // User email does not pull up in the API data, so it has to be manually added.
    let email;
    if (data.login === "mmonyok") {
        email = "melodymonyok@gmail.com";
    } else if (data.login === "cbeard22") {
        email = "cbeard@hnoj.org";
    } else if (data.login === "dillon-smith-us") {
        email = "dillsmth@gmail.com"
    } else {
        email = "danielkl12@icloud.com"
    }
    // This will append all of the rest of the relevant data.
    for (let q = 0; q < 4; q++) {
        let dataArrayHead = ["Email: ", "GitHub: ", "Website: ", "Twitter: "];
        let dataArrayBody = [email, data.html_url, data.blog, data.twitter_username];
        if (dataArrayBody[q] !== null && dataArrayBody[q] !== "") {
            let liEl = $("<li>");
            liEl.append(dataArrayHead[q]);
            liEl.append(dataArrayBody[q]);
            ulEl.append(liEl);
        }
    }
    contactEl.append(ulEl);
    return;
}

obtainUserProfiles();
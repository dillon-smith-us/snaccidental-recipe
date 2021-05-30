let requestURL;
let y = 0;

function obtainUserProfiles() {
    requestURL = "https://api.github.com/repos/dillon-smith-us/snaccidental-recipe/contributors";

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Contributor Data:")
            console.log(data);
            findContributorData(data);
        })
    return;
}

function findContributorData(data) {
    for (let i = 0; i < data.length; i++) {
        let username = data[i].login;
        requestURL = "https://api.github.com/users/" + username;

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("User Data " + [i + 1] + ":");
                console.log(data);
                displayUserData(data);
            })
    }
    return;
}

function displayUserData(data) {
    console.log("what type");
    console.log(typeof data.blog);
    let contactEl = $("#contact");
    let name = data.name;
    let ulEl = $("<ul>");
    ulEl.append(name);
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
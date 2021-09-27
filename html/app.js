
var jobCount = 0;
var peopleCount = 0;

function searchUserBtn_click() {
    var text = document.forms["userForm"]["userSearchTA"].value;

    if (text == "" ) {
        console.log("No user to search");

        alert("User ID field cannot be empty!");
    } else {
        console.log("Search user: " + text);
    }
}

function searchUser(id) {
    console.log("Search user: " + id);
}

function getUsersBtn_click() {

    window.location.href = "users.html";
    peopleCount = 0;
}

async function loadUsers() {

    console.log("Get people!");

    console.log('** Posting to API server');

    const response = await fetch('https://search.torre.co/people/_search/?offset='+ peopleCount +'&size=10', {
        method: 'POST'
    });

    console.log('** Waiting for response');

    const responseJson = await response.json();

    console.log('** Got response: ' + responseJson.size + ' results.');

    console.log(responseJson);

    const JObject = responseJson.results;

    console.log('** JOBJECT:');

    console.log(JObject);

    if (JObject != null) {

        var div = document.getElementById("usersList");

        JObject.forEach(user => {
            CreateUserCard(div, user)
        });

        peopleCount++;
    } else {
        window.location.href = "404.html";
    }
}

function CreateUserCard(userList, user)
{
    // Create a DIV
    var cardElement = document.createElement("div");
    
    // Assign a Class
    cardElement.className = "col-lg-5 my-2 mx-auto card-element d-flex align-items-center";

    // Inserts a row

    var row = document.createElement("div");
    row.className = "row";
    cardElement.appendChild(row);

    // Add elements

    //  *  Card image column

    var cardImageCol = document.createElement("div");
    cardImageCol.className = "col-sm-3 img-section d-flex align-items-center";

    row.appendChild(cardImageCol);

    //  ***    Card Image

    var cardImage = document.createElement("img");
    cardImage.className = "picture-hexagon img-fluid";
    cardImage.src = user.picture;

    cardImageCol.appendChild(cardImage);

    //  *  Card content column

    var cardContentCol = document.createElement("div");
    cardContentCol.className = "col content-section";

    row.appendChild(cardContentCol);

    //  ***    User full name

    var cardUserFullName = document.createElement("p");
    cardUserFullName.className = "mt-2 card-content card-full-name";
    var cardUserFullNameText = document.createTextNode(user.name);

    cardUserFullName.appendChild(cardUserFullNameText);
    cardContentCol.appendChild(cardUserFullName);

    //  ***    Username

    var cardUsername = document.createElement("p");
    cardUsername.className = "card-content card-username";
    var cardUsernameText = document.createTextNode(user.username);

    cardUsername.appendChild(cardUsernameText);
    cardContentCol.appendChild(cardUsername);

    //  ***    User is verified

    var cardVerified = document.createElement("p");
    cardVerified.className = "card-content card-verified";

    var isVerified = "";

    if (user.verified)
        isVerified = "verified";

    var cardVerifiedText = document.createTextNode(isVerified);

    cardVerified.appendChild(cardVerifiedText);
    cardContentCol.appendChild(cardVerified);

    //  ***    User Professional Headline

    var cardUserJob = document.createElement("p");
    cardUserJob.className = "mt-2 card-content card-job";

    var cardUserJobText = document.createTextNode(user.professionalHeadline);

    cardUserJob.appendChild(cardUserJobText);
    cardContentCol.appendChild(cardUserJob);

    //  ***    User Location

    var cardUserLocation = document.createElement("p");
    cardUserLocation.className = "my-2 card-content card-countries";

    var location = "Location not available."

    if(user.locationName != null)
        location = user.locationName;

    var cardUserLocationText = document.createTextNode(location);

    cardUserLocation.appendChild(cardUserLocationText);
    cardContentCol.appendChild(cardUserLocation);

    // Asign click event

    cardElement.addEventListener('click', function (event) {searchUser(user.username)});

    // Deploy!

    userList.appendChild(cardElement);

}

function searchJobBtn_click() {
    var text = document.forms["jobForm"]["jobSearchTA"].value;

    if (text == "" ) {
        console.log("No job to search");

        alert("Job ID field cannot be empty!");
    } else {
        console.log("Search job: " + text);
    }
}

function searchJob(id) {
    console.log("Search job: " + id);
}

function getJobsBtn_click() {

    window.location.href = "opportunities.html";
    jobCount = 0;
}

async function loadJobs() {

    console.log("Get jobs!");

    console.log('** Posting to API server');

    const response = await fetch('https://search.torre.co/opportunities/_search/?offset='+ jobCount +'&size=10', {
        method: 'POST'
    });

    console.log('** Waiting for response');

    const responseJson = await response.json();

    console.log('** Got response: ' + responseJson.size + ' results.');

    console.log(responseJson);

    const JObject = responseJson.results;

    console.log('** JOBJECT:');

    console.log(JObject);

    if (JObject != null) {

        var div = document.getElementById("opportunitiesList");

        JObject.forEach(opportunity => {
            
            CreateJobCard(div, opportunity)
        });

        jobCount++;
    } else {
        window.location.href = "404.html";
    }
}

function CreateJobCard(cardList, opportunity) {

    // Create a DIV
    var cardElement = document.createElement("div");
    
    // Assign a Class
    cardElement.className = "col-md-5 my-2 mx-auto card-element";

    // Add elements

    //  *  Card header

    var cardHeader = document.createElement("div");
    cardHeader.className = "row mt-2 justify-content-between";

    //  ***    Job ID

    var cardIdSpace = document.createElement("div");
    cardIdSpace.className = "col-md-4";

    var cardJobId = document.createElement("p");
    cardJobId.className = "card-content card-id";
    var cardJobIdText = document.createTextNode("Job ID: " + opportunity.id);

    cardJobId.appendChild(cardJobIdText);
    cardIdSpace.appendChild(cardJobId);

    //  ***    Job Employer

    var cardJobEmployerSpace = document.createElement("div");
    cardJobEmployerSpace.className = "col-md-4";

    var cardJobEmployer = document.createElement("p");
    cardJobEmployer.className = "card-content card-employer";
    var cardJobEmployerText = document.createTextNode(opportunity.organizations[0].name);

    cardJobEmployer.appendChild(cardJobEmployerText);
    cardJobEmployerSpace.appendChild(cardJobEmployer);

    cardHeader.appendChild(cardIdSpace);
    cardHeader.appendChild(cardJobEmployerSpace);

    cardElement.appendChild(cardHeader);

    //  *  Card Desciption

    var cardDescription = document.createElement("p");
    cardDescription.className = "mt-2 card-content card-description";

    var cardDescriptionText = document.createTextNode(opportunity.objective);

    cardDescription.appendChild(cardDescriptionText);
    cardElement.appendChild(cardDescription);

    //  *  Card Countries

    var cardCountries = document.createElement("p");
    cardCountries.className = "mt-2 card-content card-countries";

    var locations = "";

    opportunity.locations.forEach(element => {
        if (locations != "")
            locations += " ";

        locations += element;
    });

    var cardCountriesText = document.createTextNode(locations);

    cardCountries.appendChild(cardCountriesText);
    cardElement.appendChild(cardCountries);

    //  *  Card work conditions

    var cardEmployment = document.createElement("p");
    cardEmployment.className = "mb-2 card-content card-employment";

    var employment = opportunity.type;

    if (opportunity.remote)
        employment += " | remote"
    else
        employment += " | on site"

    var cardEmploymentText = document.createTextNode(employment);

    cardEmployment.appendChild(cardEmploymentText);
    cardElement.appendChild(cardEmployment);

    // Asign click event

    cardElement.addEventListener('click', function (event) {searchJob(opportunity.id)});

    // Deploy!

    cardList.appendChild(cardElement);
}

function notFoundBtn_click() {
    window.location.href = "index.html"
}
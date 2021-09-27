
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

function getUsersBtn_click() {
    console.log("Get users!");
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

async function getJobsBtn_click() {

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

            JObject.forEach(opportunity => {
                CreateJobCard(document.getElementById("opportunitiesList"), opportunity)
            });
        } else {
            window.location.href = "404.html";
        }
}

function CreateJobCard(cardList, JObject) {

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
    var cardJobIdText = document.createTextNode("Job ID: " + JObject.id);

    cardJobId.appendChild(cardJobIdText);
    cardIdSpace.appendChild(cardJobId);

    //  ***    Job Employer

    var cardJobEmployerSpace = document.createElement("div");
    cardJobEmployerSpace.className = "col-md-4";

    var cardJobEmployer = document.createElement("p");
    cardJobEmployer.className = "card-content card-employer";
    var cardJobEmployerText = document.createTextNode(JObject.organizations[0].name);

    cardJobEmployer.appendChild(cardJobEmployerText);
    cardJobEmployerSpace.appendChild(cardJobEmployer);

    cardHeader.appendChild(cardIdSpace);
    cardHeader.appendChild(cardJobEmployerSpace);

    cardElement.appendChild(cardHeader);

    //  *  Card Desciption

    var cardDescription = document.createElement("p");
    cardDescription.className = "mt-2 card-content card-description";

    var cardDescriptionText = document.createTextNode(JObject.objective);

    cardDescription.appendChild(cardDescriptionText);
    cardElement.appendChild(cardDescription);

    //  *  Card Countries

    var cardCountries = document.createElement("p");
    cardCountries.className = "mt-2 card-content card-countries";

    var locations = "";

    JObject.locations.forEach(element => {
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

    var employment = JObject.type;

    if (JObject.remote)
        employment += " | remote"
    else
        employment += " | on site"

    var cardEmploymentText = document.createTextNode(employment);

    cardEmployment.appendChild(cardEmploymentText);
    cardElement.appendChild(cardEmployment);

    // Deploy!

    cardList.appendChild(cardElement);
}

function notFoundBtn_click() {
    window.location.href = "index.html"
}
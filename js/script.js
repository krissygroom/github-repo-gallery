// *** GLOBAL VARIABLES ***
// Section where user profile info will appear
const overview = document.querySelector(".overview");

// Unordered list to display repos list
const repoList = document.querySelector(".repo-list");

// Repos section
const reposSection = document.querySelector(".repos");

// Section where individual repo data will appear
const repoData = document.querySelector(".repo-data");

// Back to repo gallery button
const btnBackToRepo = document.querySelector(".view-repos");

// Search field to filter repos
const filterInput = document.querySelector(".filter-repos");

// Github username
const username = "krissygroom";



// *** FUNCTIONS ***
// Async function to fetch github info
async function getGithubInfo() {
    const apiUrl = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(apiUrl);
        // convert response into json object
        const userInfo = await response.json();
        displayUserInfo(userInfo);
    } catch (error) {
        alert(error);
        // Catch  error if unable to fetch user data for any reason
        console.log('Unable to access user info');
    };
};


// Display fetched user info
function displayUserInfo(userInfo) {
    let userDiv = document.createElement("div");
    userDiv.setAttribute("class", "user-info");

    userDiv.innerHTML = `
    <figure>
        <img alt="user avatar" src=${userInfo.avatar_url}/>
    </figure>
    <div>
        <p><strong>Name:</strong> ${userInfo.name}</p>
        <p><strong>Bio:</strong> ${userInfo.bio}</p>
        <p><strong>Location:</strong> ${userInfo.location}</p>
        <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
    </div>
    `;
    overview.append(userDiv);
};


// Async function to fetch list of repos
async function getRepos() {
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created&per_page=100`;
    try {
        const response = await fetch(apiUrl);
        const allRepos = await response.json();
        displayRepos(allRepos);
    } catch (error) {
        alert(error);
        console.log('Unable to get repos');
    };
};


// Display info about each repo
function displayRepos(repos) {
    // display filter input
    filterInput.classList.remove("hide");
    repos.forEach(repo => {
        let li = document.createElement('li');
        li.setAttribute("class", "repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(li);
    });
};


// Click event on h3 name of repo
repoList.addEventListener('click', function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText
        getRepoInfo(repoName);
    };
});


// Get specific repo info when name is clicked
async function getRepoInfo(repoName) {
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
    let languages = []
    try {
        const response = await fetch(apiUrl);
        const repoInfo = await response.json();
        const fetchLanguages = await fetch(repoInfo.languages_url);
        const languageData = await fetchLanguages.json();
        for (let lang in languageData) {
            languages.push(lang);
        };
        displayRepoInfo(repoInfo, languages);

    } catch (error) {
        alert(error);
        console.log('Unable to get repo info');
    };
};


// Display individual repo info when name is clicked
function displayRepoInfo(repoInfo, languages) {
    repoData.innerHTML = "";
    let repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `
    <h3><strong>Name</strong>: ${repoInfo.name}</h3>
        <p><strong>Description</strong>: ${repoInfo.description}</p>
        <p><strong>Default Branch</strong>: ${repoInfo.default_branch}</p>
        <p><strong>Languages</strong>: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(repoInfoDiv);
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    btnBackToRepo.classList.remove("hide");
};


// Click event to the back button
btnBackToRepo.addEventListener("click", function() {
    repoData.classList.add("hide");
    reposSection.classList.remove("hide");
    btnBackToRepo.classList.add("hide");
});


// Input event on filter input field
filterInput.addEventListener("input", function(e) {
    const inputValue = e.target.value;

    // select all repos that match search input
    const repos = document.querySelectorAll(".repo");
    const inputLower = inputValue.toLowerCase();

    // check if lowercase repo name matches input
    for (const repo of repos) {
        const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(inputLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        };
    };
});


// *** FUNCTION CALLS ***
getGithubInfo();

getRepos();
// SELECT DOM ELEMENTS

// Section where user profile info will appear
const overview = document.querySelector(".overview");

// Github username
const username = "krissygroom"

// Async function to fetch github info
async function getGithubInfo() {
    const apiUrl = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(apiUrl);
        // convert response into json object
        userInfo = await response.json();
        // console.log(userInfo);
        displayUserInfo(userInfo);
    } catch (error) {
        alert(error);
        // Catch  error here if
        // not able to fetch user data for any reason
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


getGithubInfo();
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
// axios
//   .get("https://api.github.com/users/emilioramirezeguia")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

// The "entry point" where we'll inject our Github profile cards
const cards = document.querySelector(".cards");
// axios
//   .get("https://api.github.com/users/emilioramirezeguia")
//   .then((response) => {
//     const emilio = response.data;
//     const emiliosProfile = githubCard(emilio);
//     cards.appendChild(emiliosProfile);
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// const followersArray = [
//   "rabithole",
//   "cameronlares",
//   "khwanchaiwill",
//   "emilioramirezeguia",
//   "tonomb",
// ];
//
// followersArray.forEach((follower) => {
//   axios
//     .get(`https://api.github.com/users/${follower}`)
//     .then((response) => {
//       const userData = response.data;
//       const userProfiles = githubCard(userData);
//       cards.appendChild(userProfiles);
//     })
//     .catch((error) => {
//       console.log("Error: ", error);
//     })
//     .finally(() => {
//       console.log("Everything looks good 👍🏻");
//     });
// });
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function githubCard(user) {
  // Create HTML elements
  const card = document.createElement("div");
  const image = document.createElement("img");
  const info = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const urlText = document.createElement("p");
  const urlLink = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  // Add corresponding classes where needed
  card.classList.add("card");
  info.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  // Nest HTML elements like the example above
  card.appendChild(image);
  card.appendChild(info);
  info.appendChild(name);
  info.appendChild(username);
  info.appendChild(location);
  info.appendChild(urlText);
  // urlText.appendChild(urlLink);
  info.appendChild(followers);
  info.appendChild(following);
  info.appendChild(bio);

  // Map the parameter's data to the appropriate HTML elements
  image.src = user["avatar_url"];
  name.textContent = user["name"];
  username.textContent = user["login"];
  location.textContent = `Location: ${user["location"]}`;
  urlText.textContent = "Profile: ";
  urlText.appendChild(urlLink);
  urlLink.href = user["html_url"];
  urlLink.textContent = user["html_url"];
  followers.textContent = `Followers: ${user["followers"]}`;
  following.textContent = `Following: ${user["following"]}`;
  if (user["bio"] !== null) {
    bio.textContent = user["bio"];
  } else {
    bio.textContent = "Gabriel's favorite student ever! 😄";
  }

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

// STRETCH
function youAndFriends(yourGithubhandle) {
  axios
    .get(`https://api.github.com/users/${yourGithubhandle}`)
    .then((yourResponse) => {
      const yourInfo = yourResponse.data;
      const yourCard = githubCard(yourInfo);
      cards.appendChild(yourCard);
    })
    .catch((error) => {
      console.log("Error in your data: ", error);
    });
  axios
    .get(`https://api.github.com/users/${yourGithubhandle}/followers`)
    .then((friendsResponse) => {
      const friendsInfo = friendsResponse.data;
      friendsInfo.forEach((friend) => {
        const friendCard = githubCard(friend);
        cards.appendChild(friendCard);
      });
    })
    .catch((error) => {
      console.log("Error in your data: ", error);
    });
}

youAndFriends("emilioramirezeguia");

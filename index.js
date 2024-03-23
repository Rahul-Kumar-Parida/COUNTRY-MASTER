"use strict";
const navbarupbtn = document.querySelector(".upbtn");
const navbarinbtn = document.querySelector(".inbtn");
const showsignup = document.querySelector(".main");
const showlogin = document.querySelector(".main1");
const btnSignup = document.querySelector(".btn-signup-item");
const btnLogin = document.querySelector(".btn-login-item");
const registerLink = document.getElementById("registerLink");
const loginLink = document.querySelector("a[href='']");
const username = document.querySelector(".para");
const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const countriesSection = document.querySelector(".countries");

//All  functions

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
//😍Sign up and sign in button working>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Function to hide signup and login divs
function hideSignupAndLogin() {
  showsignup.style.visibility = "hidden";
  showlogin.style.visibility = "hidden";
}
window.addEventListener("load", hideSignupAndLogin);

navbarupbtn.addEventListener("click", function () {
  if (showsignup.style.visibility === "hidden") {
    showsignup.style.visibility = "visible";
    showlogin.style.visibility = "hidden";
    localStorage.setItem("signupVisible", "true"); // Update local storage
    localStorage.setItem("loginVisible", "false"); // Update local storage
    scrollToTop();
  } else {
    showsignup.style.visibility = "hidden";
    localStorage.setItem("signupVisible", "false");
    scrollToTop(); // Update local storage
  }
});

navbarinbtn.addEventListener("click", function () {
  if (showlogin.style.visibility === "hidden") {
    showlogin.style.visibility = "visible";
    showsignup.style.visibility = "hidden"; // Hide signup div when showing login div
    localStorage.setItem("loginVisible", "true"); // Update local storage
    localStorage.setItem("signupVisible", "false"); // Update local storage
    scrollToTop();
  } else {
    showlogin.style.visibility = "hidden";
    localStorage.setItem("loginVisible", "false");
    scrollToTop(); // Update local storage
  }
});

// 😍 LINK WORKING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
registerLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default behavior of anchor tag
  showsignup.style.visibility = "visible"; // Show the signup div
  showlogin.style.visibility = "hidden"; // Hide the login div
});

// Add event listener for login link
loginLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default behavior of anchor tag
  showsignup.style.visibility = "hidden"; // Hide the signup div
  showlogin.style.visibility = "visible";
});

//😍😍😍😍😍😍😍VALIDATION REGISTER FORM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
let registeredUsers = [];
let usernm;
btnSignup.addEventListener("click", function () {
  usernm = document.getElementById("signup-name").value;
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;

  //⚠️ Name validation....
  if (!name.match(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/)) {
    alert("Please enter a valid name (e.g., John Smith)");
    return;
  }

  //⚠️  Email validation....
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    alert("Please enter a valid email address");
    return;
  }

  //⚠️  Password validation....
  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    return;
  }

  // Push user details to registeredUsers array
  registeredUsers.push({ email: email, password: password });

  alert("Signup successful!");

  // Clear input fields
  document.getElementById("signup-name").value = "";
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-password").value = "";

  showsignup.style.visibility = "hidden";
  showlogin.style.visibility = "visible";
});

//😍😍😍😍😍😍😍VALIDATION LOGIN FORM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

btnLogin.addEventListener("click", function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const user = registeredUsers.find(
    (user) => user.email === email && user.password === password
  );

  // Check if user exists
  if (user) {
    alert("Login successful!");
    // Clear input fields
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    searchButton.disabled = false;
    navbarupbtn.style.visibility = "hidden";
    navbarinbtn.style.visibility = "hidden";
    showlogin.style.visibility = "hidden";
    username.style.visibility = "visible";
    username.textContent = "👤" + usernm;
    username.style.cursor = "pointer";

    username.addEventListener("click", function () {
      username.textContent = " ";
      navbarinbtn.style.visibility = " visible";
      searchButton.disabled = true;
      countryElements.forEach((countryElement) => {
        const imgElement = countryElement.querySelector(".country__img");
        imgElement.src = "";
      });
    });
  } else {
    alert("Invalid email or password!");
  }
});

function showSignInAlert() {
  alert("⚠️⚠️⚠️Before searching Any Country, Please Create an Account!");
}
window.addEventListener("load", showSignInAlert);

//😍😍😍😍😍😍😍FIND YOUR COUNTRY>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
searchButton.addEventListener("click", function () {
  const countryName = searchInput.value;

  // Fetch country details using an API
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous search results
      countriesSection.innerHTML = "";

      // Check if country data is found
      if (data.length > 0) {
        // Iterate through each country (assuming the API returns an array of countries)
        data.forEach((country) => {
          // Create elements to display country details
          const article = document.createElement("article");
          article.classList.add("country");

          const img = document.createElement("img");
          img.classList.add("country__img");
          img.src = country.flags.svg;
          img.alt = `${country.name.common} Flag`;
          article.appendChild(img);

          const div = document.createElement("div");
          div.classList.add("country__data");

          const name = document.createElement("h3");
          name.classList.add("country__name");
          name.textContent = country.name.common;
          div.appendChild(name);

          const region = document.createElement("h4");
          region.classList.add("country__region");
          region.textContent = country.region;
          div.appendChild(region);

          const people = document.createElement("p");
          people.classList.add("country__row");
          people.innerHTML = `<span>👫 :</span> ${country.population}`;
          div.appendChild(people);

          const language = document.createElement("p");
          language.classList.add("country__row");
          language.innerHTML = `<span>🗣️ :</span> ${Object.values(
            country.languages
          ).join(", ")}`;
          div.appendChild(language);

          const currency = document.createElement("p");
          currency.classList.add("country__row");
          currency.innerHTML = `<span>💰 :</span> ${Object.values(
            country.currencies
          ).join(", ")}`;
          div.appendChild(currency);

          article.appendChild(div);
          countriesSection.appendChild(article);
        });
      } else {
        // Display a message if the country data is not found
        countriesSection.innerHTML = "<p>Country not found</p>";
      }
    })
    .catch((error) => {
      // Display an error message if there is an error in fetching the data
      console.error("Error fetching country data:", error);
      countriesSection.innerHTML = "<p>Error fetching country data</p>";
    });
});

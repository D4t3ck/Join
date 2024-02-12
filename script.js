////////// ALLGEMEINE FUNKTIONEN //////////

/**
 * presents the includeHTML function
 */
async function init() {
  await includeHTML();
  highlightCurrentPage();
}

const USER = [];
let currentUser;

async function getCurrentUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const userMail = urlParams.get("mail");
  const response = await getItem("users");
  const responseAsJson = JSON.parse(response);
  const users = responseAsJson.users;
  const usersFiltered = users.filter((user) => user.userMail == userMail);
  currentUser = usersFiltered;
  console.log(currentUser);
}

////////// BACKEND //////////

/**
 *
 */
const STORAGE_TOKEN = "V3GBL599LI0VXDK4HJXHD632WIB3WOBMWS6ENT06";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // Verbesserter code
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

////////// W3 INCLUDE //////////

/**
 * Function to include HTML Templates
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * This function highlights the current selected page in the sidebar menu
 */
function highlightCurrentPage() {
  let currentPage = window.location.pathname;
  console.log(currentPage);
  if (currentPage === "/summary.html") {
    document.getElementById("sidebar_0").style.backgroundColor = "#091931";
  } else if (currentPage === "/add_task.html") {
    document.getElementById("sidebar_1").style.backgroundColor = "#091931";
  } else if (currentPage === "/board.html") {
    document.getElementById("sidebar_2").style.backgroundColor = "#091931";
  } else if (currentPage === "/contacts.html") {
    document.getElementById("sidebar_3").style.backgroundColor = "#091931";
  } else if (currentPage === "/privacy_policy.html") {
    document.getElementById("sidebar_4").style.backgroundColor = "#091931";
  } else if (currentPage === "/legal_notice.html") {
    document.getElementById("sidebar_5").style.backgroundColor = "#091931";
  }
}

/* Selbe Function, küzerer Code. Team fragen welche Version. */

/* function highlightCurrentPage() {
  const currentPage = window.location.pathname;
  const sidebarMappings = {
    "/summary.html": "sidebar_0",
    "/add_task.html": "sidebar_1",
    "/board.html": "sidebar_2",
    "/contacts.html": "sidebar_3",
    "/privacy_policy.html": "sidebar_4",
    "/legal_notice.html": "sidebar_5"
  };
  
  const sidebarId = sidebarMappings[currentPage];
  if (sidebarId) {
    document.getElementById(sidebarId).style.backgroundColor = "#091931";
  }
} */

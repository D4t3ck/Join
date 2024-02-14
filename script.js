////////// ALLGEMEINE FUNKTIONEN //////////

/**
 * Initializes the application by including HTML files
 * and highlighting the current page.
 */
async function init() {
  await includeHTML();
  highlightCurrentPage();
}

const USER = [];
let currentUser;

/**
 * Retrieves the current user based on the email provided in the URL parameters.
 */
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

/**
 * Token used for authorization when interacting with the remote storage service.
 */
const STORAGE_TOKEN = "V3GBL599LI0VXDK4HJXHD632WIB3WOBMWS6ENT06";

/**
 * Base URL for the remote storage service.
 */
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Stores the given key-value pair in the remote storage.
 *
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to store.
 * @returns {Promise<any>} A Promise that resolves to the response from the server.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * Retrieves the value associated with the given key from the remote storage.
 *
 * @param {string} key - The key of the value to retrieve.
 * @returns {Promise<any>} A Promise that resolves to the retrieved value.
 * @throws {string} If the requested key is not found in the storage.
 */
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

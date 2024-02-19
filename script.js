/**
 * Initializes the application by including HTML files
 * and highlighting the current page.
 */
async function init() {
  await includeHTML();
  highlightCurrentPage();
  getUserAccount();
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
 * Highlight the current page in the sidebar by changing its background color and border radius.
 */
function highlightCurrentPage() {
  let currentPage = window.location.pathname;

  const pages = [
    "/summary.html",
    "/add_task.html",
    "/board.html",
    "/contacts.html",
    "/privacy_policy.html",
    "/legal_notice.html",
  ];

  pages.forEach((page, index) => {
    if (currentPage === page) {
      setActiveStyle(index);
    }
  });
}

/**
 * Set the active style for a sidebar element.
 * @param {number} index - The index of the sidebar element in the array.
 */
const setActiveStyle = (index) => {
  const sidebarElements = [];

  for (let i = 0; i < 6; i++) {
    sidebarElements.push(document.getElementById(`sidebar_${i}`));
  }

  sidebarElements[index].style.backgroundColor = "#091931";
  sidebarElements[index].style.borderRadius = "10px";
};

/**
 * Change the current page to the specified URL.
 * @param {string} url - The URL of the page to navigate to, excluding the file extension.
 */
function changeCurrentPage(url) {
  const urlParams = new URLSearchParams(window.location.search);
  let userMail = urlParams.get("mail");
  window.location.href = `./${url}.html?mail=${userMail}`;
}

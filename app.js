import "core-js/stage";
import "regenerator-runtime/runtime";
import "whatwg-fetch";
/* Global Variables */

//key
const API_KEY = "e8736658caf702a4d64a14e306a36407";

//elements
const zipInput = element("#zip"),
  feelingInput = element("#feelings"),
  generateButton = element("#generate"),
  entryHolder = element("#entryHolder");

//helper functions
function element(ele) {
  return document.querySelector(ele);
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleDateString();

//---------- generate weather data -----------
generateButton.addEventListener("click", function () {
  getExData(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&appid=${API_KEY}`
  ).then((data) => {
    addData("/addData", {
      temp: data.main.temp,
      Country: data.sys.country,
      date: newDate,
      userResponse: feelingInput.value || "N/A",
    });
    updateUI("/getData");
  });
});

// ==================================================================
// ====== fetch data from from the external API (weather api) =======
// ==================================================================
const getExData = async (url) => {
  try {
    const response = await fetch(url);
    // console.log(response);
    if (response.ok) {
      const data = await response.json();
      // console.log(data);

      return data;
    } else {
      const error = `Error ${response.status} : ${response.statusText}`; //error message

      throw error;
    }
  } catch (err) {
    entryHolder.innerHTML = `<span style="color: #ffd5e3">${err}</span>`;
    if (!navigator.onLine) {
      entryHolder.innerHTML = `<span style="color: #ffd5e3">Internet connection lost</span>`; //error message
    }
    throw err;
  }
};

// ===========================================
//============ post data to server ===========
// ===========================================
const addData = async (url = "", data = {}) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const newDate = await res.json();
    return newDate;
  } catch (err) {
    throw new Error(err);
  }
};

// ===========================================
// ========== get data from server ===========
// ===========================================
const updateUI = async (url) => {
  try {
    //prevent cache in IE as({cache: "no-cache"})
    const res = await fetch(url + "?dummy=" + Date.now());
    const allData = await res.json();
    // console.log(allData);

    //update UI content
    entryHolder.innerHTML = `
    Date:
    <span id="date">${allData.date}</span><br />
    Temperature:
    <span id="temp">${(allData.temp - 273.15).toFixed() + "°C"}</span><br />
    Country:
    <span id="country">${allData.Country}</span><br />
    Your feeling:
    <span id="content">${allData.userResponse}</span>`;
  } catch (err) {
    throw new Error(err);
  }
};

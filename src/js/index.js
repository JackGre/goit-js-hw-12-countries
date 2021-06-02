import ApiService from "./get-aip" ;
import countryMarkup from "../templates/country.hbs";
import countriesMarkup from "../templates/countries.hbs";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
//import getRefs from './refs';
const debounce = require("lodash.debounce");
/*const refs = {
    containerCountri: document.querySelector(".country"),
    input: document.querySelector("input[data-country]"),
};*/
const containerCountri = document.querySelector(".country");
console.log(containerCountri)
const input = document.querySelector("input[data-country]");
//const { containerCountri, input } = refs;

addPlaceholder();
input.addEventListener("input", debounce(getCountryInfo, 500));
containerCountri.addEventListener("click", countryClick);

function getCountryInfo(event) {
    const name = event.target.value.trim();
    if (event.target.value.length === 0) {
        containerCountri.innerHTML = '';
        addPlaceholder();
        return;
    };

    requestFetch(name);
};

function makeMarkup(data) {
    containerCountri.innerHTML = '';
    if (input.value.length === 0) {
        containerCountri.innerHTML = '';
        return;
    }

    if (data.length === 1) {
        containerCountri.insertAdjacentHTML("beforeend", countryMarkup(data));
    } else if (data.length > 10) {
        addPlaceholder();
        error({
            text: "Too many matches found!",
            delay: 3000,
        });
    } else {
        containerCountri.insertAdjacentHTML("beforeend", countriesMarkup(data));
    }
};

function addPlaceholder() {
    const placeholderRow = `<li class="placeholder-item">
                <div class="placeholder-mark"></div>
                <div class="placeholder-row"></div>
              </li>`;
    containerCountri.insertAdjacentHTML(
      "beforeend",
      `<ul class="placeholder-list">${placeholderRow.repeat(6)}</ul>`
    );
};

/*function countryClick (event) {
    event.preventDefault();
    if (event.target.nodeName === "IMG") {
        const name = event.target.parentNode.textContent;
        requestFetch(name);
        return;
    };

    if (event.target.nodeName === "A") {
        const name = event.target.textContent;
        requestFetch(name);
        return;
    };
};*/
function countryClick(e) {
    e.preventDefault();
  
    if (e.target.nodeName === "IMG") {
      const name = e.target.parentNode.textContent;
      requestFetch(name);
      return;
    }
  
    if (e.target.nodeName === "A") {
      const name = e.target.textContent;
      requestFetch(name);
    }
  }



/*function requestFetch (name) {
    const serviceApi = new ApiService ({
        root: "https://restcountries.eu/rest/v2/name/",
        query: name,
        onResolved: makeMarkup,
    });
    serviceApi.fetch();
};*/

function requestFetch(name) {
    const serviceApi = new ApiService({
      root: "https://restcountries.eu/rest/v2/name/",
      query: name,
      //loaderSelector: ".loader",
      onResolved: makeMarkup,
      ///onRejected: onError,
    });
  
    serviceApi.fetch();
  }
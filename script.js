const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-filter-container");
let allCountriesData;
const themeChanger = document.querySelector(".theme-changer");

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    // console.log(country);
    const countrycard = document.createElement("a");
    countrycard.classList.add("country-card");
    countrycard.href = `/country.html?name=${country.name.common}`;
    countrycard.innerHTML = `
  <img src="${country.flags.svg}" alt="${country.name.common}" />
  <div class="card-text">
  <h3 class="card-title">${country.name.common}</h3>
      <p><b>Population</b>${country.population.toLocaleString("en-IN")}</p>
      <p><b>Region</b>${country.region}</p>
      <p><b>Capital</b>${country.capital?.[0]}</p>
  </div>`;

    countriesContainer.append(countrycard);
  });
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
      allCountriesData = data;
    });
});

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value);
  const filterCountries = allCountriesData.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });
  // console.log(filterCountries);
  renderCountries(filterCountries);
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeChanger.innerHTML = `<i class="fa-regular fa-sun">&nbsp&nbsp</i> Ligh mode`;
  if (document.body.classList.contains("dark")) {
    themeChanger.innerHTML = `<i class="fa-regular fa-moon">&nbsp&nbsp</i>Dark mode`;
  }
});

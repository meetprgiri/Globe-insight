const countryName = new URLSearchParams(window.location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const countryName2 = document.querySelector(".country-details h1");
const setNativeName = document.querySelector(".nativeName");
const setPopulation = document.querySelector(".Population");
const setRegion = document.querySelector(".region");
const setSubRegion = document.querySelector(".sub-region");
const setCapital = document.querySelector(".capital");
const setDomain = document.querySelector(".domain");
const setCurrency = document.querySelector(".currency");
const setLanguage = document.querySelector(".language");
const borderCountry = document.querySelector(".border-countries");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country.borders);
    flagImg.src = country.flags.svg;
    countryName2.innerText = country.name.common;
    if (country.name.nativeName) {
      setNativeName.innerHTML = Object.values(
        country.name.nativeName
      )[0].common;
    } else {
      setNativeName.innerHTML = country.name.common;
    }
    setPopulation.innerHTML = country.population;
    setRegion.innerHTML = country.region;
    if (country.subregion) {
      setSubRegion.innerHTML = country.subregion;
    }
    if (country.capital) {
      setCapital.innerHTML = country.capital?.[0];
    }
    setDomain.innerHTML = country.tld.join(", ");
    if (country.currencies) {
      setCurrency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    setLanguage.innerHTML = Object.values(country.languages).join(", ");

    if (country.borders) {
      country.borders.forEach((borders) => {
        // console.log(borders);
        fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
          .then((res) => res.json())
          .then(([borderCountries]) => {
            // console.log(borderCountries);
            const borderCountriesTag = document.createElement("a");
            borderCountriesTag.innerText = borderCountries.name.common;
            borderCountriesTag.href = `country.html?name=${borderCountries.name.common}`;
            borderCountry.append(borderCountriesTag);
          });
      });
    }
  });

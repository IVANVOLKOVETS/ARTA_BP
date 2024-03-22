import "./styles/index.css";
import de from "./i18n/de.json";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import fr from "./i18n/fr.json";
import ja from "./i18n/ja.json";
import pt from "./i18n/pt.json";

const allowedLanguages = ["de", "en", "es", "fr", "ja", "pt"];
const translations = {
  de,
  en,
  es,
  fr,
  ja,
  pt,
};

const locales = {
  de: "de-DE",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  ja: "ja-JP",
  pt: "pt-BR",
};

const currencies = {
  de: "EUR",
  en: "USD",
  es: "EUR",
  fr: "EUR",
  ja: "JPY",
  pt: "BRL",
};

function translateContent() {
  let selectedLang = "en";

  const queryString = window.location.search;
  console.log('search',window.location.search)
  const urlParams = new URLSearchParams(queryString);
  console.log('params',urlParams)

  const langFromQuery = urlParams.get("lang");
  console.log('langFromQuery',langFromQuery)

  if (langFromQuery && allowedLanguages.includes(langFromQuery)) {
    selectedLang = langFromQuery;
  } else {
    const systemLang = navigator.language.substring(0, 2);
    if (allowedLanguages.includes(systemLang)) {
      selectedLang = systemLang;
    }
  }

  const translatableElements = document.querySelectorAll("[i18n]");

  translatableElements.forEach((el) => {
    const i18nAttrData = JSON.parse(el.getAttribute("data-i18n"));
    // console.log('i18nAttrData', i18nAttrData)

    const i18nVariableNames = i18nAttrData && Object.keys(i18nAttrData);
    // console.log('i18nVariableNames', i18nVariableNames)

    console.log(el.innerHTML)
    const trimmedElInnerHtml =  el.innerHTML;
    console.log('trimmedElInnerHtml', trimmedElInnerHtml)

    let translatedInnerHtml = translations[selectedLang][trimmedElInnerHtml];

    if (i18nAttrData && i18nVariableNames?.length) {
      const replacedVars = i18nVariableNames.reduce((acc, variable, index) => {
        let targetVarValue = i18nAttrData[variable];

        if (variable === "price") {
          targetVarValue = new Intl.NumberFormat(locales[selectedLang], {
            style: "currency",
            currency: currencies[selectedLang],
            minimumFractionDigits: 2,
          }).format(targetVarValue);
        }
        acc = acc.replace(`{{${variable}}}`, targetVarValue);
        // console.log("accum", acc);

        if (index === i18nVariableNames.length - 1) {
          return acc;
        }
      }, translatedInnerHtml);

      translatedInnerHtml = replacedVars;
    }

    el.innerHTML = translatedInnerHtml;
    // console.log("translatedInnerHtml", translatedInnerHtml, "el.innerHTML", el.innerHTML )
  });
}

const radioButtonsList = document.querySelector("ul.offers");
const redirectButton = document.getElementById("redirectButton");
redirectButton.addEventListener("click", onRedirect);
radioButtonsList.addEventListener("change", onRadioClick);

let url = "";

function onRedirect(event) {
  event.preventDefault();
  window.open(url, "_blank");
}

function onRadioClick(event) {
  if (event.target.checked) {
    url = event.target.value;
  }
}

translateContent();

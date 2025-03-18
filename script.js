// Language options
const LanguageOptions = [
  { value: "en", label: "English", shortLabel: "EN" },
  { value: "hi", label: "हिंदी", shortLabel: "HI" },
  { value: "mr", label: "मराठी", shortLabel: "MR" },
  { value: "gu", label: "ગુજરાતી", shortLabel: "GU" },
  { value: "kn", label: "ಕನ್ನಡ", shortLabel: "KN" },
  { value: "bn", label: "বাংলা", shortLabel: "BN" },
  { value: "es", label: "Español", shortLabel: "ES" },
  { value: "fr", label: "Français", shortLabel: "FR" },
  { value: "de", label: "Deutsch", shortLabel: "DE" },
  { value: "it", label: "Italiano", shortLabel: "IT" },
  { value: "pt", label: "Português", shortLabel: "PT" },
  { value: "nl", label: "Nederlands", shortLabel: "NL" },
  { value: "ru", label: "Русский", shortLabel: "RU" },
  { value: "zh", label: "中文", shortLabel: "ZH" },
  { value: "ja", label: "日本語", shortLabel: "JA" },
  { value: "ko", label: "한국어", shortLabel: "KO" },
  { value: "ar", label: "العربية", shortLabel: "AR" },
  { value: "he", label: "עברית", shortLabel: "HE" },
  { value: "ta", label: "தமிழ்", shortLabel: "TA" },
  { value: "te", label: "తెలుగు", shortLabel: "TE" },
  { value: "ml", label: "മലയാളം", shortLabel: "ML" },
  { value: "ur", label: "اردو", shortLabel: "UR" },
  { value: "pa", label: "ਪੰਜਾਬੀ", shortLabel: "PA" },
  { value: "as", label: "অসমীয়া", shortLabel: "AS" },
  { value: "or", label: "ଓଡ଼ିଆ", shortLabel: "OR" },
  { value: "sa", label: "संस्कृत", shortLabel: "SA" },
  { value: "af", label: "Afrikaans", shortLabel: "AF" },
  { value: "sq", label: "Shqip", shortLabel: "SQ" },
  { value: "am", label: "አማርኛ", shortLabel: "AM" },
  { value: "hy", label: "Հայերեն", shortLabel: "HY" },
  { value: "az", label: "Azərbaycan", shortLabel: "AZ" },
  { value: "eu", label: "Euskara", shortLabel: "EU" },
  { value: "be", label: "Беларуская", shortLabel: "BE" },
  { value: "bg", label: "Български", shortLabel: "BG" },
  { value: "ca", label: "Català", shortLabel: "CA" },
  { value: "cs", label: "Čeština", shortLabel: "CS" },
  { value: "da", label: "Dansk", shortLabel: "DA" },
  { value: "el", label: "Ελληνικά", shortLabel: "EL" },
  { value: "et", label: "Eesti", shortLabel: "ET" },
  { value: "fi", label: "Suomi", shortLabel: "FI" },
  { value: "gl", label: "Galego", shortLabel: "GL" },
  { value: "ka", label: "ქართული", shortLabel: "KA" },
  { value: "ku", label: "Kurdî", shortLabel: "KU" },
  { value: "lv", label: "Latviešu", shortLabel: "LV" },
  { value: "lt", label: "Lietuvių", shortLabel: "LT" },
  { value: "mk", label: "Македонски", shortLabel: "MK" },
  { value: "ms", label: "Bahasa Melayu", shortLabel: "MS" },
  { value: "mt", label: "Malti", shortLabel: "MT" },
  { value: "no", label: "Norsk", shortLabel: "NO" },
  { value: "pl", label: "Polski", shortLabel: "PL" },
  { value: "ro", label: "Română", shortLabel: "RO" },
  { value: "sk", label: "Slovenčina", shortLabel: "SK" },
  { value: "sl", label: "Slovenščina", shortLabel: "SL" },
  { value: "sr", label: "Српски", shortLabel: "SR" },
  { value: "sv", label: "Svenska", shortLabel: "SV" },
  { value: "th", label: "ไทย", shortLabel: "TH" },
  { value: "tr", label: "Türkçe", shortLabel: "TR" },
  { value: "uk", label: "Українська", shortLabel: "UK" },
  { value: "vi", label: "Tiếng Việt", shortLabel: "VI" },
  { value: "cy", label: "Cymraeg", shortLabel: "CY" },
  { value: "eo", label: "Esperanto", shortLabel: "EO" },
  { value: "gd", label: "Gàidhlig", shortLabel: "GD" },
  { value: "ga", label: "Gaeilge", shortLabel: "GA" },
  { value: "is", label: "Íslenska", shortLabel: "IS" },
  { value: "sw", label: "Kiswahili", shortLabel: "SW" },
  { value: "yi", label: "יידיש", shortLabel: "YI" },
];

// DOM elements
const sourceLanguageSelect = document.getElementById("sourceLanguage");
const targetLanguageSelect = document.getElementById("targetLanguage");
const inputObjectArea = document.getElementById("inputObject");
const outputObjectArea = document.getElementById("outputObject");
const translateBtn = document.getElementById("translateBtn");

// Initialize language dropdowns
function initializeLanguageDropdowns() {
  // Populate source language dropdown
  LanguageOptions.forEach((language) => {
    const option = document.createElement("option");
    option.value = language.value;
    option.textContent = `${language.label} (${language.shortLabel})`;
    sourceLanguageSelect.appendChild(option);
  });

  // Clone options for target language dropdown
  LanguageOptions.forEach((language) => {
    const option = document.createElement("option");
    option.value = language.value;
    option.textContent = `${language.label} (${language.shortLabel})`;
    targetLanguageSelect.appendChild(option);
  });

  // Set defaults
  sourceLanguageSelect.value = "en";
  targetLanguageSelect.value = "es"; // Spanish as default target
}

// Parse input text as one or multiple JavaScript objects
function parseInputObject(input) {
  try {
    const trimmedInput = input.trim();

    // Handle multiple objects (comma-separated objects)
    if (trimmedInput.startsWith("{") && !trimmedInput.startsWith("[")) {
      // Count opening and closing braces to properly detect object boundaries
      let braceCount = 0;
      let objectsFound = false;

      // Check for multiple objects by analyzing brace structure
      for (let i = 0; i < trimmedInput.length; i++) {
        if (trimmedInput[i] === "{") braceCount++;
        else if (trimmedInput[i] === "}") {
          braceCount--;
          // If we reach a closing brace that matches an opening brace,
          // and there's more content afterward, we have multiple objects
          if (braceCount === 0 && i < trimmedInput.length - 1) {
            objectsFound = true;
            break;
          }
        }
      }

      if (objectsFound) {
        // Create array of objects by wrapping in array brackets
        const arrayInput = `[${trimmedInput}]`;
        const objectFunction = new Function(`return ${arrayInput}`);
        return objectFunction();
      }
    }

    // For single object or already formatted array
    const objectFunction = new Function(`return ${trimmedInput}`);
    return objectFunction();
  } catch (error) {
    throw new Error(`Invalid object format: ${error.message}`);
  }
}

// Main function to process translations
async function translateObjectValues() {
  try {
    const inputText = inputObjectArea.value.trim();
    if (!inputText) {
      alert("Please enter one or more objects to translate");
      return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = "Translating...";

    // Parse the input object(s)
    const inputObjects = parseInputObject(inputText);

    // Get selected languages
    const sourceLanguage = sourceLanguageSelect.value;
    const targetLanguage = targetLanguageSelect.value;

    let translatedResult;

    // Check if we're dealing with an array of objects or a single object
    if (Array.isArray(inputObjects)) {
      // Process each object in the array
      const translatedArray = [];
      for (const obj of inputObjects) {
        const translatedObj = await processObject(
          obj,
          sourceLanguage,
          targetLanguage
        );
        translatedArray.push(translatedObj);
      }
      translatedResult = translatedArray;
    } else {
      // Process a single object
      translatedResult = await processObject(
        inputObjects,
        sourceLanguage,
        targetLanguage
      );
    }

    // Display the translated object(s)
    outputObjectArea.textContent = JSON.stringify(translatedResult, null, 2);
  } catch (error) {
    console.error("Translation error:", error);
    outputObjectArea.textContent = `Error: ${error.message}`;
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Translate Values";
  }
}

// Recursively process objects and arrays
async function processObject(obj, sourceLang, targetLang) {
  // Handle different types
  if (obj === null || obj === undefined) {
    return obj;
  }

  // If it's a primitive string, translate it
  if (typeof obj === "string") {
    return await translateText(obj, sourceLang, targetLang);
  }

  // If it's an array, process each element
  if (Array.isArray(obj)) {
    const translatedArray = [];
    for (const item of obj) {
      translatedArray.push(await processObject(item, sourceLang, targetLang));
    }
    return translatedArray;
  }

  // If it's an object, process each property
  if (typeof obj === "object") {
    const translatedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        translatedObj[key] = await processObject(
          obj[key],
          sourceLang,
          targetLang
        );
      }
    }
    return translatedObj;
  }

  // For other types (numbers, booleans, etc.), return as is
  return obj;
}

// Function to translate a single text string
async function translateText(text, sourceLang, targetLang) {
  if (!text.trim()) return text;

  // Skip translation if source and target languages are the same
  if (sourceLang === targetLang) return text;

  try {
    // Using an unofficial Google Translate API endpoint
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    // Extract the translated text from the response
    if (data && data[0] && data[0][0]) {
      return data[0][0][0];
    } else {
      throw new Error("Translation failed");
    }
  } catch (error) {
    console.error("Translation API error:", error);
    // Return original text if translation fails
    return `[Translation Error: ${text}]`;
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeLanguageDropdowns();
  translateBtn.addEventListener("click", translateObjectValues);

  // Add example object to input on page load
  inputObjectArea.value = `{
  name: "Hello World",
  description: "This is a sample object",
  items: [
    { id: 1, label: "First item" },
    { id: 2, label: "Second item" }
  ]
}, 
{
  title: "Second Object",
  content: "More text to translate",
  metadata: {
    author: "User",
    notes: "Sample notes for translation"
  }
}`;
});

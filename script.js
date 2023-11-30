const mainContent = document.getElementById("main-content");

const themeAudio = document.getElementById("themeAudio");
const muteBtn = document.getElementById("muteBtn");
const isPlaying = true;

muteBtn.addEventListener("click", toggleAudio);

themeAudio.play();

function toggleAudio() {
  themeAudio.muted = !themeAudio.muted;
  isPlaying = !isPlaying;
}

document.addEventListener(
  "DOMContentLoaded",
  () => (mainContent.style.display = "none")
);

async function showHouses() {
  mainContent.innerHTML = "";
  mainContent.style.display = "block";

  try {
    const response = await fetch(
      "https://api.gameofthronesquotes.xyz/v1/houses"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const housesH1 = document.createElement("h1");
    housesH1.innerHTML = "Houses: ";
    mainContent.appendChild(housesH1);
    for (let i = 0; i < data.length; i++) {
      const houseItem = document.createElement("h2");
      houseItem.innerHTML = data[i].name;
      houseItem.addEventListener("click", () => {
        showHouseMembers(data[i]);
      });
      mainContent.appendChild(houseItem);
    }
  } catch (error) {
    console.error(error);
  }
}

async function showPersons() {
  mainContent.innerHTML = "";
  mainContent.style.display = "block";

  try {
    const response = await fetch(
      "https://api.gameofthronesquotes.xyz/v1/characters"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    const personsH1 = document.createElement("h1");
    mainContent.appendChild(personsH1);

    for (let i = 0; i < data.length; i++) {
      const personItem = document.createElement("h2");
      personItem.innerHTML = data[i].name;

      personItem.addEventListener("click", () => {
        showPersonDetails(data[i]);
      });

      personsH1.innerHTML = "Persons: ";
      mainContent.appendChild(personItem);
    }
  } catch (error) {
    console.error(error);
  }
}

async function showQuotes() {
  mainContent.innerHTML = "";
  mainContent.style.display = "block";

  try {
    const response = await fetch(
      "https://api.gameofthronesquotes.xyz/v1/random/5"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    const quotesH1 = document.createElement("h1");
    quotesH1.innerHTML = "Quotes: ";
    mainContent.appendChild(quotesH1);

    for (let i = 0; i < data.length; i++) {
      const quoteItem = document.createElement("h3");
      const quoteName = document.createElement("p");
      quoteItem.innerHTML = `"${data[i].sentence}"`;
      quoteName.innerHTML = `-${data[i].character.name}`;

      mainContent.appendChild(quoteItem);
      mainContent.appendChild(quoteName);
    }
    const moreQuotes = document.createElement("button");
    moreQuotes.innerHTML = "More Quotes";
    moreQuotes.addEventListener("click", showQuotes);
    mainContent.appendChild(moreQuotes);
  } catch (error) {
    console.error(error);
  }
}

async function showHouseMembers(house) {
  mainContent.innerHTML = "";
  mainContent.style.display = "block";

  try {
    const response = await fetch(
      `https://api.gameofthronesquotes.xyz/v1/house/${house.slug}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const houseData = await response.json();
    for (let i = 0; i < houseData.length; i++) {
      const members = houseData[i].members;

      for (let j = 0; j < members.length; j++) {
        const memberItem = document.createElement("h2");
        memberItem.innerHTML = members[j].name;
        mainContent.appendChild(memberItem);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function showPersonDetails() {
  mainContent.innerHTML = "";
  mainContent.style.display = "block";

  try {
    const response = await fetch(
      `https://api.gameofthronesquotes.xyz/v1/characters/`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const personDetails = await response.json();

    for (let i = 0; i < personDetails.length; i++) {
      const detailsContainer = document.createElement("div");
      const personName = document.createElement("h3");
      const personHouse = document.createElement("h3");
      const personQuotes = document.createElement("p");

      personName.innerHTML = ` ${personDetails[i].name}`;
      personHouse.innerHTML = ` ${personDetails[i].house.name}`;

      personDetails[i].quotes.forEach((quote) => {
        const quoteItem = document.createElement("li");
        quoteItem.innerHTML = `-"${quote}"`;
        personQuotes.appendChild(quoteItem);
      });

      detailsContainer.appendChild(personName);
      detailsContainer.appendChild(personHouse);
      detailsContainer.appendChild(personQuotes);

      mainContent.appendChild(detailsContainer);
    }
  } catch (error) {
    console.error(error);
  }
}

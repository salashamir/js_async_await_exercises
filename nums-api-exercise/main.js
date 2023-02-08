const randNumFactForm = document.querySelector(".rand-num-fact-form");
const randNumsFactsForm = document.querySelector(".rand-nums-facts-form");
const randNumInput = document.querySelector('#rand-num-fact');
const minNumInput = document.querySelector('#min-num-facts');
const maxNumInput = document.querySelector('#max-num-facts');
const randNumsList = document.querySelector('.rand-nums-list')
const randNumFactDisplay = document.querySelector(".rand-num-fact-display");
const rand4FactsList = document.querySelector(".rand-four-facts-num-list");
const rand4FactsForm = document.querySelector(".rand-four-facts-form");
const rand4FactsInput = document.querySelector("#rand-num-four-facts")

// 1
const baseURL = "http://numbersapi.com";


const getRandomNumFact = async (number) => {
    try { 
        const {data:{text: numText}} = await axios.get(`${baseURL}/${number}/trivia?json`);
        console.log(numText)
        return numText;
    } catch (e) {
        console.log(e);
    }
}

// 2
const getMultipleNumFacts = async (min, max) => {
    try {
        const res = await axios.get(`${baseURL}/${min}..${max}/trivia?json`);
        return res.data;
    } catch(e) {
        console.log(e);
    }
}

// 3
const getFourFactsOnFavoriteNumber = async (num) => {
    try {
        const favNumFourFacts = await Promise.all([
            axios.get(`${baseURL}/${num}/trivia?json`),
            axios.get(`${baseURL}/${num}/trivia?json`),
            axios.get(`${baseURL}/${num}/trivia?json`),
            axios.get(`${baseURL}/${num}/trivia?json`)
        ]);
        console.log(favNumFourFacts);
        return favNumFourFacts;
    } catch(e) {
        console.log(e);
    }
}

randNumFactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    getRandomNumFact.textContent = "";
    const randNum = parseInt(randNumInput.value);

    if (randNum === null || isNaN(randNum)){
        randNumFactDisplay.textContent = "You must select something! 😥";
        return;
    }

    const numFact = await getRandomNumFact(randNum);
    randNumFactDisplay.textContent = `Your random number fact for ${randNum}: ${numFact}`;
})

randNumsFactsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    randNumsList.textContent = "";
    const min = parseInt(minNumInput.value);
    const max = parseInt(maxNumInput.value);

    if (min == null || isNaN(min) || max == null || isNaN(max)){
        randNumsList.innerHTML = "<p class='result-display'>You must select a valid min and max! 😥</p>";
        return;
    }

    const randFacts = await getMultipleNumFacts(min, max);
    console.log(randFacts)
    
    for (num in randFacts){
        randNumsList.insertAdjacentHTML("beforeend", `<p class='result-display'>${num}: ${randFacts[num]}</p>`)
    }
})

rand4FactsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    rand4FactsList.innerHTML = "";
    const fourFactsNum = parseInt(rand4FactsInput.value);

    if (fourFactsNum === null || isNaN(fourFactsNum)){
        randNumFactDisplay.textContent = "You must select a valid number! 😥";
        return;
    }

    const fourFacts = await getFourFactsOnFavoriteNumber(fourFactsNum);
    
    let counter = 1;
    for (fact in fourFacts) {
        const factText = fourFacts[fact].data.text;
        rand4FactsList.insertAdjacentHTML("beforeend", `<p class='result-display'>Fact ${counter}: ${factText}</p>`);
        counter++;
    }
});
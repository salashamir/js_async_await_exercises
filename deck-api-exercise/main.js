// 1.
const base_url = "https://deckofcardsapi.com/api/deck";

const getCardFromShuffledDeck = async () => {
    const newDeck = await axios.get(`${base_url}/new/`);
    const deckID = newDeck.data.deck_id;
    await axios.get(`${base_url}/${deckID}/shuffle/`);
    const drawCard = await axios.get(`${base_url}/${deckID}/draw/?count=1`)
    const card = drawCard.data.cards[0];
    console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
}

// getCardFromShuffledDeck();

// 2.
const getTwoCardsSequentially = async () => {
    // get first card
    const drawCard = await axios.get(`${base_url}/new/draw/?count=1`)
    const deckID = drawCard.data.deck_id;
    const card = drawCard.data.cards[0];
    // get second card
    const drawSecondCard = await axios.get(`${base_url}/${deckID}/draw/?count=1`);
    const secondCard = drawSecondCard.data.cards[0];
    console.log(`${card.value} of ${card.suit}`," - ", `${secondCard.value} of ${secondCard.suit}`);
}

// getTwoCardsSequentially();

// 3.
const cardBtn = document.querySelector('.card-btn');
const cardsGallery = document.querySelector('.cards-gallery');
let deckID;

const getNewDeck = async () => {
    const newDeck = await axios.get(`${base_url}/new/`);
    const deckID = newDeck.data.deck_id;
    return deckID;
}

const shuffleDeck = async (deck_id) => {
    await axios.get(`${base_url}/${deck_id}/shuffle/`);
    console.log(`Deck ${deck_id} shuffled!`);
}

const drawCard = async (deck_id) => {
    const drawCard = await axios.get(`${base_url}/${deck_id}/draw/?count=1`);
    return drawCard.data.cards[0];
};

const init = async () => {
    cardsGallery.innerHTML = "";
    deckID = await getNewDeck();
    shuffleDeck(deckID);
};

cardBtn.addEventListener("click", async () => {
    const card = await drawCard(deckID);
    const cardImg = card.image;
    cardsGallery.insertAdjacentHTML("beforeend",`<img class="card-img" src="${cardImg}" />`)
})

init();
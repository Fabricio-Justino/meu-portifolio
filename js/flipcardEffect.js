let cardsArray = new Array(10)
    .fill(0)
    .map((zero, index) => `../images/Pokemon -${index + 1}.jpg`);

cardsArray = [...cardsArray, ...cardsArray];

const $CARDS_BOX = document.querySelector('.cards-box');

const $ROW_CARD_WRAPPER = document.createElement('div');
$ROW_CARD_WRAPPER.classList.toggle('row-card-wrapper');

const $PLASTIC_CARD = document.createElement('div');
$PLASTIC_CARD.classList.add('plastic-card');

const $CARD = document.createElement('div');
$CARD.classList.add('card');

const $FRONT = document.createElement('div');
$FRONT.classList.add('card-front');

const $BACK = document.createElement('div');
$BACK.classList.add('card-back');
$BACK.append('BACK');

const $IMG = document.createElement('img');

$CARD.appendChild($BACK);
$CARD.appendChild($FRONT);

$FRONT.appendChild($IMG);

$PLASTIC_CARD.appendChild($CARD);

let currentCard = null;
let amoutOfFlippedCads = 0;

function init() {
    drawCards();
    cardsAddEvetListener();
    putSrcOnImages();
}

function drawCards() {
    for (let i = 0; i < 4; i++) {
        const CARDS_CLONE = $ROW_CARD_WRAPPER.cloneNode();
        for (let j = 0; j < 5; j++) {
            const CLONE = $PLASTIC_CARD.cloneNode(true);
            CARDS_CLONE.appendChild(CLONE);
        }
        $CARDS_BOX.appendChild(CARDS_CLONE);
    }
}

function cardsAddEvetListener() {
    const CARDS = document.querySelectorAll('.card');
    CARDS.forEach((el) => el.addEventListener('click', () => cardSetting(el)));
}

function removeFlip(...HTMLElements) {
    HTMLElements.forEach(HTMLElement => {
        HTMLElement.classList.remove('card-flip');
        HTMLElement.classList.remove('floating-to-top');
        amoutOfFlippedCads--;
    });
    currentCard = null;
}

function AddFlip(HTMLElement) {
    if (amoutOfFlippedCads < 2) {
        HTMLElement.classList.add('card-flip');
        HTMLElement.classList.add('floating-to-top');
    }
    
    amoutOfFlippedCads++;
}

function addGuessRight(...HTMLElements) {
    HTMLElements.forEach(HTMLElement => {
        HTMLElement.classList.add('guess-right');
        amoutOfFlippedCads--;
    });
    currentCard = null;
}

function cardSetting(HTMLElement) {
    if (amoutOfFlippedCads != 2) {
        AddFlip(HTMLElement);
        const flippedCards = document.querySelectorAll('.card-flip:not(.guess-right)');
        
        if (!currentCard) currentCard = getSrc(HTMLElement);
        else if (getSrc(HTMLElement) === currentCard) {
            addGuessRight(...flippedCards);
        } else {
            setTimeout(() => removeFlip(...flippedCards), 1000);
        }
    }
}

function getSrc(HTMLElement) {
    return HTMLElement.querySelector('img').src;
}

function putSrcOnImages() {
    const IMAGES = document.querySelectorAll('img');
    IMAGES.forEach((img) => randomizeSrc(img));
}

function randomizeSrc(img) {
    let index = randomNumber(cardsArray.length - 1);
    let src = getAndRemove(index);

    img.src = src;
}

function getAndRemove(index) {
    const src = cardsArray[index];
    cardsArray.splice(index, 1);
    return src;
}

function randomNumber(max, min = 0) {
    return Math.floor(min + Math.random() * (max - min));
}

setTimeout(init);

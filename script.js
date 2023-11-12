const cardContainer = document.getElementById('card-container');
const resetButton = document.querySelector('button');

const allImages = Array.from({ length: 78 }, (_, i) => `c${i + 1}.png`);
let cards = [];

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url('images/${image}')`;

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url("images/background.png")';

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => flipCard(card));

    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function resetCards() {
    shuffle(allImages);

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const imageName = await findValidImage(allImages[i], i);
        card.querySelector('.front').style.backgroundImage = `url('images/${imageName}')`;
        card.classList.remove('flipped');
        card.querySelector('.front').style.display = 'none';
        card.querySelector('.back').style.display = 'block';
    }
}

async function findValidImage(imageName, currentIndex) {
    const imagePath = `images/${imageName}`;

    try {
        await loadImage(imagePath);
        if (isImageAttached(imageName, currentIndex)) {
            return await findValidImage(allImages[Math.floor(Math.random() * allImages.length)], currentIndex);
        }
        return imageName;
    } catch (error) {
        return await findValidImage(allImages[Math.floor(Math.random() * allImages.length)], currentIndex);
    }
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function isImageAttached(imageName, currentIndex) {
    return cards.some((card, index) => index !== currentIndex && card.querySelector('.front').style.backgroundImage.includes(imageName));
}

function flipCard(card) {
    card.classList.add('flipped');
    card.querySelector('.front').style.display = 'block';
    card.querySelector('.back').style.display = 'none';

    // Add your logic for checking all cards flipped and resetting if needed
}

async function initialize() {
    for (let i = 0; i < 4; i++) {
        const imageName = allImages[i];
        const card = createCard(imageName);
        cardContainer.appendChild(card);
        cards.push(card);
    }
}

initialize();
resetButton.addEventListener('click', resetCards);

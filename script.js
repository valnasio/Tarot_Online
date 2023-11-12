const cardContainer = document.getElementById('card-container');
const resetButton = document.querySelector('button');

let allImages = Array.from({ length: 78 }, (_, i) => `c${i + 1}.png`);
let cards = [];
let numberOfCards;

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

function resetGame() {
    const numberOfCardsString = prompt("Digite a quantidade de cartas (máximo 78):");
    numberOfCards = parseInt(numberOfCardsString);

    if (!numberOfCardsString || isNaN(numberOfCards) || numberOfCards < 1 || numberOfCards > 78) {
        alert("Por favor, insira um número válido de cartas.");
        return;
    }

    allImages = Array.from({ length: 78 }, (_, i) => `c${i + 1}.png`); // Resetar todas as imagens
    shuffle(allImages);

    // Remover todas as cartas existentes
    cards.forEach(card => card.remove());
    cards = [];

    for (let i = 0; i < numberOfCards; i++) {
        const imageName = allImages[i];
        const card = createCard(imageName);
        cardContainer.appendChild(card);
        cards.push(card);
    }
}

function resetCards() {
    shuffle(allImages);

    // Remover todas as cartas existentes
    cards.forEach(card => card.remove());
    cards = [];

    for (let i = 0; i < numberOfCards; i++) {
        const imageName = allImages[i];
        const card = createCard(imageName);
        cardContainer.appendChild(card);
        cards.push(card);
    }
}

function flipCard(card) {
    card.classList.add('flipped');
    card.querySelector('.front').style.display = 'block';
    card.querySelector('.back').style.display = 'none';

    // Adicione sua lógica para verificar se todas as cartas foram viradas e redefinir, se necessário
}

resetButton.addEventListener('click', resetGame);
resetGame();  // Chama resetGame no início para pedir a quantidade de cartas ao abrir a página

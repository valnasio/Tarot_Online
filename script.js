const cardContainer = document.getElementById('card-container');
const shuffleButton = document.getElementById('shuffle-button');
const resetButton = document.getElementById('reset-button');

let allImages = Array.from({ length: 78 }, (_, i) => i + 1); // Array de números representando as imagens
let cards = [];
let numberOfCards;

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url('images/c${image}.png')`;

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

function shuffleCards() {
    // Adicionado para exibir primeiro o back antes de embaralhar as imagens
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.front').style.display = 'none';
        card.querySelector('.back').style.display = 'block';
    });

    setTimeout(() => {
        shuffle(allImages);
        updateCardImages();
    }, 500); // Tempo de espera para exibir o back antes de embaralhar as imagens
}

function updateCardImages() {
    cards.forEach((card, index) => {
        const randomNumber = allImages[index];
        card.querySelector('.front').style.backgroundImage = `url('images/c${randomNumber}.png')`;
    });
}

function resetGame(askForQuantity = true) {
    if (askForQuantity) {
        numberOfCards = prompt("Digite a quantidade de cartas (máximo 78):");

        if (!numberOfCards || isNaN(numberOfCards) || numberOfCards < 1 || numberOfCards > 78) {
            alert("Por favor, insira um número válido de cartas.");
            return;
        }
    }

    // Remover todas as cartas existentes
    cards.forEach(card => card.remove());
    cards = [];

    for (let i = 0; i < numberOfCards; i++) {
        const randomNumber = allImages[i];
        const card = createCard(randomNumber);
        cardContainer.appendChild(card);
        cards.push(card);
    }

    // Zerar a quantidade para que seja solicitada novamente no próximo reset
    numberOfCards = null;
}

function flipCard(card) {
    card.classList.toggle('flipped');
    // Adicionado para garantir que a classe 'flipped' só altere o estado, sem alterar o conteúdo
    card.querySelector('.front').style.display = card.classList.contains('flipped') ? 'block' : 'none';
    card.querySelector('.back').style.display = card.classList.contains('flipped') ? 'none' : 'block';
}

shuffleButton.addEventListener('click', shuffleCards);
resetButton.addEventListener('click', () => resetGame(true));

// Pede a quantidade de cartas apenas na primeira vez
resetGame(false);

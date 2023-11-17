const cardContainer = document.getElementById('card-container');
const shuffleButton = document.getElementById('shuffle-button');
const resetButton = document.getElementById('reset-button');
console.log("subiu");
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
    updateCardImages();//alteração

    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
 
}

function shuffleCards() {
    shuffle(allImages);
    updateCardImages();
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
    } else {
        numberOfCards = 0;
    }

    // Remover todas as cartas existentes
    cards.forEach(card => card.remove());
    cards = [];

    // Adicionar verificação para exibir mensagem quando numberOfCards for 0
    if (numberOfCards === 0) {
        alert("Clique em iniciar e insira o número de cartas.");
        return;
    }

    for (let i = 0; i < numberOfCards; i++) {
        const randomNumber = allImages[i];
        const card = createCard(randomNumber);
        cardContainer.appendChild(card);
        cards.push(card);
    }
}

function flipCard(card) {
    card.classList.toggle('flipped');

    // Adicionado para garantir que a classe 'flipped' só altere o estado, sem alterar o conteúdo
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');

    if (card.classList.contains('flipped')) {
        front.style.display = 'block';
        back.style.display = 'none';
    } else {
        front.style.display = 'none';
        back.style.display = 'block';
    }
}

shuffleButton.addEventListener('click', () => {
    // Ocultar a frente e exibir o verso de todas as cartas antes de embaralhar
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.front').style.display = 'none';
        card.querySelector('.back').style.display = 'block';
    });

    shuffleCards();
});

resetButton.addEventListener('click', () => resetGame(true));

// Pede a quantidade de cartas apenas na primeira vez
resetGame(false);

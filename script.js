const cardContainer = document.getElementById('card-container');
const shuffleButton = document.getElementById('shuffle-button');
const resetButton = document.getElementById('reset-button');
let allImages = Array.from({ length: 78 }, (_, i) => i + 1);
let cards = [];
let numberOfCards;
console.log("FUNCINOU!!!!")
// Função para criar uma carta com a frente oculta
function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url('images/c${image}.png')`;
    front.style.display = 'none'; // Adiciona esta linha para ocultar a frente inicialmente

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url("images/background.png")';

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', () => flipCard(card));

    return card;
}

// Função para embaralhar um array usando o algoritmo de Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para embaralhar as imagens e criar as cartas
function shuffleAndCreateCards() {
    shuffle(allImages);

    // Limpa o contêiner antes de adicionar as novas cartas
    cardContainer.innerHTML = '';

    for (let i = 0; i < numberOfCards; i++) {
        const randomNumber = allImages[i];
        const card = createCard(randomNumber);
        cardContainer.appendChild(card);
        cards.push(card);
    }
}

// Função para atualizar as imagens das cartas
function updateCardImages() {
    cards.forEach((card, index) => {
        const randomNumber = allImages[index];
        card.querySelector('.front').style.backgroundImage = `url('images/c${randomNumber}.png')`;
    });
}

// Função para reiniciar o jogo, opcionalmente pedindo a quantidade de cartas
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

    shuffleAndCreateCards(); // Chama a função para embaralhar as cartas ao reiniciar

    // Exibe todas as cartas viradas ao reiniciar
    cards.forEach(card => {
        card.classList.add('flipped');
        card.querySelector('.front').style.display = 'block';
        card.querySelector('.back').style.display = 'none';
    });
}

// Função para virar a carta quando clicada
function flipCard(card) {
    card.classList.toggle('flipped');

    // Adicionado para garantir que a classe 'flipped' só altere o estado, sem alterar o conteúdo
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');

    if (card.classList.contains('flipped')) {
        front.style.display = 'block';
        back.style.display = 'none';
        updateCardImages(); // Atualiza as imagens das cartas após virar
    } else {
        front.style.display = 'none';
        back.style.display = 'block';
    }
}

// Adiciona event listener para embaralhar as cartas ao iniciar o jogo
document.addEventListener('DOMContentLoaded', () => {
    shuffleAndCreateCards();
});

// Adiciona event listener para embaralhar as cartas quando o botão de embaralhar é clicado
shuffleButton.addEventListener('click', () => {
    // Oculta a frente e exibe o verso de todas as cartas antes de embaralhar
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.front').style.display = 'none';
        card.querySelector('.back').style.display = 'block';
    });

    shuffleAndCreateCards(); // Chama a função para embaralhar as cartas
});

// Adiciona event listener para reiniciar o jogo quando o botão de reiniciar é clicado
resetButton.addEventListener('click', () => resetGame(true));

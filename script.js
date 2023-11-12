// Definindo elementos e variáveis iniciais
const cardContainer = document.getElementById('card-container');
const resetButton = document.querySelector('button');

// Array com os nomes das imagens
let allImages = Array.from({ length: 78 }, (_, i) => `c${i + 1}.png`);
// Array para armazenar os elementos de cartas
let cards = [];
// Variável para armazenar o número de cartas escolhido
let numberOfCards;

// Função para criar um elemento de carta
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

// Função para embaralhar um array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para redefinir o jogo
function resetGame() {
    // Solicitando o número de cartas ao usuário
    const numberOfCardsString = prompt("Digite a quantidade de cartas (máximo 78):");
    numberOfCards = parseInt(numberOfCardsString);

    // Verificando se o número é válido
    if (!numberOfCardsString || isNaN(numberOfCards) || numberOfCards < 1 || numberOfCards > 78) {
        alert("Por favor, insira um número válido de cartas.");
        return;
    }

    // Resetando as imagens e embaralhando
    allImages = Array.from({ length: 78 }, (_, i) => `c${i + 1}.png`);
    shuffle(allImages);

    // Removendo cartas existentes
    cards.forEach(card => card.remove());
    cards = [];

    // Criando novas cartas com base no número escolhido
    for (let i = 0; i < numberOfCards; i++) {
        const imageName = allImages[i];
        const card = createCard(imageName);
        cardContainer.appendChild(card);
        cards.push(card);
    }
}

// Função para virar uma carta
function flipCard(card) {
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        card.querySelector('.front').style.display = 'none';
        card.querySelector('.back').style.display = 'block';
    } else {
        card.classList.add('flipped');
        card.querySelector('.front').style.display = 'block';
        card.querySelector('.back').style.display = 'none';
    }
}

// Adicionando o evento de redefinir jogo ao botão de redefinição
resetButton.addEventListener('click', resetGame);

// Chamando a função de redefinir jogo ao carregar a página
resetGame();  

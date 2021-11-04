const MAIN__URL = 'https://pokeapi.co/api/v2/pokemon?limit=150'
let pokemonResults;
let newURL;
const gameContainer = document.getElementById('game-container')


const getRandomNumber = (max = 149) =>{
    return Math.round(Math.random() * max + 1)
}

const getPokemon = () =>{
    fetch(MAIN__URL)
     .then(res => res.json())
      .then(data => {
           pokemonResults = data.results
           getSprites()
        })    
}

const getSprites = () =>{
    for(let i = 0; i < 8; i++){
        newURL = [pokemonResults[getRandomNumber()].url]
     fetch(newURL)
      .then(res => res.json())
      .then(res => {
          const sprites = [res.sprites.front_default]
          drawCards(sprites)
        })
    }
}

const drawCards = async (imageUrl) =>{
    const fragment = document.createDocumentFragment()
    let cards = 2
    while(cards > 0){
        cards--
        const card = document.createElement('div')
        card.classList.add('card')
        const cardFront = document.createElement('div')
        cardFront.classList.add('card__front')
        card.appendChild(cardFront)
        const cardImage = document.createElement('img')
        cardImage.src = imageUrl
        cardImage.classList.add('card__image')
        cardFront.appendChild(cardImage)
        const cardBack = document.createElement('div')
        cardBack.classList.add('card__back')
        card.appendChild(cardBack)
        fragment.appendChild(card)
        card.addEventListener('click', () =>{
            card.classList.add('card-show')
        })
        gameContainer.appendChild(fragment)
        showCardsBefore(card)
    }
}
const arrayCards = gameContainer.childNodes.length

console.log(arrayCards);


const showCardsBefore = (card) =>{
    setTimeout(() => {
        card.classList.add('card-show')
    }, 2000);
    setTimeout(() => {
        card.classList.remove('card-show')
    }, 4000);
}

getPokemon()
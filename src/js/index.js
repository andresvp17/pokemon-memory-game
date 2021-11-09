const gameContainer = document.getElementById('game-container')
let cardURLs = 8
let firstSelection = undefined
let secondSelection = undefined

const getRandomNumber = (max = 149) =>{
    return Math.floor(Math.random() * max + 1)
}

const getSprites = async () =>{
    const numbers = [...new Set(Array.from({length: 10}).map(() => getRandomNumber()))]
    const allCards = [...numbers, ...numbers].sort((a,b) => 0.5 - Math.random())
    for(cardNumber of allCards){
        await fetch(`https://pokeapi.co/api/v2/pokemon/${cardNumber}/`)
            .then(res=>res.json())
            .then(res=>{
                drawCards(res)
        })
    }
}

const drawCards = async (imageUrl) =>{
    const fragment = document.createDocumentFragment()
    let cards = 1
    while(cards > 0){
        cards--
        const card = document.createElement('div')
        card.classList.add('card')
        card.dataset.pokewin = 'false'
        card.dataset.id = imageUrl.id
        const cardFront = document.createElement('div')
        cardFront.classList.add('card__front')
        card.appendChild(cardFront)
        const cardImage = document.createElement('img')
        cardImage.src = await imageUrl.sprites.front_default
        cardImage.classList.add('card__image')
        cardFront.appendChild(cardImage)
        const cardBack = document.createElement('div')
        cardBack.classList.add('card__back')
        card.appendChild(cardBack)
        fragment.appendChild(card)
        gameContainer.appendChild(fragment)
        showCardsBefore(card)
    }
}
const hideCards = (a,b) =>{
    a.classList.remove('card-show')
    b.classList.remove('card-show')
}

const setCardSelected = (firstElement, secondElement) =>{
    if (firstElement.dataset.id === secondElement.dataset.id) {
        firstElement.dataset.pokewin = true;
        secondElement.dataset.pokewin = true;
      } else {
        secondElement.addEventListener(
          'transitionend',
          () => hideCards(firstElement, secondElement),
          { once: true }
        );
      }
      firstSelection = undefined;
      secondSelection = undefined;
};

gameContainer.addEventListener('click', (e) =>{
 if(
     e.target.parentElement.classList.contains('card') &&
      e.target.parentElement.dataset.pokewin === 'false'
    ) {
        e.target.parentElement.classList.add('card-show');
      if (firstSelection === undefined) {
        firstSelection = e.target.parentElement;
      } else {
        if (secondSelection !== firstSelection) {
          secondSelection = e.target.parentElement;
          setCardSelected(firstSelection, secondSelection);
        }
    }
 }
 
})

const showCardsBefore = (card) =>{
    setTimeout(() => {
        card.classList.add('card-show')
    }, 2000);
    setTimeout(() => {
        card.classList.remove('card-show')
    }, 4000);
}

getSprites()
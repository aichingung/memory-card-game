const table = document.querySelector('.main-container')
const cardPairs = document.querySelector('.pairs-left') 
const wrongCombo = document.querySelector('.wrong-combos')
const numberOfCards = 20
const numberOfGifs = 10
let pairsLeft = 10
let wrong = 0 


// creating the database of gifs to loop through
let gifArray = []

let url = `https://api.giphy.com/v1/gifs/trending?api_key=lY4107ujPePm7wASnaQLUPTlY64SSkGg&limit=${numberOfGifs}&rating=pg`

fetch(url).then(res => res.json()).then(res => {

  for (let i = 0; i < numberOfGifs; i++) {
    let obj = {}
    
      let gifs = res.data[i].images.original.url
      let id = res.data[i].id

      obj['gifs'] = gifs
      obj['id'] = id
      
      gifArray.push(obj) 
    }

    // to make duplicates of cards
    const duplicate = (array, repeated) =>
    Array.from({ length: repeated }, () => array).flat();
  
    
    // to make randomized position of the cards
    let randomize = () => {
      let newGifArray = duplicate(gifArray, 2)
      newGifArray.sort(() => Math.random() - 0.5)
      
      return newGifArray
    }

    // making the "cards"
    let cardGenerator = () => {
      let cardData = randomize()

      cardData.forEach(item => {
        
        let cardContainer = document.createElement('div')
        let frontFace = document.createElement('img')
        let backFace = document.createElement('div')
  
        cardContainer.classList ='card-container'
        frontFace.classList = 'front-face'
        backFace.classList = 'back-face'
        
        frontFace.src = item.gifs
        // sets a new value to an attribute
        cardContainer.setAttribute('id', item.id)

        table.appendChild(cardContainer)
        cardContainer.appendChild(frontFace)
        cardContainer.appendChild(backFace)

        cardContainer.addEventListener('click', (event) => {
          cardContainer.classList.toggle('toggleCard')
          checkCards(event)
        })
      })
    }
    cardGenerator()
  })


  let checkCards = (event) => {
    let clickedCard = event.target
    clickedCard.classList.add('flipped')
    clickedCard.classList.add('winning')
    let flippedCards = document.querySelectorAll('.flipped')

    if(flippedCards.length === 2) {
      // returns the value of a specified attribute on the element
      if(flippedCards[0].getAttribute('id') === flippedCards[1].getAttribute('id')){
        flippedCards.forEach(flippedCard => {
    
          flippedCard.classList.remove('flipped')
          flippedCard.style.pointerEvents = 'none'

        })
        pairsLeft--
        cardPairs.textContent = Number(pairsLeft)

      } else {
        console.log('wrong');
        flippedCards.forEach(flippedCard => {
          flippedCard.classList.remove('flipped')
          setTimeout(() => flippedCard.classList.remove('toggleCard'), 1000)
        })
        wrong++
        wrongCombo.textContent = Number(wrong)

      }
    }
  }




  







const getCardsBtn = document.getElementById("get-cards-btn")
const cardsSection = document.getElementById("cards-section")
let deckId
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]


getCardsBtn.addEventListener("click", () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
        console.log(deckId)
    })
    setTimeout(()=> {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {console.log(data.cards)

            let cardsHtml = ""
            data.cards.forEach((oneCard)=>{
                cardsHtml += `<div class="card-slot"><img src=${oneCard.images.png} alt="${oneCard.value + " " + oneCard.suit}" class="card"/></div>`
                // cardsContainer.children[0].innerHTML  /* If you would like to skip creating the extra div that is wrapping around the img
            })
             cardsSection.innerHTML = cardsHtml
            
           console.log(determineWinner(data.cards[0].value,data.cards[1].value)) 
        })
    },2000)
})

const determineWinner = (card1, card2) => {
    let card1index = cardValues.indexOf(card1)
    let card2index = cardValues.indexOf(card2)
    console.log(card1index + 2 , card2index + 2)

    const result = card1index > card2index ? `${card1} wins` : 
                    card1index < card2index ? `${card2} wins` :
                    "It's a tie"
    
    return result
}
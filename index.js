const getCardsBtn = document.getElementById("get-cards-btn")
const cardsSection = document.getElementById("cards-section")
let deckId


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
            })
            return cardsSection.innerHTML = cardsHtml
        })
    },2000)
})
const getDeckBtn = document.getElementById("get-deck-btn")
const getCardsBtn = document.getElementById("get-cards-btn")
const cardsSection = document.getElementById("cards-section")
const remaining = document.getElementById("remaining")
const resultEl = document.getElementById("result-el")
const card1El = document.getElementById("card1")
const card2El = document.getElementById("card2")
let card1 = 0
let card2 = 0
let deckId



getDeckBtn.addEventListener("click", () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
        console.log(deckId)
    })
})

getCardsBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {console.log(data)
        remaining.textContent = `remaining cards: ${data.remaining}`
            let cardsHtml = ""
            data.cards.forEach((oneCard)=>{
                cardsHtml += `<div class="card-slot"><img src=${oneCard.images.png} alt="${oneCard.value + " " + oneCard.suit}" class="card"/></div>`
                // cardsContainer.children[0].innerHTML  /* If you would like to skip creating the extra div that is wrapping around the img
            })
             cardsSection.innerHTML = cardsHtml
            
             resultEl.innerHTML = determineWinner(data.cards[0].value,data.cards[1].value)

             if(data.remaining === 0){
                getCardsBtn.disabled = true;
             }
        })

        card1El.innerHTML = card1
        card2El.innerHTML = card2
})

const determineWinner = (card1, card2) => {
    // ONE  WAY TO DO IT
    // const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    // let card1index = cardValues.indexOf(card1) //an inbuild function indexOf(the value you search for in the array)
    // let card2index = cardValues.indexOf(card2)

    // SECOND WAY TO DO IT
    const cardValues = {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        JACK: 11,
        QUEEN: 12,
        KING: 13,
        ACE: 14
    }
    let card1index = cardValues[card1] //when you want to get property value from an object based on key(property name)
    let card2index = cardValues[card2]

    card1El.innerHTML = card1
    card2El.innerHTML = card2
    
    if (card1index > card2index) {
        card1++
        return "Card 1 wins!"
    } else if (card1index < card2index) {
        card2++
        return "Card 2 wins!"
    } else {
        return "War!"
    }
    
}

// THIRD WAY TO DO IT
// const determineWinner = (card1, card2) => { //my solution
//     let realValue1 = null
//     let realValue2 = null

//     for (let i =0; i < cardValues.length; i++){ //loop though the cardValues arr and find there the same cart as the one you picked from the pile
//         if (cardValues[i] === card1){
//             realValue1 = i +2  //assign it the index number (since first card is 2, add 2 to it so it is more understandable for human eye)
//             console.log("real value 1",realValue1)
//         }
//         if (cardValues[i] === card2){
//             realValue2 = i + 2
//             console.log("real value 2",realValue2)
//         }
//     }

//     const result = realValue1 > realValue2 ? `${card1} wins with value ${realValue1 + 2}` : 
//                     realValue1 < realValue2 ? `${card2} wins with value ${realValue2 + 2}` :
//                     "It's a tie"
//     return result

// }
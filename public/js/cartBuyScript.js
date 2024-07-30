const buyProductContainer = document.getElementById("buyProductContainer")
const buyProductsTransferenciaContainer = document.getElementById("buyProductsTransferenciaContainer")
const buyProductsCreditoDebitoContainer = document.getElementById("buyProductsCreditoDebitoContainer")
// const shoppingCartCreditoDebitoButton = document.getElementById("shoppingCartCreditoDebitoButton")

function buyProducts(){
    buyProductContainer.style.display = "block"
}

function closeBuyProducts(){
    buyProductContainer.style.display = "none"
}

function buyProductsTransferencia(){
    buyProductsTransferenciaContainer.style.display = "block"
}

function closeBuyProductsTransferencia(){
    buyProductsTransferenciaContainer.style.display = "none"
}

function buyProductsCreditoDebito(){
    buyProductsCreditoDebitoContainer.style.display = "block"
}

function closeBuyProductsCreditoDebito(){
    buyProductsCreditoDebitoContainer.style.display = "none"
}

// shoppingCartCreditoDebitoButton.addEventListener("click", async () => {
//     const response = await fetch("/create-order", {
//         method: "POST"
//     })

//     const data = await response.json()
//     window.location.href = data.init_point
// })
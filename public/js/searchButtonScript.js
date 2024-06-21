const headerSearchButton = document.querySelector(".headerSearchButton")
const headerSearchMobileContainer = document.querySelector(".headerSearchMobileContainer")
const headerCloseButtonHeader = document.querySelector(".headerCloseButtonHeader")

headerSearchButton.addEventListener("click", () => {
    headerSearchMobileContainer.style.display = "block"
})

headerCloseButtonHeader.addEventListener("click", () => {
    headerSearchMobileContainer.style.display = "none"
})
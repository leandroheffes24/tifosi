const headerNavbar = document.querySelector(".headerNavbar")
const headerOpenNavbarButton = document.querySelector(".headerOpenNavbarButton")
const headerCloseNavbarButton = document.querySelector(".headerCloseNavbarButton")
const indexMoreProductsButton = document.querySelector(".indexMoreProductsButton")

headerOpenNavbarButton.addEventListener("click", () => {
    headerNavbar.style.display = "block"
})

indexMoreProductsButton.addEventListener("click", () => {
    headerNavbar.style.display = "block"
})

headerCloseNavbarButton.addEventListener("click", () => {
    headerNavbar.style.display = "none"
})
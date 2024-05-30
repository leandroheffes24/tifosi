const headerNavbar = document.querySelector(".headerNavbar")
const headerOpenNavbarButton = document.querySelector(".headerOpenNavbarButton")
const headerCloseNavbarButton = document.querySelector(".headerCloseNavbarButton")

headerOpenNavbarButton.addEventListener("click", () => {
    headerNavbar.style.display = "flex"
})

headerCloseNavbarButton.addEventListener("click", () => {
    headerNavbar.style.display = "none"
})
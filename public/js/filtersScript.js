const indexCamisetasFilterButton = document.querySelector(".indexCamisetasFilterButton")
const categoryFilterCloseButton = document.querySelector(".categoryFilterCloseButton")
const categoryFilterSection = document.querySelector(".categoryFilterSection")

indexCamisetasFilterButton.addEventListener("click", () => {
    categoryFilterSection.style.display = "block"
})

categoryFilterCloseButton.addEventListener("click", () => {
    categoryFilterSection.style.display = "none"
})
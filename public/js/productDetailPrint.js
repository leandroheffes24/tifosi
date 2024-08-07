const productPrint = document.getElementById("productPrint")
const productDetailPrintPrice = document.querySelector(".productDetailPrintPrice")
const productDetailPrintCustom = document.querySelector(".productDetailPrintCustom")
const productDetailCustomPrint = document.querySelector(".productDetailCustomPrint")
const customPrintMessageContainer = document.querySelector(".customPrintMessageContainer")

productPrint.addEventListener("change", () => {
    if(productPrint.value === "estampado-personalizado"){
        productDetailPrintPrice.style.display = "none"
        productDetailPrintCustom.style.display = "block"
        productDetailCustomPrint.style.display = "block"
    } else if(productPrint.value === "sin-estampado") {
        productDetailPrintCustom.style.display = "none"
        productDetailPrintPrice.style.display = "none"
        productDetailCustomPrint.style.display = "none"
    } else {
        productDetailPrintCustom.style.display = "none"
        productDetailPrintPrice.style.display = "block"
        productDetailCustomPrint.style.display = "none"
    }
})

function closeCustomPrintMessage() {
    customPrintMessageContainer.style.display = "none"
}
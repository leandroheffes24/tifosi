const shoppingCartTotalShipmentChoose = document.querySelector(".shoppingCartTotalShipmentChoose")
const selectShipmentContainer = document.querySelector(".selectShipmentContainer")
const selectShipmentCloseButton = document.querySelector(".selectShipmentCloseButton")

shoppingCartTotalShipmentChoose.addEventListener("click", () => {
    selectShipmentContainer.style.display = "flex"
})

selectShipmentCloseButton.addEventListener("click", () => {
    selectShipmentContainer.style.display = "none"
})

function selectShipment(action, method){
    const form = document.getElementById('selectShipmentContainerForm');
    form.action = action;
    form.method = method;
    form.submit();
}
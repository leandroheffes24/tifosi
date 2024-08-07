function validateAndSubmit(action, method) {
    const sizeContainer = document.getElementById('productDetailSizesContainer');
    const errorSpan = document.getElementById('tallesNotSelectedError');
    const selectedSize = sizeContainer.querySelector('input[name="productDetailSize"]:checked');
    const buyProductFormContainer = document.getElementById("buyProductFormContainer")
    const productPrint = document.getElementById("productPrint")
    const customPrintMessageContainer = document.querySelector(".customPrintMessageContainer")

    if (!selectedSize) {
        errorSpan.textContent = 'Por favor, seleccione un talle.';
        buyProductFormContainer.style.display = "none"
        return;
    }

    if(productPrint.value === "estampado-personalizado"){
        return customPrintMessageContainer.style.display = "block"
    }

    errorSpan.textContent = '';

    submitForm(action, method);
}

function submitForm(action, method) {
    const form = document.getElementById('productDetailForm');
    form.action = action;
    form.method = method;
    form.submit();
}
function validateAndSubmit(action, method) {
    const sizeContainer = document.getElementById('productDetailSizesContainer');
    const errorSpan = document.getElementById('tallesNotSelectedError');
    const selectedSize = sizeContainer.querySelector('input[name="productDetailSize"]:checked');

    if (!selectedSize) {
        errorSpan.textContent = 'Por favor, seleccione un talle.';
        return;
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
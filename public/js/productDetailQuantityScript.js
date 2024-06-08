function increment() {
    let input = document.getElementById('productQuantity');
    input.value = parseInt(input.value) + 1;
}

function decrement() {
    let input = document.getElementById('productQuantity');
    input.value = parseInt(input.value) - 1;
}
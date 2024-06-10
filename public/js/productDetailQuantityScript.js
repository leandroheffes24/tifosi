document.getElementById("productQuantity").addEventListener("click", function() {
    this.disabled = true
})

function increment() {
    let input = document.getElementById('productQuantity');
    input.value = parseInt(input.value) + 1;
}

function decrement() {
    let input = document.getElementById('productQuantity');
    if(input.value > 1){
        input.value = parseInt(input.value) - 1;
    } else {
        input.value = input.value
    }
}
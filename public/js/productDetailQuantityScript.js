const productQuantity = document.getElementById("productQuantity");

productQuantity.addEventListener("click", function() {
    this.disabled = true;
});

document.querySelector(".productDetailQuantityAddButton").addEventListener("click", increment);
document.querySelector(".productDetailQuantitySubtractButton").addEventListener("click", decrement);

function increment() {
    let input = document.getElementById('productQuantity');
    let max = parseInt(input.max);
    if(parseInt(input.value) < max){
        input.value = parseInt(input.value) + 1;
    }
}

function decrement() {
    let input = document.getElementById('productQuantity');
    if(parseInt(input.value) > parseInt(input.min)){
        input.value = parseInt(input.value) - 1;
    }
}
const deleteProductFormContainer = document.getElementById("deleteProductFormContainer")
const deleteProductForm = document.getElementById("deleteProductForm")

function deleteProduct() {
    deleteProductFormContainer.style.display = "block"
}

function deleteProductProcess(action, method){
    deleteProductForm.action = action
    deleteProductForm.method = method
    deleteProductForm.submit()
}

function cancelDeleteProduct() {
    deleteProductFormContainer.style.display = "none"
}
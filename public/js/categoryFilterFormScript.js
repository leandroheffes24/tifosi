document.getElementById('categoryFilterForm').addEventListener('submit', function(event) {
    var subcategoryCheckboxes = document.querySelectorAll('input[name="subcategories[]"]');
    var isChecked = Array.from(subcategoryCheckboxes).some(checkbox => checkbox.checked);

    if (!isChecked) {
        var subcategoriesFilterError = document.querySelector(".subcategoriesFilterError")
        event.preventDefault();
        subcategoriesFilterError.innerText = "Por favor, selecciona al menos una subcategoría."
        // subcategoriesFilterError.classList.add("display-block");
    }
});
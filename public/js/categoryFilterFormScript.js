document.getElementById('categoryFilterForm').addEventListener('submit', function(event) {
    var subcategoryCheckboxes = document.querySelectorAll('input[name="subcategories[]"]');
    var isChecked = Array.from(subcategoryCheckboxes).some(checkbox => checkbox.checked);

    if (!isChecked) {
        event.preventDefault();
        alert('Por favor, selecciona al menos una subcategoría.');
    }
});
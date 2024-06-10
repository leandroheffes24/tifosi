const sizeLabels = document.querySelectorAll('.productDetailSizeLabel');

sizeLabels.forEach(label => {
    label.addEventListener('click', function() {
        // Reset background color for all labels
        sizeLabels.forEach(lbl => lbl.style.backgroundColor = '');
        // Set background color for the clicked label
        this.style.backgroundColor = 'rgb(70,70,70)';
    });
});
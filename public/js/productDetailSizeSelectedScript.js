const sizeLabels = document.querySelectorAll('.productDetailSizeLabel');

sizeLabels.forEach(label => {
    label.addEventListener('click', function() {
        sizeLabels.forEach(lbl => lbl.style.backgroundColor = '');
        this.style.backgroundColor = 'rgb(70,70,70)';
    });
});
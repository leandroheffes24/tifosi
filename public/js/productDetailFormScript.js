function submitForm(action, method){
    const form = document.getElementById("productDetailForm")
    form.action = action
    form.method = method
    form.submit()
}
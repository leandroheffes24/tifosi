function editOrderStatus(action, method, orderId){
    const orderActionsForm = document.getElementById(`orderActionsForm-${orderId}`)
    orderActionsForm.action = action
    orderActionsForm.method = method
    orderActionsForm.submit()
}
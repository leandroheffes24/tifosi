const validations = [
    {
      field: "country",
      check: (input) => input.value.length > 0,
      message: "Debe contener al menos un caracter",
    },
    {
      field: "province",
      check: (input) => input.value.length > 0,
      message: "Debe contener al menos un caracter",
    },
    {
        field: "city",
        check: (input) => input.value.length > 0,
        message: "Debe contener al menos un caracter",
    },
    {
        field: "address",
        check: (input) => input.value.length > 0,
        message: "Debe contener al menos un caracter",
    },
    {
        field: "cp",
        check: (input) => input.value.length > 0,
        message: "Debe contener al menos un caracter",
    },
  ]
          
  validations.forEach((validation) => {
    const inputId = validation.field;
    const input = document.getElementById(inputId);
    const inputErrorMsg = document.getElementById(inputId + "Error");
                     
    function validate() {
      inputValidation(validation, input, inputErrorMsg);
    }

    input.addEventListener("blur", validate);
    input.addEventListener("input", validate);
  });
         
    const form = document.getElementById("editShipmentInformationForm");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const validationsResult = [];
  
    validations.forEach((validation) => {
      const inputId = validation.field;
      const input = document.getElementById(inputId);
      const inputErrorMsg = document.getElementById(inputId + "Error");
      const result = inputValidation(validation, input, inputErrorMsg);
      validationsResult.push(result);
    });
  
    if (validationsResult.every((val) => val == true)) {
      form.submit();
    }
  });
            
  function inputValidation(validation, input, inputErrorMsg) {
    if (!input.value) {
      inputErrorMsg.innerText = "El campo no debe estar vacío";
      inputErrorMsg.classList.add("display-block");
      return false;
    }
    if (!validation.check(input)) {
      inputErrorMsg.innerText = validation.message;
      inputErrorMsg.classList.add("display-block");
      return false;
    }
      inputErrorMsg.innerText = "";
      inputErrorMsg.classList.remove("display-block");
      return true;
  };
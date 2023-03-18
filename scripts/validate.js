const isValid = (
  formElement,
  inputElement,
  errorClassTemplate,
  activeErrorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      errorClassTemplate,
      activeErrorClass
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      errorClassTemplate,
      activeErrorClass
    );
  }
};

const showInputError = (
  formElement,
  inputElement,
  validationMessage,
  errorClassTemplate,
  activeErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClassTemplate);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(activeErrorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  errorClassTemplate,
  activeErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClassTemplate);
  errorElement.textContent = "";
  errorElement.classList.remove(activeErrorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableButton = (buttonElement, submitButtonClass) => {
  buttonElement.classList.add(submitButtonClass);
  buttonElement.setAttribute("disabled", "");
};

const activateButton = (buttonElement, submitButtonClass) => {
  buttonElement.classList.remove(submitButtonClass);
  buttonElement.removeAttribute("disabled", "");
};

const toggleButtonState = (inputList, buttonElement, submitButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, submitButtonClass);
  } else {
    activateButton(buttonElement, submitButtonClass);
  }
};

const setEventListener = (
  formElement,
  buttonElement,
  inputSelector,
  submitButtonClass,
  errorClassTemplate,
  activeErrorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  toggleButtonState(inputList, buttonElement, submitButtonClass);

  formElement.addEventListener("reset", () => {
    disableButton(submitButton, settings);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, errorClassTemplate, activeErrorClass);
      toggleButtonState(inputList, buttonElement, submitButtonClass);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
    setEventListener(
      formElement,
      buttonElement,
      config.inputSelector,
      config.submitButtonClass,
      config.errorClassTemplate,
      config.activeErrorClass
    );
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  errorClassTemplate: "popup__input-text_error",
  activeErrorClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save-button",
  submitButtonClass: "popup__save-button_disabled",
});

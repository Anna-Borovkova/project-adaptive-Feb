const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  errorClassTemplate: "popup__input-text_error",
  activeErrorClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save-button",
  submitButtonClass: "popup__save-button_disabled",
};

class FormValidator {
  constructor(config, checkedPopup) {
        this._checkedPopup = checkedPopup;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._errorClassTemplate = config.errorClassTemplate;
    this._activeErrorClass = config.activeErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonClass = config.submitButtonClass;
    this._formElement = document
      .querySelector(this._checkedPopup)
      .querySelector(this._formSelector);
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._errorClassTemplate);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._errorClassTemplate);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._activeErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._submitButtonClass);
    this._buttonElement.setAttribute("disabled", "");
  }

  _activateButton() {
    this._buttonElement.classList.remove(this._submitButtonClass);
    this._buttonElement.removeAttribute("disabled", "");
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._activateButton();
    }
  }

  _setEventListener() {
    this._toggleButtonState();

    this._formElement.addEventListener("reset", () => {
      this._disableButton();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _enableValidation() {
    this._setEventListener();
  }
}

const profileFormValidator = new FormValidator(config, ".profile-edit-popup");
const placeAddFormValidator = new FormValidator(config, ".place-add-popup");

profileFormValidator._enableValidation();
placeAddFormValidator._enableValidation();

// // _________________________________________

// const isValid = (
//   formElement,
//   inputElement,
//   errorClassTemplate,
//   activeErrorClass
// ) => {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       errorClassTemplate,
//       activeErrorClass
//     );
//   } else {
//     hideInputError(
//       formElement,
//       inputElement,
//       errorClassTemplate,
//       activeErrorClass
//     );
//   }
// };

// const showInputError = (
//   formElement,
//   inputElement,
//   validationMessage,
//   errorClassTemplate,
//   activeErrorClass
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(errorClassTemplate);
//   errorElement.textContent = validationMessage;
//   errorElement.classList.add(activeErrorClass);
// };

// const hideInputError = (
//   formElement,
//   inputElement,
//   errorClassTemplate,
//   activeErrorClass
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(errorClassTemplate);
//   errorElement.textContent = "";
//   errorElement.classList.remove(activeErrorClass);
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const disableButton = (buttonElement, submitButtonClass) => {
//   buttonElement.classList.add(submitButtonClass);
//   buttonElement.setAttribute("disabled", "");
// };

// const activateButton = (buttonElement, submitButtonClass) => {
//   buttonElement.classList.remove(submitButtonClass);
//   buttonElement.removeAttribute("disabled", "");
// };

// const toggleButtonState = (inputList, buttonElement, submitButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     disableButton(buttonElement, submitButtonClass);
//   } else {
//     activateButton(buttonElement, submitButtonClass);
//   }
// };

// const setEventListener = (
//   formElement,
//   buttonElement,
//   inputSelector,
//   submitButtonClass,
//   errorClassTemplate,
//   activeErrorClass
// ) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   toggleButtonState(inputList, buttonElement, submitButtonClass);

//   formElement.addEventListener("reset", () => {
//     disableButton(buttonElement, submitButtonClass);
//   });

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       isValid(formElement, inputElement, errorClassTemplate, activeErrorClass);
//       toggleButtonState(inputList, buttonElement, submitButtonClass);
//     });
//   });
// };

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     const buttonElement = formElement.querySelector(
//       config.submitButtonSelector
//     );
//     setEventListener(
//       formElement,
//       buttonElement,
//       config.inputSelector,
//       config.submitButtonClass,
//       config.errorClassTemplate,
//       config.activeErrorClass
//     );
//   });
// };

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input-text",
//   errorClassTemplate: "popup__input-text_error",
//   activeErrorClass: "popup__input-error_active",
//   submitButtonSelector: ".popup__save-button",
//   submitButtonClass: "popup__save-button_disabled",
// });

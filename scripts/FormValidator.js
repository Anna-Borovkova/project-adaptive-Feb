export default class FormValidator {
  constructor(config, checkedForm) {
    this._checkedForm = checkedForm;
    this._inputSelector = config.inputSelector;
    this._errorClassTemplate = config.errorClassTemplate;
    this._activeErrorClass = config.activeErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonClass = config.submitButtonClass;
    this._formElement = document.querySelector(this._checkedForm);
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

  enableValidation() {
    this._setEventListener();
  }
}

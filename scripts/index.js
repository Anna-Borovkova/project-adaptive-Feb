const placeList = document.querySelector(".places__list");

const profileEditPopup = document.querySelector(".profile-edit-popup");
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const profileEditOpenButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const profileNameInput = profileEditPopup.querySelector(
  ".popup__input-text_type_name"
);
const profileProfessionInput = profileEditPopup.querySelector(
  ".popup__input-text_type_about"
);

const placeAddPopup = document.querySelector(".place-add-popup");
const placeAddForm = placeAddPopup.querySelector(".popup__form");
const placeAddOpenButton = document.querySelector(".profile__add-button");
const placeNameInput = placeAddForm.querySelector(
  ".popup__input-text_type_name"
);
const placeLinkInput = placeAddForm.querySelector(
  ".popup__input-text_type_about"
);

const popupZoomImage = document.querySelector(".open-card-popup");
const placeOpenCardTitle = popupZoomImage.querySelector(
  ".popup__open-card-title"
);
const placeOpenCardImage = popupZoomImage.querySelector(
  ".popup__open-card-img"
);

const placeTemplateContent = document.querySelector("#placeTemplate").content;

const closedButton = Array.from(
  document.querySelectorAll(".popup__close-button")
);

function createPlace(placeData) {
  const newPlace = placeTemplateContent.cloneNode(true);

  const placeImage = newPlace.querySelector(".place__img");
  placeImage.setAttribute("src", placeData.link);
  placeImage.setAttribute("alt", placeData.name);

  const placeTitle = newPlace.querySelector(".place__title");
  placeTitle.textContent = placeData.name;

  const recommendedButton = newPlace.querySelector(".place__like-button");
  recommendedButton.addEventListener("click", likePlace);

  const trashButton = newPlace.querySelector(".place__delete-button");
  trashButton.addEventListener("click", deletePlace);

  placeImage.addEventListener("click", function (event) {
    placeOpen = event.target;
    openPopup(popupZoomImage);
    fillOpenedPopup(event);
  });

  return newPlace;
}

function addPlace(addedPlace) {
  placeList.prepend(addedPlace);
}

function showPlace(placeData) {
  createPlace(placeData);
  addPlace(createPlace(placeData));
}

function fillOpenedPopup(event) {
  openedPlaceImg = event.target;
  openedPlace = openedPlaceImg.closest(".place");
  openedPlaceTitle = openedPlace.querySelector(".place__title");

  placeOpenCardTitle.textContent = openedPlaceTitle.textContent;
  placeOpenCardImage.setAttribute("src", openedPlaceImg.src);
  placeOpenCardImage.setAttribute("alt", openedPlaceTitle.textContent);
}

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}

function closePopup(closedButtonElement) {
  closedPopupElement = closedButtonElement.closest(".popup");
  closedPopupElement.classList.remove("popup_opened");
}

function submitProfileEditForm(event) {
  event.preventDefault();
  const nameInputValue = profileNameInput.value;
  const professionInputValue = profileProfessionInput.value;
  profileName.textContent = nameInputValue;
  profileProfession.textContent = professionInputValue;
  closePopup(profileEditPopup);
}

function submitPlaceAddForm(event) {
  event.preventDefault();
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const newAddedPlace = { name, link };
  showPlace(newAddedPlace);
  placeAddForm.reset();
  closePopup(placeAddPopup);
}

function likePlace(event) {
  const recommendedButton = event.target;
  recommendedButton.classList.toggle("place__like-button_active");
}

function deletePlace(event) {
  const trashButton = event.target;
  const deletedCard = trashButton.closest(".place");
  deletedCard.remove();
}

initialPlaces.forEach(showPlace);

profileEditOpenButton.addEventListener("click", function () {
  const profileNameElement = profileName.textContent;
  const profileProfessionElement = profileProfession.textContent;
  profileNameInput.value = profileNameElement;
  profileProfessionInput.value = profileProfessionElement;
  openPopup(profileEditPopup);
});

closedButton.forEach((closedButtonElement) => {
  closedButtonElement.addEventListener("click", function () {
    closePopup(closedButtonElement);
  });
});

closedButton.forEach((closedButtonElement) => {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") closePopup(closedButtonElement);
  });
});

closedButton.forEach((closedButtonElement) => {
  document.addEventListener("mousedown", function (evt) {
    if (
      evt.target.classList.contains("popup_opacity_dark") ||
      evt.target.classList.contains("popup_opacity_light")
    )
      closePopup(closedButtonElement);
  });
});

profileEditForm.addEventListener("submit", submitProfileEditForm);

placeAddOpenButton.addEventListener("click", function () {
  openPopup(placeAddPopup);
});

placeAddPopup.addEventListener("submit", submitPlaceAddForm);

//ВАЛИДАЦИЯ ПОЛЕЙ

const isValid = (formElement, inputElement, errorClassTemplate, activeErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClassTemplate, activeErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorClassTemplate, activeErrorClass);
  }
};

const showInputError = (formElement, inputElement, validationMessage, errorClassTemplate, activeErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClassTemplate);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(activeErrorClass);
};

const hideInputError = (formElement, inputElement, errorClassTemplate, activeErrorClass) => {
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
  
};

const activateButton = (buttonElement, submitButtonClass) => {
  buttonElement.classList.remove(submitButtonClass);
};

const toggleButtonState = (inputList, buttonElement, submitButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, submitButtonClass);
  } else {
    activateButton(buttonElement, submitButtonClass);
  }
};

const setEventListener = (formElement, buttonElement, inputSelector, submitButtonClass, errorClassTemplate, activeErrorClass) => {
  const inputList = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  toggleButtonState(inputList, buttonElement, submitButtonClass);
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
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    setEventListener(formElement, buttonElement, config.inputSelector, config.submitButtonClass, config.errorClassTemplate, config.activeErrorClass);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  errorClassTemplate: "popup__input-text_error",
  activeErrorClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save-button",
  submitButtonClass: "popup__save-button_disabled"
});
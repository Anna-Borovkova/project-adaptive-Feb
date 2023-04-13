import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialPlaces } from "./constants.js";

const placeList = document.querySelector(".places__list");

const profileEditPopup = document.querySelector(".profile-edit-popup");

const profileEditForm = document.forms["profile-edit-form"];

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
const placeAddForm = document.forms["place-add-form"];

const placeAddOpenButton = document.querySelector(".profile__add-button");
const placeNameInput = placeAddForm.querySelector(
  ".popup__input-text_type_name"
);
const placeLinkInput = placeAddForm.querySelector(
  ".popup__input-text_type_about"
);

const config = {
  inputSelector: ".popup__input-text",
  errorClassTemplate: "popup__input-text_error",
  activeErrorClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save-button",
  submitButtonClass: "popup__save-button_disabled",
};

const popupFormTypeProfile = document.querySelector(
  ".popup__form_type_profile"
);
const popupFormTypePlace = document.querySelector(".popup__form_type_place");

const profileFormValidator = new FormValidator(config, popupFormTypeProfile);
const placeAddFormValidator = new FormValidator(config, popupFormTypePlace);

const popupList = document.querySelectorAll(".popup");

function createCard(placeData, placeTemplate) {
  const card = new Card(placeData, placeTemplate);
  const cardElement = card.genetateCard();
  return cardElement;
}

initialPlaces.forEach((item) => {
  createCard(item, "#placeTemplate");
  placeList.prepend(createCard(item, "#placeTemplate"));
});

export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
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
  const card = new Card(newAddedPlace, "#placeTemplate");
  const cardElement = card.genetateCard();
  placeList.prepend(cardElement);
  placeAddForm.reset();
  closePopup(placeAddPopup);
}

profileEditOpenButton.addEventListener("click", function () {
  const profileNameElement = profileName.textContent;
  const profileProfessionElement = profileProfession.textContent;
  profileNameInput.value = profileNameElement;
  profileProfessionInput.value = profileProfessionElement;
  openPopup(profileEditPopup);
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

profileEditForm.addEventListener("submit", submitProfileEditForm);

placeAddOpenButton.addEventListener("click", function () {
  openPopup(placeAddPopup);
});

placeAddPopup.addEventListener("submit", submitPlaceAddForm);

profileFormValidator.enableValidation();
placeAddFormValidator.enableValidation();

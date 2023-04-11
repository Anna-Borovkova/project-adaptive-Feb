import Card from "./card.js";

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

initialPlaces.forEach((item) => {
  const card = new Card(item, "#placeTemplate");
  const cardElement = card.genetateCard();
  placeList.prepend(cardElement);
});

export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  const closedPopupElement = popup.closest(".popup");
  closedPopupElement.classList.remove("popup_opened");
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

const popupList = document.querySelectorAll(".popup");

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

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

const popupZoomImage = document.querySelector(".open-card-popup");
const placeOpenCardTitle = popupZoomImage.querySelector(
  ".popup__open-card-title"
);
const placeOpenCardImage = popupZoomImage.querySelector(
  ".popup__open-card-img"
);

const placeTemplateContent = document.querySelector("#placeTemplate").content;

const closedButtonList = Array.from(
  document.querySelectorAll(".popup__close-button")
);

function createPlace(placeData) {
  const newPlace = placeTemplateContent.cloneNode(true);

  const placeImage = newPlace.querySelector(".place__img");
  placeImage.setAttribute("src", placeData.link);
  placeImage.setAttribute("alt", placeData.name);

  const placeTitle = newPlace.querySelector(".place__title");
  placeTitle.textContent = placeData.name;

  const likeButton = newPlace.querySelector(".place__like-button");
  likeButton.addEventListener("click", toggleLike);

  const trashButton = newPlace.querySelector(".place__delete-button");
  trashButton.addEventListener("click", deletePlace);

  placeImage.addEventListener("click", () => handleCardClick(placeData));

  return newPlace;
}

function handleCardClick(placeData) {
  openPopup(popupZoomImage);
  placeOpenCardTitle.textContent = placeData.name;
  placeOpenCardImage.setAttribute("src", placeData.link);
  placeOpenCardImage.setAttribute("alt", placeData.name);
}

function addPlace(addedPlace) {
  placeList.prepend(addedPlace);
}

function prependPlace(placeData) {
  addPlace(createPlace(placeData));
}

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(closedButtonElement) {
  const closedPopupElement = closedButtonElement.closest(".popup");
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
  prependPlace(newAddedPlace);
  placeAddForm.reset();
  closePopup(placeAddPopup);

  const buttonElement = placeAddPopup.querySelector(".popup__save-button");
  buttonElement.classList.add("popup__save-button_disabled");
  buttonElement.setAttribute("disabled", "");
}

function toggleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("place__like-button_active");
}

function deletePlace(event) {
  const trashButton = event.target;
  const deletedCard = trashButton.closest(".place");
  deletedCard.remove();
}

initialPlaces.forEach(prependPlace);

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

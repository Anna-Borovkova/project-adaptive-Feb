const placeList = document.querySelector(".places__list");

const profileEditPopup = document.querySelector(".profile-edit-popup");
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const profileEditOpenButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditPopup.querySelector(
  ".popup__close-button"
);
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
const placeAddCloseButton = placeAddPopup.querySelector(".popup__close-button");
const placeNameInput = placeAddForm.querySelector(
  ".popup__input-text_type_name"
);
const placeLinkInput = placeAddForm.querySelector(
  ".popup__input-text_type_about"
);

const placeOpenCardPopup = document.querySelector(".place__open-card-popup");
const placeOpenCardCloseButton = placeOpenCardPopup.querySelector(
  ".popup__close-button"
);
const placeOpenCardTitle = placeOpenCardPopup.querySelector(
  ".place__open-card-title"
);
const placeOpenCardImage = placeOpenCardPopup.querySelector(
  ".place__open-card-img"
);

function showPlace(place) {
  const newPlace = document
    .querySelector("#placeTemplate")
    .content.cloneNode(true);

  createPlace(newPlace, place);
  addPlace(newPlace);
}

function createPlace(place_template, place_data) {
  const placeImage = place_template.querySelector(".place__img");
  placeImage.setAttribute("src", place_data.link);
  placeImage.setAttribute("alt", place_data.name);

  const placeTitle = place_template.querySelector(".place__title");
  placeTitle.textContent = place_data.name;

  const recommendedButton = place_template.querySelector(".place__like-button");
  recommendedButton.addEventListener("click", likePlace);

  const trashButton = place_template.querySelector(".place__delete-button");
  trashButton.addEventListener("click", deletePlace);

  placeImage.addEventListener("click", function (event) {
    placeOpen = event.target;
    openPopup(placeOpenCardPopup);
    fillOpenedPopup(event);
  });
}

function fillOpenedPopup(event) {
  openedPlaceImg = event.target;
  openedPlace = openedPlaceImg.closest(".place");
  openedPlaceTitle = openedPlace.querySelector(".place__title");

  placeOpenCardTitle.textContent = openedPlaceTitle.textContent;
  placeOpenCardImage.setAttribute("src", openedPlaceImg.src);
}

function addPlace(place_template) {
  placeList.prepend(place_template);
}

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
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
  form = placeLinkInput.closest(".popup__form");
  form.reset();
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

profileEditCloseButton.addEventListener("click", function () {
  closePopup(profileEditPopup);
});

profileEditForm.addEventListener("submit", submitProfileEditForm);

placeAddOpenButton.addEventListener("click", function () {
  openPopup(placeAddPopup);
});
placeAddCloseButton.addEventListener("click", function () {
  closePopup(placeAddPopup);
});

placeAddPopup.addEventListener("submit", submitPlaceAddForm);

placeOpenCardCloseButton.addEventListener("click", function () {
  closePopup(placeOpenCardPopup);
});

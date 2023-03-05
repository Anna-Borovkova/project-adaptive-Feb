const initialPlaces = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const placeList = document.querySelector(".places__list");
const placeAddPopup = document.querySelector(".place-add-popup");

const profileEditPopup = document.querySelector(".profile-edit-popup");
const profileEditFormElement = profileEditPopup.querySelector(".popup__form");

const profileEditOpenButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditPopup.querySelector(
  ".popup__close-button"
);
const placeAddOpenButton = document.querySelector(".profile__add-button");

const profileNameElement = document.querySelector(".profile__name");
const profileProfessionElement = document.querySelector(".profile__profession");

let nameInput = profileEditPopup.querySelector(".popup__input-text_type_name");
let jobInput = profileEditPopup.querySelector(".popup__input-text_type_about");

const placeAddElement = placeAddPopup.querySelector(".popup__form");

const placeAddCloseButton = placeAddPopup.querySelector(".popup__close-button");

let placeNameInput = placeAddElement.querySelector(
  ".popup__input-text_type_name"
);
let placeLinkInput = placeAddElement.querySelector(
  ".popup__input-text_type_about"
);


function createPlace(place) {
  const newPlace = document
    .querySelector("#placeTemplate")
    .content.cloneNode(true);

  const placeImage = newPlace.querySelector(".place__img");
  placeImage.setAttribute("src", place.link);
  placeImage.setAttribute("alt", place.name);

  const placeOpenImage = newPlace.querySelector(".place__open-card-img");
  placeOpenImage.setAttribute("src", place.link);
  placeOpenImage.setAttribute("alt", place.name);

  const placeTitle = newPlace.querySelector(".place__title");
  placeTitle.textContent = place.name;

  const placeOpenTitle = newPlace.querySelector(".place__open-card-title");
  placeOpenTitle.textContent = place.name;

  const likeButton = newPlace.querySelector(".place__like-button");
  likeButton.addEventListener("click", likePlace);

  const deleteButton = newPlace.querySelector(".place__delete-button");
  deleteButton.addEventListener("click", deletePlace);

  const placeImg = newPlace.querySelector(".place__img");
  const placeOpenCard = newPlace.querySelector(".place__open-card");
  
  placeImg.addEventListener("click", openPlaceOpenCard);

  const placeOpenCardCloseButton = newPlace.querySelector(
    ".popup__close-button"
  );

  placeOpenCardCloseButton.addEventListener("click", closePlaceOpenCard);

  placeList.prepend(newPlace);
}

function openProfileEditPopup() {
  profileEditPopup.classList.add("popup_opened");
  let profileName = profileNameElement.textContent;
  let profileProfession = profileProfessionElement.textContent;
  nameInput.value = profileName;
  jobInput.value = profileProfession;
}

function closeProfileEditPopup() {
  profileEditPopup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  profileNameElement.textContent = nameInputValue;
  profileProfessionElement.textContent = jobInputValue;
  closeProfileEditPopup();
}


function openPlaceAddPopup() {
  placeAddPopup.classList.add("popup_opened");
}

function closePlaceAddPopup() {
  placeAddPopup.classList.remove("popup_opened");
}

function placeAddPopupSubmit(evt) {
  evt.preventDefault();
  let name = placeNameInput.value;
  let link = placeLinkInput.value;
  let newAddedPlace = { name, link };
  createPlace(newAddedPlace);
  placeNameInput.value = "";
  placeLinkInput.value = "";
  closePlaceAddPopup();
}

function likePlace(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("place__like-button_active");
}

function deletePlace(event) {
  const deleteButton = event.target;
  const deletedCard = deleteButton.closest(".place");
  deletedCard.remove();
}

function openPlaceOpenCard(event) {
  const PlaceOpenCardOpenButton = event.target;
  const place=PlaceOpenCardOpenButton.closest(".place");
  const placeOpenCard = place.querySelector(".place__open-card")
  placeOpenCard.classList.add("place__open-card_active");
}

function closePlaceOpenCard(event) {
  const PlaceOpenCardCloseButton = event.target;
  const placeOpenCard=PlaceOpenCardCloseButton.closest(".place__open-card");
  placeOpenCard.classList.remove("place__open-card_active");
}




initialPlaces.forEach(createPlace);

profileEditOpenButton.addEventListener("click", openProfileEditPopup);
profileEditCloseButton.addEventListener("click", closeProfileEditPopup);
profileEditFormElement.addEventListener("submit", handleFormSubmit);
placeAddOpenButton.addEventListener("click", openPlaceAddPopup);
placeAddCloseButton.addEventListener("click", closePlaceAddPopup);
placeAddPopup.addEventListener("submit", placeAddPopupSubmit);

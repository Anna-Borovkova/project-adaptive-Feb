import { openPopup } from "./Index.js";

export default class Card {
  constructor(placeData, templateSelector) {
    this._link = placeData.link;
    this._name = placeData.name;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._popupZoomImage = document.querySelector(".open-card-popup");
    this._placeOpenCardTitle = this._popupZoomImage.querySelector(
      ".popup__open-card-title"
    );
    this._placeOpenCardImage = this._popupZoomImage.querySelector(
      ".popup__open-card-img"
    );
    this._placeLikeButton = this._element.querySelector(".place__like-button");
    this._placeImg = this._element.querySelector(".place__img");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._placeLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._element
      .querySelector(".place__delete-button")
      .addEventListener("click", () => {
        this._handleTrashClick();
      });

    this._placeImg.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLikeClick() {
    this._placeLikeButton.classList.toggle("place__like-button_active");
  }

  _handleTrashClick() {
    this._element.remove();
    this._element = null;
  }

  _handleCardClick() {
    openPopup(this._popupZoomImage);
    this._placeOpenCardTitle.textContent = this._name;
    this._placeOpenCardImage.setAttribute("src", this._link);
    this._placeOpenCardImage.setAttribute("alt", this._name);
  }

  genetateCard() {
    this._setEventListeners();
    this._placeImg.src = this._link;
    this._placeImg.alt = this._name;
    this._element.querySelector(".place__title").textContent = this._name;
    return this._element;
  }
}

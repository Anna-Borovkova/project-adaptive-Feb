const formElement = document.querySelector(".popup");
const profileEditButtonOpen = document.querySelector(".profile__edit-button");
const profileEditButtonClose = document.querySelector(".popup__close-button");

profileEditButtonOpen.addEventListener("click", openPopup);

function openPopup() {
  formElement.classList.add("popup_opened");
}

profileEditButtonClose.addEventListener("click", closePopup);

function closePopup() {
  formElement.classList.remove("popup_opened");
}

const profileNameElement = document.querySelector(".profile__name");
const profileProfessionElement = document.querySelector(".profile__profession");

let profileName = profileNameElement.textContent;
let profileProfession = profileProfessionElement.textContent;

let nameInput = document.querySelector(".input__text_type_name");
nameInput.value = profileName;

let jobInput = document.querySelector(".input__text_type_about");
jobInput.value = profileProfession;

const profileSubmitButton = document.querySelector(".popup__container");

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // //                                               // Так мы можем определить свою логику отправки.
  // //                                               // О том, как это делать, расскажем позже.

  // //   // Получите значение полей jobInput и nameInput из свойства value

  nameInputValue = nameInput.value;
  jobInputValue = jobInput.value;

  // // //   // Выберите элементы, куда должны быть вставлены значения полей

  // // //   // Вставьте новые значения с помощью textContent
  profileNameElement.textContent = nameInputValue;
  profileProfessionElement.textContent = jobInputValue;
  closePopup();
}

// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

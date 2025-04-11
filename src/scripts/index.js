import '/src/pages/index.css';
import {createCard, deleteCard, handleCardLikeButton} from './card.js';
import {openPopup, closePopup, openPopupImage} from './modal.js';
import {initialCards} from './cards.js';

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//Список карточек
const placeCards = document.querySelector('.places__list');

//профиль
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');

//попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupClose = popupEdit.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseCard = popupNewCard.querySelector('.popup__close');
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageCaption = popupCardImage.querySelector('.popup__caption');
const popupCloseImage = popupCardImage.querySelector('.popup__close');

//форма редактирования
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

//форма добавления карточки
const formNewCard = document.forms['new-place'];
const inputNameCardImage = formNewCard.querySelector('.popup__input_type_card-name');
const inputUrlCardImage = formNewCard.querySelector('.popup__input_type_url');

//Массив попапов
const popupsArray = [popupEdit, popupNewCard, popupCardImage];


// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    const newCard = createCard(card, handleCardLikeButton, openPopupImage, deleteCard);
    placeCards.append(newCard);
})


//Добавление анимации попапам
popupsArray.forEach(popup => popup.classList.add('popup_is-animated'));


//попап редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
});

popupClose.addEventListener('click', () => {
    closePopup(popupEdit);
});


//попап добавления карточки c картинкой
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

popupCloseCard.addEventListener('click', () => {
    closePopup(popupNewCard);
});

popupCloseImage.addEventListener('click', () => {
    closePopup(popupCardImage);
})


//функция чтения полей из профиля отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);
    
//функция добавления новой карточки из формы (попапа)
function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const card = {};
    card.link = inputUrlCardImage.value;
    card.name = inputNameCardImage.value;
    const newCard = createCard(card, handleCardLikeButton, openPopupImage, deleteCard);
    placeCards.prepend(newCard);
    closePopup(popupNewCard);
    inputNameCardImage.value = '';
    inputUrlCardImage.value = '';
}

formNewCard.addEventListener('submit', handleNewCardSubmit);


export {cardTemplate, popupCardImage, popupImage, popupImageCaption};
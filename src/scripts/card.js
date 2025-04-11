import {cardTemplate, popupImage} from './index.js';

//Функция создания карточки
function createCard (initialCards, handleCardLikeButton, openPopupImage, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;
    cardTitle.textContent = initialCards.name;

    cardLikeButton.addEventListener('click', handleCardLikeButton);
    cardImage.addEventListener('click', (evt) => {openPopupImage(evt, popupImage)});
    deleteButton.addEventListener('click', () => {deleteCard(deleteButton)});

    return card;
}

//Функция удаления карточки
function deleteCard (deleteButton) {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
}

//Функция лайка карточки 
function handleCardLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}


export {createCard, deleteCard, handleCardLikeButton};
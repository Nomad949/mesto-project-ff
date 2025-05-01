import {apiConfig, apiDeleteCard, apiLikeCard, apiDeleteLikeCard} from "./api";
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
function createCard (cardData, handleCardLikeButton, openPopupImage, deleteCard, userId) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardLikeCount = card.querySelector('.card__like-count');
    const deleteButton = card.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeCount.textContent = cardData.likes.length;
    
    if(cardData.owner._id === userId) {
        deleteButton.classList.remove('card__delete-button_inactive');
    } else {
        deleteButton.classList.add('card__delete-button_inactive');
    }

    cardLikeButton.addEventListener('click', () => {
        handleCardLikeButton(cardLikeButton, cardLikeCount, cardData, userId);
    });
    cardImage.addEventListener('click', (evt) => {
        openPopupImage(evt);
    });
    deleteButton.addEventListener('click', (evt) => {
        deleteCard(evt.target, cardData._id);
    });

    return card;
}

//Функция лайка карточки 
function handleCardLikeButton(cardLikeButton, cardLikeCount, cardData, userId) {
    const cardId = cardData._id;
    const checkLike = cardData.likes.some((like) => {
        return like._id === userId;
      });
    if(!checkLike) {
        apiLikeCard(apiConfig, cardId)
            .then((res) => {
                cardLikeButton.classList.add('card__like-button_is-active');
                cardLikeCount.textContent = res.likes.length;
                cardData.likes = res.likes;
            })
            .catch((err) => {
               console.log(err);
            });
    } else {
        apiDeleteLikeCard(apiConfig, cardId)
            .then((res) => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                cardLikeCount.textContent = res.likes.length;
                cardData.likes = res.likes;
            })
            .catch((err) => {
               console.log(err);
            });
    }       
}

//Функция удаления карточки
function deleteCard (deleteButton, cardId) {
    const listItem = deleteButton.closest('.card');
    apiDeleteCard(apiConfig, cardId)
        .then(() => {
            listItem.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

export {createCard, deleteCard, handleCardLikeButton};
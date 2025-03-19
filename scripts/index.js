// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeCards = document.querySelector('.places__list');
const deleteButton = cardTemplate.querySelector('.card__delete-button');
// @todo: Функция создания карточки
function createCard (initialCards, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;
    cardTitle.textContent = initialCards.name;

    deleteButton.addEventListener('click', deleteCard);

    return placeCards.append(card);
}

// @todo: Функция удаления карточки
function deleteCard() {  
    const listItem = deleteButton.closest('.card');
    listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => createCard(card, deleteCard));


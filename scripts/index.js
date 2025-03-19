// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeCards = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard (initialCards, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;
    cardTitle.textContent = initialCards.name;

    deleteButton.addEventListener('click', () => {deleteCard(deleteButton)});

    return card;
}

// @todo: Функция удаления карточки
function deleteCard (deleteButton) {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    const newCard = createCard(card, deleteCard);
    placeCards.append(newCard);
})


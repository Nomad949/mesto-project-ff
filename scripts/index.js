// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeCards = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard (initialCards, removeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');

    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;
    cardTitle.textContent = initialCards.name;

    deleteButton.addEventListener('click', () => {
        removeCard(card);
    })

    return placeCards.append(card);
}
// @todo: Функция удаления карточки
function removeCard () {
    
}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => createCard(card));
/**/

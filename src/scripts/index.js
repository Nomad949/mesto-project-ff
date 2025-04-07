// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//профиль
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');

//попапы
const image = document.querySelector('.card__image');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupClose = popupEdit.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseCard = popupNewCard.querySelector('.popup__close');
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageCaption = popupCardImage.querySelector('.popup__caption');
const popupCloseImage = popupCardImage.querySelector('.popup__close');

//форма редактирования
const formElement = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

//форма добавления карточки
const formNewCard = document.querySelector('.popup_type_new-card');
const inputNameCardImage = document.querySelector('.popup__input_type_card-name');
const inputUrlCardImage = document.querySelector('.popup__input_type_url');

// @todo: DOM узлы
const placeCards = document.querySelector('.places__list');
// @todo: Функция создания карточки
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
    cardImage.addEventListener('click', openPopupImage);
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
    const newCard = createCard(card, handleCardLikeButton, openPopupImage, deleteCard);
    placeCards.append(newCard);
})


function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

function closePopupOverlay(evt) {
    if(evt.target === evt.currentTarget) {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}


//popup редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
});

popupClose.addEventListener('click', () => {
    closePopup(popupEdit);
});


//popup добавления карточки
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

popupCloseCard.addEventListener('click', () => {
    closePopup(popupNewCard);
});


//popup просмотра картинки
function openPopupImage(evt) {
    if(evt.target) {
    const card = document.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    popupImage.alt = cardImage.alt;
    popupImage.src = cardImage.src;
    popupImageCaption.textContent = cardTitle.textContent;
    }
    openPopup(popupCardImage);
};

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


//функция создания карточки из формы (попапа)
function addCard(handleCardLikeButton, openPopupImage, deleteCard) {
    const name = inputNameCardImage.value;
    const link = inputUrlCardImage.value;

    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardImage.addEventListener('click', openPopupImage);
    cardLikeButton.addEventListener('click', handleCardLikeButton);
    deleteButton.addEventListener('click', () => {deleteCard(deleteButton)});

    return card;
}


function handleCardLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

//функция добавления новой карточки из формы (попапа)
function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const card = addCard(handleCardLikeButton, openPopupImage, deleteCard);
    placeCards.prepend(card);
    closePopup(popupNewCard);
}

 formNewCard.addEventListener('submit', handleNewCardSubmit);

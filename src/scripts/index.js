import '/src/pages/index.css';
import {createCard, deleteCard, handleCardLikeButton} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {
    apiGetUser,
    apiGetInitialCards,
    apiUpdateUserData,
    apiAddNewCard,
    apiUpdateUserAvatar} from './api.js';

//Список карточек
const placeCards = document.querySelector('.places__list');

//профиль
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');
const profileImage = profile.querySelector('.profile__image');

//попапы
const popupEdit = document.querySelector('.popup_type_edit');
const buttonCloseEditProfilePopup = popupEdit.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseCard = popupNewCard.querySelector('.popup__close');
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageCaption = popupCardImage.querySelector('.popup__caption');
const popupCloseImage = popupCardImage.querySelector('.popup__close');
const popupChangeAvatar = document.querySelector('.popup_type_new-avatar');
const popupCloseAvatar = popupChangeAvatar.querySelector('.popup__close');

//форма редактирования профиля
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

//форма обновления аватара
const formUpdateAvatar = document.forms['new-avatar'];
const inputUrlAvatar = formUpdateAvatar.querySelector('.popup__input_type_url');

//форма добавления карточки
const formNewCard = document.forms['new-place'];
const inputNameCardImage = formNewCard.querySelector('.popup__input_type_card-name');
const inputUrlCardImage = formNewCard.querySelector('.popup__input_type_url');

//Массив попапов
const popupsArray = Array.from(document.querySelectorAll('.popup'));

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClassActive: 'popup__input-error_active'
}

let userId;

//функция открытия попап просмотра картинки
function openPopupImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openPopup(popupCardImage);
};

//функция чтения полей из профиля отправки формы
function submitEditProfileForm(evt) {
    evt.preventDefault();
    const button = formEditProfile.querySelector('.popup__button');
    button.disabled = true;
    button.textContent = 'Сохранение...';
    const newName = nameInput.value;
    const job = jobInput.value;
    apiUpdateUserData(newName, job)
        .then((res) => {
            profileName.textContent = res.name;
            profileJob.textContent = res.about;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closePopup(popupEdit);
            button.textContent = 'Сохранить';
            button.disabled = false;
        });
}

//функция обновления аватара
function submitChangeAvatar(evt) {
    evt.preventDefault();
    const button = formUpdateAvatar.querySelector('.popup__button');
    button.disabled = true;
    button.textContent = 'Сохранение...';
    const changeAvatar = inputUrlAvatar.value;
    apiUpdateUserAvatar(changeAvatar)
        .then((res) => {
            profileImage.style.backgroundImage = `url(${res.avatar})`;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closePopup(popupChangeAvatar);
            button.textContent = 'Сохранить';
            button.disabled = false;
        });
}

//функция добавления новой карточки из формы (попапа)
function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const button = formNewCard.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    button.disabled = true;
    const card = {
        link: inputUrlCardImage.value,
        name: inputNameCardImage.value
    };
    
    apiAddNewCard(card.name, card.link)
        .then((card) => {
            const newCard = createCard(
                card,
                handleCardLikeButton,
                openPopupImage,
                deleteCard,
                userId
            );
            placeCards.prepend(newCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closePopup(popupNewCard);
            button.textContent = 'Сохранить';
            button.disabled = false;
        });
}


//Добавление анимации попапам
popupsArray.forEach(popup => popup.classList.add('popup_is-animated'));


//попап редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(popupEdit, validationConfig);
    openPopup(popupEdit);
});

buttonCloseEditProfilePopup.addEventListener('click', () => {
    closePopup(popupEdit);
});

//попап для смены аватара
profileImage.addEventListener('click', () => {
    inputUrlAvatar.value = '';
    clearValidation(popupChangeAvatar, validationConfig);
    openPopup(popupChangeAvatar);
})

popupCloseAvatar.addEventListener('click', () => {
    closePopup(popupChangeAvatar);
})

//попап добавления карточки
addButton.addEventListener('click', () => {
    inputNameCardImage.value = '';
    inputUrlCardImage.value = '';
    clearValidation(popupNewCard, validationConfig);
    openPopup(popupNewCard);
});

popupCloseCard.addEventListener('click', () => {
    closePopup(popupNewCard);
});

popupCloseImage.addEventListener('click', () => {
    closePopup(popupCardImage);
})

formEditProfile.addEventListener('submit', submitEditProfileForm);

formNewCard.addEventListener('submit', handleNewCardSubmit);

formUpdateAvatar.addEventListener('submit', submitChangeAvatar);


//ЗАПРОСЫ//////

Promise.all([apiGetUser(), apiGetInitialCards()])
    .then(([userProfile, initialCards]) => {
        userId = userProfile._id;
        profileImage.style.backgroundImage = `url(${userProfile.avatar})`;
        profileName.textContent = userProfile.name;
        profileJob.textContent = userProfile.about;

        initialCards.forEach(card => {
            const newCard = createCard(
                card,
                handleCardLikeButton,
                openPopupImage,
                deleteCard,
                userId
            );
            placeCards.append(newCard);
        });
    })
    .catch((err) => {
        console.log(err);
    });


//ВАЛИДАЦИЯ!!!

enableValidation(validationConfig);


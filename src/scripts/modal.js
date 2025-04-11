//функции открытия и закрытия попапа
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

//Закрытие попапа ESC
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

//Закрытие попапа через оверлей
function closePopupOverlay(evt) {
    if(evt.target === evt.currentTarget) {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

export {openPopup, closePopup};
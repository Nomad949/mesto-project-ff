const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: '4f356e3c-50ce-4ed3-89ee-3ece1eee5623',
      'Content-Type': 'application/json'
    }
  }

function apiGetUser(config) { 
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
})
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function apiGetInitialCards(config) {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
})
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function apiUpdateUserData(config, newName, job) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: job
        })
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
     });
}

function apiAddNewCard(config, name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function apiDeleteCard(config, cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function apiLikeCard(config, cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function apiDeleteLikeCard(config, cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function apiUpdateUserAvatar(config, avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
     }) 
};

export {
    apiConfig,
    apiGetUser,
    apiGetInitialCards,
    apiUpdateUserData,
    apiAddNewCard,apiDeleteCard,
    apiLikeCard,
    apiDeleteLikeCard,
    apiUpdateUserAvatar
};
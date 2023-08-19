class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization
      }
      })
      .then(this._checkResponse);
    }

    getCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization
      }
      })
      .then(this._checkResponse);
    }

    setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: data.firstname,
              about: data.job,
            })
        })
      .then(this._checkResponse);
    }

    setAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              avatar: data.avatar,
            })
        })
      .then(this._checkResponse);
    }

    addCard(data) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              name: data.title,
              link: data.link,
            })
        })
      .then(this._checkResponse);
    }

    putLike(cardId, isLiked) {
      if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization
      }
      })
      .then(this._checkResponse);
    }}
    
    deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
      }
      })
      .then(this._checkResponse)
    }
      
    deleteCard(cardId){
      return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
              authorization: this._authorization
          }
      })
      .then(this._checkResponse)
    }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'aa4e4177-7d9a-46f6-84e8-d329937ea67d',
    'Content-Type': 'application/json'
  }
}); 

export default  api 
import React from "react";
import Header from "./Header.jsx";
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from "./ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeletePopupCard from "./DeleteCardPopup.jsx";

function App() {

  const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isDeletePopup, setDeleteCardPopup] = React.useState(false);
  const [isImagePopup, setImagePopup] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deleteCardId, setDeleteCardId] = React.useState("");

  React.useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) => {
      setCurrentUser(dataUser);
      setCards(dataCard);
    }) 
    .catch((error => console.error(`Ошибка ${error}`)))
  }, [])

  function handleEditProfileClick() {
    setEditPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPopupOpen(true)
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  function handleDeleteCard(cardId) {
    setDeleteCardPopup(true);  
    setDeleteCardId(cardId) 
  }

  function closeAllPopups() { 
    setEditPopupOpen(false)
    setAvatarPopupOpen(false)
    setAddPopupOpen(false)
    setDeleteCardPopup(false)
    setImagePopup(false)
  }

  function handleCardLike (card) {
    const isLike = card.likes.some((element) => currentUser._id === element._id);
    if (isLike) {
      api.deleteLike(card._id)
      .then((res) => {
        setCards((state) =>
          state.map((c   ) => (c._id === card._id ? res : c))
        )
      })
      .catch(error => console.log(`Ошибка снятия лайка ${error}`));
    } else {
      api.putLike(card._id, true)
      .then((res) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? res : c))
        )
      })
      .catch(error => console.log(`Ошибка постановки лайка ${error}`)); 
    }
  }

  function handleDeleteSubmit() {
    api.deleteCard(deleteCardId)
    .then(() => {
      setCards((state) =>
        state.filter((card) => {
          return card._id !== deleteCardId;
        })
      );
      closeAllPopups();
    })
    .catch((error => console.error(`Ошибка удаления карточки ${error}`))) 
  }

  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
      reset()
    })
    .catch((error) => console.log(`Ошибка редактирования профиля ${error}`));
  }

  function handleUpdateAvatar(dataUser, reset){
    api.setAvatar(dataUser)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
      reset()
    })
    .catch((error) => console.log(`Ошибка обновления аватара ${error}`));
  }

  function handleAddPlace(cardInfo, reset){
    api.addCard(cardInfo)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
      reset()
    })
    .catch((error) => console.log(`Ошибка добавления карточки ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteCard={handleDeleteCard}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer/>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        /> 
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}  
          onUpdateUser={handleUpdateUser} 
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <DeletePopupCard
          isOpen={isDeletePopup}
          onClose={closeAllPopups}
          onCardDelete={handleDeleteSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
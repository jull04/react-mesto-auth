import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Like from './Like';

function Card ({card, onCardClick, onDeleteCard, onCardLike}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id===card.owner._id; 

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="cards__item">
      <img 
        src={card.link} 
        className="cards__image" 
        alt={card.name} 
        onClick={handleClick}
      />
      {isOwn  && <button type="button" className="cards__trash" aria-label="Удалить" onClick={() => onDeleteCard(card._id)}/>}
      <div className="cards__description">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
        <Like 
          myid={currentUser._id} 
          onCardLike={onCardLike}
          card={card}
        />
        </div>
      </div>
    </div>
  )
}

export default Card
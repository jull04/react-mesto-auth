import React from "react";

function Like({myid, card, onCardLike}) {

  const [isLike, setIsLike] = React.useState(false);

  React.useEffect(() => {
    setIsLike(card.likes.some((element) => myid === element._id))
  }, [card, myid])

  return (
    <>
      <button 
      type="button" className={`cards__like ${isLike ? 'cards__like_active' : ''}`}
      onClick={() => onCardLike(card)}
      />
      <span className="cards__like-counter">{card.likes.length}</span>
    </>
  )
}

export default Like
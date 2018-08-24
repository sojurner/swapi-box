import React from "react";
import PropTypes from "prop-types";
import "./ContentCard.css";

export const ContentCard = ({ card, toggleFavorites }) => {
  const content = Object.keys(card).map((key, i) => {
    if (key === "favorite") return
    return key === "name" 
    ? (<h1 key={key + i}>{card[key]}</h1>) 
    : (<p key={key + i}>{key}: {card[key]}</p>);
  });
  return (
    <article className={card.favorite ? "content_card favorite" : "content_card"}>
      {content}
      <button className="button" onClick={() => toggleFavorites(card)}></button>
    </article>
  );
};

const { object, func } = PropTypes;

ContentCard.propTypes = {
  card: object,
  toggleFavorites: func
};
